import Image from "next/image.js";
import { Button } from "../ui/Button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="gen-section hero-section flex items-start md:items-center">
      <div className="stripe"></div>

      <div className="wrapper">
        <div className="divider">
          <div className="hero-message max-w-[500px] flex flex-col gap-8">
            <p>Neque porro quisquam est qui dolorem ipsum quia</p>

            <div>
              {" "}
              <h1 className="mb-3">Fly Higher, Every Step!</h1>
              <p>
                Step into the legend. Own the court, own the streets. Wear the
                legacy. Play the future.
              </p>
            </div>
            <div className="msg-buttons flex flex-col gap-8 lg:flex-row">
              <Button variant="accent" size="lg">
                <Link href="/">Buy Now</Link>
              </Button>
              <Button variant="default" size="lg">
                <Link href="/">See all models</Link>
              </Button>
            </div>
          </div>
          <Image
            src="/jordan6-retro_reflections-of-a-champion_silver.png"
            width={900}
            height={900}
            sizes="(max-width: 768px) 100vw, (max-width: 900px) 50vw, 33vw"
            alt="jordan 6 retro reflections of a champion model"
            className="-rotate-[33deg] drop-shadow-[20px_20px_10px_rgba(0,0,0,0.7)] -translate-x-10"
          />
        </div>
      </div>
    </section>
  );
}
