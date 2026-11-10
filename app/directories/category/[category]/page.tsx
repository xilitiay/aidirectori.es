import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import {
  directories,
  getDirectoryCategories,
  getDirectoriesByCategory,
} from "@/lib/directories";

export function generateStaticParams() {
  return getDirectoryCategories().map((c) => ({ category: c.name }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const name = decodeURIComponent(params.category);
  const exists = getDirectoryCategories().some((c) => c.name === name);
  if (!exists) return { title: "Directory Category | AI Directories" };
  return {
    title: `${name} Directories | AI Directories`,
    description: `Browse ${name} directories to submit your AI tool and build backlinks.`,
  };
}

export default function DirectoryCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const name = decodeURIComponent(params.category);
  const list = getDirectoriesByCategory(name);
  if (list.length === 0) notFound();

  const cats = getDirectoryCategories();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/directories" className="hover:text-gray-900">
            Directories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">{name}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          {name} <span className="font-instrument-serif italic">Directories</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50">
          {list.length} director{list.length === 1 ? "y" : "ies"} in this category.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/directories"
            className="text-[13px] px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#66CC8A]/40"
          >
            All
          </Link>
          {cats.map((c) => (
            <Link
              key={c.name}
              href={`/directories/category/${encodeURIComponent(c.name)}`}
              className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
                c.name === name
                  ? "bg-[#66CC8A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#66CC8A]/40"
              }`}
            >
              {c.name} ({c.count})
            </Link>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((d) => (
            <Link
              key={d.slug}
              href={`/directories/${d.slug}`}
              className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#66CC8A]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-gray-900 truncate">
                    {d.name}
                  </div>
                  <div className="text-[12px] text-gray-900/40">{d.category}</div>
                </div>
                {d.dr != null && (
                  <div className="text-center flex-shrink-0">
                    <div className="text-[16px] font-semibold text-[#3D8054]">
                      {d.dr}
                    </div>
                    <div className="text-[10px] text-gray-900/40">DR</div>
                  </div>
                )}
              </div>
              <p className="mt-3 text-[13px] text-gray-900/60 line-clamp-2">
                {d.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
                {d.traffic && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-900/60">
                    {d.traffic}/mo
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-full ${
                    d.pricing === "Free"
                      ? "bg-[#66CC8A]/15 text-[#3D8054]"
                      : "bg-gray-100 text-gray-900/60"
                  }`}
                >
                  {d.pricing}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
