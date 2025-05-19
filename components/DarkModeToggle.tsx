"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  {/*const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  {/*return (
    
    <div className="flex justify-between items-center w-full p-3">
      <Image src="/detrone.png" alt="DETRONE Logo" width={120} height={40} />

      <button
        onClick={toggleDarkMode}
        className="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md"
      >
        {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </div>
  );*/}
}
