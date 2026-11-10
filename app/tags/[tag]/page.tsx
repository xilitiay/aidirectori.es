import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getTags, getPostsByTag, fmtDate } from "@/lib/blog";

export function generateStaticParams() {
  return getTags().map((t) => ({ tag: t.name }));
}

export function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  if (!getPostsByTag(tag).length) return { title: "Tag | AI Directories" };
  return {
    title: `${tag} Articles | AI Directories`,
    description: `Read the latest ${tag} articles and guides on AI Directories.`,
  };
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);
  if (!posts.length) notFound();
  const tags = getTags();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-gray-900">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">{tag}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          {tag} <span className="font-instrument-serif italic">Articles</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50">
          {posts.length} article{posts.length === 1 ? "" : "s"}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className="text-[13px] px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:border-[#66CC8A]/40"
          >
            All
          </Link>
          {tags.map((t) => (
            <Link
              key={t.name}
              href={`/tags/${encodeURIComponent(t.name)}`}
              className={`text-[13px] px-3 py-1.5 rounded-full transition-colors ${
                t.name === tag
                  ? "bg-[#66CC8A] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#66CC8A]/40"
              }`}
            >
              {t.name} ({t.count})
            </Link>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="block rounded-2xl border border-gray-100 bg-white overflow-hidden hover:border-[#66CC8A]/40 hover:shadow-md transition-all"
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-5">
                <div className="text-[12px] text-[#3D8054]">{p.tag}</div>
                <h2 className="mt-2 text-[17px] font-semibold text-gray-900 line-clamp-2">
                  {p.title}
                </h2>
                <p className="mt-2 text-[14px] text-gray-900/60 line-clamp-3">
                  {p.description}
                </p>
                <div className="mt-4 text-[12px] text-gray-900/40">
                  {fmtDate(p.date)} · {p.author}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
