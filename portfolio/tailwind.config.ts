import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Primary indigo
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee", // Cyan accent
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        dark: {
          bg: "#0b0f19",
          card: "rgba(17, 24, 39, 0.7)",
          border: "rgba(255, 255, 255, 0.1)",
        },
        light: {
          bg: "#ffffff",
          card: "rgba(255, 255, 255, 0.8)",
          border: "rgba(229, 231, 235, 0.8)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "brand-glow": "0 0 30px -5px rgba(99, 102, 241, 0.35)",
        "accent-glow": "0 0 30px -5px rgba(34, 211, 238, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "blob": "blob 7s infinite",
        "float": "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-12px)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
