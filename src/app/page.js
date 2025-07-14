import Navbar from "@/components/ui/NavBar";
import ExploreSection from "@/components/sections/ExploreSection";
import Footer from "@/components/sections/Footer";
import WhyChooseUsSection from "@/components/sections/WhyChooseUs";
import HeroProductContainer from "@/components/sections/HeroProductContainer";
import Back2Top from "@/components/ui/Back2Top";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Back2Top />
      <HeroProductContainer/>
      <ExploreSection />
      <WhyChooseUsSection />
      <Footer />
    </main>
  );
}
