import Link from "next/link";

export default function Hmenu({ page, isOpen, sidenavRef, closeSidenav }) {

  const sidenavClasses = [
    "fixed",
    "top-0",
    "-right-74",
    "z-12",
    "h-screen",
    "w-74",
    "transition-transform",
    "duration-300",
    "ease-in-out",
    "bg-card",
    "shadow-soft-xl",
    "border-l-2",
    "border-l-white",
    isOpen ? "-translate-x-full" : "translate-x-0",
    page === "virtual-reality" && isOpen ? "xl:left-[18%]" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const closeButtonClasses = `absolute top-4 right-4 text-white hover:text-gray-700 ${
    isOpen ? "" : "hidden"
  }`;

  return (
    <>
      <aside ref={sidenavRef} className={sidenavClasses}>
        <div className="p-4 flex flex-col text-white">

          <div><h2 className="text-xl font-bold">Fast Travel</h2>

          <button className={closeButtonClasses} onClick={closeSidenav}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button></div>
        <div>__________________</div>
        <div className="scroll-links">
        <Link href="#hero" onClick={closeSidenav}>Hero</Link>
        <Link href="#products" onClick={closeSidenav}>Products</Link>
        <Link href="#explore" onClick={closeSidenav}>Explore</Link>
        <Link href="#choose-us" onClick={closeSidenav}>Why Us</Link>
        </div>
        </div>



      </aside>

      {isOpen && (
/*         <div
          className="fixed inset-0 bg-black opacity-50 z-11"
          onClick={closeSidenav}
        ></div> */
        <div className={`bg-black/80 inset-0 w-screen h-screen absolute z-11 blur-sm ${isOpen ? 'animate-fade-in' : 'animate-fade-out'}`} style={{ backgroundImage: `url('/Vector2.png')`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} onClick={closeSidenav}></div>
      )}
    </>
  );
};


