import Link from "next/link";
import { tools } from "@/lib/tools";

export default function FeaturedTools() {
  const featured = tools
    .filter((t) => t.image)
    .slice(0, 8);

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block mb-3 px-3 py-1 text-[12px] font-semibold text-[#3D8054] bg-[#66CC8A]/15 rounded-full">
            Featured
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Discover <span className="font-instrument-serif italic">innovative AI tools</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            that power modern startups.
          </p>
          <p className="mt-2 text-[14px] text-gray-900/40">
            Handpicked listings from our directory — explore what builders are shipping right
            now.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((t) => (
            <Link
              key={t.slug}
              href={`/ai-tools/${t.slug}`}
              className="block rounded-2xl border border-gray-100 bg-[#F5F6F8] overflow-hidden hover:border-[#66CC8A]/40 hover:shadow-sm transition-all"
            >
              <div className="aspect-[16/9] bg-white overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <div className="text-[15px] font-semibold text-gray-900 truncate">
                  {t.name}
                </div>
                <p className="mt-1 text-[13px] text-gray-900/50 line-clamp-2">
                  {t.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/ai-tools"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            View more AI tools
          </Link>
        </div>
      </div>
    </section>
  );
}
