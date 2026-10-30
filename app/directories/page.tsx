import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "AI & Startup Directories: 323+ Ranked by Live DR",
  description:
    "Compare domain rating, monthly traffic, pricing, and dofollow status for every directory we track.",
};

const directories = [
  { name: "Open Tools", cat: "AI", desc: "Explore the World's Top AI Tools List", dr: 68, traffic: "132.6K", price: "$199+", tag: "dofollow" },
  { name: "Toolfolio", cat: "AI", desc: "All the Tools You Need in one place.", dr: 37, traffic: "4.7K", price: "$99+", tag: "" },
  { name: "Flaex AI", cat: "AI", desc: "Discover the AI tools you need. Launch the ones you build.", dr: 39, traffic: "12.8K", price: "$9+", tag: "Freemium" },
  { name: "PeerPush", cat: "Launch Platforms", desc: "Explore inspiring products. Launch to people who care. Rise together.", dr: 78, traffic: "269.2K", price: "$30+", tag: "" },
  { name: "ListMySaaS", cat: "SaaS", desc: "Discover the Best SaaS Tools", dr: 53, traffic: "2K", price: "$14+", tag: "" },
  { name: "Launch Llama", cat: "Launch Platforms", desc: "Free Startup Launch Platform", dr: null, traffic: "13K", price: "Free", tag: "" },
  { name: "LaunchIt", cat: "Launch Platforms", desc: "Launch Faster. Grow Smarter.", dr: 59, traffic: "", price: "$14.99+", tag: "" },
  { name: "Uneed Best", cat: "Launch Platforms", desc: "Social Launchpad for tech products: get guaranteed homepage visibility, powerful SEO juice with a 76 DR backlink.", dr: 76, traffic: "202.4K", price: "$29+", tag: "" },
  { name: "SaaSCity", cat: "SaaS", desc: "Discover & launch the best SaaS & AI tools", dr: 70, traffic: "60.2K", price: "$19.99+", tag: "" },
  { name: "Reddit", cat: "Business & Finance", desc: "Dive into communities that share your interests", dr: 95, traffic: "3826.4M", price: "", tag: "" },
  { name: "Medium", cat: "Education", desc: "Medium: Read and write stories.", dr: 94, traffic: "57.8M", price: "", tag: "" },
  { name: "Source Forge", cat: "Software", desc: "The Complete Software Platform", dr: 93, traffic: "21.8M", price: "", tag: "" },
  { name: "AI Infinity", cat: "AI Tools Directory", desc: "AI Tools Directory", dr: 92, traffic: "148", price: "", tag: "" },
  { name: "Hacker News", cat: "Technology", desc: "Hacker News", dr: 91, traffic: "57.1M", price: "", tag: "" },
  { name: "Product Hunt", cat: "Launch Platforms", desc: "Discover and launch the latest products, apps, and startups.", dr: null, traffic: "6.1M", price: "", tag: "" },
  { name: "Crunchbase", cat: "Business & Finance", desc: "Make better decisions, faster", dr: null, traffic: "2.9M", price: "$49+", tag: "" },
  { name: "G2", cat: "Software", desc: "Business Software and Services Reviews", dr: null, traffic: "2.1M", price: "", tag: "" },
  { name: "Capterra", cat: "Software", desc: "Find the right software", dr: null, traffic: "1.7M", price: "", tag: "" },
  { name: "DevPost", cat: "Development", desc: "Explore projects from Portfolios and hackathons", dr: 88, traffic: "", price: "", tag: "" },
  { name: "FinancesOnline", cat: "Business & Finance", desc: "FinancesOnline Research Center", dr: 87, traffic: "8.8K", price: "", tag: "" },
  { name: "Fazier", cat: "Launch Platforms", desc: "Find your next favourite product, every day.", dr: 84, traffic: "76.1K", price: "", tag: "" },
  { name: "Twelve Tools", cat: "AI", desc: "The 12 best tools on the internet, served every day.", dr: null, traffic: "60.5K", price: "$36+", tag: "" },
  { name: "AppSumo", cat: "Software", desc: "AppSumo - Discover products. Stay weird.", dr: 83, traffic: "1.3M", price: "", tag: "" },
];

export default function DirectoriesPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-[13px] text-gray-900/40 mb-6">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900/70">Directory Database</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900">
          323+ <span className="font-instrument-serif italic">Directories,</span> Updated Monthly.
        </h1>
        <p className="mt-4 text-[15px] sm:text-[16px] text-gray-900/50 max-w-3xl">
          Compare domain rating, monthly traffic, pricing, and dofollow status for every
          directory we track.
        </p>
        <p className="mt-2 text-[14px] text-gray-900/40">
          <span className="font-semibold text-gray-900/70">165</span> are free to submit to and{" "}
          <span className="font-semibold text-gray-900/70">74</span> have a DR of 70 or higher.
        </p>
        <p className="mt-1 text-[13px] text-gray-900/35">Data last refreshed October 2026</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-white bg-[#66CC8A] hover:bg-[#54AF74] rounded-full transition-colors"
          >
            We submit for you
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-semibold text-gray-800 bg-white border border-gray-200 hover:bg-gray-50 rounded-full transition-colors"
          >
            Check your DR
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-[18px] font-semibold text-gray-900">323+ Directories Tracked</h2>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {directories.map((d) => (
            <div
              key={d.name}
              className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-[#66CC8A]/40 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-gray-900 truncate">{d.name}</div>
                  <div className="text-[12px] text-gray-900/40">{d.cat}</div>
                </div>
                {d.dr != null && (
                  <div className="flex-shrink-0 text-center">
                    <div className="text-[16px] font-semibold text-[#3D8054]">{d.dr}</div>
                    <div className="text-[10px] text-gray-900/40">DR</div>
                  </div>
                )}
              </div>
              <p className="mt-3 text-[13px] text-gray-900/60 line-clamp-2">{d.desc}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
                {d.traffic && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-900/60">
                    {d.traffic} visits/mo
                  </span>
                )}
                {d.price && (
                  <span className="px-2 py-1 rounded-full bg-[#66CC8A]/15 text-[#3D8054]">
                    {d.price}
                  </span>
                )}
                {d.tag && (
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-900/50">
                    {d.tag}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
