import { Button } from "../ui/Button";
import Link from "next/link";

export default function HeroSection() {
  const baseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return (
    <>
      <section id="hero" className="gen-section hero-section flex items-start md:items-center ">
        <div className="wrapper">
          <div className="divider">
            <div className="hero-message max-w-[500px] flex flex-col gap-8 z-1">
              <p>Neque porro quisquam est qui dolorem ipsum quia</p>

              <div>
                {" "}
                <h1 className="mb-3 lg:text-7xl">Fly Higher, Every Step!</h1>
                <p>
                  Step into the legend. Own the court, own the streets. Wear the legacy. Play the
                  future.
                </p>
              </div>
              <div className="msg-buttons flex flex-col gap-8 lg:flex-row">
                <Button variant="accent" size="lg">
                  <Link href="#products">Buy Now</Link>
                </Button>
                <Button variant="default" size="lg">
                  <Link href="#choose-us">Learn more</Link>
                </Button>
              </div>
            </div>

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className=" z-5 w-[100%] lg:w-[60%] h-auto select-none mix-blend-hard-light filter brightness-110"
            >
              <source src={`${baseURL}/silver.webm`} type="video/webm" />
            </video>
          </div>
        </div>
      </section>
    </>
  );
}
