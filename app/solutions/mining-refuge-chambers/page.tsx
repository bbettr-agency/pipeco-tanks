import type { Metadata } from "next";
import { Check } from "lucide-react";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import RelatedCards from "@/components/sections/related-cards";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import Faq from "@/components/ui/faq";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal, Stagger } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";
import { imageSlots } from "@/config/image-config";

export const metadata: Metadata = createMetadata({
  title: "Mining Refuge Chambers",
  description:
    "Sectional steel underground mining refuge chambers by Pipeco — a sealed, structurally sound place for crews to shelter in an emergency, built to the same sectional engineering standard as our water tanks.",
  path: "/solutions/mining-refuge-chambers",
});

const reasons = [
  {
    index: "01",
    title: "Structurally sound",
    body: "A sealed sectional steel enclosure, engineered and built into the mining operation.",
  },
  {
    index: "02",
    title: "Proven sectional engineering",
    body: "Built to the same sectional panel standard as our water storage tanks.",
  },
  {
    index: "03",
    title: "One accountable team",
    body: "Designed, supplied and installed on site by Pipeco — not handed between suppliers.",
  },
];

const faqs = [
  {
    q: "What is a mining refuge chamber?",
    a: "A sealed, structurally sound space built into an underground operation where crews can shelter during an emergency.",
  },
  {
    q: "How is it built?",
    a: "From sectional steel panels — the same proven engineering approach as our water storage tanks — engineered to the mine's requirements and installed on site.",
  },
  {
    q: "What size and rating can you provide?",
    a: "Chamber size, rating and emergency provisioning are engineered to your mine's requirements and confirmed with Pipeco.",
  },
  {
    q: "Do you install on site?",
    a: "Yes — Pipeco designs, supplies and installs the chamber, so one team is accountable from start to finish.",
  },
];

export default function RefugeChambersPage() {
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Solutions", path: "/solutions" },
            { name: "Mining refuge chambers", path: "/solutions/mining-refuge-chambers" },
          ]),
          serviceSchema({
            name: "Mining refuge chambers",
            description:
              "Sectional steel underground mining refuge chambers, engineered and installed by Pipeco.",
            path: "/solutions/mining-refuge-chambers",
            serviceType: "Mining refuge chamber supply and installation",
          }),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        variant="split"
        overline="A Pipeco specialisation"
        title="Underground mining refuge chambers."
        lead="Sectional steel refuge chambers, engineered and built into mining operations — a sealed, structurally sound place for crews to shelter in an emergency underground."
        media={{ slot: imageSlots.refuge }}
        focus="center 40%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Mining refuge chambers", href: "/solutions/mining-refuge-chambers" },
        ]}
      >
        <Button href="/contact?tank=refuge" variant="primary" size="lg" withArrow>
          Enquire about refuge chambers
        </Button>
      </PageHero>

      {/* What it is */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionIntro
                overline="The chamber"
                title="A safe place to shelter, built into the operation."
              />
              <div className="mt-6 space-y-5 font-body text-lg leading-8 text-ink/70">
                <p>
                  A refuge chamber gives crews a sealed, structurally sound space
                  to shelter during an underground emergency. Pipeco builds these
                  chambers from sectional steel panels — the same proven
                  engineering approach behind our water storage tanks.
                </p>
                <p>
                  Each chamber is engineered to the mine&rsquo;s requirements and
                  installed on site by our team, so one partner is accountable for
                  the build from start to finish.
                </p>
              </div>
            </Reveal>

            <Reveal preset="fadeIn" className="lg:col-span-5">
              <div className="rounded-[16px] border border-ink/10 bg-white p-8 md:p-10">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-forest-muted">
                  At a glance
                </h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "Sealed sectional steel construction",
                    "Built into active mining operations",
                    "Same engineering standard as our water tanks",
                    "Supplied and installed by one team",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-ink/75">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-forest-base" />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-ink/10 pt-6 font-body text-sm leading-6 text-graphite">
                  Chamber size, rating and emergency provisioning are engineered
                  to your mine&rsquo;s requirements and confirmed with Pipeco.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Why Pipeco */}
      <section className="bg-forest-deepest text-white">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              tone="dark"
              overline="Why Pipeco"
              title="Built to the standard that holds our tanks together."
            />
          </Reveal>
          <Stagger className="mt-14 border-t border-white/10">
            {reasons.map((r) => (
              <Reveal key={r.index} preset="fadeUpItem">
                <div className="flex gap-6 border-b border-white/10 py-6 md:gap-10">
                  <span className="font-display text-sm font-semibold text-brass-light">
                    {r.index}
                  </span>
                  <div className="grid gap-2 md:grid-cols-[18rem_1fr] md:gap-8">
                    <h3 className="font-display text-lg font-semibold tracking-tight text-white">
                      {r.title}
                    </h3>
                    <p className="font-body leading-7 text-white/65">{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      <Faq items={faqs} title="Refuge chamber questions." />

      <RelatedCards
        overline="Related"
        title="Explore our water storage."
        columns={2}
        cards={[
          {
            label: "Turnkey installations",
            href: "/solutions/turnkey-installations",
            eyebrow: "Solution",
            description: "Foundations, elevated stands and complete tank installation.",
          },
          {
            label: "Sectional water tanks",
            href: "/products",
            eyebrow: "Products",
            description: "GRP, pressed steel and stainless steel ranges.",
          },
        ]}
      />

      <CtaBand
        title="Specifying a refuge chamber?"
        lead="Tell us about the site and operation, and our team will engineer a chamber to your requirements."
        tankType="refuge"
      />
    </main>
  );
}
