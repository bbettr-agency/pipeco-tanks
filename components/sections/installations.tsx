import Container from "@/components/layout/container";
import Placeholder from "@/components/ui/placeholder";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal } from "@/engine/motion";
import { installations } from "@/config/homepage-config";
import { imageSlots, type ImageSlotId } from "@/config/image-config";

function Shot({
  image,
  title,
  descriptor,
  sizes,
}: {
  image: ImageSlotId;
  title: string;
  descriptor: string;
  sizes: string;
}) {
  return (
    <figure>
      <Placeholder
        slot={imageSlots[image]}
        tone="onLight"
        variant="minimal"
        sizes={sizes}
        className="w-full border border-ink/10"
      />
      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-4">
        <span className="font-display text-base font-semibold tracking-tight text-forest-base">
          {title}
        </span>
        <span className="font-body text-sm text-graphite">{descriptor}</span>
      </figcaption>
    </figure>
  );
}

/**
 * D — Selected Installations.
 * Asymmetric gallery (one feature + two) with neutral descriptors. No real
 * client names, logos, locations or project details are published.
 */
export default function Installations() {
  const [feature, ...rest] = installations;

  return (
    <section id="projects" className="bg-paper">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionIntro
            overline="Selected installations"
            title="Tanks delivered and commissioned."
            description="A sample of sectional water storage built and installed by Pipeco. Full project profiles will be added with PIPECO."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Shot
              image={feature.image}
              title={feature.title}
              descriptor={feature.descriptor}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </Reveal>
          <div className="grid gap-8 lg:col-span-5">
            {rest.map((item, i) => (
              <Reveal key={item.image} delay={0.05 * (i + 1)}>
                <Shot
                  image={item.image}
                  title={item.title}
                  descriptor={item.descriptor}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
