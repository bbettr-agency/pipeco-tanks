/**
 * Industries & applications.
 *
 * Mining and the refuge-chamber offering are onboarding-verified; the other
 * sectors are standard, well-understood uses of sectional water storage. Copy
 * is general and category-accurate — no named customers, locations, capacities
 * or project claims.
 */
export type IndustryLink = { label: string; href: string };
export type Industry = {
  name: string;
  summary: string;
  detail: string;
  links: IndustryLink[];
};

export const industries: Industry[] = [
  {
    name: "Mining",
    summary: "Bulk process and potable water, plus specialised underground refuge chambers for active sites.",
    detail:
      "Mines need reliable bulk water on surface and underground, and safe places for crews to shelter in an emergency. Pipeco supplies robust sectional storage and builds sectional steel refuge chambers to the same engineering standard.",
    links: [
      { label: "Mining refuge chambers", href: "/solutions/mining-refuge-chambers" },
      { label: "Pressed steel tanks", href: "/products/pressed-steel-tanks" },
    ],
  },
  {
    name: "Commercial & industrial",
    summary: "Process, cooling, wash-down and potable storage for plants, factories and developments.",
    detail:
      "Plants and developments rely on steady water for process, cooling, wash-down and potable use. GRP and stainless ranges suit hygienic and corrosive duties; pressed steel handles larger volumes.",
    links: [
      { label: "GRP tanks", href: "/products/grp-tanks" },
      { label: "Stainless steel tanks", href: "/products/stainless-steel-tanks" },
    ],
  },
  {
    name: "Infrastructure & municipal",
    summary: "Reservoirs and bulk storage for water schemes, towns and public infrastructure.",
    detail:
      "Water schemes and municipalities need dependable bulk storage at scale. Pressed steel is a cost-effective choice for large reservoirs, delivered with turnkey civil works and installation.",
    links: [
      { label: "Pressed steel tanks", href: "/products/pressed-steel-tanks" },
      { label: "Turnkey installations", href: "/solutions/turnkey-installations" },
    ],
  },
  {
    name: "Fire-water storage",
    summary: "Dedicated fire-reserve tanks, sized to your fire design.",
    detail:
      "Fire reserves must hold a dependable volume on standby. Pipeco supplies and installs dedicated fire-water tanks sized to your fire design and site.",
    links: [{ label: "Pressed steel tanks", href: "/products/pressed-steel-tanks" }],
  },
  {
    name: "Agriculture",
    summary: "Irrigation reserves and livestock water storage.",
    detail:
      "Farms depend on stored water for irrigation and livestock. Lightweight, corrosion-free GRP suits remote and restricted-access sites, with turnkey foundations and stands where needed.",
    links: [{ label: "GRP tanks", href: "/products/grp-tanks" }],
  },
];
