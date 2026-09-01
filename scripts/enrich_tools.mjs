// 富化 data/tools.json：从镜像页 JSON-LD 抽取完整描述、真实分类、价格、发布日期、FAQ 评测问答。
// 保留原有 rating / image / slug。
import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const toolsPath = path.join(ROOT, "data", "tools.json");
const mirrorBase = path.join(ROOT, "_mirror", "site", "ai-tools");

const tools = JSON.parse(fs.readFileSync(toolsPath, "utf8"));
const isSchemaType = (s) => /^[A-Z][a-zA-Z]*$/.test(s || "");

function extractLD(html) {
  const blocks = [];
  const re = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      const parsed = JSON.parse(m[1]);
      if (Array.isArray(parsed)) blocks.push(...parsed);
      else blocks.push(parsed);
    } catch (e) {}
  }
  return blocks;
}

let enriched = 0;
let withFaq = 0;
let withDate = 0;

for (const t of tools) {
  const f = path.join(mirrorBase, t.slug, "index.html");
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, "utf8");
  const blocks = extractLD(html);
  const sa = blocks.find((b) => b["@type"] === "SoftwareApplication");
  const faq = blocks.find((b) => b["@type"] === "FAQPage");
  if (!sa) continue;

  // 完整描述（优先镜像，通常更长）
  if (sa.description && sa.description.length > (t.description || "").length) {
    t.description = sa.description;
  }
  // 真实分类（丢弃 schema 类型）
  if (sa.category && !isSchemaType(sa.category)) {
    t.category = sa.category;
  }
  if (sa.url) t.url = sa.url;
  if (sa.image && sa.image.url) t.image = sa.image.url;
  if (sa.operatingSystem) t.operatingSystem = sa.operatingSystem;
  if (sa.datePublished) {
    t.datePublished = sa.datePublished;
    withDate++;
  }

  // 价格
  const off = sa.offers;
  if (off) {
    const raw = String(off.price ?? "");
    const name = off.priceSpecification && off.priceSpecification.name;
    const cur = off.priceCurrency || "USD";
    t.currency = cur;
    if (raw && !isNaN(Number(raw))) t.priceValue = Number(raw);
    let label;
    if (name && String(name).toLowerCase() === "free") label = "Free";
    else if (raw === "0") label = "Free";
    else if (name) label = String(name);
    else if (raw) label = `${raw} ${cur}`;
    if (label) t.price = label;
  }

  // FAQ 评测问答
  if (faq && Array.isArray(faq.mainEntity) && faq.mainEntity.length) {
    t.faqs = faq.mainEntity.map((e) => ({
      q: e.name || "",
      a: (e.acceptedAnswer && e.acceptedAnswer.text) || "",
    }));
    withFaq++;
  }
  enriched++;
}

fs.writeFileSync(toolsPath, JSON.stringify(tools, null, 2));
console.log(`已处理镜像页: ${enriched}/${tools.length}`);
console.log(`含 FAQ 评测: ${withFaq}`);
console.log(`含发布日期: ${withDate}`);
console.log(`含价格数值: ${tools.filter((t) => t.priceValue != null).length}`);
console.log(`含评分: ${tools.filter((t) => t.rating && t.rating.value != null).length}`);
