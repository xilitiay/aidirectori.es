import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { KEYWORDS, getToolsByKeyword } from "@/lib/tools";

export function generateStaticParams() {
  return KEYWORDS.map((k) => ({ keyword: k }));
}

export function generateMetadata({ params }: { params: { keyword: string } }) {
  const kw = decodeURIComponent(params.keyword);
  if (!getToolsByKeyword(kw).length) return { title: "Keyword | AI Directories" };
  return {
    title: `${kw} AI Tools | AI Directories`,
    description: `Discover AI tools related to ${kw}.`,
  };
}

export default function KeywordPage({
  params,
}: {
  params: { keyword: string };
}) {
  const kw = decodeURIComponent(params.keyword);
  const list = getToolsByKeyword(kw);
  if (!list.length) notFound();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/ai-tools" className="hover:text-gray-900">
            AI Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">{kw}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          {kw} <span className="font-instrument-serif italic">AI tools</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50">
          {list.length} tool{list.length === 1 ? "" : "s"} related to “{kw}”.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {KEYWORDS.map((k) => (
            <Link
              key={k}
              href={`/keywords/${encodeURIComponent(k)}`}
              className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
                k === kw
                  ? "bg-[#66CC8A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#66CC8A]/40"
              }`}
            >
              {k}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((t) => (
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
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
