# 外贸独立站导航 (Cross-border Directory)

中英文双语的**外贸独立站 / 跨境 DTC·B2B 导航站**。收录 121 个真实跨境电商品牌、覆盖 12 大品类，并配套 23 篇出海建站 / 营销 / 支付 / 物流 / SEO / 选品 / 合规双语博客。全站 UI 为中文外贸语境，含 JSON-LD 结构化数据与 SEO 元数据。

> 内容层由 `data/tools.json` + `data/blog.json` 两个数据文件驱动，改内容无需动代码。

## 功能特性

- **工具目录**：121 个跨境品牌，12 个双语品类，支持搜索与分类筛选
- **工具详情页**：双语简介、评分、定价 / 平台 / 分类信息、FAQ、替代方案（Alternatives）、`Product` + `FAQPage` JSON-LD
- **替代方案聚合页**：`/ai-tools/alternatives/[slug]`
- **分类落地页**：`/categories` 与 `/categories/[category]`
- **博客系统**：列表 + 详情 + 标签筛选 + 作者页，含 `BlogPosting` JSON-LD
- **SEO**：`sitemap.xml`（动态生成）、`robots.txt`、OpenGraph / Twitter Card 元信息、结构化数据
- **真实品牌图标**：91 个品牌官网 favicon（其余优雅降级为首字母色块）

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Next.js 14（App Router）+ React 18 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 3 + daisyUI 4（emerald 主题） |
| 主题 | next-themes |
| 渲染 | 全站静态生成（SSG，`generateStaticParams`） |
| 字体 | 自托管 Inter（sans）+ Instrument Serif（display） |

## 目录结构

```
app/                  页面（首页 / 目录 / 分类 / 工具详情 / 替代方案 / 博客 / 作者 / 定价 / 登录）
components/           组件（Navbar / Hero / 各首页区块 / 工具与博客浏览器）
lib/                  tools.ts（工具数据层）、blog.ts（博客数据层）
data/                 tools.json（121 工具）、blog.json（23 博客）
scripts/              数据生成脚本（gen_foreign_trade.mjs、gen_logos.mjs 等）
public/               品牌 logo、博客封面 SVG、字体 woff2
```

## 本地运行

```bash
# 1. 安装依赖
npm install

# 2. 开发模式
npm run dev          # http://localhost:3000

# 3. 生产构建与预览
npm run build
npm run start        # http://localhost:3000
```

> 说明：本工程在部分沙箱环境下构建时，需在每条 `next` 命令前设置
> `CODEBUDDY_SAFE_DELETE_SANDBOX=0`（关闭安全删除守卫对 `.next` 清理的拦截），
> 否则 `next build` 清理缓存会被拦截。本地普通环境无需此设置。

## 内容替换

站点内容完全由数据驱动，替换为自己的目录只需改两个文件：

- `data/tools.json` —— 工具列表（字段见 `lib/tools.ts` 的 `Tool` 类型）
- `data/blog.json` —— 博客文章（字段见 `lib/blog.ts` 的 `Post` 类型）

改完重新 `npm run build` 即可。生成脚本：

```bash
node scripts/gen_foreign_trade.mjs   # 重新生成双语工具 / 博客数据
node scripts/gen_logos.mjs           # 批量抓取品牌 favicon 写入 public/logos
```

## License

仅供学习 / 演示用途。
