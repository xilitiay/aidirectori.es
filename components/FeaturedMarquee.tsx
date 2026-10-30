const logos = [
  { src: "/logos/OpenAI_light.svg", alt: "OpenAI" },
  { src: "/logos/claude.svg", alt: "Claude" },
  { src: "/logos/gemini.png", alt: "Gemini" },
  { src: "/logos/google-ai.svg", alt: "Google AI" },
  { src: "/logos/Grok_light.svg", alt: "Grok" },
  { src: "/logos/perplexity.svg", alt: "Perplexity" },
];

export default function FeaturedMarquee() {
  const row = [...logos, ...logos];
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[14px] sm:text-[16px] md:text-[18px] font-medium text-gray-900/50 mb-4 sm:mb-6 md:mb-8 px-4">
          Proudly featured and supported by Directories, AI tools, partners, and the
          startup ecosystem.
        </p>
        <div className="group w-full min-w-0 cursor-default overflow-hidden">
          <div className="flex w-max max-w-none gap-0 will-change-transform animate-marquee">
            {row.map((l, i) => (
              <div
                key={i}
                className="flex shrink-0 flex-nowrap items-center gap-6 sm:gap-8 md:gap-10 pr-6 sm:pr-8 md:pr-10"
              >
                <div className="flex shrink-0 cursor-pointer flex-row items-center gap-2 sm:gap-2.5 transition-opacity duration-200 hover:opacity-70">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex shrink-0 items-center justify-center overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={l.src}
                      alt={l.alt}
                      className="block h-full w-full min-h-0 min-w-0 max-h-full max-w-full object-contain"
                    />
                  </div>
                  <span className="truncate text-[14px] font-bold text-gray-800 opacity-40 sm:text-[18px]">
                    {l.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-t border-dashed border-blue-300/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
