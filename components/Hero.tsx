import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 relative">
        <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#66CC8A]/15 border border-[#66CC8A]/30 rounded-full">
            <span className="text-[14px] sm:text-[15px] font-medium text-[#3D8054]">
              800+ startups promoted
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-gray-900 leading-[1.05]">
            Get Your AI Startup Discovered
            <span className="font-instrument-serif italic"> Everywhere.</span>
          </h1>

          <p className="text-[15px] sm:text-[16px] md:text-[18px] text-gray-900/50 max-w-2xl mx-auto leading-relaxed">
            We manually submit your startup to 100+ directories, boosting{" "}
            <span className="font-medium text-gray-900/80">backlinks</span>,{" "}
            <span className="font-medium text-gray-900/80">SEO</span>, and{" "}
            <span className="font-medium text-gray-900/80">traffic</span>
          </p>

          <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 pt-2">
            <Link
              href="/#how-it-works"
              className="w-auto inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-gray-800 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              See How It Works
            </Link>
            <Link
              href="/pricing"
              className="w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
            >
              Get AI Directories
            </Link>
          </div>

          <div className="pt-4">
            <div className="flex flex-col justify-center gap-1 items-center">
              <div className="text-base text-gray-900/60 text-center">
                Trusted by{" "}
                <span className="font-semibold text-base-content">1000+</span>{" "}
                founders
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 sm:mt-[20px] md:mt-[30px] lg:mt-[40px] relative z-0">
          <div className="flex items-center justify-center">
            <div className="w-[130%] sm:w-[110%] h-[380px] sm:h-[480px] rounded-2xl relative overflow-hidden">
              <div className="w-full h-full min-h-[380px] bg-gradient-to-b from-gray-100/60 to-[#F5F6F8] rounded-2xl" />
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none rounded-b-2xl"
                style={{
                  background:
                    "linear-gradient(rgba(248, 248, 248, 0) 0%, rgb(245 246 248) 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
