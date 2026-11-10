"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tools } from "@/lib/tools";

const MAX = 4;

export default function CompareTools() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const pool = tools.filter(
      (t) =>
        !needle ||
        t.name.toLowerCase().includes(needle) ||
        (t.description || "").toLowerCase().includes(needle)
    );
    const chosen = new Set(selected);
    return [...pool.filter((t) => chosen.has(t.slug)), ...pool.filter((t) => !chosen.has(t.slug))].slice(
      0,
      30
    );
  }, [q, selected]);

  const toggle = (slug: string) =>
    setSelected((s) =>
      s.includes(slug)
        ? s.filter((x) => x !== slug)
        : s.length < MAX
        ? [...s, slug]
        : s
    );

  const chosen = selected
    .map((s) => tools.find((t) => t.slug === s))
    .filter(Boolean) as typeof tools;

  const rows: { label: string; get: (t: (typeof tools)[number]) => string }[] = [
    { label: "Category", get: (t) => t.category },
    { label: "Pricing", get: (t) => t.price || "—" },
    {
      label: "Rating",
      get: (t) =>
        t.rating?.value != null
          ? `${t.rating.value} (${t.rating.count ?? 0})`
          : "—",
    },
    {
      label: "Released",
      get: (t) =>
        t.datePublished
          ? new Date(t.datePublished).getFullYear().toString()
          : "—",
    },
  ];

  return (
    <div>
      <div className="relative max-w-md">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search tools to compare…"
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
      <p className="mt-2 text-[13px] text-gray-900/50">
        Select up to {MAX} tools ({selected.length}/{MAX} selected)
      </p>

      {chosen.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr>
                <th className="text-left text-[13px] text-gray-900/40 font-medium p-3 align-bottom w-40">
                  Tool
                </th>
                {chosen.map((t) => (
                  <th key={t.slug} className="p-3 align-bottom">
                    <Link
                      href={`/ai-tools/${t.slug}`}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden">
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
                      <span className="text-[14px] font-semibold text-gray-900 group-hover:text-[#3D8054] text-center">
                        {t.name}
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-gray-100">
                  <td className="text-[13px] text-gray-900/50 p-3">
                    {row.label}
                  </td>
                  {chosen.map((t) => (
                    <td
                      key={t.slug}
                      className="text-[14px] text-gray-900 p-3 text-center"
                    >
                      {row.get(t)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-gray-100">
                <td className="p-3" />
                {chosen.map((t) => (
                  <td key={t.slug} className="p-3 text-center">
                    <Link
                      href={`/ai-tools/${t.slug}`}
                      className="text-[13px] text-[#3D8054] hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((t) => {
          const active = selected.includes(t.slug);
          const disabled = !active && selected.length >= MAX;
          return (
            <button
              key={t.slug}
              onClick={() => toggle(t.slug)}
              disabled={disabled}
              className={`text-left rounded-2xl border bg-white p-4 transition-all ${
                active
                  ? "border-[#66CC8A] ring-2 ring-[#66CC8A]/30"
                  : disabled
                  ? "border-gray-100 opacity-40 cursor-not-allowed"
                  : "border-gray-100 hover:border-[#66CC8A]/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                  {t.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-medium text-[#3D8054]">
                      {t.name.charAt(0)}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-gray-900 truncate">
                  {t.name}
                </span>
                {active && (
                  <span className="ml-auto text-[12px] text-[#3D8054]">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
