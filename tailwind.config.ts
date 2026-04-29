import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        snowBlack: "#0f0e0b",
        cardBlack: "#181612",
        achievementYellow: "#d97757",
        paleYellow: "#f0d7c0",
      },
      boxShadow: {
        glow: "0 0 32px rgba(217, 119, 87, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
