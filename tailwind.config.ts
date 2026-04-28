import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          1: "#FAFAF8",
          2: "#FFFFFF",
          3: "#F5F4F1",
          4: "#ECEAE5",
        },
        border: {
          DEFAULT: "#E2DFD9",
          strong: "#C9C5BC",
        },
        text: {
          primary: "#1A1917",
          secondary: "#4A4740",
          muted: "#8A8680",
        },
        accent: {
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
          light: "#EFF6FF",
        },
        trust: {
          high: "#15803D",
          mid: "#B45309",
          low: "#B91C1C",
        },
      },
      fontFamily: {
        sans: ["Source Sans 3", "sans-serif"],
        display: ["Libre Baskerville", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
    },
  },
  plugins: [],
};

export default config;
