import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Submit Your AI Tool for Free | AI Directories",
  description:
    "Submit your AI tool to AI Directories. We automatically extract information from your website and let you customize the listing — free.",
};

const extractItems = [
  { icon: "✶", label: "Tool name and tagline" },
  { icon: "✦", label: "Description and features" },
  { icon: "↗", label: "Website and social media links" },
  { icon: "$", label: "Pricing information" },
  { icon: "▣", label: "Screenshots and media" },
];

const steps = [
  {
    n: "1",
    title: "Paste your URL",
    desc: "Enter your AI tool's website. We pull the name, description, pricing and screenshots from the page.",
  },
  {
    n: "2",
    title: "Review the details",
    desc: "Edit the name, description, category, pricing and screenshots before anything is published.",
  },
  {
    n: "3",
    title: "Submit the listing",
    desc: "Publish your tool to the AI Directories catalog. The listing itself is free.",
  },
];

const faqs = [
  {
    q: "How much does it cost to list my tool?",
    a: "Submitting and publishing a listing in the AI Directories catalog is completely free. Paid plans are only for our manual submission service across 100+ external directories.",
  },
  {
    q: "How long until my listing goes live?",
    a: "Most listings are ready in a few minutes. After you paste your URL and review the details, your catalog entry can be published right away.",
  },
  {
    q: "Do you submit my tool to other directories too?",
    a: "The free catalog listing is self-serve. If you want us to manually submit your startup to 100+ high-authority AI directories and build backlinks, choose a plan on our pricing page.",
  },
];

export default function SubmitAiToolPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
            Submit your <span className="font-instrument-serif italic">AI Tool</span> for Free
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-2xl mx-auto">
            Help us discover and catalog amazing AI tools. We&apos;ll automatically extract
            information from the website and let you customize it.
          </p>

          {/* presentational submit form */}
          <form
            className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-xl mx-auto"
            action="/pricing"
          >
            <input
              type="url"
              name="url"
              placeholder="https://your-ai-tool.com"
              className="w-full h-12 px-4 rounded-full border border-gray-200 bg-white text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#66CC8A]/40"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center px-7 text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors flex-shrink-0"
            >
              Continue
            </button>
          </form>
          <p className="mt-3 text-[13px] text-gray-900/40">
            No account required to publish a free catalog listing.
          </p>
        </div>
      </section>

      {/* What we'll extract */}
      <section className="w-full bg-[#F5F6F8] py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">
              What we&apos;ll <span className="font-instrument-serif italic">extract</span>
            </h2>
            <p className="mt-3 text-[15px] text-gray-900/50">
              Enter the AI tool website — we&apos;ll automatically extract information from the
              page to help you fill out the form.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extractItems.map((it) => (
              <div
                key={it.label}
                className="rounded-2xl border border-gray-100 bg-white p-6 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#66CC8A]/15 flex items-center justify-center text-[#3D8054] font-semibold flex-shrink-0">
                  {it.icon}
                </div>
                <span className="text-[15px] text-gray-800">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-900">
              How to submit your AI tool
            </h2>
            <p className="mt-3 text-[15px] text-gray-900/50">
              Three steps. Most listings are ready in a few minutes.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-gray-100 bg-[#F5F6F8] p-7"
              >
                <div className="w-10 h-10 rounded-full bg-[#66CC8A] text-white font-semibold flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-[14px] text-gray-900/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full bg-[#F5F6F8] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="text-[16px] font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-[14px] text-gray-900/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900">
            Want submissions to 100+ directories?
          </h2>
          <p className="mt-4 text-[15px] text-gray-900/50 max-w-xl mx-auto">
            Publish a free listing above, or let us manually submit your startup to 100+
            high-authority AI directories and build backlinks for you.
          </p>
          <Link
            href="/pricing"
            className="mt-8 inline-flex items-center justify-center px-7 py-3 text-[15px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            View Submission Plans
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
