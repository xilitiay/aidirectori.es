const steps = [
  {
    n: "01",
    title: "Choose plan",
    desc: "Pick the submission package that matches your stage and goals.",
  },
  {
    n: "02",
    title: "Submit your details",
    desc: "Share your tool URL, assets, and listing info — once, in the dashboard.",
  },
  {
    n: "03",
    title: "Manual submission",
    desc: "Our team submits your tool across 100+ high-DR directories by hand.",
  },
  {
    n: "04",
    title: "Receive report",
    desc: "Get a clear report with links and status for every listing we submit.",
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="w-full bg-[#F5F6F8] py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            How it <span className="font-instrument-serif italic">works</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            Four clear steps from plan to proof — we handle the directory grind so you
            can focus on building.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-md transition-shadow"
            >
              <div className="text-[#3D8054] font-instrument-serif italic text-3xl mb-4">
                {s.n}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-[15px] text-gray-900/50 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
