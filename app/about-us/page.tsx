import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | AI Directories — Mission & Founder Story",
  description:
    "Meet Sergiu, the maker behind AI Directories — and learn why we help founders get discovered across 100+ AI directories.",
};

const stats = [
  { value: "100+", label: "AI directories" },
  { value: "Hundreds", label: "startups discovered" },
  { value: "48 hrs", label: "to first listings" },
  { value: "Thousands", label: "hours saved" },
];

export default function AboutUsPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Hi, I&apos;m <span className="font-instrument-serif italic">Sergiu</span> — the maker
            behind AI Directories
          </h1>
          <p className="mt-5 text-[15px] sm:text-[16px] text-gray-900/60 max-w-2xl mx-auto leading-relaxed">
            I built this tool because I was tired of spending days submitting to directories
            instead of shipping new features.
          </p>
          <div className="mt-4 text-[13px] font-semibold text-[#3D8054]">CEO &amp; Founder</div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full bg-[#F5F6F8] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 text-center"
              >
                <div className="text-2xl sm:text-3xl font-semibold text-gray-900">
                  {s.value}
                </div>
                <div className="mt-1 text-[13px] text-gray-900/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              My Journey to AI Directories
            </h2>
            <p className="mt-4 text-[15px] text-gray-900/60 leading-relaxed">
              In 2023, I embarked on an indie hacking adventure, building several AI Tools and
              transforming my side projects into startups. Along this journey, I faced numerous
              challenges, particularly in marketing.
            </p>
            <p className="mt-3 text-[15px] text-gray-900/60 leading-relaxed">
              I realized the importance of increasing traffic, SEO, and having online visibility.
              One effective strategy was to submit my tools to a variety of AI directories. This
              led me to create AI Directories to help others{" "}
              <span className="font-medium text-gray-900/80">save time</span>, build{" "}
              <span className="font-medium text-gray-900/80">backlinks</span>, and grow
              visibility fast.
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Is AI Directories Impact?
            </h2>
            <p className="mt-4 text-[15px] text-gray-900/60 leading-relaxed">
              Since launching, AI Directories has helped hundreds of startups get discovered
              across 100+ directories, building high-authority backlinks and boosting their SEO
              rankings. We&apos;ve saved founders countless hours while helping them reach their
              target audience faster.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://x.com/intent/follow?screen_name=s_chiriac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
            >
              Follow My Journey on X
            </a>
            <Link
              href="/submit-ai-tool"
              className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-gray-700 border border-gray-200 hover:border-gray-300 rounded-full transition-colors"
            >
              See AI Directories in Action
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#F5F6F8] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900">
            Ready to get <span className="font-instrument-serif italic">discovered</span>?
          </h2>
          <p className="mt-4 text-[15px] text-gray-900/50 max-w-xl mx-auto">
            Let us handle the submissions while you ship features. Get your AI tool listed across
            100+ directories.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            Submit My Tool
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
