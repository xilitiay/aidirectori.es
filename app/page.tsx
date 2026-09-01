import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedMarquee from "@/components/FeaturedMarquee";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import PopularCategories from "@/components/sections/PopularCategories";
import LatestBlog from "@/components/sections/LatestBlog";

export default function Home() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedMarquee />
      <HowItWorks />
      <Features />
      <PopularCategories />
      <Pricing />
      <Testimonials />
      <LatestBlog />
      <Footer />
    </main>
  );
}
