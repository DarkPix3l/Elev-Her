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
import { useSession } from "next-auth/react";
import useCartStore from "@/store/useCartStore";
import ShoppingCartPanel from "@/components/UserDashboard/ShoppingCartPanel";
import { Badge } from "@/components/ui/badge";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  //console.log({ session, status });

  const { openModal, closeModal } = useAuthModalStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, addToCart, removeFromCart, updateQuantity } =
    useCartStore();

  const {
    isOpen: isSidenavOpen,
    toggleSidenav,
    closeSidenav: closeHmenu,
    sidenavRef,
    triggerRef,
  } = useSidenav();

  const router = useRouter();

  const handleAuthSuccess = () => {
    closeModal();
    router.push("/dashboard");
  };

  const currentPage = "some-page";
  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="navbar bg-[var(--navbar-bg)] p-2 shadow-[var(--shadow-custom)] z-10 fixed w-full">
      <div className="wrapper flex justify-between">
        <Link href={"/"}>
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
              <Link href="/">Register</Link>
              <Button variant="accent" size="sm" onClick={openModal}>
                Login
              </Button>
            </>
          ) : (
            <>
              <span className="ml-2">
                Welcome, {session.user?.name || "User"}
              </span>
              <Button variant="accent" size="sm" onClick={signOut}>
                Sign out
              </Button>
              <Link href="/dashboard">Dashboard</Link>
            </>
          )}

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

      {/* Shopping Cart Panel */}
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
