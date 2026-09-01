import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolExplorer from "@/components/ToolExplorer";
import { tools } from "@/lib/tools";

export const metadata = { title: "独立站 | 外贸独立站导航" };

export default function AIToolsPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          精选<span className="font-instrument-serif italic"> 外贸独立站</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50 max-w-2xl">
          发现经过精选的外贸独立站，覆盖 DTC 品牌站与 B2B 出海站点。
        </p>
        <ToolExplorer tools={tools} />
      </div>
      <Footer />
    </main>
  );
}
