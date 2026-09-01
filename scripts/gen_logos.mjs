// 批量抓取品牌 favicon + 生成博客封面，写回 data/*.json 的 image 字段。
// 工具：用 Google s2 favicons 抓取官网图标（sz=128）存到 public/logos/<slug>.png
// 博客：生成品牌色渐变 SVG 封面（public/blog/<slug>.svg），消灭列表空占位

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LOGO_DIR = path.join(ROOT, "public", "logos");
const BLOG_DIR = path.join(ROOT, "public", "blog");
fs.mkdirSync(LOGO_DIR, { recursive: true });
fs.mkdirSync(BLOG_DIR, { recursive: true });

const tools = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "tools.json"), "utf8")
);
const blog = JSON.parse(
  fs.readFileSync(path.join(ROOT, "data", "blog.json"), "utf8")
);

const hostOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

async function fetchBuffer(url, timeoutMs = 15000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const ct = res.headers.get("content-type") || "";
    if (!ct.startsWith("image") || buf.length < 200) return null;
    return buf;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function runPool(items, worker, concurrency = 10) {
  let i = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  });
  await Promise.all(runners);
}

// ---- 工具 favicon ----
let toolOk = 0;
await runPool(tools, async (t) => {
  const host = hostOf(t.url);
  if (!host) return;
  const buf = await fetchBuffer(
    `https://www.google.com/s2/favicons?domain=${host}&sz=128`
  );
  const file = path.join(LOGO_DIR, `${t.slug}.png`);
  if (buf) {
    fs.writeFileSync(file, buf);
    t.image = `/logos/${t.slug}.png`;
    toolOk++;
  } else {
    t.image = t.image || null;
  }
});
fs.writeFileSync(
  path.join(ROOT, "data", "tools.json"),
  JSON.stringify(tools, null, 2)
);
console.log(`tools: ${toolOk}/${tools.length} favicons saved`);

// ---- 博客封面 SVG ----
const palettes = [
  ["#66CC8A", "#3D8054"],
  ["#5BA8E6", "#2E5C9E"],
  ["#E6A35B", "#9E6B2E"],
  ["#E65B8A", "#9E2E5C"],
  ["#A35BE6", "#5C2E9E"],
  ["#5BE6C8", "#2E9E8A"],
];
const tagHash = (s) => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};
let blogOk = 0;
for (const p of blog) {
  const [c1, c2] = palettes[tagHash(p.tag) % palettes.length];
  const ch = (p.title || "外").trim().charAt(0);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#g)"/>
  <circle cx="520" cy="70" r="120" fill="#ffffff" opacity="0.12"/>
  <circle cx="120" cy="300" r="90" fill="#000000" opacity="0.08"/>
  <text x="48" y="210" font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="120" font-weight="700" fill="#ffffff" opacity="0.92">${ch}</text>
  <text x="52" y="270" font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="28" font-weight="600" fill="#ffffff" opacity="0.85">${p.tag}</text>
</svg>`;
  const file = path.join(BLOG_DIR, `${p.slug}.svg`);
  fs.writeFileSync(file, svg);
  p.image = `/blog/${p.slug}.svg`;
  blogOk++;
}
fs.writeFileSync(
  path.join(ROOT, "data", "blog.json"),
  JSON.stringify(blog, null, 2)
);
console.log(`blog: ${blogOk}/${blog.length} covers saved`);
