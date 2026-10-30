import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAuthors, getPostsByAuthor, getAuthorMeta, fmtDate } from "@/lib/blog";

export function generateStaticParams() {
  return getAuthors().map((a) => ({ author: encodeURIComponent(a.name) }));
}

export function generateMetadata({ params }: { params: { author: string } }) {
  const name = decodeURIComponent(params.author);
  return { title: `${name} | AI Directories Blog` };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function AuthorPage({ params }: { params: { author: string } }) {
  const name = decodeURIComponent(params.author);
  const author = getAuthors().find((a) => a.name === name);
  if (!author) notFound();

  const meta = getAuthorMeta(name);
  const authorPosts = getPostsByAuthor(name);

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="text-[14px] text-gray-900/50 hover:text-gray-900"
        >
          ← All posts
        </Link>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-[#66CC8A]/20 text-[#3D8054] flex items-center justify-center text-xl font-semibold">
            {initials(name)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium text-gray-900">
              {name}
            </h1>
            <p className="mt-1 text-[14px] text-gray-900/50">
              {author.count} {author.count === 1 ? "post" : "posts"}
            </p>
          </div>
        </div>

        {meta?.bio && (
          <p className="mt-6 text-[16px] leading-relaxed text-gray-900/70 max-w-2xl">
            {meta.bio}
          </p>
        )}

        {meta?.social && meta.social.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {meta.social.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-200 hover:border-[#66CC8A]/50 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {authorPosts.map((p) => (
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
                <h2 className="mt-3 text-[17px] font-semibold text-gray-900 leading-snug">
                  {p.title}
                </h2>
                <p className="mt-2 text-[13px] text-gray-900/60 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
