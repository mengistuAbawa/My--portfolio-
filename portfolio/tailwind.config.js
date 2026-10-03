export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        secondary: "#ec4899",
        accent: "#22d3ee",
        darker: "#020817",
      },
      boxShadow: {
        glow: "0 0 30px rgba(124, 58, 237, 0.35)",
      },
    },
  },
  plugins: [],
};