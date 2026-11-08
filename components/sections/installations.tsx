import Container from "@/components/layout/container";
import Placeholder from "@/components/ui/placeholder";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import { Reveal } from "@/engine/motion";
import { imageSlots, type ImageSlot } from "@/config/image-config";
import { projectsCta } from "@/config/navigation-config";

/**
 * D — Selected Installations.
 *
 * A quiet, editorial photography portfolio: one full-width lead image over a
 * supporting pair, all on a consistent 16:9 frame with the site's rounded
 * corners. No cards, shadows or gradients — the photographs carry the section.
 * A restrained image zoom on hover is the only desktop interaction. No project
 * names, locations, capacities or client details are published.
 */
function Shot({ slot, sizes }: { slot: ImageSlot; sizes: string }) {
  return (
    <Placeholder
      slot={slot}
      tone="onLight"
      variant="minimal"
      sizes={sizes}
      className="group w-full overflow-hidden rounded-[16px] border border-ink/10 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-house group-hover:[&_img]:scale-[1.04]"
    />
  );
}

export default function Installations() {
  return (
    <section id="projects" className="bg-paper">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionIntro
            overline="Selected installations"
            title="Tanks delivered and commissioned."
            description="A selection of completed sectional water storage installations, supplied and installed by Pipeco."
          />
        </Reveal>

        {/* Lead photograph */}
        <Reveal className="mt-14">
          <Shot
            slot={imageSlots.install1}
            sizes="(min-width: 1024px) 1160px, 100vw"
          />
        </Reveal>

        {/* Supporting pair */}
        <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-8">
          <Reveal>
            <Shot
              slot={imageSlots.install2}
              sizes="(min-width: 768px) 46vw, 100vw"
            />
          </Reveal>
          <Reveal delay={0.05}>
            <Shot
              slot={imageSlots.install3}
              sizes="(min-width: 768px) 46vw, 100vw"
            />
          </Reveal>
        </div>

        {/* View all projects */}
        <Reveal className="mt-12 flex justify-center md:mt-14">
          <Button
            href={projectsCta.href}
            variant="outlineInk"
            size="lg"
            radius="sm"
            withArrow
          >
            {projectsCta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
