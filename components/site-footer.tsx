import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

import Container from "@/components/layout/container";
import { CookiePreferences } from "@/components/analytics/consent";
import { siteConfig } from "@/config/site-config";

const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

// Grouped footer navigation — mirrors the site architecture for discoverability.
const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "GRP sectional tanks", href: "/products/grp-tanks" },
      { label: "Pressed steel tanks", href: "/products/pressed-steel-tanks" },
      { label: "Stainless steel tanks", href: "/products/stainless-steel-tanks" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Turnkey installations", href: "/solutions/turnkey-installations" },
      { label: "Mining refuge chambers", href: "/solutions/mining-refuge-chambers" },
      { label: "All solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Privacy & Cookie Policy is published (/privacy-policy, with a POPIA section).
// Terms & Disclaimer pages are not built yet, so they remain plain labels to
// avoid broken navigation.
const legalItems: { label: string; href?: string }[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "POPIA Policy", href: "/privacy-policy#popia" },
  { label: "Terms & Conditions" },
  { label: "Disclaimer" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deepest text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${siteConfig.businessName} — home`}>
              <Image
                src="/brand/pipeco-logo.png"
                alt={siteConfig.businessName}
                width={247}
                height={120}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm font-body leading-7 text-white/60">
              Pipeco Tanks South Africa supplies and installs GRP, pressed steel
              and stainless steel sectional water tanks, with complete turnkey
              solutions.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pipeco Tanks on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/15 text-white/80 transition-colors hover:border-brass hover:text-brass-light"
              >
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pipeco Tanks on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/15 text-white/80 transition-colors hover:border-brass hover:text-brass-light"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="lg:col-span-2">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
                {col.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-white/75 transition-colors hover:text-brass-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 font-body text-sm text-white/75">
              <li>
                <a href={telHref} className="transition-colors hover:text-brass-light">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-brass-light"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brass-light"
                >
                  WhatsApp us
                </a>
              </li>
              <li className="pt-2 text-white/55">
                {siteConfig.address},<br />
                {siteConfig.locality}, {siteConfig.region}, {siteConfig.postalCode}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {siteConfig.businessName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalItems.map((item) => (
              <li key={item.label} className="text-white/45">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="underline-offset-4 transition-colors hover:text-brass-light hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  item.label
                )}
              </li>
            ))}
            <li>
              <CookiePreferences className="text-white/45 underline-offset-4 transition-colors hover:text-brass-light hover:underline focus:outline-none focus-visible:text-brass-light" />
            </li>
          </ul>
          <p>
            Designed &amp; developed by{" "}
            <a
              href="https://www.bbettragency.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white/70 transition-colors hover:text-brass-light"
            >
              Bbettr Agency
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
