"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Dashboard from '@/components/Booking/Dashboard';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/feedback", label: "Feedback" },
];

function NavBar() {
  const pathname = usePathname();
  const [showDashboard, setShowDashboard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // Reload handler for logos
  const handleReload = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  // Hide Navbar on Sign-In and Sign-Up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <>
      {/* Navbar Content */}
      <div className="relative bg-[#182962] dark:bg-gray-900 text-white dark:text-gray-100 flex justify-between py-6 px-10 border-b-[1px] shadow-sm items-center w-full">
        {/* centered Jeep Logo for navbar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center items-center select-none">
          <button onClick={handleReload} className="focus:outline-none pointer-events-auto" aria-label="Reload page">
            <Image src="/jeep.png" alt="Jeep Logo" width={60} height={30} />
          </button>
        </div>

        {/* Left side - Menu and Navigation */}
        <div className="flex gap-10 items-center">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            className="fixed top-4 mt-2 left-4 z-50 p-2 text-orange-500 rounded-md bg-white shadow-lg hover:bg-orange-500 hover:text-white dark:bg-orange-500 dark:text-white dark:hover:bg-white dark:hover:text-orange-500">
             <span className="absolute -top-1 -right-1 flex items-center justify-center h-3 w-3 bg-green-500 text-white text-xs font-bold rounded-full z-50 border-2 border-white">
    
  </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="4" y="6" width="16" height="2" rx="1" />
              <rect x="4" y="11" width="16" height="2" rx="1" />
              <rect x="4" y="16" width="16" height="2" rx="1" />
            </svg>
          </button>

          <div className="w-10"></div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    [
                      "p-2 rounded-md cursor-pointer transition-all font-semibold",
                      isActive
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-500 hover:text-white",
                      isActive
                        ? "dark:bg-white dark:text-orange-500"
                        : "dark:hover:bg-orange-500 dark:hover:text-white",
                    ].join(" ")
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side - Logo and Dark Mode Toggle */}
        <div className="flex items-center gap-8 z-10">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          {/* Detrone Logo at right       className="focus:outline-none*/}
          <button onClick={handleReload} 
          className="focus:outline-none hidden md:block"
          aria-label="Reload page">
            <Image 
              src="/detrone.png" 
              alt="DETRONE Logo" 
              width={120} 
              height={40} 
              className="cursor-pointer invert dark:invert-0"
            />
          </button>
        </div>
      </div>

      {/* Dashboard Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-3/4 bg-[#131F4B] dark:bg-gray-800 z-40 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          showDashboard ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-hidden">
          <Dashboard />
        </div>
      </div>

      {/* Overlay (Closes Dashboard When Clicked) */}
      {showDashboard && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowDashboard(false)}
        />
      )}
    </>
  );
}

export default NavBar;