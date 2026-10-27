/**
 * Primary navigation.
 *
 * These are the site's final top-level destinations. Until the matching
 * homepage sections / pages are built, each item points to an on-page anchor,
 * so nothing 404s or misleads. "Products" already resolves to the live Tank
 * Solutions section; the rest are forward-declared anchors for sections that
 * arrive in later phases.
 */
export const navLinks = [
  { label: "Products", href: "#tank-solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

// Primary conversion action. Targets the future quote flow (anchor for now).
export const quoteCta = { label: "Request a Quote", href: "#contact" } as const;
