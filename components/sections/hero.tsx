import Link from "next/link";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import Placeholder from "@/components/ui/placeholder";
import { Reveal, heroStack } from "@/engine/motion";
import { imageSlots } from "@/config/image-config";
import { products } from "@/config/products-config";
import { quoteCta } from "@/config/navigation-config";

/**
 * Homepage hero — Capability / Industrial archetype.
 *
 * The H1 is the LCP element and never animates (heroStack.lcp). Supporting
 * content enters on mount via eager reveals so nothing is invisible at first
 * paint. No statistics, capacities or certifications are stated — only
 * onboarding-verified positioning.
 */
export default function Hero() {
  const hero = heroStack({ character: "precise" });

  return (
    <section className="bg-forest-deepest text-white">
      <Container className="py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="lg:col-span-7 lg:pr-10">
            <Reveal {...hero.step(0)} className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm text-sage">
                Sectional water storage, engineered in South Africa
              </span>
            </Reveal>

            <h1 className="font-display text-[2.55rem] font-extrabold leading-[1.04] tracking-tightest sm:text-[3.5rem] lg:text-[4.4rem]">
              Sectional water tanks,
              <span className="mt-1 block text-sage">
                engineered in South Africa.
              </span>
            </h1>

            <Reveal
              {...hero.step(1)}
              as="p"
              className="mt-8 max-w-xl font-body text-lg leading-8 text-white/75"
            >
              Pipeco Tanks designs, manufactures and installs GRP, pressed steel
              and stainless steel sectional water storage – engineered to spec
              and assembled on site.
            </Reveal>

            <Reveal {...hero.step(2)} className="mt-10 flex flex-wrap gap-4">
              <Button href={quoteCta.href} variant="primary" size="lg" withArrow>
                Request a Quote
              </Button>
              <Button href="#tank-solutions" variant="outlineLight" size="lg">
                Explore Our Tanks
              </Button>
            </Reveal>

            {/* Material index — ties the hero to the product showcase. */}
            <Reveal
              {...hero.step(3)}
              className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-white/10 pt-7"
            >
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href="#tank-solutions"
                  className="group flex items-baseline gap-2.5"
                >
                  <span className="font-display text-xs font-semibold text-brass-light">
                    {p.index}
                  </span>
                  <span className="font-body text-[15px] text-white/70 transition-colors group-hover:text-white">
                    {p.shortName}
                  </span>
                </Link>
              ))}
            </Reveal>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5">
            <Reveal {...hero.step(1)} preset="fadeIn">
              <div className="relative">
                {/* Left brass rule — a quiet art-directed accent. */}
                <span
                  aria-hidden
                  className="absolute -left-3 top-6 bottom-6 w-px bg-brass/60"
                />
                <Placeholder
                  slot={imageSlots.hero}
                  tone="onDark"
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="w-full border border-white/10 shadow-plate"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
