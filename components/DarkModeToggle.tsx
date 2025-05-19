"use client";
import { useEffect } from "react";

export default function DarkModeToggle() {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return null;
}