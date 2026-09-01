import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "收录目录 | 外贸独立站导航" };

const directories = [
  { name: "Shopify", cat: "建站平台" },
  { name: "店匠 Shoplazza", cat: "建站平台" },
  { name: "Shopyy", cat: "建站平台" },
  { name: "中国制造网", cat: "B2B外贸" },
  { name: "环球资源", cat: "B2B外贸" },
  { name: "阿里国际站", cat: "B2B外贸" },
  { name: "TikTok Shop", cat: "销售渠道" },
  { name: "PayPal", cat: "支付收款" },
  { name: "PingPong", cat: "支付收款" },
  { name: "连连国际", cat: "支付收款" },
  { name: "4PX 递四方", cat: "物流仓储" },
  { name: "云途物流", cat: "物流仓储" },
  { name: "外贸独立站导航", cat: "站点导航" },
  { name: "独立站博客", cat: "学习资源" },
  { name: "Google Ads", cat: "广告投放" },
];

export default function DirectoriesPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          出海<span className="font-instrument-serif italic"> 资源目录</span>
        </h1>
        <p className="mt-4 text-[15px] text-gray-900/50 max-w-2xl">
          精选外贸独立站卖家常用的建站、B2B、支付、物流与投放资源。
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {directories.map((d) => (
            <div
              key={d.name}
              className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#66CC8A]/40 transition-colors"
            >
              <span className="font-medium text-gray-900">{d.name}</span>
              <span className="text-[12px] text-[#3D8054] bg-[#66CC8A]/15 px-2.5 py-1 rounded-full">
                {d.cat}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/ai-tools"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            浏览外贸独立站
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
