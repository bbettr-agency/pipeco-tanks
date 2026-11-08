import type { Metadata } from "next";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import Placeholder from "@/components/ui/placeholder";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import { Reveal } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { projects, type Project } from "@/config/projects-config";
import { quoteCta } from "@/config/navigation-config";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Selected sectional water tank installations supplied and installed by Pipeco Tanks South Africa — GRP, pressed steel and stainless steel storage delivered and commissioned on site.",
  path: "/projects",
});

function Shot({ project, sizes }: { project: Project; sizes: string }) {
  return (
    <figure>
      <div className="group w-full overflow-hidden rounded-[16px] border border-ink/10 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-house group-hover:[&_img]:scale-[1.04]">
        <Placeholder
          slot={project.slot}
          tone="onLight"
          variant="minimal"
          sizes={sizes}
          className="w-full"
        />
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-3">
        <span className="font-display text-base font-semibold tracking-tight text-forest-base">
          {project.caption}
        </span>
        <span className="font-body text-xs uppercase tracking-[0.14em] text-graphite">
          {project.descriptor}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProjectsPage() {
  const [lead, ...rest] = projects;

  return (
    <main>
      <PageHero
        overline="Selected installations"
        title="Tanks delivered and commissioned."
        lead="A selection of sectional water storage projects — supplied and installed across South Africa by Pipeco, from civil foundations to the finished tank. More projects are added as they are confirmed for publication."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
        ]}
      >
        <Button href={quoteCta.href} variant="primary" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          {/* Lead photograph */}
          {lead && (
            <Reveal>
              <Shot project={lead} sizes="(min-width: 1024px) 1160px, 100vw" />
            </Reveal>
          )}

          {/* Supporting installations — flows into the grid automatically as
              more are added to projects-config. */}
          {rest.length > 0 && (
            <div className="mt-10 grid gap-x-8 gap-y-12 md:mt-14 md:grid-cols-2">
              {rest.map((project, i) => (
                <Reveal key={project.slot.id} delay={i * 0.05}>
                  <Shot project={project} sizes="(min-width: 768px) 46vw, 100vw" />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-16">
            <p className="mx-auto max-w-2xl text-center font-body leading-7 text-ink/60">
              Project names, locations and capacities are shown only once
              confirmed for publication with the client. For references relevant
              to your sector, please ask our team.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Planning a water storage project?"
        lead="Share your capacity, application and site, and we'll come back with a specification and quotation."
      />
    </main>
  );
}
