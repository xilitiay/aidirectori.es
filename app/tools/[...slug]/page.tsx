import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { freeTools, getFreeTool } from "@/lib/freeTools";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return freeTools.map((t) => ({ slug: t.slug.split("/") }));
}

export function generateMetadata({ params }: { params: { slug: string[] } }) {
  const tool = getFreeTool(params.slug.join("/"));
  if (!tool) return { title: "Free AI Tool | AI Directories" };
  return {
    title: `${tool.name} | AI Directories`,
    description: tool.desc,
  };
}

export default function FreeToolPage({ params }: { params: { slug: string[] } }) {
  const slugPath = params.slug.join("/");
  const tool = getFreeTool(slugPath);
  if (!tool) notFound();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />

      <section className="w-full bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/tools"
            className="text-[14px] text-gray-900/50 hover:text-gray-900 transition-colors"
          >
            ← All free tools
          </Link>
          <div className="mt-4">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-wide text-[#3D8054] bg-[#66CC8A]/15 px-3 py-1 rounded-full">
              {tool.category}
            </span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            {tool.name}
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-2xl mx-auto">
            {tool.desc}
          </p>

          {/* presentational tool input */}
          <div className="mt-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Type something to get started…"
              className="w-full h-12 px-4 rounded-full border border-gray-200 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#66CC8A]/40"
            />
            <button
              type="button"
              className="mt-3 inline-flex h-12 items-center justify-center px-7 text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
            >
              Generate
            </button>
          </div>
          <p className="mt-4 text-[13px] text-gray-900/40">
            Free demo preview — connect your own data to enable live results.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
