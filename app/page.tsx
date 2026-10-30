import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedMarquee from "@/components/FeaturedMarquee";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import PopularCategories from "@/components/sections/PopularCategories";
import MeetCreator from "@/components/sections/MeetCreator";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import LatestBlog from "@/components/sections/LatestBlog";

export default function Home() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedMarquee />
      <Features />
      <HowItWorks />
      <PopularCategories />
      <MeetCreator />
      <Pricing />
      <Testimonials />
      <LatestBlog />
      <Footer />
    </main>
  );
}
