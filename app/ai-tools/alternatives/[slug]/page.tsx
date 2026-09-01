import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stars from "@/components/Stars";
import { getTool, tools, getAlternatives, type Tool } from "@/lib/tools";

export function generateStaticParams() {
  return tools
    .filter((t) => t.alternatives && t.alternatives.length > 0)
    .map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  const n = t?.alternatives?.length ?? 0;
  if (!t) return { title: "独立站替代方案 | 外贸独立站导航" };
  return {
    title: `${n}+ 个最佳 ${t.name} 替代独立站 (2026)`,
    description: `读者最常对比的 ${t.name} 替代独立站。浏览 ${n}+ 个与 ${t.name} 类似的外贸独立站。`,
  };
}

function ToolCard({ t }: { t: Tool }) {
  return (
    <Link
      href={`/ai-tools/${t.slug}`}
      className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#66CC8A]/40 transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
        {t.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.image}
            alt={t.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl font-medium text-[#3D8054]">
            {t.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <div className="font-semibold text-gray-900 truncate">{t.name}</div>
          {(t.rating?.value != null || t.price) && (
            <div className="flex items-center gap-1.5 shrink-0">
              {t.price && (
                <span className="text-[11px] text-gray-600 bg-gray-200/60 px-2 py-0.5 rounded-full">
                  {t.price}
                </span>
              )}
              {t.rating?.value != null && <Stars value={t.rating.value} />}
            </div>
          )}
        </div>
        <div className="text-[13px] text-gray-900/50 truncate">
          {t.category}
        </div>
      </div>
    </Link>
  );
}

export default function AlternativesPage({
  params,
}: {
  params: { slug: string };
}) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternatives(tool.slug);
  if (alternatives.length === 0) notFound();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/ai-tools"
          className="text-[14px] text-gray-900/50 hover:text-gray-900"
        >
          ← 全部独立站
        </Link>

        <h1 className="mt-6 text-3xl sm:text-4xl font-medium text-gray-900">
          {tool.name} 的最佳替代独立站
        </h1>
        <p className="mt-3 text-[15px] text-gray-900/60">
          读者最常对比与切换的 {alternatives.length}+ 个与 {tool.name} 类似的外贸独立站。
        </p>

        {/* Subject tool */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
            {tool.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-medium text-[#3D8054]">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-gray-900">{tool.name}</div>
            <div className="text-[13px] text-gray-900/50 truncate">
              {tool.category}
              {tool.price ? ` · ${tool.price}` : ""}
            </div>
          </div>
          <Link
            href={`/ai-tools/${tool.slug}`}
            className="text-[13px] text-[#3D8054] hover:underline shrink-0"
          >
            查看 →
          </Link>
        </div>

        {/* Alternatives grid */}
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {alternatives.map((t) => (
            <ToolCard key={t.slug} t={t} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/ai-tools"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 rounded-full transition-colors"
          >
            浏览全部独立站
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
