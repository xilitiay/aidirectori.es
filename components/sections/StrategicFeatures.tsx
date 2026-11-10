const items = [
  {
    title: "Growth Engine",
    desc: "Get listed where your audience already looks. We place your tool on 100+ high-traffic AI directories for maximum exposure and organic reach.",
  },
  {
    title: "SEO Powerhouse",
    desc: "Build high-authority backlinks from trusted platforms that Google loves. Boost your domain authority and search rankings effortlessly.",
  },
  {
    title: "Mention by LLMs",
    desc: "Get recommended by ChatGPT, Claude, Gemini, and more. We optimize your listings for GEO and AEO so LLMs mention your tool when users ask for solutions.",
  },
  {
    title: "Community & Visibility",
    desc: "Reach active AI enthusiasts, early adopters, creators, and founders who are actively looking for new tools like yours.",
  },
  {
    title: "Efficiency & Data",
    desc: "Get detailed submission reports and transparent analytics. Track every listing and measure your growth with comprehensive data insights.",
  },
];

export default function StrategicFeatures() {
  return (
    <section className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Strategic <span className="font-instrument-serif italic">features</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/60">
            Boost your app, scale your{" "}
            <span className="font-instrument-serif italic">Tool&apos;s</span> SEO strategy.
          </p>
          <p className="mt-2 text-[14px] text-gray-900/40">
            Crafted to help you grow faster — combining visibility, backlinks, and community
            reach into one effortless service.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-white p-7 hover:border-[#66CC8A]/40 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-[14px] text-gray-900/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
