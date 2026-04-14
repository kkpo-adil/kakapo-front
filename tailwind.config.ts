import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          0: "#0a0d14",
          1: "#0f1117",
          2: "#161b27",
          3: "#1e2535",
          4: "#252e42",
        },
        border: {
          DEFAULT: "#2a3349",
          subtle: "#1e2535",
          strong: "#3d4f70",
        },
        text: {
          primary: "#e8eaf0",
          secondary: "#8892a4",
          muted: "#4a5568",
          inverse: "#0f1117",
        },
        accent: {
          DEFAULT: "#3b6fd4",
          hover: "#4d7fe0",
          muted: "#1e3a6e",
        },
        trust: {
          high: "#22c55e",
          "high-bg": "#052e16",
          mid: "#f59e0b",
          "mid-bg": "#2d1a00",
          low: "#ef4444",
          "low-bg": "#2d0a0a",
          none: "#64748b",
          "none-bg": "#1a2030",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", "Consolas", "monospace"],
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        display: ["'DM Serif Display'", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        sm: "3px",
        DEFAULT: "5px",
        md: "7px",
        lg: "10px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(42,51,73,0.8)",
        "card-hover": "0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(61,79,112,0.6)",
        glow: "0 0 20px rgba(59,111,212,0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
