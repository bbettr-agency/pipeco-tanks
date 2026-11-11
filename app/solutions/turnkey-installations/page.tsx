import type { Metadata } from "next";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import FeatureSplit from "@/components/sections/feature-split";
import RelatedCards from "@/components/sections/related-cards";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import Faq from "@/components/ui/faq";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal, Stagger } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { capabilities } from "@/config/homepage-config";
import { imageSlots } from "@/config/image-config";

export const metadata: Metadata = createMetadata({
  title: "Turnkey Installations",
  description:
    "Turnkey water tank installation by Pipeco — civil foundations, elevated steel stands, tank supply and on-site assembly, sealing and commissioning. One accountable team across South Africa.",
  path: "/solutions/turnkey-installations",
});

const faqs = [
  {
    q: "What does a turnkey installation include?",
    a: "Supply of the sectional tank, the civil foundations it sits on, elevated steel stands where required, and full on-site assembly, sealing and commissioning — all handled by one team.",
  },
  {
    q: "Do you build the foundations?",
    a: "Yes. Our civil team builds the dwarf walls and tank-stand foundations, so the base and the tank are delivered by the same accountable partner.",
  },
  {
    q: "Can you install elevated tanks?",
    a: "Yes — we design and build elevated steel stands for raised, gravity-fed storage.",
  },
  {
    q: "Where do you install?",
    a: "Across South Africa. Pipeco tanks are manufactured in Malaysia and supplied and installed locally by our teams.",
  },
];

export default function TurnkeyPage() {
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: "Turnkey installations", path: "/solutions/turnkey-installations" },
          ]),
          serviceSchema({
            name: "Turnkey water tank installation",
            description:
              "Civil foundations, elevated steel stands, sectional tank supply and on-site installation across South Africa.",
            path: "/solutions/turnkey-installations",
          }),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        variant="split"
        overline="Turnkey water storage"
        title="Foundations, stands and tank — installed as one."
        lead="Pipeco takes responsibility for the whole installation, so there's no gap between a tank supplier and a civil contractor on your site."
        media={{
          src: "/images/projects/completed-installations/install-elevated-crane.jpeg",
          alt: "Sectional water tank lifted onto an elevated steel tower by crane during a Pipeco installation",
        }}
        focus="center 40%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Turnkey installations", href: "/solutions/turnkey-installations" },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Request a turnkey solution
        </Button>
      </PageHero>

      {/* Process */}
      <section className="bg-forest-deepest text-white">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              tone="dark"
              overline="The scope"
              title="Four stages, one team."
              description="From internationally manufactured tanks to the finished, commissioned installation on your site."
            />
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-[16px] border border-white/10 bg-white/10 sm:grid-cols-2">
            {capabilities.map((cap) => (
              <Reveal key={cap.index} preset="fadeUpItem">
                <div className="h-full bg-forest-deepest p-7 md:p-9">
                  <span className="font-display text-sm font-semibold text-brass-light">
                    {cap.index}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">
                    {cap.title}
                  </h3>
                  <p className="mt-3 font-body leading-7 text-white/65">{cap.body}</p>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Civil foundations */}
      <FeatureSplit
        overline="Civil foundations"
        title="We build the base your tank sits on."
        media={{ slot: imageSlots.capabilities }}
      >
        <p>
          A sectional tank is only as sound as its foundation. Our civil team
          builds the dwarf walls and tank-stand foundations to carry the full
          water load, prepared and set before the panels arrive.
        </p>
        <p className="text-base text-ink/65">
          Foundation design is confirmed per site and project.
        </p>
      </FeatureSplit>

      {/* Elevated steel stands */}
      <FeatureSplit
        overline="Elevated steel stands"
        title="Raised, gravity-fed storage."
        media={{
          src: "/images/products/pressed-steel-tanks/image9.png",
          alt: "Pipeco sectional water tank on an elevated steel stand",
        }}
        reverse
        tone="dark"
      >
        <p>
          Where water must be delivered under gravity or kept clear of the ground,
          we design and build elevated steel stands — engineered to carry the tank
          and its contents safely.
        </p>
      </FeatureSplit>

      <Faq
        items={faqs}
        title="Turnkey installation questions."
        description="What's included, and how we work on site."
      />

      <RelatedCards
        overline="Related"
        title="Tanks and specialised solutions."
        columns={2}
        cards={[
          {
            label: "Sectional water tanks",
            href: "/products",
            eyebrow: "Products",
            description: "GRP, pressed steel and stainless steel ranges.",
          },
          {
            label: "Mining refuge chambers",
            href: "/solutions/mining-refuge-chambers",
            eyebrow: "Solution",
            description: "Sectional steel refuge chambers for underground safety.",
          },
        ]}
      />

      <CtaBand
        title="Planning a turnkey water storage project?"
        lead="Tell us about the site and capacity, and our team will scope foundations, stands, tank and installation."
      />
    </main>
  );
}
