import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFreeDirectories, getStats } from "@/lib/directories";

export const metadata = {
  title: "Free AI Directories to Submit Your Tool",
  description:
    "A curated list of free AI & startup directories you can submit your tool to and build backlinks without paying.",
};

export default function FreeDirectoriesPage() {
  const free = getFreeDirectories();
  const stats = getStats();

  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/directories" className="hover:text-gray-900">
            Directories
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">Free AI Directories</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          {free.length} <span className="font-instrument-serif italic">Free</span>{" "}
          Directories
        </h1>
        <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-3xl">
          Submit your AI tool to these free directories and start building backlinks
          at zero cost. Of {stats.total}+ tracked directories, {free.length} are free
          to submit to.
        </p>

        <div className="mt-6">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            Or let us submit everywhere
          </Link>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {free.map((d) => (
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
                  <div className="text-center flex-shrink-0">
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
              <div className="mt-4">
                <span className="px-2 py-1 rounded-full bg-[#66CC8A]/15 text-[#3D8054] text-[12px]">
                  Free
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
