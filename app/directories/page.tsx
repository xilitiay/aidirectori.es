import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { directories, getStats } from "@/lib/directories";

export const metadata = {
  title: "AI & Startup Directories: Ranked by Live DR",
  description:
    "Compare domain rating, monthly traffic, pricing, and dofollow status for every directory we track.",
};

export default function DirectoriesPage() {
  const stats = getStats();
  const list = directories;

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">Directory Database</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          {stats.total}+{" "}
          <span className="font-instrument-serif italic">Directories,</span> Updated
          Monthly.
        </h1>
        <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-3xl">
          Compare domain rating, monthly traffic, pricing, and dofollow status for
          every directory we track.
        </p>
        <p className="mt-2 text-[14px] text-gray-900/40">
          <span className="font-semibold text-gray-900/70">{stats.free}</span> are
          free to submit to and{" "}
          <span className="font-semibold text-gray-900/70">{stats.highDr}</span> have
          a DR of 70 or higher.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            We submit for you
          </Link>
          <Link
            href="/free-ai-directories"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-colors"
          >
            Browse free directories
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900">
            {stats.total}+ Directories Tracked
          </h2>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((d) => (
            <Link
              key={d.slug}
              href={`/directories/${d.slug}`}
              className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#66CC8A]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-gray-900 truncate">
                    {d.name}
                  </div>
                  <div className="text-[12px] text-gray-900/40">{d.category}</div>
                </div>
                {d.dr != null && (
                  <div className="flex-shrink-0 text-center">
                    <div className="text-[16px] font-semibold text-[#3D8054]">
                      {d.dr}
                    </div>
                    <div className="text-[10px] text-gray-900/40">DR</div>
                  </div>
                )}
              </div>
              <p className="mt-3 text-[13px] text-gray-900/60 line-clamp-2">
                {d.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
                {d.traffic && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-900/60">
                    {d.traffic} visits/mo
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-full ${
                    d.pricing === "Free"
                      ? "bg-[#66CC8A]/15 text-[#3D8054]"
                      : "bg-gray-100 text-gray-900/60"
                  }`}
                >
                  {d.pricing}
                </span>
                {!d.verified && (
                  <span className="px-2 py-1 rounded-full bg-gray-50 text-gray-900/30">
                    est.
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
