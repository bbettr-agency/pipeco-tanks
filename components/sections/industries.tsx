import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal, Stagger } from "@/engine/motion";
import { applications } from "@/config/homepage-config";

/**
 * C — Industries & Applications.
 * Clean editorial list (name + application note in hairline rows) on a dark
 * ground — not an icon-card grid.
 */
export default function Industries() {
  return (
    <section id="industries" className="bg-forest-deepest text-white">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionIntro
            tone="dark"
            overline="Industries & applications"
            title="Where Pipeco tanks are put to work."
            description="Sectional water storage scales from a single rooftop reserve to bulk municipal and mining supply. These are the settings our tanks are built for."
          />
        </Reveal>

        <Stagger className="mt-14 border-t border-white/10">
          {applications.map((app) => (
            <Reveal key={app.name} preset="fadeUpItem">
              <div className="grid gap-2 border-b border-white/10 py-7 md:grid-cols-[18rem_1fr] md:items-baseline md:gap-10">
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                  {app.name}
                </h3>
                <p className="max-w-2xl font-body leading-7 text-white/65">
                  {app.note}
                </p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
