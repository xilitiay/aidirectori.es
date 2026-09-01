"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/blog";

type BlogPreview = Pick<
  Post,
  "slug" | "title" | "description" | "date" | "author" | "image" | "tag"
>;

function fmtDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogExplorer({ posts }: { posts: BlogPreview[] }) {
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) counts.set(p.tag, (counts.get(p.tag) || 0) + 1);
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.tag === active)),
    [posts, active]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mt-8">
        <FilterChip
          label="All"
          count={posts.length}
          active={active === "All"}
          onClick={() => setActive("All")}
        />
        {tags.map(([tag, count]) => (
          <FilterChip
            key={tag}
            label={tag}
            count={count}
            active={active === tag}
            onClick={() => setActive(tag)}
          />
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="block rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-[#66CC8A]/40 hover:shadow-md transition-all"
          >
            <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                  ✎
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <span className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full">
                  {p.tag}
                </span>
                <span className="text-[12px] text-gray-900/40">
                  {fmtDate(p.date)}
                </span>
              </div>
              <h2 className="mt-3 text-[17px] font-semibold text-gray-900 leading-snug">
                {p.title}
              </h2>
              <p className="mt-2 text-[13px] text-gray-900/60 line-clamp-2">
                {p.description}
              </p>
              <div className="mt-3 text-[12px] text-gray-900/40">
                作者 {p.author}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-900/40">该分类下暂无文章。</p>
      )}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${
        active
          ? "bg-[#66CC8A] text-white border-[#66CC8A]"
          : "bg-white text-gray-700 border-gray-200 hover:border-[#66CC8A]/40"
      }`}
    >
      {label}
      <span
        className={`text-[11px] ${active ? "text-white/80" : "text-gray-900/40"}`}
      >
        {count}
      </span>
    </button>
  );
}
