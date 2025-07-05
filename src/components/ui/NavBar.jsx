"use client";

import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "./Button.jsx";
import Style from "./NavBar.module.css";
import { useState } from "react";
import { CardDemo } from "./CardDemo.jsx";
import Hmenu from "./Hmenu.jsx";
import { useSidenav } from "@/hooks/useSidenav.js";
import { useAuthModalStore } from "@/store/authModalStore.js";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"

export default function Navbar() {
 const { data: session, status } = useSession()
console.log({session, status});

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const { openModal, closeModal } = useAuthModalStore();

  const {
    isOpen: isSidenavOpen,
    toggleSidenav,
    closeSidenav: closeHmenu,
    sidenavRef,
    triggerRef,
  } = useSidenav();

  const router = useRouter();

  const handleAuthSuccess = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    closeModal();
    router.push("/dashboard");
  };

  const currentPage = "some-page";

  return (
    <div className="navbar bg-[var(--navbar-bg)] p-2 shadow-[var(--shadow-custom)] z-10 fixed w-full">
      <div className="wrapper flex justify-between">
        <p className={Style.logo}>ElevHer</p>
        <nav className="flex w-fit text-foreground gap-5 items-center">
          <CiGlobe size={20} />
          <IoCartOutline size={20} />
          <span>|</span>
          {!isAuthenticated && (
            <>
              <Link href="/">Register</Link>
              <Button variant="accent" size="sm" onClick={openModal}>
                Login
              </Button>
            </>
          )}
          {isAuthenticated && <span className="ml-2">Welcome, {userName}</span>}
          <div
            className="cursor-pointer"
            onClick={toggleSidenav}
            ref={triggerRef}
          >
            <GiHamburgerMenu size={25} className="show cursor-pointer" />
          </div>
        </nav>
      </div>

      <CardDemo onAuthSuccess={handleAuthSuccess} />

      <Hmenu
        page={currentPage}
        isOpen={isSidenavOpen}
        sidenavRef={sidenavRef}
        closeSidenav={closeHmenu}
      />
    </div>
  );
}
