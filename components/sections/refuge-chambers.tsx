import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import Placeholder from "@/components/ui/placeholder";
import { Reveal } from "@/engine/motion";
import { imageSlots } from "@/config/image-config";

/**
 * B — Mining Refuge Chambers. The signature capability.
 *
 * Distinctive composition: a portrait image placeholder set edge-to-edge with a
 * deep-forest content panel — deliberately unlike any other section, so it reads
 * as a specialisation rather than a service card.
 *
 * NOTE: the "21-day survival" figure is intentionally NOT published — it must be
 * confirmed by PIPECO first.
 */
export default function RefugeChambers() {
  return (
    <section id="refuge-chambers" className="bg-white">
      <Container className="py-24 md:py-32">
        <Reveal>
          <div className="overflow-hidden rounded-[3px] border border-ink/10 lg:grid lg:grid-cols-12">
            {/* Image — fills the column height on desktop, a controlled band
                when the block stacks on tablet/mobile. */}
            <div className="relative h-72 sm:h-80 lg:col-span-5 lg:h-auto">
              <Placeholder
                slot={imageSlots.refuge}
                tone="onLight"
                variant="minimal"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>

            {/* Forest content panel */}
            <div className="flex flex-col justify-center bg-forest-deepest p-10 text-white md:p-16 lg:col-span-7 lg:p-20">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-brass" />
                <span className="font-body text-sm font-medium text-sage">
                  A Pipeco specialisation
                </span>
              </div>
              <h2 className="max-w-2xl font-display text-[2.25rem] font-bold leading-[1.05] tracking-tightest md:text-[3rem] lg:text-[3.25rem]">
                Underground mining refuge chambers
              </h2>
              <p className="mt-7 max-w-xl font-body text-lg leading-8 text-white/75 md:text-xl md:leading-9">
                Sectional steel refuge chambers, engineered and built into mining
                operations – a sealed, structurally sound place for crews to
                shelter in an emergency underground.
              </p>
              <p className="mt-5 max-w-xl font-body leading-7 text-white/55">
                Built to the same sectional engineering standard as our water
                storage tanks.
              </p>
              <div className="mt-10">
                <Button href="#contact" variant="primary" size="lg" withArrow>
                  Enquire about refuge chambers
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
