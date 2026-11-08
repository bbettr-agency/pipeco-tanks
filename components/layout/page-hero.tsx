import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Container from "@/components/layout/container";
import type { ImageSlot } from "@/config/image-config";
import { cn } from "@/utils/cn";

/**
 * Interior page hero — three deliberately different compositions so no two
 * pages open with the same shape:
 *
 *   "photo"   full-bleed photograph with a forest gradient, text anchored low —
 *             cinematic, for product / project / solution pages.
 *   "split"   forest band with the copy beside a framed photograph.
 *   "band"    forest band, type-forward, no photograph — for overviews.
 *
 * Static (no scroll-reveal): always above the fold, the H1 is the LCP. A visible
 * breadcrumb gives a reliable route home on top of the header logo.
 */
type Crumb = { label: string; href: string };
type Media = { slot?: ImageSlot; src?: string; alt?: string };

type PageHeroProps = {
  variant?: "photo" | "split" | "band";
  overline: string;
  title: ReactNode;
  lead?: ReactNode;
  breadcrumb?: Crumb[];
  media?: Media;
  /** object-position for the "photo" background, e.g. "center 40%". */
  focus?: string;
  /** "band" alignment. */
  align?: "left" | "center";
  children?: ReactNode;
};

function resolveMedia(media?: Media) {
  if (!media) return null;
  const src = media.slot?.src ?? media.src ?? null;
  const alt = media.slot?.alt ?? media.alt ?? "";
  return src ? { src, alt } : null;
}

function Breadcrumb({ items, onDark = true }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-2 font-body text-sm",
          onDark ? "text-white/55" : "text-ink/50"
        )}
      >
        {items.map((crumb, i) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className={onDark ? "text-white/30" : "text-ink/30"}>
                /
              </span>
            )}
            {i === items.length - 1 ? (
              <span aria-current="page" className={onDark ? "text-white/80" : "text-forest-base"}>
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className="transition-colors hover:text-brass-light">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Eyebrow({ overline, center }: { overline: string; center?: boolean }) {
  return (
    <div className={cn("mb-5 flex items-center gap-3", center && "justify-center")}>
      <span className="h-px w-10 bg-brass" />
      <span className="font-body text-sm font-medium text-sage">{overline}</span>
    </div>
  );
}

export default function PageHero({
  variant = "band",
  overline,
  title,
  lead,
  breadcrumb,
  media,
  focus = "center",
  align = "left",
  children,
}: PageHeroProps) {
  const img = resolveMedia(media);

  /* -------------------------------------------------------- photo variant */
  if (variant === "photo" && img) {
    return (
      <section className="relative isolate flex min-h-[460px] items-end overflow-hidden bg-forest-deepest text-white md:min-h-[560px]">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="-z-20 object-cover"
          style={{ objectPosition: focus }}
        />
        {/* Forest wash — heaviest on the left where the text sits, clearing to
            the right so the photograph stays visible. A second layer darkens the
            base so the breadcrumb and overline keep contrast over bright skies. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(5,31,32,0.90) 0%, rgba(5,31,32,0.74) 42%, rgba(5,31,32,0.40) 72%, rgba(5,31,32,0.14) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(0deg, rgba(5,31,32,0.55) 0%, rgba(5,31,32,0.10) 45%, rgba(5,31,32,0) 70%)",
          }}
        />
        <Container className="relative w-full py-14 md:py-20">
          <div className="max-w-2xl">
            {breadcrumb && <Breadcrumb items={breadcrumb} />}
            <Eyebrow overline={overline} />
            <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tightest md:text-5xl lg:text-[3.5rem]">
              {title}
            </h1>
            {lead && (
              <p className="mt-6 max-w-xl font-body text-lg leading-8 text-white/80">
                {lead}
              </p>
            )}
            {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
          </div>
        </Container>
      </section>
    );
  }

  /* -------------------------------------------------------- split variant */
  if (variant === "split" && img) {
    return (
      <section className="relative isolate overflow-hidden bg-forest-deepest text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "radial-gradient(circle, #B4895A 0%, transparent 70%)" }}
        />
        <Container className="py-14 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              {breadcrumb && <Breadcrumb items={breadcrumb} />}
              <Eyebrow overline={overline} />
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
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-white/10">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: focus }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  /* --------------------------------------------------------- band variant */
  const center = align === "center";
  return (
    <section className="relative isolate overflow-hidden bg-forest-deepest text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #B4895A 0%, transparent 70%)" }}
      />
      <Container className="py-16 md:py-24">
        <div className={cn(center ? "mx-auto max-w-3xl text-center" : "max-w-3xl")}>
          {breadcrumb && (
            <div className={center ? "flex justify-center" : undefined}>
              <Breadcrumb items={breadcrumb} />
            </div>
          )}
          <Eyebrow overline={overline} center={center} />
          <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tightest md:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {lead && (
            <p className={cn("mt-6 max-w-xl font-body text-lg leading-8 text-white/75", center && "mx-auto")}>
              {lead}
            </p>
          )}
          {children && (
            <div className={cn("mt-8 flex flex-wrap gap-4", center && "justify-center")}>
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
