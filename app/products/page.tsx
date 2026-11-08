import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import FeatureSplit from "@/components/sections/feature-split";
import RelatedCards from "@/components/sections/related-cards";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { products } from "@/config/products-config";
import { productContent } from "@/config/product-content";
import { imageSlots } from "@/config/image-config";

export const metadata: Metadata = createMetadata({
  title: "Sectional Water Tanks",
  description:
    "GRP, pressed steel and stainless steel sectional water tanks from Pipeco Tanks South Africa — supplied and installed with complete turnkey water storage. Compare the ranges and request a quote.",
  path: "/products",
});

const comparison = [
  { label: "Material", values: ["Glass-reinforced plastic", "Hot-pressed steel", "Stainless steel"] },
  { label: "Best for", values: ["Potable & restricted access", "Large bulk storage", "Hygienic & corrosive duty"] },
  { label: "Key strength", values: ["Corrosion-free & light", "Robust & cost-effective", "Longest service life"] },
  { label: "Typical use", values: ["Rooftop, coastal, potable", "Municipal, mining, fire", "Food-grade, healthcare"] },
];

export default function ProductsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />

      <PageHero
        variant="split"
        overline="Sectional water tanks"
        title={
          <>
            Three sectional ranges,
            <br className="hidden sm:block" /> one engineering standard.
          </>
        }
        lead="GRP, pressed steel and stainless steel panel tanks — supplied and installed across South Africa with complete turnkey water storage."
        media={{ slot: imageSlots.productGrp }}
        focus="center 60%"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Request a Quote
        </Button>
      </PageHero>

      {/* Selection comparison */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <Reveal>
            <SectionIntro
              overline="Choose your range"
              title="Select by water quality, environment and capacity."
              description="A quick comparison of the three ranges. Not sure which fits? Our technical team will recommend the right configuration for your site."
            />
          </Reveal>

          {/* Desktop table */}
          <Reveal className="mt-12 hidden md:block">
            <div className="overflow-hidden rounded-[16px] border border-ink/10">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-forest-deepest text-white">
                    <th className="w-44 px-6 py-5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                      &nbsp;
                    </th>
                    {products.map((p) => (
                      <th key={p.slug} className="px-6 py-5">
                        <span className="font-display text-lg font-semibold tracking-tight">
                          {p.shortName}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, ri) => (
                    <tr key={row.label} className={ri % 2 ? "bg-shell/50" : "bg-white"}>
                      <th className="px-6 py-5 align-top font-body text-sm font-semibold text-forest-muted">
                        {row.label}
                      </th>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-6 py-5 align-top font-body text-ink/75">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-white">
                    <th className="px-6 py-5" />
                    {products.map((p) => (
                      <td key={p.slug} className="px-6 py-5">
                        <Link
                          href={`/products/${p.pageSlug}`}
                          className="group inline-flex items-center gap-1.5 font-display text-sm font-semibold text-forest-base"
                        >
                          View {p.shortName}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile cards */}
          <div className="mt-10 grid gap-5 md:hidden">
            {products.map((p, pi) => (
              <Reveal key={p.slug}>
                <Link
                  href={`/products/${p.pageSlug}`}
                  className="block rounded-[16px] border border-ink/10 bg-white p-6"
                >
                  <span className="font-display text-sm font-semibold text-forest-muted">
                    {p.index}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-forest-base">
                    {p.shortName}
                  </h3>
                  <dl className="mt-4 space-y-2">
                    {comparison.map((row) => (
                      <div key={row.label} className="flex gap-3 text-sm">
                        <dt className="w-28 shrink-0 text-graphite">{row.label}</dt>
                        <dd className="text-ink/75">{row.values[pi]}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-forest-base">
                    View {p.shortName}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The three ranges, alternating */}
      {products.map((product, i) => {
        const content = productContent[product.pageSlug];
        return (
          <FeatureSplit
            key={product.slug}
            overline={`Range ${product.index}`}
            title={product.name}
            media={{ slot: imageSlots[product.image] }}
            reverse={i % 2 === 1}
            tone={i % 2 === 1 ? "dark" : "light"}
            focus={content?.heroFocus}
          >
            <p>{product.lede}</p>
            <p className="text-base">
              <span className="font-semibold text-forest-base">Ideal for</span>{" "}
              {product.applications}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                href={`/products/${product.pageSlug}`}
                variant={i % 2 === 1 ? "outlineLight" : "outlineInk"}
                size="md"
                radius="sm"
                withArrow
              >
                View {product.shortName}
              </Button>
              <Button
                href={`/contact?tank=${product.tankType}`}
                variant="primary"
                size="md"
                radius="sm"
              >
                Request a quote
              </Button>
            </div>
          </FeatureSplit>
        );
      })}

      <RelatedCards
        overline="Beyond the tank"
        title="Complete turnkey water storage."
        tone="dark"
        columns={2}
        cards={[
          {
            label: "Turnkey installations",
            href: "/solutions/turnkey-installations",
            eyebrow: "Solutions",
            description: "Civil foundations, elevated steel stands and on-site installation by one team.",
          },
          {
            label: "Mining refuge chambers",
            href: "/solutions/mining-refuge-chambers",
            eyebrow: "Solutions",
            description: "Sectional steel refuge chambers engineered for underground safety.",
          },
        ]}
      />

      <CtaBand />
    </main>
  );
}
