import type { Metadata } from "next";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import Portfolio from "@/components/projects/portfolio";
import { Reveal } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Selected sectional water tank installations supplied and installed by Pipeco Tanks South Africa — from civil foundations to commissioned tanks. Browse the portfolio and discuss your project.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />

      <PageHero
        variant="split"
        overline="Selected installations"
        title="Water storage, delivered on the ground."
        lead="A selection of sectional water storage work across South Africa — supplied and installed by Pipeco, from civil foundations to the finished tank."
        media={{
          src: "/images/projects/completed-installations/install-elevated-crane.jpeg",
          alt: "Sectional water tank lifted onto an elevated steel tower by crane during a Pipeco installation",
        }}
        focus="center 40%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Discuss your project
        </Button>
      </PageHero>

      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              overline="Our work"
              title="From foundations to commissioned tanks."
              description="Filter by the stage of work. More installations are added as they are confirmed for publication."
            />
          </Reveal>

          <div className="mt-12">
            <Portfolio />
          </div>

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
