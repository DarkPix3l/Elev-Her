import Navbar from "@/components/ui/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import ProductSection from "@/components/sections/ProductSection";
import ExploreSection from "@/components/sections/ExploreSection";
import Footer from "@/components/sections/Footer";
import WhyChooseUsSection from "@/components/sections/WhyChooseUs";
import HeroProductContainer from "@/components/sections/HeroProductContainer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroProductContainer/>
      <ExploreSection />
      <WhyChooseUsSection />
      <Footer />
    </main>
  );
}
