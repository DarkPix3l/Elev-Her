import Image from 'next/image';
import Style from './WhyChooseUs.module.css';

export default function WhyChooseUsSection() {
  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <section id="choose-us" className={Style.why_choose_us}>
      <div className="wrapper">
        <div className="w-full flex flex-col md:grid md:grid-cols-6 gap-2 md:h-[550px]">
          <div
            className={`${Style.whyChooseUs_message} md:col-span-7 md:p-8 py-8 lg:col-span-3 lg:row-span-2 `}
          >
            <h2 className="font-extrabold text-white text-3xl xl:text-6xl">
              WHY CHOOSE<span className="text-[#ff7c8e] text-6xl lg:text-8xl block"> US</span>
            </h2>
            <p className="text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          {/* Image: edge */}
          <div className="col-span-1 row-span-1 col-start-4 md:col-span-2 md:col-start-3 lg:col-span-1 lg:row-span-2 overflow-hidden shadow-lg z-1">
            <Image
              src={`${baseURL}why-choose-us/edge-3528319_1920.jpg`}
              alt="Person's legs"
              width={1920}
              height={1280}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Image: lots of shoes */}
          <div className="col-span-2 row-span-2 md:col-start-5 overflow-hidden shadow-lg z-1">
            {' '}
            <Image
              src={`${baseURL}why-choose-us/school-aden-2284257_1920.jpg`}
              alt="Shoes on shelf"
              width={1920}
              height={1280}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          {/* Image: Sneakers on street*/}
          <div className="col-span-2 row-span-2 md:col-span-4 col-start-2 md:col-end-5 overflow-hidden shadow-lg z-1">
            <Image
              src={`${baseURL}why-choose-us/nike-5126389_1280.jpg`}
              alt="Sneakers on street"
              width={1280}
              height={853}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw"
            />
          </div>
          {/* Image: Kitty cat */}
          <div className="col-span-1 row-span-1  md:row-span-1 col-start-5 overflow-hidden shadow-lg z-1">
            <Image
              src={`${baseURL}why-choose-us/cat-2083492_1920.jpg`}
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
