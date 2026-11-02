import Image from "next/image";
import { Factory, Wrench, Shield, Droplet } from "lucide-react";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import { Reveal, heroStack } from "@/engine/motion";
import { imageSlots } from "@/config/image-config";
import { quoteCta } from "@/config/navigation-config";
import { cn } from "@/utils/cn";

/**
 * Photographic hero — a real Pipeco sectional-tank installation behind a forest
 * overlay that is strongest on the left (for text legibility) and clears to the
 * right (so the tank stays visible). The H1 is the LCP and never animates; the
 * background image is `priority` and never faded.
 */
const indicators = [
  { icon: Factory, label: "Global manufacturing expertise" },
  { icon: Wrench, label: "Turnkey solutions from design to installation" },
  { icon: Shield, label: "Built for demanding environments" },
  { icon: Droplet, label: "Commercial, industrial and mining applications" },
];

export default function Hero() {
  const hero = heroStack({ character: "precise" });

  return (
    <section className="relative isolate overflow-hidden bg-forest-deepest text-white">
      {/* Authentic Pipeco photograph */}
      <Image
        src={imageSlots.hero.src ?? "/images/hero.jpg"}
        alt={imageSlots.hero.alt}
        fill
        priority
        sizes="100vw"
        quality={85}
        className="-z-20 object-cover object-center"
      />

      {/* Forest overlay — heaviest on the left, clearing to the right. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,31,32,0.96) 0%, rgba(5,31,32,0.88) 24%, rgba(5,31,32,0.58) 48%, rgba(5,31,32,0.22) 72%, rgba(5,31,32,0.05) 100%)",
        }}
      />
      {/* Extra darkening on small screens for contrast under full-width text. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-forest-deepest/55 md:bg-transparent"
      />
      {/* Bottom darken so the credibility row stays legible. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-44"
        style={{
          background: "linear-gradient(to top, rgba(5,31,32,0.72), transparent)",
        }}
      />

      <Container className="relative flex min-h-[600px] flex-col py-10 md:min-h-[calc(100vh-5.5rem)] md:py-12">
        {/* Headline block — one tight content group anchored in the upper area */}
        <div className="max-w-2xl md:pt-[4vh] lg:pt-[6vh]">
            <Reveal {...hero.step(0)}>
              <p className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
                Sectional water storage solutions
              </p>
            </Reveal>

            <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.0] tracking-tightest sm:text-6xl lg:text-[4.5rem]">
              Sectional water tanks,
              <span className="block text-sage">engineered for South Africa.</span>
            </h1>

            <Reveal
              {...hero.step(1)}
              as="p"
              className="mt-5 max-w-xl font-body text-lg leading-8 text-white/80"
            >
              GRP, pressed steel and stainless steel sectional water tanks –
              supplied and installed with complete turnkey solutions, including
              civil foundations and elevated steel stands.
            </Reveal>

            <Reveal {...hero.step(2)} className="mt-7 flex flex-wrap gap-4">
              <Button href={quoteCta.href} variant="primary" size="lg" withArrow>
                Request a Quote
              </Button>
              <Button
                href="#tank-solutions"
                variant="outlineLight"
                size="lg"
                withArrow
              >
                View Our Products
              </Button>
            </Reveal>
          </div>

        {/* Credibility indicators — pinned along the bottom */}
        <Reveal {...hero.step(3)} className="mt-auto border-t border-white/15 pt-6">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
            {indicators.map((item, i) => (
              <li
                key={item.label}
                className={cn(
                  "flex items-center gap-3 lg:px-6 lg:first:pl-0",
                  i > 0 && "lg:border-l lg:border-white/15"
                )}
              >
                <item.icon
                  className="h-5 w-5 shrink-0 text-sage"
                  strokeWidth={1.5}
                />
                <span className="font-body text-sm leading-5 text-white/85">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
