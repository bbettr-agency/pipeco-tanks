import { siteConfig } from "./site-config";

/**
 * Homepage SEO foundations.
 *
 * Keyword themes reflect genuine search intent for a South African sectional
 * water tank manufacturer. No invented claims; no keyword stuffing.
 */
export const seoConfig = {
  title:
    "Pipeco Tanks South Africa | GRP, Steel & Stainless Sectional Water Tanks",
  description:
    "Pipeco Tanks South Africa designs, manufactures and installs GRP, pressed steel and stainless steel sectional water storage tanks. Engineered to spec and assembled on site. Request a quote.",
  keywords: [
    "sectional water tanks South Africa",
    "GRP sectional water tanks",
    "pressed steel sectional water tanks",
    "stainless steel sectional water tanks",
    "water storage tank manufacturer",
    "bulk water storage tanks",
    "panel water tanks",
    "water tank installation",
  ],
  author: siteConfig.businessName,
  robots: "index, follow",
  // OG image is intentionally omitted until PIPECO supplies photography.
} as const;
