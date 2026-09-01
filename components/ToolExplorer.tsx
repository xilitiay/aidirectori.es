"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolExplorer({ tools }: { tools: Tool[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const categories = useMemo(() => {
    const c = new Set<string>();
    tools.forEach((t) => c.add(t.category || "独立站"));
    return ["All", ...Array.from(c).sort()];
  }, [tools]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return tools.filter((t) => {
      if (cat !== "All" && (t.category || "独立站") !== cat) return false;
      if (!needle) return true;
      return (
        t.name.toLowerCase().includes(needle) ||
        (t.description || "").toLowerCase().includes(needle)
      );
    });
  }, [tools, q, cat]);

  return (
    <div>
      {/* Controls */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索外贸独立站…"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#66CC8A]/60 focus:ring-2 focus:ring-[#66CC8A]/20"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-[13px] px-3.5 py-1.5 rounded-full transition-colors ${
                cat === c
                  ? "bg-[#66CC8A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#66CC8A]/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="text-[13px] text-gray-900/50">
          {filtered.length} 个独立站
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/ai-tools/${t.slug}`}
            className="block rounded-2xl border border-gray-100 bg-white p-6 hover:border-[#66CC8A]/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                {t.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-[#3D8054]">
                    {t.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="font-semibold text-gray-900 truncate">
                {t.name}
              </span>
            </div>
            <p className="mt-3 text-[14px] text-gray-900/60 line-clamp-2">
              {t.description.slice(0, 120)}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full">
                {t.category}
              </span>
              {t.price && (
                <span className="text-[12px] text-gray-600 bg-gray-200/60 px-2.5 py-1 rounded-full">
                  {t.price}
                </span>
              )}
              {t.rating?.value != null && (
                <span className="text-[12px] text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                  ★ {t.rating.value}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-gray-900/50">
          没有找到匹配的独立站“{q}”。
        </div>
      )}
    </div>
  );
}
