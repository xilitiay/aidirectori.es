// 从镜像博客页抽取真实博客数据 → data/blog.json
// 含 JSON-LD 元数据（标题/日期/作者/图片/描述）+ 清理后的正文。
import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const blogMirror = path.join(ROOT, "_mirror", "site", "blog");
const outPath = path.join(ROOT, "data", "blog.json");

const ENT = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'",
  "&#39;": "'", "&#x27;": "'", "&nbsp;": " ", "&rsquo;": "’", "&lsquo;": "‘",
  "&ldquo;": "“", "&rdquo;": "”", "&hellip;": "…", "&mdash;": "—",
  "&ndash;": "–", "&bull;": "•",
};

function decode(s) {
  return s.replace(/&[a-z]+;|&#\d+;|&#x[0-9a-f]+;/gi, (m) => ENT[m] || m);
}

function extractLD(html) {
  const blocks = [];
  const re = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      const p = JSON.parse(m[1]);
      Array.isArray(p) ? blocks.push(...p) : blocks.push(p);
    } catch (e) {}
  }
  return blocks;
}

function extractBody(html) {
  const am = html.match(/<article[\s\S]*?<\/article>/i);
  if (!am) return "";
  let s = am[0];
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<\/(p|div|h1|h2|h3|h4|li|blockquote|section|br)>/gi, "\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, "");
  s = decode(s);
  let lines = s.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines;
}

function cleanBody(lines, description) {
  let start = 0;
  if (description) {
    const lead = description.split("Read ")[0].trim();
    const idx = lines.findIndex((l) => lead && l.startsWith(lead.slice(0, 40)));
    if (idx >= 0) start = idx;
  }
  let body = lines.slice(start);
  // 去掉与 description 重复的首句
  if (body.length && description && body[0].startsWith(description.slice(0, 30))) {
    body = body.slice(1);
  }
  // 去掉 "Written by ..." 行
  body = body.filter((l) => !/^Written by /i.test(l));
  // 跳过 Table of contents 及其后的短条目
  const toc = body.findIndex((l) => /^table of contents$/i.test(l));
  if (toc >= 0) {
    let i = toc + 1;
    while (i < body.length && (body[i].length < 50 || /^\d+\.\s/.test(body[i]))) i++;
    body = body.slice(i);
  }
  return body.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

const posts = [];
const dirs = fs
  .readdirSync(blogMirror, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const slug of dirs) {
  const f = path.join(blogMirror, slug, "index.html");
  if (!fs.existsSync(f)) continue;
  const html = fs.readFileSync(f, "utf8");
  const blocks = extractLD(html);
  const bp = blocks.find((b) => b["@type"] === "BlogPosting");
  if (!bp) continue;

  const lines = extractBody(html);
  let description = (bp.description || "").split("Read ")[0].trim();
  const body = cleanBody(lines, description);

  // 提取分类：文章首行 "CategoryMonth Day, Year"
  let tag = "AI";
  if (lines.length) {
    const m = lines[0].match(/^([A-Z][A-Za-z &]+?)(?=[A-Z][a-z]+ \d|,|20\d{2})/);
    if (m && m[1].trim().length < 30) tag = m[1].trim();
  }

  const image = Array.isArray(bp.image) ? bp.image[0] : bp.image;

  posts.push({
    slug,
    title: bp.headline || slug,
    description,
    date: (bp.datePublished || "").slice(0, 10),
    dateModified: (bp.dateModified || "").slice(0, 10),
    author: bp.author && bp.author.name ? bp.author.name : "AI Directories",
    image: image || "",
    tag,
    body,
  });
}

posts.sort((a, b) => (a.date < b.date ? 1 : -1));
fs.writeFileSync(outPath, JSON.stringify(posts, null, 2));
console.log(`已抽取博客: ${posts.length} 篇`);
console.log(`含正文: ${posts.filter((p) => p.body.length > 100).length}`);
console.log(`分类示例:`, [...new Set(posts.map((p) => p.tag))].slice(0, 15).join(", "));
