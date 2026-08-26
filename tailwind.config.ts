import type { Config } from "tailwindcss";
import { colors, fonts } from "./src/config/theme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        "bg-deep": colors.bgDeep,
        "bg-elevated": colors.bgElevated,
        gold: colors.gold,
        "gold-soft": colors.goldSoft,
        "gold-deep": colors.goldDeep,
        ivory: colors.ivory,
        sand: colors.sand,
        "sand-muted": colors.sandMuted,
        hairline: colors.hairline,
      },
      fontFamily: {
        display: fonts.display.split(",").map((f) => f.trim().replace(/"/g, "")),
        body: fonts.body.split(",").map((f) => f.trim().replace(/"/g, "")),
      },
      maxWidth: {
        editorial: "72rem",
        prose: "42rem",
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotateY(-14deg) rotateX(6deg)" },
          "50%": { transform: "translateY(-14px) rotateY(-14deg) rotateX(6deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 2.4s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      boxShadow: {
        gold: "0 0 40px -8px rgba(200, 162, 92, 0.35)",
        card: "0 20px 60px -20px rgba(0, 0, 0, 0.65)",
      },
    },
  },
  plugins: [],
} satisfies Config;
