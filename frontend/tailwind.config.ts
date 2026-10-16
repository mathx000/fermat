import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { fermat: "#C8102E", aco: "#151515", grafite: "#2E2E2E", betao: "#A8A59F", cal: "#F1EFEA" },
    fontFamily: { display: ['"Big Shoulders Display"', "Impact", "sans-serif"], sans: ['"Work Sans"', "system-ui", "sans-serif"], mono: ['"DM Mono"', "ui-monospace", "monospace"] },
  } },
} satisfies Config;
