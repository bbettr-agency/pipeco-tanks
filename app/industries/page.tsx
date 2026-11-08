import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal, Stagger } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { industries } from "@/config/industries-config";
import { imageSlots } from "@/config/image-config";

export const metadata: Metadata = createMetadata({
  title: "Industries & Applications",
  description:
    "Sectional water storage for mining, commercial and industrial, infrastructure and municipal, fire-water and agriculture. See how Pipeco's GRP, pressed steel and stainless tanks are put to work across South Africa.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      <PageHero
        variant="photo"
        overline="Industries & applications"
        title="Where Pipeco tanks are put to work."
        lead="Sectional water storage scales from a single rooftop reserve to bulk municipal and mining supply. These are the sectors our tanks and turnkey solutions are built for."
        media={{ slot: imageSlots.hero }}
        focus="center 55%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              overline="Sectors we serve"
              title="Built for the realities of each sector."
              description="Every industry has its own water challenge. Here's how the Pipeco range fits, and where to go next."
            />
          </Reveal>

          <Stagger className="mt-14 border-t border-ink/10">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} preset="fadeUpItem">
                <article className="grid gap-5 border-b border-ink/10 py-10 md:grid-cols-12 md:gap-10">
                  <div className="md:col-span-4">
                    <span className="font-display text-sm font-semibold text-forest-muted">
                      0{i + 1}
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-forest-base">
                      {ind.name}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="max-w-2xl font-body text-lg leading-8 text-ink/70">
                      {ind.detail}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      {ind.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-forest-base"
                        >
                          {link.label}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand
        title="Not sure which tank suits your sector?"
        lead="Tell us about your application and site, and our technical team will recommend the right configuration."
      />
    </main>
  );
}
