import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

import Container from "@/components/layout/container";
import { siteConfig } from "@/config/site-config";
import { navLinks } from "@/config/navigation-config";

const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

// Legal documents exist (per onboarding) but their pages are not built yet, so
// these are shown as plain labels — not links — to avoid broken navigation.
const legalItems = [
  "Privacy Policy",
  "POPIA Policy",
  "Terms & Conditions",
  "Disclaimer",
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deepest text-white">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-5">
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
              Pipeco Tanks South Africa designs, manufactures and installs GRP,
              pressed steel and stainless steel sectional water storage.
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

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-white/75 transition-colors hover:text-brass-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-white/50">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 font-body text-white/75">
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
                  WhatsApp {siteConfig.phoneDisplay}
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
              <li key={item} className="text-white/45">
                {item}
              </li>
            ))}
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
