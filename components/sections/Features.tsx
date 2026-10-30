const features = [
  {
    title: "100+ Directories, One Submission",
    desc: "Submit once. We'll handle manual submissions across all top AI directories.",
  },
  {
    title: "High-Authority Backlinks",
    desc: "Build links from trusted, high-DR platforms that Google loves.",
  },
  {
    title: "Reach Active AI Enthusiasts",
    desc: "Get discovered by early adopters, creators, and founders looking for new tools.",
  },
  {
    title: "Attract Real Users, Effortlessly",
    desc: "Get your tool listed within days and start attracting real users faster than organic SEO alone.",
  },
  {
    title: "Detailed Submission Report",
    desc: "Receive a full, transparent report of every site your tool appears on.",
  },
];

export default function Features() {
  return (
    <div id="features" className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Why Founders <span className="font-instrument-serif italic">love us</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            Built for founders who want visibility without the{" "}
            <span className="font-medium text-gray-900/80">Busy work</span>
          </p>
          <p className="mt-2 text-[14px] text-gray-900/40">
            From SEO to reach, every submission helps your startup grow smarter.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-100 bg-[#F5F6F8] p-7 hover:border-[#66CC8A]/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#66CC8A]/15 flex items-center justify-center mb-4">
                <div className="w-4 h-4 rounded-full bg-[#66CC8A]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-[14px] text-gray-900/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
