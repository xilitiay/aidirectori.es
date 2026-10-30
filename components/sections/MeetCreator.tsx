export default function MeetCreator() {
  return (
    <div id="meet-creators" className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Meet the <span className="font-instrument-serif italic">creator</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl border border-gray-100 bg-[#F5F6F8] p-8">
            <p className="text-[17px] sm:text-[19px] text-gray-900/80 leading-relaxed">
              Hi, <span className="font-medium">I&apos;m Sergiu</span> - the maker behind AI
              Directories.
            </p>
            <p className="mt-4 text-[15px] text-gray-900/50 leading-relaxed">
              I built this tool because I was tired of spending days submitting to
              directories instead of shipping new features.
            </p>
            <div className="mt-5 text-[13px] font-semibold text-[#3D8054]">
              CEO &amp; Founder
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                My Journey to AI Directories
              </h3>
              <p className="mt-3 text-[15px] text-gray-900/60 leading-relaxed">
                In 2023, I embarked on an indie hacking adventure, building several AI Tools
                and transforming my side projects into startups. Along this journey, I faced
                numerous challenges, particularly in marketing.
              </p>
              <p className="mt-3 text-[15px] text-gray-900/60 leading-relaxed">
                I realized the importance of increasing traffic, SEO, and having online
                visibility. One effective strategy was to submit my tools to a variety of AI
                directories. This led me to create AI Directories to help others{" "}
                <span className="font-medium text-gray-900/80">save time</span>, build{" "}
                <span className="font-medium text-gray-900/80">grow visibility fast</span>
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Is AI Directories Impact?
              </h3>
              <p className="mt-3 text-[15px] text-gray-900/60 leading-relaxed">
                Since launching, AI Directories has helped hundreds of startups get
                discovered across 100+ directories, building high-authority backlinks and
                boosting their SEO rankings. We&apos;ve saved founders countless hours while
                helping them reach their target audience faster.
              </p>
            </div>

            <a
              href="https://x.com/ai_directories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
            >
              Follow My Journey on X
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
