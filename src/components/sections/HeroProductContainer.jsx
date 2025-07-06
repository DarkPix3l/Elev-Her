import React from "react";
import HeroSection from "./HeroSection";
import ProductSection from "./ProductSection";

export default function HeroProductContainer() {
  return (
    <>
      {/* I've scoped the background stripes to this container (Hero + Product)
  to avoid unintended layout effects on other pages like Dashboard. */}
      <div className="z-0 w-screen grid grid-rows-2 absolute">
        <div className="w-full h-full overflow-clip">
          <div className="stripe"></div>
        </div>

        <div className="w-full">
          <div className="Mask w-full h-[200%] absolute overflow-hidden ">
            <div className="stripe-inv"></div>
          </div>
        </div>
      </div>
      <HeroSection />
      <ProductSection />
    </>
  );
}
