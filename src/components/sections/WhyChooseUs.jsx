import Image from "next/image";
import Style from "./WhyChooseUs.module.css"

export default function WhyChooseUsSection() {
  return (
    <section className={Style.why_choose_us}>
      {" "}
      <div className="wrapper py-16">
        <div className="w-full grid grid-cols-6 gap-2 h-[550px]">
          {" "}
          <div className="col-span-2 row-span-2 p-8">
            {" "}
            <h2 className="">
              WHY CHOOSE{" "}
              
                <span className="text-[#E74694] text-7xl "> US</span>
              
            </h2>
            <p className="text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* Image: edge */}
          <div className="col-span-1 row-span-2 col-start-4 overflow-hidden shadow-lg">
            {" "}
            <Image
              src="/why_choose_us/edge-3528319_1920.jpg"
              alt="Person's legs"
              width={1920}
              height={1280}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Image: lots of shoes */}
          <div className="col-span-2 row-span-2 col-start-5 overflow-hidden shadow-lg">
            {" "}
            <Image
              src="/why_choose_us/school-aden-2284257_1920.jpg"
              alt="Shoes on shelf"
              width={1920}
              height={1280}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Image: Sneakers on street*/}
          <div className="col-span-2 row-span-2 col-start-2 col-end-5 overflow-hidden shadow-lg">
            <Image
              src="/why_choose_us/nike-5126389_1280.jpg"
              alt="Sneakers on street"
              width={1280}
              height={853}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
            />
          </div>
          {/* Image: Kitty cat */}
          <div className="col-span-1 row-span-1 col-start-5 overflow-hidden shadow-lg">
            <Image
              src="/why_choose_us/cat-2083492_1920.jpg"
              alt="Cat"
              width={1920}
              height={1280}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
