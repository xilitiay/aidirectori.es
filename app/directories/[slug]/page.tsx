import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { directories, getDirectory, getDirectoriesByCategory } from "@/lib/directories";

export function generateStaticParams() {
  return directories.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const d = getDirectory(params.slug);
  if (!d) return { title: "Directory | AI Directories" };
  return {
    title: `${d.name} | AI Directories`,
    description: d.description?.slice(0, 160),
  };
}

export default function DirectoryPage({ params }: { params: { slug: string } }) {
  const dir = getDirectory(params.slug);
  if (!dir) notFound();

  const related = getDirectoriesByCategory(dir.category)
    .filter((d) => d.slug !== dir.slug)
    .slice(0, 6);

  const facts: { label: string; value: string }[] = [];
  facts.push({ label: "Category", value: dir.category });
  if (dir.dr != null) facts.push({ label: "Domain Rating", value: `DR ${dir.dr}` });
  if (dir.traffic) facts.push({ label: "Traffic", value: `${dir.traffic}/mo` });
  facts.push({ label: "Pricing", value: dir.pricing });
  if (dir.type) facts.push({ label: "Link Type", value: dir.type });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dir.name,
    description: dir.description,
    ...(dir.website ? { url: dir.website } : {}),
  };

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/directories" className="hover:text-gray-900">
            Directories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">{dir.name}</span>
        </nav>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-medium text-gray-900">
              {dir.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Link
                href={`/directories/category/${encodeURIComponent(dir.category)}`}
                className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full hover:underline"
              >
                {dir.category}
              </Link>
              {!dir.verified && (
                <span className="text-[12px] text-gray-900/40 bg-gray-100 px-2.5 py-1 rounded-full">
                  est. metrics
                </span>
              )}
            </div>
          </div>
          {dir.dr != null && (
            <div className="text-center flex-shrink-0">
              <div className="text-3xl font-semibold text-[#3D8054]">{dir.dr}</div>
              <div className="text-[11px] text-gray-900/40">DR</div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={dir.submitUrl || "/pricing"}
            target={dir.submitUrl ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            Submit your tool here
          </Link>
          {dir.website && (
            <a
              href={dir.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-colors"
            >
              Visit website
            </a>
          )}
        </div>

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

        <section className="mt-10">
          <h2 className="text-xl font-medium text-gray-900">About {dir.name}</h2>
          <p className="mt-3 text-[16px] leading-relaxed text-gray-900/70">
            {dir.description}
          </p>
          <p className="mt-4 text-[14px] leading-relaxed text-gray-900/60">
            Getting listed on <strong>{dir.name}</strong> is one of{" "}
            {dir.pricing === "Free" ? "the free" : "the higher-impact"} ways to build
            backlinks and reach early adopters. Our team can handle the manual
            submission for you across 100+ high-DR directories — including this one.
          </p>
        </section>

        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-xl font-medium text-gray-900">
                More in {dir.category}
              </h2>
              <Link
                href={`/directories/category/${encodeURIComponent(dir.category)}`}
                className="text-[13px] text-[#3D8054] hover:underline shrink-0"
              >
                View all →
              </Link>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {related.map((d) => (
                <Link
                  key={d.slug}
                  href={`/directories/${d.slug}`}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-4 hover:border-[#66CC8A]/40 transition-all"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {d.name}
                    </div>
                    <div className="text-[13px] text-gray-900/50 truncate">
                      {d.pricing}
                      {d.traffic ? ` · ${d.traffic}/mo` : ""}
                    </div>
                  </div>
                  {d.dr != null && (
                    <div className="text-[15px] font-semibold text-[#3D8054] flex-shrink-0">
                      {d.dr}
                    </div>
                  )}
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
