import type { MetadataRoute } from "next";
import { tools, getCategories } from "@/lib/tools";
import { posts, getAuthors } from "@/lib/blog";

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

  return [
    ...staticRoutes,
    ...toolRoutes,
    ...blogRoutes,
    ...categoryRoutes,
    ...authorRoutes,
    ...alternativeRoutes,
  ];
}
