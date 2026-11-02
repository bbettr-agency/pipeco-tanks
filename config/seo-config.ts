import { siteConfig } from "./site-config";

/**
 * Homepage SEO foundations.
 *
 * Keyword themes reflect genuine search intent for a South African sectional
 * water tank supplier and installer offering turnkey water storage. No keyword
 * stuffing; claims stay consistent with verified information (tanks manufactured
 * internationally, supplied and installed locally with turnkey civil works).
 */
export const seoConfig = {
  title:
    "Pipeco Tanks South Africa | GRP, Steel & Stainless Sectional Water Tanks",
  description:
    "Pipeco Tanks South Africa supplies and installs GRP, pressed steel and stainless steel sectional water tanks, with complete turnkey water storage – civil foundations, steel stands and installation. Request a quote.",
  keywords: [
    "sectional water tanks South Africa",
    "GRP sectional water tanks",
    "pressed steel sectional water tanks",
    "stainless steel sectional water tanks",
    "industrial water storage",
    "turnkey water tank solutions",
    "water tank supply and installation",
    "bulk water storage",
    "mining refuge chambers",
  ],
  author: siteConfig.businessName,
  robots: "index, follow",
} as const;
