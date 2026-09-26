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
        fugro: {
          yellow: "#F59E0B",
          gold: "#FACC15",
          navy: "#0B1B3D",
          deep: "#07142F",
          slate: "#334155",
          light: "#F8FAFC",
        },
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#00a3e0",
          600: "#0369a1",
          700: "#075985",
          800: "#0c4a6e",
          900: "#0b1b3d",
          950: "#07142f",
        },
      },
    },
  },
  plugins: [],
};

export default config;
