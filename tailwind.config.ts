import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050508",
        panel: "#0B0B14",
        violet: "#9333FF",
        electric: "#7027E8",
        muted: "#9995AE",
      },
      boxShadow: {
        neon: "0 0 28px rgba(147,51,255,.18)",
      },
    },
  },
  plugins: [],
};

export default config;