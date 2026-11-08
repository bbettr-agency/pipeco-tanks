import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal } from "@/engine/motion";
import { cn } from "@/utils/cn";

export type RelatedCard = {
  label: string;
  href: string;
  description?: string;
  image?: { src: string; alt: string };
  eyebrow?: string;
};

/**
 * Related / cross-link cards. Used for "explore other ranges", related
 * solutions and industry links. Photo cards when images are supplied, otherwise
 * clean type cards — not a decorative icon grid.
 */
export default function RelatedCards({
  overline,
  title,
  cards,
  tone = "light",
  columns = 3,
}: {
  overline: string;
  title: string;
  cards: RelatedCard[];
  tone?: "light" | "dark";
  columns?: 2 | 3;
}) {
  const dark = tone === "dark";
  return (
    <section className={cn(dark ? "bg-forest-deepest text-white" : "bg-shell")}>
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionIntro tone={dark ? "dark" : "light"} overline={overline} title={title} />
        </Reveal>
        <div
          className={cn(
            "mt-12 grid gap-6",
            columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={(i % 3) * 0.05}>
              <Link
                href={card.href}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-[16px] border transition-colors",
                  dark
                    ? "border-white/10 bg-white/[0.03] hover:border-white/25"
                    : "border-ink/10 bg-white hover:border-forest-base/40"
                )}
              >
                {card.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={card.image.src}
                      alt={card.image.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-house group-hover:scale-[1.04]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {card.eyebrow && (
                    <span
                      className={cn(
                        "mb-2 font-body text-xs font-semibold uppercase tracking-[0.14em]",
                        dark ? "text-sage" : "text-forest-muted"
                      )}
                    >
                      {card.eyebrow}
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className={cn(
                        "font-display text-lg font-semibold tracking-tight",
                        dark ? "text-white" : "text-forest-base"
                      )}
                    >
                      {card.label}
                    </h3>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 shrink-0 transition-transform duration-300 ease-house group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
                        dark ? "text-sage" : "text-forest-base"
                      )}
                    />
                  </div>
                  {card.description && (
                    <p
                      className={cn(
                        "mt-2 font-body text-sm leading-6",
                        dark ? "text-white/60" : "text-ink/65"
                      )}
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
