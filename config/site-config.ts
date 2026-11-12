/**
 * Core business facts for Pipeco Tanks South Africa.
 *
 * Every value here is drawn from the client onboarding form. Nothing is
 * invented. Items still awaiting PIPECO confirmation (service area beyond SA,
 * operating hours, certifications, verifiable statistics) are deliberately
 * NOT encoded here yet.
 */
export const siteConfig = {
  businessName: "Pipeco Tanks South Africa",
  shortName: "Pipeco Tanks",
  // Positioning line — qualitative, no unverified numeric claims.
  tagline: "Sectional water tank supplier and installer",

  // Canonical domain = apex (no www). www redirects to apex (see next.config.js).
  // Domain cut-over is handled at DNS/Vercel; the existing WordPress site and
  // Microsoft 365 email records must not be touched.
  website: "https://pipecoza.com",

  // Verified contact details (onboarding form)
  phone: "+27 60 969 8151",
  phoneDisplay: "060 969 8151",
  whatsapp: "27609698151",
  email: "sales@pipecoza.com",

  // Verified address (onboarding form)
  address: "290 Kwanbi Cres, Sunderland Ridge",
  locality: "Centurion",
  region: "Gauteng",
  postalCode: "0127",
  country: "South Africa",

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61590066315241",
    instagram: "https://www.instagram.com/pipecotanksza/",
  },
} as const;
