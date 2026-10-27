import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal, Stagger } from "@/engine/motion";
import { whyPoints } from "@/config/homepage-config";

/**
 * E — Why PIPECO.
 * Genuine, verified differentiators. Editorial two-column layout (statement +
 * numbered list), not a three-card grid. No invented stats or certifications.
 * The "more than 20 years" line is onboarding-stated.
 */
export default function WhyPipeco() {
  return (
    <section id="about" className="bg-forest-dark text-white">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionIntro
              tone="dark"
              overline="Why Pipeco"
              title="Water storage you only buy once."
              description="With more than 20 years in sectional water storage, Pipeco builds tanks to last – and stands behind them for the life of the installation."
            />
          </Reveal>

          <Stagger className="lg:col-span-7 lg:border-t lg:border-white/10">
            {whyPoints.map((point) => (
              <Reveal key={point.index} preset="fadeUpItem">
                <div className="flex gap-6 border-t border-white/10 py-7 first:border-t-0 md:gap-10 lg:first:border-t lg:py-8">
                  <span className="font-display text-sm font-semibold text-brass-light">
                    {point.index}
                  </span>
                  <div className="grid gap-2 md:grid-cols-[16rem_1fr] md:gap-8">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                      {point.title}
                    </h3>
                    <p className="font-body leading-7 text-white/65">
                      {point.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
