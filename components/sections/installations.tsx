import Image from "next/image";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import MobileCarousel from "@/components/ui/mobile-carousel";
import { Reveal } from "@/engine/motion";
import { projectsCta } from "@/config/navigation-config";

/**
 * D — Selected Installations.
 *
 * Desktop: a two-column composition — copy and CTA on the left, a balanced
 * 2 × 2 grid of real installation photographs on the right, one cohesive
 * showcase on a single rounded, hairline-framed system (no cards or shadows).
 * Mobile: centred copy and CTA, with the four photographs as a one-at-a-time
 * swipe carousel (scroll-snap) — never a four-image vertical stack.
 *
 * Captions describe only the visible turnkey stage — no client, location or
 * capacity is asserted.
 */
const shots = [
  {
    src: "/images/projects/completed-installations/install-elevated-crane.jpeg",
    alt: "Sectional water tank lifted onto an elevated steel tower by crane",
    caption: "Elevated tank installation",
  },
  {
    src: "/images/projects/completed-installations/install-tank-base.jpeg",
    alt: "Sectional tank base panels assembled on a concrete plinth",
    caption: "Tank base assembly",
  },
  {
    src: "/images/projects/completed-installations/install-steelworks.jpeg",
    alt: "Structural steelworks for a sectional water reservoir",
    caption: "Reservoir steelworks",
  },
  {
    src: "/images/projects/completed-installations/install-foundations.jpeg",
    alt: "Concrete civil foundation works for a sectional water tank",
    caption: "Civil foundations",
  },
];

export default function Installations() {
  return (
    <section id="projects" className="bg-paper">
      <Container className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — copy + CTA (centred on mobile, left-aligned on desktop) */}
          <Reveal className="text-center lg:col-span-5 lg:text-left">
            <div className="mb-5 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-forest-muted">
                Selected installations
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.06] tracking-tightest text-forest-base md:text-5xl">
              Selected Installations
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-8 text-ink/70 lg:mx-0">
              From civil foundations and dwarf walls to elevated steel stands and
              commissioned tanks, Pipeco delivers the complete turnkey
              installation — one accountable team from the ground up.
            </p>
            <p className="mx-auto mt-4 max-w-xl font-body leading-7 text-ink/60 lg:mx-0">
              A selection of sectional water storage work across South Africa,
              supplied and installed by our teams.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button
                href={projectsCta.href}
                variant="outlineInk"
                size="lg"
                radius="sm"
                withArrow
              >
                {projectsCta.label}
              </Button>
            </div>
          </Reveal>

          {/* Right — 2 × 2 grid (desktop/tablet) */}
          <Reveal preset="fadeIn" className="lg:col-span-7">
            <div className="hidden grid-cols-2 gap-5 sm:grid">
              {shots.map((shot) => (
                <figure
                  key={shot.src}
                  className="group relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-ink/10"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 46vw"
                    className="object-cover transition-transform duration-700 ease-house group-hover:scale-[1.04]"
                  />
                </figure>
              ))}
            </div>

            {/* Mobile — swipe carousel */}
            <div className="sm:hidden">
              <MobileCarousel images={shots} sizes="100vw" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
