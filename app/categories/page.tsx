import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getCategories } from "@/lib/tools";

export const metadata = { title: "Categories | AI Directories" };

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          Browse by <span className="font-instrument-serif italic">category</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50 max-w-2xl">
          {categories.reduce((s, c) => s + c.count, 0)} AI tools across{" "}
          {categories.length} categories.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={`/categories/${encodeURIComponent(c.name)}`}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#66CC8A]/40 transition-colors"
            >
              <span className="font-medium text-gray-900">{c.name}</span>
              <span className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full">
                {c.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
