"use client";

import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiGlobe } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { Button } from "./Button.jsx";
import Style from "./NavBar.module.css";
import { useState } from "react";
import { CardDemo } from "./LoginModal.jsx";
import Hmenu from "./Hmenu.jsx";
import { useSidenav } from "@/hooks/useSidenav.js";
import { useAuthModalStore } from "@/store/authModalStore.js";
import useCartStore from "@/store/useCartStore";
import ShoppingCartPanel from "@/components/UserDashboard/ShoppingCartPanel";
import { Badge } from "@/components/ui/badge";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import SignInModal from "./SignUPModal.jsx";
import Image from "next/image.js";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { openModal } = useAuthModalStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, removeFromCart, updateQuantity } = useCartStore();

  const {
    isOpen: isSidenavOpen,
    toggleSidenav,
    closeSidenav,
    sidenavRef,
    triggerRef,
  } = useSidenav();

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const { data: session, status } = useSession();
  console.log({ session, status });

  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="navbar bg-[var(--navbar-bg)] p-2 shadow-[var(--shadow-custom)] z-10 fixed w-full">
      <div className="wrapper flex justify-center md:justify-between">
        <Link href="/" className="hide">
          <p className={Style.logo}>ElevHer</p>
        </Link>

        <nav className="flex w-fit text-foreground gap-5 items-center">
          <CiGlobe size={20} />

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <IoCartOutline className="h-4 w-4" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartItemsCount}
              </Badge>
            )}
          </Button>

          <span>|</span>

          {!session ? (
            <>
              <SignInModal />

              <Button variant="accent" size="sm" onClick={openModal}>
                Login
              </Button>
            </>
          ) : (
            <>
              <span className="ml-2 hide">
                Welcome, {session.user?.name || "User"}
              </span>

              {session.user.avatar && (
                <Image
                  src={session.user.avatar}
                  alt={session.user.name || "Avatar"}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}
              <Button variant="accent" size="sm" onClick={signOut}>
                Sign out
              </Button>
            </>
          )}
          {/* Hamburger menu */}
          <div
            className="cursor-pointer"
            onClick={toggleSidenav}
            ref={triggerRef}
          >
            {!isDashboard && (
              <GiHamburgerMenu size={25} className="hide cursor-pointer" />
            )}
          </div>
        </nav>
      </div>

      <CardDemo />

      <Hmenu
        page="some-page"
        isOpen={isSidenavOpen}
        sidenavRef={sidenavRef}
        closeSidenav={closeSidenav}
      />

      <ShoppingCartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
