import type { MetadataRoute } from "next";
import { tools, getCategories, KEYWORDS } from "@/lib/tools";
import { posts, getAuthors, getTags } from "@/lib/blog";
import { directories, getDirectoryCategories } from "@/lib/directories";
import { freeTools } from "@/lib/freeTools";

const BASE = "https://aidirectori.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/ai-tools", "/categories", "/directories", "/pricing", "/blog", "/auth/signin"].map(
    (p) => ({
      url: `${BASE}${p}`,
      lastModified: new Date(),
    })
  );

  const toolRoutes = tools.map((t) => ({
    url: `${BASE}/ai-tools/${t.slug}`,
    lastModified: t.datePublished ? new Date(t.datePublished) : new Date(),
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateModified ? new Date(p.dateModified) : new Date(p.date),
  }));

  const categoryRoutes = getCategories().map((c) => ({
    url: `${BASE}/categories/${encodeURIComponent(c.name)}`,
    lastModified: new Date(),
  }));

  const authorRoutes = getAuthors().map((a) => ({
    url: `${BASE}/blog/author/${encodeURIComponent(a.name)}`,
    lastModified: new Date(),
  }));

  const alternativeRoutes = tools
    .filter((t) => t.alternatives && t.alternatives.length > 0)
    .map((t) => ({
      url: `${BASE}/ai-tools/alternatives/${t.slug}`,
      lastModified: new Date(),
    }));

  const directoryRoutes = directories.map((d) => ({
    url: `${BASE}/directories/${d.slug}`,
    lastModified: new Date(),
  }));

  const directoryCatRoutes = getDirectoryCategories().map((c) => ({
    url: `${BASE}/directories/category/${encodeURIComponent(c.name)}`,
    lastModified: new Date(),
  }));

  const tagRoutes = getTags().map((t) => ({
    url: `${BASE}/tags/${encodeURIComponent(t.name)}`,
    lastModified: new Date(),
  }));

  const keywordRoutes = KEYWORDS.map((k) => ({
    url: `${BASE}/keywords/${encodeURIComponent(k)}`,
    lastModified: new Date(),
  }));

  const extraStatic = [
    "/compare",
    "/free-ai-directories",
    "/submit-ai-tool",
    "/tools",
    "/about-us",
    "/tos",
    "/privacy-policy",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
  }));

  const freeToolRoutes = freeTools.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...alternativeRoutes,
    ...directoryRoutes,
    ...directoryCatRoutes,
    ...tagRoutes,
    ...keywordRoutes,
    ...extraStatic,
    ...freeToolRoutes,
  ];
}
