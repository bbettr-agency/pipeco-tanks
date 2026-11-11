import type { Metadata } from "next";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import RelatedCards from "@/components/sections/related-cards";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal, Stagger } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { capabilities } from "@/config/homepage-config";
import { imageSlots } from "@/config/image-config";

export const metadata: Metadata = createMetadata({
  title: "Solutions",
  description:
    "Complete turnkey water storage from Pipeco — civil foundations, elevated steel stands, tank installation, and specialised underground mining refuge chambers. Supplied and installed across South Africa.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />

      <PageHero
        variant="split"
        overline="Turnkey water storage"
        title="More than a tank. A complete solution."
        lead="Pipeco delivers the whole water storage installation — foundations, stands, tank and commissioning — plus specialised sectional steel refuge chambers for mining."
        media={{ slot: imageSlots.capabilities }}
        focus="center 55%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      {/* Capabilities */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              overline="What we deliver"
              title="From the ground up, by one accountable team."
              description="Nothing falls between a tank supplier and a civil contractor — Pipeco handles the full scope."
            />
          </Reveal>
          <Stagger className="mt-14 border-t border-ink/10">
            {capabilities.map((cap) => (
              <Reveal key={cap.index} preset="fadeUpItem">
                <div className="flex gap-6 border-b border-ink/10 py-6 md:gap-10">
                  <span className="font-display text-sm font-semibold text-forest-muted">
                    {cap.index}
                  </span>
                  <div className="grid gap-2 md:grid-cols-[16rem_1fr] md:gap-8">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-forest-base">
                      {cap.title}
                    </h3>
                    <p className="font-body leading-7 text-ink/70">{cap.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* The two solution areas */}
      <RelatedCards
        overline="Explore solutions"
        title="Two ways we go beyond supply."
        tone="dark"
        columns={2}
        cards={[
          {
            label: "Turnkey installations",
            href: "/solutions/turnkey-installations",
            eyebrow: "Solution",
            description: "Civil foundations, elevated steel stands and complete on-site installation.",
            image: imageSlots.capabilities.src
              ? { src: imageSlots.capabilities.src, alt: imageSlots.capabilities.alt }
              : undefined,
          },
          {
            label: "Mining refuge chambers",
            href: "/solutions/mining-refuge-chambers",
            eyebrow: "Solution",
            description: "Sectional steel refuge chambers engineered and built into mining operations.",
            image: imageSlots.refuge.src
              ? { src: imageSlots.refuge.src, alt: imageSlots.refuge.alt }
              : undefined,
          },
        ]}
      />

      <CtaBand />
    </main>
  );
}
