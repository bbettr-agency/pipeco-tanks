import Link from "next/link";
import type { ReactNode } from "react";

import Container from "@/components/layout/container";
import Placeholder from "@/components/ui/placeholder";
import type { ImageSlot } from "@/config/image-config";
import { cn } from "@/utils/cn";

/**
 * Interior page hero.
 *
 * A deep-forest header band shared by every interior page, so the site opens in
 * one consistent voice while each page's body keeps its own considered layout.
 * Static (no scroll-reveal) because it is always above the fold — the H1 is the
 * LCP. An optional framed photograph sits beside the copy on large screens.
 *
 * A breadcrumb (Home / …) gives a reliable route back to the homepage on top of
 * the header logo.
 */
type Crumb = { label: string; href: string };

type PageHeroProps = {
  overline: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumb?: Crumb[];
  image?: ImageSlot;
  /** CTAs or other inline content rendered under the lead. */
  children?: ReactNode;
};

export default function PageHero({
  overline,
  title,
  lead,
  breadcrumb,
  image,
  children,
}: PageHeroProps) {
  const hasImage = Boolean(image);

  return (
    <section className="relative isolate overflow-hidden bg-forest-deepest text-white">
      {/* Soft brass glow, upper-right — subtle depth, never competes with text. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #B4895A 0%, transparent 70%)" }}
      />

      <Container className="py-16 md:py-24">
        <div
          className={cn(
            "grid items-center gap-12 lg:gap-16",
            hasImage && "lg:grid-cols-12"
          )}
        >
          <div className={cn(hasImage ? "lg:col-span-7" : "max-w-3xl")}>
            {breadcrumb && breadcrumb.length > 0 && (
              <nav aria-label="Breadcrumb" className="mb-7">
                <ol className="flex flex-wrap items-center gap-2 font-body text-sm text-white/55">
                  {breadcrumb.map((crumb, i) => (
                    <li key={crumb.href} className="flex items-center gap-2">
                      {i > 0 && <span aria-hidden className="text-white/30">/</span>}
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-brass-light"
                      >
                        {crumb.label}
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-sage">
                {overline}
              </span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tightest md:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>

            {lead && (
              <p className="mt-6 max-w-xl font-body text-lg leading-8 text-white/75">
                {lead}
              </p>
            )}

            {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <Placeholder
                slot={image}
                tone="onDark"
                variant="minimal"
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="w-full overflow-hidden rounded-[16px] border border-white/10"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
