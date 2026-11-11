/**
 * Primary navigation.
 *
 * Every top-level item resolves to a real page (no homepage-anchor
 * substitutes). Products and Solutions carry dropdown children so the full
 * architecture is reachable in one hop.
 */
export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const navItems: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "All sectional tanks",
        href: "/products",
        description: "Compare the three ranges",
      },
      {
        label: "GRP sectional tanks",
        href: "/products/grp-tanks",
        description: "Lightweight, corrosion-free",
      },
      {
        label: "Pressed steel tanks",
        href: "/products/pressed-steel-tanks",
        description: "Robust bulk storage",
      },
      {
        label: "Stainless steel tanks",
        href: "/products/stainless-steel-tanks",
        description: "Hygienic, long service life",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "All solutions",
        href: "/solutions",
        description: "Turnkey water storage",
      },
      {
        label: "Turnkey installations",
        href: "/solutions/turnkey-installations",
        description: "Foundations, stands & install",
      },
      {
        label: "Mining refuge chambers",
        href: "/solutions/mining-refuge-chambers",
        description: "Underground safety",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Flat list of the top-level destinations, for the footer. */
export const navLinks = navItems.map(({ label, href }) => ({ label, href }));

// Primary conversion action — the dedicated contact / quotation page.
export const quoteCta = { label: "Request a Quote", href: "/contact" } as const;

// Secondary CTA used beneath the homepage installations showcase.
export const projectsCta = { label: "View All Projects", href: "/projects" } as const;
