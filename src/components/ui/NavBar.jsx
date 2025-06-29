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
import { useSidenav } from '@/hooks/useSidenav.js';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const { isOpen, toggleSidenav, closeSidenav, sidenavRef, triggerRef } = useSidenav();

  const handleAuthSuccess = (name) => {
    setIsAuthenticated(true);
    setUserName(name);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
              <Button variant="accent" size="sm" onClick={() => setIsModalOpen(true)}>
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

      {/* Show login/register modal */}
      {!isAuthenticated && (
       
          <CardDemo
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAuthSuccess={handleAuthSuccess}
          />
        
      )}

      {/* Render the Hmenu (Sidenav) component, passing the necessary props from the hook */}
      <Hmenu
        page={currentPage}
        isOpen={isOpen}
        sidenavRef={sidenavRef}
        closeSidenav={closeSidenav}
      />
    </div>
  );
}
