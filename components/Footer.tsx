import Link from "next/link";
import { tools } from "@/lib/tools";

const BASE = "text-[14px] text-gray-900/50 hover:text-gray-900 transition-colors";

const altSlugs = [
  "jasper",
  "elevenlabs",
  "remini",
  "opus-clip",
  "pebblely",
  "kling-ai",
  "klap-app",
  "metavoice",
];
const known = new Set(tools.map((t) => t.slug));

const cols = [
  {
    title: "Product",
    links: [
      { href: "/directories", label: "Directories" },
      { href: "/ai-tools", label: "AI Tools" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#features", label: "Features" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/affiliates", label: "Affiliates — Earn up to $125 per sale" },
      { href: "/#faqs", label: "Influencer Program" },
      { href: "/about-us", label: "About us" },
      { href: "/#faqs", label: "Contact" },
      { href: "/directories", label: "API & MCP" },
      { href: "/directories", label: "llms.txt" },
      { href: "/directories", label: "llms-full.txt" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/tos", label: "Terms & Conditions" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    title: "AI Tools Directory",
    links: [
      { href: "/categories", label: "Browse by Categories" },
      { href: "/compare", label: "Compare AI Tools" },
      { href: "/ai-tools", label: "All AI Tools" },
    ],
  },
  {
    title: "All Directories",
    links: [
      { href: "/directories", label: "SaaS Directories" },
      { href: "/directories/category/Launch%20Platforms", label: "Launch Platforms" },
      { href: "/directories", label: "AI Directories List" },
      { href: "/free-ai-directories", label: "Free AI Directories" },
      { href: "/compare", label: "Compare Directories" },
      { href: "/pricing", label: "Submit AI Tool" },
    ],
  },
];

const trending = [
  "AI Art Generator",
  "AI Image Generator",
  "AI Writing Tools",
  "AI Chatbot",
  "Free AI Tools",
  "Best AI Tools",
];

const blogLinks = [
  "AI directory submission cost & process",
  "Top 10 best AI tool directories 2026",
  "Best directory submission service",
  "Product Hunt alternatives",
  "How to increase domain rating",
];

export default function Footer() {
  return (
    <>
      {/* bottom CTA band */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Boost your app. Submit{" "}
            <span className="font-instrument-serif italic">once.</span>
          </h2>
          <p className="mt-3 text-2xl sm:text-3xl font-medium text-gray-900">
            Grow faster.
          </p>
          <p className="mt-4 text-[15px] text-gray-900/50">
            Get listed on 100+ AI directories, build authority, and attract your next 1000
            users — starting today.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            Submit My Tool Now
          </Link>
        </div>
      </section>

      <footer className="w-full bg-[#F5F6F8] border-t border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* newsletter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-dashed border-gray-300/60">
            <p className="text-[15px] text-gray-900/60 max-w-2xl">
              We can help you launch your AI product to 100+ directories. Increase your domain
              authority and secure valuable backlinks to improve your SEO. Get started now!
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors flex-shrink-0"
            >
              Subscribe
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-[#66CC8A] rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" fill="white" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800">AI Directories</span>
              </div>
              <p className="text-[14px] text-gray-900/50 max-w-xs">
                We manually submit your AI startup to 100+ directories to boost backlinks,
                SEO, and traffic.
              </p>
            </div>

            {cols.map((c) => (
              <div key={c.title}>
                <h4 className="font-semibold text-gray-800 text-[15px] mb-3">{c.title}</h4>
                <ul className="space-y-2">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className={BASE}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* secondary link groups */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10 pt-8 border-t border-dashed border-gray-300/60">
            <div>
              <h4 className="font-semibold text-gray-800 text-[15px] mb-3">
                Popular alternatives
              </h4>
              <ul className="space-y-2">
                {altSlugs
                  .filter((s) => known.has(s))
                  .map((s) => (
                    <li key={s}>
                      <Link href={`/ai-tools/alternatives/${s}`} className={BASE}>
                        {tools.find((t) => t.slug === s)?.name ?? s} alternatives
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link href="/ai-tools" className={BASE}>
                    All alternatives
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-[15px] mb-3">Comparison</h4>
              <ul className="space-y-2">
                {[
                  "ListingBott",
                  "SubmitJuice",
                  "BoringLaunch",
                  "There's An AI For That",
                  "Toolify",
                  "Top AI Tools",
                ].map((n) => (
                  <li key={n}>
                    <Link href="/directories" className={BASE}>
                      AI Directories vs {n}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/directories" className={BASE}>
                    All comparisons
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-[15px] mb-3">
                Trending Searches
              </h4>
              <ul className="space-y-2">
                {trending.map((t) => (
                  <li key={t}>
                    <Link href="/ai-tools" className={BASE}>
                      {t}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/ai-tools" className={BASE}>
                    All searches
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 text-[15px] mb-3">Blog</h4>
              <ul className="space-y-2">
                {blogLinks.map((b) => (
                  <li key={b}>
                    <Link href="/blog" className={BASE}>
                      {b}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/blog" className={BASE}>
                    All posts
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-dashed border-gray-300/60 text-[13px] text-gray-900/40">
            © {new Date().getFullYear()} AI Directories. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
