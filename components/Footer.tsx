"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 border-t"> 
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left"> 
          
          <div>
            <h2 className="text-lg font-bold">ANUPAM ANAND - 3RD YEAR B.TECH CSE (2026) </h2> 
            <p className="text-sm mt-1">
            221210023 - National Institute Of Technology Delhi
            </p>
            <h2 className="text-lg font-bold">DETRONE </h2>
          </div>

          <div>
            <h2 className="text-md font-semibold">Quick Links</h2> 
            <ul className="mt-1 space-y-1">
              <li><Link href="/" className="hover:text-blue-600 cursor-pointer">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 cursor-pointer">About</Link></li>
              <li><Link href="/history" className="hover:text-blue-600 cursor-pointer">History</Link></li>
              <li><Link href="/feedback" className="hover:text-blue-600 cursor-pointer">Feedback</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-md font-semibold">Contact</h2> 
            <ul className="mt-1 space-y-1">
              <li>Email: <a href="mailto:221210023@nitdelhi.ac.in" className="hover:text-blue-600 cursor-pointer">221210023@nitdelhi.ac.in</a></li>
              <li>
                LinkedIn: 
                <a 
                  href="https://www.linkedin.com/in/anupam-anand05/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-blue-600 cursor-pointer inline-block ml-1"
                >
                  Anupam Anand ↗
                </a>
              </li>
              <li>Location: NIT Delhi, India</li>
            </ul>
          </div>

        </div>

        <div className="border-t mt-4 pt-3 flex flex-col md:flex-row justify-between items-center text-xs"> 
          <p>© {new Date().getFullYear()} DETRONE. All Rights Reserved.</p>
          <p>Developed by <span className="font-bold">Anupam Anand</span></p>
        </div>
      </div>
    </footer>
  );
}
