import type { ImageSlotId } from "./image-config";

/**
 * Homepage content.
 *
 * Copy is conversion-focused and category-accurate. Confirmed facts: PIPECO's
 * tanks are manufactured internationally (in Malaysia) and SUPPLIED for South
 * African projects; the local offering is turnkey supply + installation plus
 * locally built civil foundations and elevated steel stands. No fabricated
 * statistics, certifications, client names, locations, capacities or
 * engineer-sign-off claims.
 */

/* A — Turnkey capabilities (international manufacturing → foundations → stands → install) */
export const capabilities = [
  {
    index: "01",
    title: "International manufacturing",
    body: "Our GRP, pressed steel and stainless steel sectional tanks are manufactured in Malaysia and supplied for projects across South Africa.",
  },
  {
    index: "02",
    title: "Civil foundations",
    body: "Our civil team builds the base your tank sits on – dwarf walls and tank-stand foundations.",
  },
  {
    index: "03",
    title: "Elevated steel stands",
    body: "We design and build elevated steel stands for raised, gravity-fed storage.",
  },
  {
    index: "04",
    title: "Professional installation",
    body: "Our teams assemble, seal and commission every tank on site.",
  },
] as const;

/* C — Industries & Applications.
   Mining and the refuge-chamber offering are onboarding-verified; the remaining
   sectors are standard uses of sectional water storage. No named customers. */
export const applications = [
  {
    name: "Mining",
    note: "Bulk process and potable water, plus specialised underground refuge chambers for active sites.",
    href: "/solutions/mining-refuge-chambers",
  },
  {
    name: "Commercial & industrial",
    note: "Process, cooling, wash-down and potable storage for plants, factories and developments.",
    href: "/industries",
  },
  {
    name: "Infrastructure & municipal",
    note: "Reservoirs and bulk storage for water schemes, towns and public infrastructure.",
    href: "/industries",
  },
  {
    name: "Fire-water storage",
    note: "Dedicated fire-reserve tanks, sized to your fire design.",
    href: "/products/pressed-steel-tanks",
  },
  {
    name: "Agriculture",
    note: "Irrigation reserves and livestock water storage.",
    href: "/industries",
  },
] as const;

/* D — Selected Installations.
   Neutral descriptors only — no real client names, logos, locations or project
   details until PIPECO confirms what may be published. */
export const installations: {
  title: string;
  descriptor: string;
  image: ImageSlotId;
}[] = [
  {
    title: "Sectional steel reservoir",
    descriptor: "Bulk water storage",
    image: "install1",
  },
  {
    title: "GRP panel tank",
    descriptor: "Potable water duty",
    image: "install2",
  },
  {
    title: "Stainless steel tank",
    descriptor: "Food-grade duty",
    image: "install3",
  },
];

/* E — Why PIPECO (genuine, verified differentiators). */
export const whyPoints = [
  {
    index: "01",
    title: "International manufacturing expertise",
    body: "Pipeco sectional tanks are manufactured in Malaysia and supplied for projects across South Africa.",
  },
  {
    index: "02",
    title: "Local supply and installation",
    body: "Delivered, assembled and commissioned on site by our South African teams.",
  },
  {
    index: "03",
    title: "Complete turnkey solutions",
    body: "Civil foundations, elevated steel stands, tank supply and installation – handled by one accountable team.",
  },
  {
    index: "04",
    title: "Commercial & industrial storage",
    body: "Water storage delivered for commercial, industrial, mining and infrastructure sites.",
  },
] as const;
