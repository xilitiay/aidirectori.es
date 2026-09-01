import Link from "next/link";
import { getLatestPosts, fmtDate } from "@/lib/blog";

export default function LatestBlog() {
  const latest = getLatestPosts(3);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F5F6F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">
              最新博客
              <span className="font-instrument-serif italic"> 洞察</span>
            </h2>
            <p className="mt-3 text-[15px] text-gray-900/50 max-w-xl">
              建站、选品、营销与合规实战，帮你把外贸独立站真正做起来。
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1 text-[14px] font-medium text-[#3D8054] hover:underline whitespace-nowrap"
          >
            全部文章 →
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((p) => (
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
                <h3 className="mt-3 text-[17px] font-semibold text-gray-900 leading-snug">
                  {p.title}
                </h3>
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

        <Link
          href="/blog"
          className="mt-8 inline-flex sm:hidden items-center gap-1 text-[14px] font-medium text-[#3D8054] hover:underline"
        >
          全部文章 →
        </Link>
      </div>
    </section>
  );
}
