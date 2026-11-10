import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import CompareTools from "@/components/CompareTools";

export const metadata = {
  title: "Compare AI Tools Side by Side | AI Directories",
  description:
    "Compare AI tools by category, pricing, and rating to find the best fit for your workflow.",
};

export default function ComparePage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">Compare</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          Compare <span className="font-instrument-serif italic">AI tools</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50 max-w-2xl">
          Pick up to four tools and see how they stack up across category, pricing,
          and rating — so you can choose the right one for your stack.
        </p>

        <div className="mt-10">
          <CompareTools />
        </div>
      </div>
      <Footer />
    </main>
  );
}
