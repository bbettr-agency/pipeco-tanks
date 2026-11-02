"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

import Container from "@/components/layout/container";
import Logo from "@/components/ui/logo";
import Button from "@/components/ui/button";
import { navLinks, quoteCta } from "@/config/navigation-config";
import { siteConfig } from "@/config/site-config";
import { useScrollPast, THRESHOLD } from "@/engine/motion";
import { cn } from "@/utils/cn";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative py-2 font-body text-[15px] font-medium tracking-[0.01em] text-forest-base/80 transition-colors duration-200 hover:text-forest-base focus:outline-none focus-visible:text-forest-base"
    >
      {label}
      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brass transition-transform duration-300 ease-house group-hover:scale-x-100 group-focus-visible:scale-x-100" />
    </Link>
  );
}

export default function SiteHeader() {
  const scrolled = useScrollPast(THRESHOLD.header);
  const [open, setOpen] = useState(false);

  // Lock the page behind the mobile menu while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[5.5rem] w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ease-house",
        scrolled
          ? "border-ink/10 bg-white/95 shadow-header backdrop-blur"
          : "border-transparent bg-white"
      )}
    >
      <Container className="flex h-[5.5rem] items-center justify-between gap-8">
        <Logo />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-10 lg:flex"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="hidden items-center gap-2 font-body text-sm font-medium text-forest-base transition-colors hover:text-brass-dark xl:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            {siteConfig.phoneDisplay}
          </a>

          <span className="hidden h-6 w-px bg-ink/10 xl:block" aria-hidden />

          <Button
            href={quoteCta.href}
            variant="primary"
            size="md"
            className="hidden sm:inline-flex"
          >
            {quoteCta.label}
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-ink/15 text-forest-base transition-colors hover:border-forest-base hover:bg-forest-base hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brass lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[5.5rem] z-40 lg:hidden",
          "transition-opacity duration-300 ease-house",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-[calc(100vh-5.5rem)] flex-col bg-forest-deepest px-6 pb-10 pt-8 text-white">
          <nav
            aria-label="Mobile"
            className="flex flex-col divide-y divide-white/10 border-y border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="flex items-center justify-between py-4 font-display text-xl font-semibold tracking-tight text-white/90 transition-colors hover:text-brass-light"
              >
                {link.label}
                <span className="text-sage/60" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <Button
              href={quoteCta.href}
              variant="primary"
              size="lg"
              className="w-full"
              onClick={close}
              withArrow
            >
              {quoteCta.label}
            </Button>
          </div>

          <div className="mt-auto space-y-1 pt-8 font-body text-sm text-white/70">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="block transition-colors hover:text-white"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block transition-colors hover:text-white"
            >
              {siteConfig.email}
            </a>
            <p className="pt-2 text-white/45">
              {siteConfig.address}, {siteConfig.locality}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
