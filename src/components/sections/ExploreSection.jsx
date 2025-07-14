import Image from "next/image.js";
import Style from "./ExploreSection.module.css";

export default function ExploreSection() {
  return (
    <section id="explore" className={Style.explore_section}>
      <div className={Style.nike_logo}></div>

      <div className="wrapper grid grid-rows-1 md:grid-rows-2  align-baseline">
        <Image
          src="/jordan6-retro_reflections-of-a-champion_silver.png"
          width={700}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, 33vw"
          alt="jordan 6 retro reflections of a champion model"
          className="drop-shadow-[20px_20px_10px_rgba(0,0,0,0.7)] justify-self-center  hidden md:block"
        />
        {/* product detail highlights  */}
        <div className="grid grid-cols-1 text-center justify-items-center md:text-left  lg:grid-cols-2 gap-9">

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
            <div className={Style.lens}>
              <div className={Style.productImage}></div>
            </div>

            <div className="max-w-[200px]">
              <h3 className={Style.title}>Breathable</h3>
              <p className="break-all">
                Micro-perforated panels are strategically placed to promote airflow across pressure points, improving breathability and regulating foot temperature.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14">
            <div className={Style.lens}>
              <div className={`${Style.productImage} ${Style.productImage2}`}></div>
            </div>

            <div className="max-w-[200px]">
              <h3 className={Style.title}>Heel Air Support</h3>
              <p className="break-all">
                An integrated air capsule system positioned in the heel ensures dynamic shock absorption during impact, reducing stress on joints while enhancing stride responsiveness.
              </p>
            </div>

          </div>
        </div>{" "}
        {/* griglia */}
      </div>
    </section>
  );
}
