import Link from "next/link";

const tiers = [
  {
    name: "Starter List",
    price: "$149",
    old: "$99",
    desc: "For early-stage founders testing the waters.",
    note: "Does not include paid directories",
    features: [
      "Manual submission to 30+ AI Directories",
      "Medium DR free directories only",
      "Save 20+ hours",
      "Detailed report",
      "Boost SEO & traffic",
      "Listed on AI Directories Tools",
      "Curated paid list access",
      "1 Newsletter Mentions",
    ],
    highlighted: false,
  },
  {
    name: "Pro List",
    price: "$199",
    old: null,
    desc: "For growing startups looking to scale their visibility & reach new audiences.",
    note: "Includes ~$59 in paid directory fees",
    features: [
      "Manual submission to 60+ AI Directories",
      "Only high-DR free and paid directories",
      "Save 40+ hours",
      "Advanced report",
      "SEO boost & brand reach",
    ],
    highlighted: true,
  },
  {
    name: "Premium List",
    price: "$249",
    old: null,
    desc: "For ambitious founders who want maximum exposure.",
    note: "Includes ~$173 in paid directory fees",
    features: [
      "Manual submission to 100+ AI Directories",
      "Save 70+ hours",
      "Ultimate report",
      "Maximum SEO & brand exposure",
    ],
    highlighted: false,
  },
  {
    name: "Ultimate",
    price: "Custom quote",
    old: null,
    desc: "Everything in Premium List, plus paid-directory placements—scoped and quoted for your budget.",
    note: "Pricing is tailored to your budget—we'll confirm scope on a call.",
    features: [
      "We build a custom package after a short call so pricing matches your goals and spend.",
      "Submission to specific paid directories",
      "~$173+ in paid listing value (custom scope)",
      "Use of your own directory accounts when requested",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div id="pricing" className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Simple, <span className="font-instrument-serif italic">one-time plans.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            No subscriptions. Choose the submission plan that fits your startup stage.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-7 ${
                t.highlighted
                  ? "border-[#66CC8A] bg-white shadow-lg ring-1 ring-[#66CC8A]/30"
                  : "border-gray-100 bg-white"
              }`}
            >
              {t.highlighted && (
                <span className="inline-block mb-3 px-3 py-1 text-[12px] font-semibold text-white bg-[#66CC8A] rounded-full">
                  POPULAR
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
              <p className="mt-2 text-[13px] text-gray-900/50 min-h-[40px]">{t.desc}</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-4xl font-medium text-gray-900">{t.price}</span>
                {t.old && (
                  <span className="text-[16px] text-gray-900/30 line-through mb-1">
                    {t.old}
                  </span>
                )}
              </div>
              <p className="mt-2 text-[13px] text-gray-900/40">{t.note}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[13px] text-gray-900/70">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 text-[#3D8054] flex-shrink-0">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signin"
                className={`mt-8 block text-center py-3 rounded-full font-semibold text-[14px] transition-colors ${
                  t.highlighted
                    ? "bg-[#66CC8A] text-white hover:bg-[#54AF74]"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {t.name === "Ultimate" ? "Book a call" : "Get Started"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
