"use client";

import Link from "next/link";
import { Playwrite_CU } from "next/font/google";
import { useEffect, useState } from "react";
// import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const playwrite = Playwrite_CU({
  weight: "400",
  style: "normal",
});

const Header = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  const handleMenuItemClick = (id: string) => {
    const imgTarget = document.getElementById(id);
    imgTarget?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-96 max-w-full px-4 xl:mr-12">
              <Link href="/" className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"} `}>
                <div className={`text-sandwisp text-2xl ${playwrite.className}`}>Composition Book</div>
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-sandwisp focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen ? "visibility top-full opacity-100" : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        <div
                          className="cursor-pointer flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 text-dark hover:text-sandwisp dark:text-white/70 dark:hover:text-white"
                          onClick={() => handleMenuItemClick(menuItem.path)}
                        >
                          {menuItem.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <Link
                  href="https://github.com/TheTranceMachine/composition-book-demo"
                  target="_blank"
                  className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                >
                  Github
                </Link>
                <Link
                  href="/workspace"
                  className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-sandwisp px-8 py-3 text-base font-medium text-black transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9"
                >
                  Demo
                </Link>
                {/* <div>
                  <ThemeToggler />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
