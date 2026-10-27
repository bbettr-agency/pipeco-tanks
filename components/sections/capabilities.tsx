import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import Placeholder from "@/components/ui/placeholder";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal, Stagger } from "@/engine/motion";
import { capabilities } from "@/config/homepage-config";
import { imageSlots } from "@/config/image-config";

/**
 * A — Engineering & Installation Capabilities.
 * Dark editorial band: copy + a numbered capability list (hairline rows, not
 * cards) on the left, a clean image placeholder on the right.
 */
export default function Capabilities() {
  return (
    <section id="capabilities" className="bg-forest-dark text-white">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy + capability list */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionIntro
                tone="dark"
                overline="Engineering & installation"
                title={
                  <>
                    Specified, manufactured and
                    <br className="hidden sm:block" /> installed by one team.
                  </>
                }
                description="From first sizing calculation to on-site commissioning, every stage of a Pipeco tank is handled in-house – so the tank that is designed is the tank that gets built and installed."
              />
            </Reveal>

            <Stagger className="mt-14 border-t border-white/10">
              {capabilities.map((cap) => (
                <Reveal key={cap.index} preset="fadeUpItem">
                  <div className="flex gap-6 border-b border-white/10 py-6 md:gap-10">
                    <span className="font-display text-sm font-semibold text-brass-light">
                      {cap.index}
                    </span>
                    <div className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-8">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                        {cap.title}
                      </h3>
                      <p className="font-body leading-7 text-white/65">
                        {cap.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </Stagger>

            <Reveal className="mt-10">
              <Button href="#contact" variant="primary" size="lg" withArrow>
                Request a Quote
              </Button>
            </Reveal>
          </div>

          {/* Image */}
          <div className="lg:col-span-5">
            <Reveal preset="fadeIn" className="lg:sticky lg:top-28">
              <Placeholder
                slot={imageSlots.capabilities}
                tone="onDark"
                variant="minimal"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="w-full border border-white/10"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
