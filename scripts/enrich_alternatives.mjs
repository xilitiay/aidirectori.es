import fs from "fs";

const tools = JSON.parse(fs.readFileSync("data/tools.json", "utf8"));
const slugToTool = new Map(tools.map((t) => [t.slug, t]));

const re = /href="\/ai-tools\/alternatives\/([^"?#]+)"/g;

let withAlt = 0;
let total = 0;
let hit = 0;
let miss = 0;
const missedSamples = [];

for (const t of tools) {
  const f = `_mirror/site/ai-tools/${t.slug}/index.html`;
  if (!fs.existsSync(f)) {
    t.alternatives = [];
    continue;
  }
  const h = fs.readFileSync(f, "utf8");
  const alts = new Set();
  let m;
  while ((m = re.exec(h))) {
    const s = m[1];
    if (!s || s === "alternatives" || s === t.slug) continue;
    if (s.includes("/")) continue; // 排除子路径
    alts.add(s);
  }
  const arr = [...alts];
  t.alternatives = arr;
  if (arr.length) {
    withAlt++;
    total += arr.length;
    for (const s of arr) {
      if (slugToTool.has(s)) hit++;
      else {
        miss++;
        if (missedSamples.length < 20) missedSamples.push(s);
      }
    }
  }
}

fs.writeFileSync("data/tools.json", JSON.stringify(tools, null, 2));

console.log(JSON.stringify({ withAlt, total, hit, miss }, null, 2));
console.log("missed samples:", missedSamples.join(", "));
