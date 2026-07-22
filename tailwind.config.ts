import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0668C6",
          50: "#EAF4FF",
          100: "#D6E9FA",
          200: "#B0D4F7",
          300: "#7EBAF2",
          400: "#449BF0",
          500: "#0668C6",
          600: "#0556A5",
          700: "#044484",
          800: "#033263",
          900: "#022143",
        },
        dark: {
          DEFAULT: "#0F172A",
          50: "#1E293B",
          100: "#334155",
        },
        "gray-muted": "#64748B",
        "light-blue": "#EAF4FF",
        "border-custom": "#D6E9FA",
      },
      borderRadius: {
        xl: "12px",
        polaroid: "16px",
      },
      boxShadow: {
        hack: "0 10px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)",
        "hack-hover": "0 20px 35px -10px rgba(6, 104, 198, 0.22), 0 12px 15px -8px rgba(15, 23, 42, 0.12)",
        polaroid: "0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;



