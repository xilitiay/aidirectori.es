import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedMarquee from "@/components/FeaturedMarquee";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import StrategicFeatures from "@/components/sections/StrategicFeatures";
import FeaturedTools from "@/components/sections/FeaturedTools";
import MeetCreator from "@/components/sections/MeetCreator";
import Demo from "@/components/sections/Demo";
import Results from "@/components/sections/Results";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Faqs from "@/components/sections/Faqs";
import LatestBlog from "@/components/sections/LatestBlog";

export default function Home() {
  return (
    <main className="bg-[#F5F6F8] min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedMarquee />
      <Features />
      <HowItWorks />
      <StrategicFeatures />
      <FeaturedTools />
      <MeetCreator />
      <Demo />
      <Results />
      <Pricing />
      <Testimonials />
      <Faqs />
      <LatestBlog />
      <Footer />
    </main>
  );
}
