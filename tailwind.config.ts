import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // ✅ Enable dark mode using a class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // ✅ Uses CSS variables
        foreground: "var(--foreground)", // ✅ Uses CSS variables
      },
    },
  },
  plugins: [],
} satisfies Config;
