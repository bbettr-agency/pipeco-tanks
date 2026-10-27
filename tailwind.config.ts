import type { Config } from "tailwindcss";

/**
 * PIPECO Tanks — design tokens.
 *
 * Palette is the approved forest-green system. Brass is a single reserved
 * accent used only for the primary "Request a Quote" action — never decorative.
 * No hex values in components: everything routes through these role names.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Forest-green system (approved palette)
        forest: {
          deepest: "#051F20", // Deep Forest — darkest grounds, hero
          dark: "#0B2B26", // Dark Evergreen — dark sections
          base: "#163832", // Forest Green — brand fields, headings on light
          muted: "#235347", // Muted Green — secondary fills, hovers
        },
        sage: "#8EB69B", // Sage — tints, rules, quiet accents
        mint: "#DAF1DE", // Pale Mint — soft tint bands
        // Reserved CTA accent — brass. Primary action only.
        brass: {
          DEFAULT: "#B68A4E",
          dark: "#916B37",
          light: "#CCA978",
        },
        // Ink + surfaces
        ink: "#0C1A17", // near-black with a green cast — body text on light
        graphite: "#44534E", // muted body text on light
        paper: "#F4F6F2", // warm off-white — primary light surface
        shell: "#EAEEE8", // deeper off-white — section rhythm on light
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        header: "0 1px 0 0 rgba(12,26,23,0.08), 0 10px 30px -18px rgba(12,26,23,0.25)",
        plate: "0 40px 90px -50px rgba(5,31,32,0.55)",
        card: "0 24px 60px -40px rgba(5,31,32,0.45)",
      },
      transitionTimingFunction: {
        house: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
