import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getToolsByCategory } from "@/lib/tools";

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.name }));
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const name = decodeURIComponent(params.category);
  const exists = getCategories().some((c) => c.name === name);
  if (!exists) return { title: "Category | AI Directories" };
  return {
    title: `${name} AI tools | AI Directories`,
    description: `Discover ${name} AI tools listed on AI Directories.`
  };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const name = decodeURIComponent(params.category);
  const list = getToolsByCategory(name);
  if (list.length === 0) notFound();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/categories"
          className="text-[14px] text-gray-900/50 hover:text-gray-900"
        >
          ← All categories
        </Link>
        <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          {name} <span className="font-instrument-serif italic">AI tools</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50">
          {list.length} tool{list.length === 1 ? "" : "s"}
        </p>
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
      </div>
      <Footer />
    </main>
  );
}
