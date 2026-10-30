import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Pricing from "@/components/sections/Pricing";

export const metadata = { title: "Pricing | AI Directories" };

export default function PricingPage() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <div className="pt-12">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
