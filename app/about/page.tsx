import type { Metadata } from "next";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import FeatureSplit from "@/components/sections/feature-split";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal, Stagger } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { imageSlots } from "@/config/image-config";
import { capabilities, whyPoints } from "@/config/homepage-config";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Pipeco Tanks South Africa supplies and installs internationally manufactured GRP, pressed steel and stainless steel sectional water tanks, with complete turnkey water storage — civil foundations, elevated steel stands and installation.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        variant="photo"
        overline="About Pipeco"
        title="Water storage, delivered by one accountable team."
        lead="We supply and install sectional water tanks — and build the civil works that go with them — so a single team is responsible from the foundation to the final panel."
        media={{ slot: imageSlots.hero }}
        focus="center 45%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      {/* Who we are */}
      <FeatureSplit
        overline="Who we are"
        title="Internationally manufactured. Locally supplied and installed."
        media={{ slot: imageSlots.capabilities }}
      >
        <p>
          Pipeco&rsquo;s GRP, pressed steel and stainless steel sectional tanks
          are manufactured in Malaysia and supplied for projects across South
          Africa. We are the local supply and installation partner — not a local
          manufacturer.
        </p>
        <p>
          Backed by more than 20 years of sectional water tank experience, our
          teams deliver the complete turnkey solution: the civil foundations the
          tank sits on, the elevated steel stands for gravity-fed storage, and the
          on-site assembly, sealing and commissioning.
        </p>
        <p className="text-base text-ink/65">
          The result is bulk water storage for commercial, industrial, mining and
          infrastructure sites — handled end to end by people accountable for the
          whole installation.
        </p>
      </FeatureSplit>

      {/* Turnkey capabilities */}
      <section className="bg-forest-dark text-white">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              tone="dark"
              overline="What we do"
              title="Turnkey water storage, from the ground up."
              description="Four capabilities, handled by one team, so nothing falls between a tank supplier and a civil contractor."
            />
          </Reveal>
          <Stagger className="mt-14 border-t border-white/10">
            {capabilities.map((cap) => (
              <Reveal key={cap.index} preset="fadeUpItem">
                <div className="flex gap-6 border-b border-white/10 py-6 md:gap-10">
                  <span className="font-display text-sm font-semibold text-brass-light">
                    {cap.index}
                  </span>
                  <div className="grid gap-2 md:grid-cols-[16rem_1fr] md:gap-8">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                      {cap.title}
                    </h3>
                    <p className="font-body leading-7 text-white/65">{cap.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Why Pipeco */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionIntro
                overline="Why Pipeco"
                title="Water storage you only buy once."
                description="Genuine, verified differentiators — no invented statistics or certifications."
              />
              <div className="mt-8">
                <Button href="/industries" variant="outlineInk" size="md" radius="sm" withArrow>
                  Industries we serve
                </Button>
              </div>
            </Reveal>
            <Stagger className="lg:col-span-7">
              {whyPoints.map((point) => (
                <Reveal key={point.index} preset="fadeUpItem">
                  <div className="flex gap-6 border-t border-ink/10 py-7 first:border-t-0 md:gap-10 lg:first:border-t lg:py-8">
                    <span className="font-display text-sm font-semibold text-forest-muted">
                      {point.index}
                    </span>
                    <div className="grid gap-2 md:grid-cols-[16rem_1fr] md:gap-8">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-forest-base">
                        {point.title}
                      </h3>
                      <p className="font-body leading-7 text-ink/70">{point.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
