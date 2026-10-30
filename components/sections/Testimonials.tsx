const testimonials = [
  {
    quote:
      "I think it's cheap where less than a week in to having the submissions complete traffic is up and back links are up",
    name: "Lilybank AI",
    role: "@lilybankai",
  },
  {
    quote:
      "Suddenly getting 10+ signups a day to @TypePrompt I attribute it to @s_chiriac listing the platform on over 60 AI directories through his productised service 👏",
    name: "Travis Street",
    role: "@travisstreet_",
  },
  {
    quote:
      "I have used it personally to find high-quality directories to register my startup. Great initiative!!",
    name: "imri",
    role: "@imri",
  },
  {
    quote:
      "Someone had to do it, and I have to say it's beautifully done. A ton of help when you're launching and need to spread the word about your product! Great work Sergiu 🔥",
    name: "Dan Mindru",
    role: "@dan_mindru",
  },
  {
    quote:
      "With all the AI directories it's honestly impossible to keep up with. Sergiu does a good job polishing his list. Good luck!",
    name: "Nic Polotnianko",
    role: "@polnikale",
  },
  {
    quote:
      "One of the most important place to visit once you launch your product. AI directories has all the possible directories where you can list your product and market it.",
    name: "Manoj Ahirwar",
    role: "@manoj_ahirwar",
  },
];

function initials(name: string) {
  return name.slice(0, 1);
}

export default function Testimonials() {
  return (
    <div id="testimonials" className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            1000+ founders already{" "}
            <span className="font-instrument-serif italic">growing with us.</span>
          </h2>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50">
            Don&apos;t take our word for it — here&apos;s what real founders say.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-gray-100 bg-[#F5F6F8] p-7">
              <p className="text-[15px] text-gray-900/70 leading-relaxed">“{t.quote}”</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#66CC8A]/20 text-[#3D8054] flex items-center justify-center font-semibold">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">{t.name}</div>
                  <div className="text-[13px] text-gray-900/50">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
