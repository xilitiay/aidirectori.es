import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stars from "@/components/Stars";
import { getTool, tools, getAlternatives } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  if (!t) return { title: "AI Tool | AI Directories" };
  return {
    title: `${t.name} | AI Directories`,
    description: t.description?.slice(0, 160),
  };
}

function fmtDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const related = tools
    .filter((t) => t.slug !== tool.slug && t.category === tool.category)
    .slice(0, 4);

  const alternatives = getAlternatives(tool.slug).slice(0, 6);

  const released = fmtDate(tool.datePublished);

  // 结构化数据：Product + FAQPage（提升搜索引擎收录与富媒体展示）
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://${process.env.NEXT_PUBLIC_SITE || "localhost"}/ai-tools/${tool.slug}#product`,
        name: tool.name,
        url: tool.url,
        description: tool.description?.slice(0, 300),
        category: tool.category,
        brand: { "@type": "Brand", name: tool.name },
        ...(tool.rating?.value != null
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: tool.rating.value,
                ratingCount: tool.rating.count ?? 1,
                bestRating: 5,
              },
            }
          : {}),
        ...(tool.price
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: tool.url,
              },
            }
          : {}),
      },
      ...(tool.faqs && tool.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: tool.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  const facts: { label: string; value: string }[] = [];
  if (tool.price) facts.push({ label: "Pricing", value: tool.price });
  if (released) facts.push({ label: "Released", value: released });
  if (tool.operatingSystem)
    facts.push({ label: "Platform", value: tool.operatingSystem });
  facts.push({ label: "Category", value: tool.category });

  return (
      <main className="bg-[#F5F6F8] min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/ai-tools"
          className="text-[14px] text-gray-900/50 hover:text-gray-900"
        >
          ← All AI tools
        </Link>

        <div className="mt-6 flex items-start gap-5">
          <div className="w-20 h-20 shrink-0 rounded-2xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
            {tool.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tool.image}
                alt={tool.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-medium text-[#3D8054]">
                {tool.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900">
              {tool.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full">
                {tool.category}
              </span>
              {tool.price && (
                <span className="text-[12px] text-gray-600 bg-gray-200/60 px-2.5 py-1 rounded-full">
                  {tool.price}
                </span>
              )}
              {tool.rating?.value != null && (
                <span className="text-[12px] text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <Stars value={tool.rating.value} />
                  {tool.rating.count != null && (
                    <span className="text-amber-700/60">({tool.rating.count})</span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            Visit website
          </a>
          <a
            href={`/ai-tools/alternatives/${tool.slug}`}
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 rounded-full transition-colors"
          >
            View alternatives
          </a>
        </div>

        {/* At a glance */}
        {facts.length > 0 && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="text-[11px] uppercase tracking-wide text-gray-900/40">
                  {f.label}
                </div>
                <div className="mt-1 text-[14px] font-medium text-gray-900">
                  {f.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About */}
        {tool.description && (
          <section className="mt-10">
            <h2 className="text-xl font-medium text-gray-900">About {tool.name}</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-gray-900/70 whitespace-pre-line">
              {tool.description}
            </p>
          </section>
        )}

        {/* Review / FAQ */}
        {tool.faqs && tool.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-medium text-gray-900">
              {tool.name} review
            </h2>
            <div className="mt-5 divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white">
              {tool.faqs.map((item, i) => (
                <details key={i} className="group p-5" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer list-none text-[15px] font-medium text-gray-900">
                    <span>{item.q}</span>
                    <span className="text-[#3D8054] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-relaxed text-gray-900/70">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <div className="mt-14">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-medium text-gray-900">
                Alternatives to {tool.name}
              </h2>
              <Link
                href={`/ai-tools/alternatives/${tool.slug}`}
                className="text-[13px] text-[#3D8054] hover:underline shrink-0"
              >
                View all {alternatives.length}+ →
              </Link>
            </div>
            <p className="mt-2 text-[14px] text-gray-900/50">
              Similar tools our readers also compare.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {alternatives.map((t) => (
                <Link
                  key={t.slug}
                  href={`/ai-tools/${t.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#66CC8A]/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
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
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-gray-900 truncate">
                        {t.name}
                      </div>
                      {(t.rating?.value != null || t.price) && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          {t.price && (
                            <span className="text-[11px] text-gray-600 bg-gray-200/60 px-2 py-0.5 rounded-full">
                              {t.price}
                            </span>
                          )}
                          {t.rating?.value != null && (
                            <Stars value={t.rating.value} />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-[13px] text-gray-900/50 truncate">
                      {t.category}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* More in category */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-medium text-gray-900">
              More in {tool.category}
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {related.map((t) => (
                <Link
                  key={t.slug}
                  href={`/ai-tools/${t.slug}`}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#66CC8A]/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
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
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {t.name}
                    </div>
                    <div className="text-[13px] text-gray-900/50 truncate">
                      {t.category}
                      {t.price ? ` · ${t.price}` : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
