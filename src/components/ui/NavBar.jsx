import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "./Button.jsx";
import Style from "./NavBar.module.css"

export default function Navbar() {
  return (
    <div className="navbar bg-[var(--navbar-bg)] p-3 shadow-[var(--shadow-custom)] z-10 fixed w-full ">
      <div className="wrapper flex justify-between">
      <p className={Style.logo}>ElevHer</p>
      <nav className="flex w-fit text-foreground gap-5 items-center">
        <CiGlobe size={25}/>
        <IoCartOutline size={25} />
        <span>|</span>
        <Link href="/">Register</Link>
        <Button variant="accent">
          <Link href="/">Login</Link>
        </Button>
        <GiHamburgerMenu size={30} className="show"/>
      </nav>
      </div>
    </div>
  );
}