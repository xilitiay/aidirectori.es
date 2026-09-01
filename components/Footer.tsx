import Link from "next/link";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/directories", label: "收录目录" },
      { href: "/ai-tools", label: "独立站" },
      { href: "/pricing", label: "Pricing" },
      { href: "/#features", label: "Features" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/#how-it-works", label: "How It Works" },
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/auth/signin", label: "Login" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/categories", label: "热门分类" },
      { href: "/#results", label: "Results" },
      { href: "/pricing", label: "Get Started" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F6F8] border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-[#66CC8A] rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-gray-800">外贸独立站导航</span>
            </div>
            <p className="text-[14px] text-gray-900/50 max-w-xs">
              按品类精选跨境 DTC 与 B2B 独立站，帮你快速发现合适的出海站点、品牌与供货渠道。
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold text-gray-800 text-[15px] mb-3">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-[14px] text-gray-900/50 hover:text-gray-900 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-dashed border-gray-300/60 text-[13px] text-gray-900/40">
          © {new Date().getFullYear()} 外贸独立站导航. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
