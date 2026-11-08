/**
 * Primary navigation.
 *
 * These are the site's top-level destinations. Now that the interior pages
 * exist, Projects, About and Contact point to real routes, while Products and
 * Industries point to the homepage sections via root-anchored links
 * (`/#id`) so they resolve from any page, not just the homepage.
 */
export const navLinks = [
  { label: "Products", href: "/#tank-solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Primary conversion action — the dedicated contact / quotation page, so the
// shared header, footer and hero CTA all resolve correctly site-wide.
export const quoteCta = { label: "Request a Quote", href: "/contact" } as const;

// Secondary CTA used beneath the homepage installations showcase.
export const projectsCta = { label: "View All Projects", href: "/projects" } as const;
