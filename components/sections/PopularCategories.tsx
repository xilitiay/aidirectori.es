import Link from "next/link";
import { getCategories } from "@/lib/tools";

export default function PopularCategories() {
  const categories = getCategories().slice(0, 8);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">
              Browse by{" "}
              <span className="font-instrument-serif italic">category</span>
            </h2>
            <p className="mt-3 text-[15px] text-gray-900/50 max-w-xl">
              Explore {getCategories().length} categories of AI tools — each one
              hand-picked, reviewed and kept up to date.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1 text-[14px] font-medium text-[#3D8054] hover:underline whitespace-nowrap"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/categories/${encodeURIComponent(c.name)}`}
              className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-[#F5F6F8] px-5 py-4 hover:border-[#66CC8A]/40 hover:bg-[#66CC8A]/5 transition-all"
            >
              <span className="text-[15px] font-medium text-gray-900 truncate pr-2">
                {c.name}
              </span>
              <span className="text-[13px] text-gray-900/40 group-hover:text-[#3D8054] transition-colors">
                {c.count}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/categories"
          className="mt-8 inline-flex sm:hidden items-center gap-1 text-[14px] font-medium text-[#3D8054] hover:underline"
        >
          View all categories →
        </Link>
      </div>
    </section>
  );
}
