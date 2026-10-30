import blogData from "@/data/blog.json";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateModified?: string;
  author: string;
  image: string;
  tag: string;
  body: string;
};

export const posts: Post[] = blogData as Post[];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getAuthors() {
  const map = new Map<string, number>();
  for (const p of posts) {
    map.set(p.author, (map.get(p.author) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByAuthor(author: string) {
  return posts
    .filter((p) => p.author === author)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLatestPosts(limit = 3) {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export type AuthorSocial = { label: string; url: string };

// 作者简介与社交链接（从镜像页抽取；新增作者时在此补充）
export const AUTHOR_META: Record<
  string,
  { bio?: string; social?: AuthorSocial[] }
> = {
  "Sergiu Chiriac": {
    bio: "Sergiu is a developer and an entrepreneur. He's built 4 startups in the last year. 1 profitable and 1 had been acquired. He's currently building AI Directories, a curated list of AI Directories where makers can add their AI FreeTools and products.",
    social: [
      { label: "X", url: "https://x.com/ai_directories" },
      { label: "Twitter", url: "https://twitter.com/s_chiriac" },
    ],
  },
};

export function getAuthorMeta(name: string) {
  return AUTHOR_META[name];
}

export function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
