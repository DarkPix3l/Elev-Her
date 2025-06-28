import Navbar from "@/components/ui/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import ExploreSection from "@/components/sections/ExploreSection";
import Footer from "@/components/sections/Footer";
import WhyChooseUsSection from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProductSection />
      <ExploreSection />
      <WhyChooseUsSection />
      <Footer />
    </main>
  );
}
