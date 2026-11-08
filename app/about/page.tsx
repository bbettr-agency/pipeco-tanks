import type { Metadata } from "next";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import Placeholder from "@/components/ui/placeholder";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import { Reveal, Stagger } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { imageSlots } from "@/config/image-config";
import { capabilities, whyPoints, applications } from "@/config/homepage-config";
import { quoteCta } from "@/config/navigation-config";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Pipeco Tanks South Africa supplies and installs internationally manufactured GRP, pressed steel and stainless steel sectional water tanks, with complete turnkey water storage — civil foundations, elevated steel stands and installation.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <PageHero
        overline="About Pipeco"
        title="Water storage, delivered by one accountable team."
        lead="Pipeco Tanks South Africa supplies and installs sectional water tanks — and builds the civil works that go with them — so a single team is responsible from the foundation to the final panel."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
      >
        <Button href={quoteCta.href} variant="primary" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      {/* Overview — statement + narrative beside a turnkey photograph */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <SectionIntro
                overline="Who we are"
                title="Internationally manufactured. Locally supplied and installed."
              />
              <div className="mt-6 space-y-5 font-body text-lg leading-8 text-ink/70">
                <p>
                  Pipeco&rsquo;s GRP, pressed steel and stainless steel sectional
                  tanks are manufactured in Malaysia and supplied for projects
                  across South Africa. We are the local supply and installation
                  partner — not a local manufacturer.
                </p>
                <p>
                  Backed by more than 20 years of sectional water tank
                  experience, our teams deliver the complete turnkey solution:
                  the civil foundations the tank sits on, the elevated steel
                  stands for gravity-fed storage, and the on-site assembly,
                  sealing and commissioning.
                </p>
                <p>
                  The result is bulk water storage for commercial, industrial,
                  mining and infrastructure sites — handled end to end by people
                  who are accountable for the whole installation.
                </p>
              </div>
            </Reveal>

            <Reveal preset="fadeIn" className="lg:col-span-6">
              <Placeholder
                slot={imageSlots.capabilities}
                tone="onLight"
                variant="minimal"
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="w-full overflow-hidden rounded-[16px] border border-ink/10"
              />
            </Reveal>
          </div>
        </Container>
      </section>

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

      {/* Industries served — concise hairline list */}
      <section className="bg-forest-deepest text-white">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              tone="dark"
              align="center"
              overline="Industries & applications"
              title="Where Pipeco tanks are put to work."
            />
          </Reveal>
          <Stagger className="mx-auto mt-12 max-w-3xl border-t border-white/10">
            {applications.map((app) => (
              <Reveal key={app.name} preset="fadeUpItem">
                <div className="grid gap-1.5 border-b border-white/10 py-6 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                    {app.name}
                  </h3>
                  <p className="font-body leading-7 text-white/65">{app.note}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
