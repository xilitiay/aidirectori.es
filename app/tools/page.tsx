import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  freeTools,
  getFreeToolsByCategory,
  FREE_TOOL_CATEGORIES,
} from "@/lib/freeTools";

export const metadata = {
  title: "Free AI Tools - 100% Free AI Software | AI Directories",
  description:
    "Explore 100% free AI tools designed to help you build, market, and scale your projects — no sign-up, no credit card required.",
};

export default function ToolsPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Create Smarter. <span className="font-instrument-serif italic">Grow Faster.</span>
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-2xl mx-auto">
            Explore 100% free AI tools designed to help you build, market, and scale your
            projects — no sign-up, no credit card required.
          </p>
        </div>
      </section>

      {/* Tool categories */}
      <section className="w-full bg-[#F5F6F8] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {FREE_TOOL_CATEGORIES.map((cat) => {
            const items = getFreeToolsByCategory(cat);
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-baseline justify-between mb-5">
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{cat}</h2>
                  <span className="text-[13px] text-gray-900/40">{items.length} tools</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/tools/${t.slug}`}
                      className="group rounded-2xl border border-gray-100 bg-white p-6 hover:border-[#66CC8A]/40 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#66CC8A]/15 flex items-center justify-center mb-4 text-[#3D8054]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <h3 className="text-[16px] font-semibold text-gray-900 group-hover:text-[#3D8054] transition-colors">
                        {t.name}
                      </h3>
                      <p className="mt-2 text-[14px] text-gray-900/50 leading-relaxed">
                        {t.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900">
            Get your tool <span className="font-instrument-serif italic">discovered</span>
          </h2>
          <p className="mt-4 text-[15px] text-gray-900/50 max-w-xl mx-auto">
            These free tools help you build and market. Want real distribution? Submit your AI
            tool to 100+ directories and grow your backlinks.
          </p>
          <Link
            href="/submit-ai-tool"
            className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            Submit Your AI Tool
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
