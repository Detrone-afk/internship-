"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link"; // ✅ Import Link for navigation
import { SignedIn, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathname = usePathname(); // ✅ Get current page

  // ✅ Hide Navbar on Sign-In and Sign-Up pages
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    return null;
  }

  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px] shadow-sm">
      <div className="flex gap-10 items-center">
        {/* ✅ Clickable Jeep Logo (Redirects to Home) */}
        <Link href="/">
          <Image src="/jeep.png" alt="logo" width={60} height={30} className="cursor-pointer" />
        </Link>

        <div className="hidden md:flex gap-6">
          {/* ✅ Clickable Home Button */}
          <Link href="/" className="hover:bg-orange-500 p-2 rounded-md cursor-pointer transition-all">
            Home
          </Link>
          <h2 className="hover:bg-orange-500 p-2 rounded-md cursor-pointer transition-all">About</h2>
          <Link href="/history" className="hover:bg-orange-500 p-2 rounded-md cursor-pointer transition-all">
            History
          </Link>
          <Link href="/feedback" className="hover:bg-orange-500 p-2 rounded-md cursor-pointer transition-all">
            Feedback
          </Link>
        </div>
      </div>

      {/* ✅ Only Show UserButton When Signed In */}
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}

export default NavBar;
