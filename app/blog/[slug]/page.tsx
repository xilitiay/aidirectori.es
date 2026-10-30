import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts, getPostsByAuthor, fmtDate } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return { title: "Blog | AI Directories" };
  return { title: `${p.title} | AI Directories`, description: p.description };
}

function renderBody(body: string) {
  return body.split("\n\n").map((block, i) => {
    const isHeading = /^\d+\.\s/.test(block) || block.length < 60;
    if (isHeading) {
      return (
        <h2
          key={i}
          className="mt-8 text-xl font-semibold text-gray-900"
        >
          {block}
        </h2>
      );
    }
    return (
      <p key={i} className="mt-5 text-[16px] leading-relaxed text-gray-900/75">
        {block}
      </p>
    );
  });
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug && p.tag === post.tag)
    .slice(0, 3);

  const moreFromAuthor = getPostsByAuthor(post.author)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  // 结构化数据：BlogPosting
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "AI Directories",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${process.env.NEXT_PUBLIC_SITE || "localhost"}/blog/${post.slug}`,
    },
    keywords: post.tag,
  };

  return (
      <main className="bg-[#F5F6F8] min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="text-[14px] text-gray-900/50 hover:text-gray-900"
        >
          ← All posts
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full">
            {post.tag}
          </span>
          <span className="text-[13px] text-gray-900/40">
            {fmtDate(post.date)}
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-medium text-gray-900 leading-tight">
          {post.title}
        </h1>
        <p className="mt-3 text-[15px] text-gray-900/50">
          By{" "}
          <Link
            href={`/blog/author/${encodeURIComponent(post.author)}`}
            className="text-[#3D8054] hover:underline"
          >
            {post.author}
          </Link>
        </p>

        {post.image && (
          <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="mt-8">
          {renderBody(post.body)}
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-medium text-gray-900">
              More in {post.tag}
            </h2>
            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#66CC8A]/40 transition-all"
                >
                  <div className="font-semibold text-gray-900 text-[15px] leading-snug">
                    {p.title}
                  </div>
                  <div className="mt-2 text-[12px] text-gray-900/40">
                    {fmtDate(p.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {moreFromAuthor.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                More from {post.author}
              </h2>
              <Link
                href={`/blog/author/${encodeURIComponent(post.author)}`}
                className="text-[14px] font-medium text-[#3D8054] hover:underline"
              >
                View profile →
              </Link>
            </div>
            <div className="mt-5 grid sm:grid-cols-3 gap-4">
              {moreFromAuthor.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#66CC8A]/40 transition-all"
                >
                  <div className="font-semibold text-gray-900 text-[15px] leading-snug">
                    {p.title}
                  </div>
                  <div className="mt-2 text-[12px] text-gray-900/40">
                    {fmtDate(p.date)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      <Footer />
    </main>
  );
}
