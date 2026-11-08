import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

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
import { breadcrumbSchema, productSchema, faqSchema } from "@/lib/schema";
import { products } from "@/config/products-config";
import { productContent } from "@/config/product-content";
import { imageSlots } from "@/config/image-config";

type Params = { product: string };

export function generateStaticParams(): Params[] {
  return products.map((p) => ({ product: p.pageSlug }));
}

function find(slug: string) {
  return products.find((p) => p.pageSlug === slug);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const product = find(params.product);
  if (!product) return createMetadata({ title: "Product" });
  const content = productContent[product.pageSlug];
  return createMetadata({
    title: product.name,
    description: `${content?.tagline ?? product.lede} Supplied and installed by Pipeco Tanks South Africa.`,
    path: `/products/${product.pageSlug}`,
  });
}

export default function ProductPage({ params }: { params: Params }) {
  const product = find(params.product);
  if (!product) notFound();

  const content = productContent[product.pageSlug];
  const feature = imageSlots[product.image];
  const others = products.filter((p) => p.pageSlug !== product.pageSlug);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.pageSlug}` },
          ]),
          productSchema({
            name: product.name,
            description: content?.tagline ?? product.lede,
            image: feature.src ?? "",
            path: `/products/${product.pageSlug}`,
          }),
          ...(content ? [faqSchema(content.faqs)] : []),
        ]}
      />

      <PageHero
        variant="photo"
        overline={`Sectional range · ${product.index}`}
        title={product.name}
        lead={content?.tagline ?? product.lede}
        media={{ slot: feature }}
        focus={content?.heroFocus}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.shortName, href: `/products/${product.pageSlug}` },
        ]}
      >
        <Button
          href={`/contact?tank=${product.tankType}`}
          variant="primary"
          size="lg"
          withArrow
        >
          Request a {product.shortName} quote
        </Button>
        <Button href="#applications" variant="outlineLight" size="lg">
          Applications
        </Button>
      </PageHero>

      {/* Overview + benefits */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionIntro overline="Overview" title="Built for the duty." />
              <p className="mt-6 font-body text-lg leading-8 text-ink/70">
                {product.lede}
              </p>
              <p className="mt-4 font-body leading-7 text-ink/65">
                {product.advantages}
              </p>
            </Reveal>

            <Stagger className="lg:col-span-7 lg:border-t lg:border-ink/10">
              {content?.benefits.map((b, i) => (
                <Reveal key={b.title} preset="fadeUpItem">
                  <div className="flex gap-6 border-t border-ink/10 py-7 first:border-t-0 md:gap-10 lg:first:border-t">
                    <span className="font-display text-sm font-semibold text-forest-muted">
                      0{i + 1}
                    </span>
                    <div className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-8">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-forest-base">
                        {b.title}
                      </h3>
                      <p className="font-body leading-7 text-ink/70">{b.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </Stagger>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {product.gallery.length > 0 && (
        <section className="bg-shell">
          <Container className="py-20 md:py-28">
            <Reveal>
              <SectionIntro
                overline="Gallery"
                title={`${product.shortName} tanks in the field.`}
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 0.05}>
                  <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-ink/10">
                    <Image
                      src={src}
                      alt={`Pipeco ${product.shortName.toLowerCase()} sectional water tank`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-house group-hover:scale-[1.04]"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Applications & industries */}
      <section id="applications" className="bg-forest-deepest text-white scroll-mt-24">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionIntro
                tone="dark"
                overline="Applications"
                title="Where this range fits."
                description={product.applications}
              />
            </Reveal>
            <div className="lg:col-span-7">
              <h3 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-sage">
                Suited to these industries
              </h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content?.industries.map((ind) => (
                  <Link
                    key={ind}
                    href="/industries"
                    className="rounded-full border border-white/15 px-4 py-2 font-body text-sm text-white/80 transition-colors hover:border-brass hover:text-brass-light"
                  >
                    {ind}
                  </Link>
                ))}
              </div>
              <div className="mt-8 rounded-[16px] border border-white/10 bg-white/[0.03] p-6 font-body text-sm leading-6 text-white/60">
                Panel configuration, capacity and coating or grade are confirmed
                with Pipeco for your specific project and site.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Turnkey */}
      <FeatureSplit
        overline="Turnkey delivery"
        title="Supplied and installed by one team."
        media={{ slot: imageSlots.capabilities }}
        reverse
      >
        <p>
          Every {product.shortName.toLowerCase()} tank is delivered as a complete
          turnkey solution. Pipeco builds the civil foundations and, where storage
          must be elevated, the steel stands — then assembles, seals and
          commissions the tank on site.
        </p>
        <ul className="space-y-2.5 pt-1 text-base">
          {["Civil foundations and dwarf walls", "Elevated steel stands where required", "On-site assembly, sealing and commissioning"].map(
            (item) => (
              <li key={item} className="flex items-start gap-3 text-ink/75">
                <Check className="mt-1 h-4 w-4 shrink-0 text-forest-base" />
                <span className="leading-7">{item}</span>
              </li>
            )
          )}
        </ul>
        <div className="pt-2">
          <Button href="/solutions/turnkey-installations" variant="outlineInk" size="md" radius="sm" withArrow>
            Explore turnkey installations
          </Button>
        </div>
      </FeatureSplit>

      {/* FAQ */}
      {content && (
        <Faq
          items={content.faqs}
          title={`${product.shortName} tank questions.`}
          description="Answers to the questions we're asked most. Still unsure? Ask our team."
        />
      )}

      {/* Related ranges */}
      <RelatedCards
        overline="Compare"
        title="Explore the other ranges."
        columns={2}
        cards={others.map((o) => ({
          label: o.name,
          href: `/products/${o.pageSlug}`,
          eyebrow: `Range ${o.index}`,
          description: o.lede,
          image: imageSlots[o.image].src
            ? { src: imageSlots[o.image].src as string, alt: imageSlots[o.image].alt }
            : undefined,
        }))}
      />

      <CtaBand
        title={`Ready to specify your ${product.shortName.toLowerCase()} tank?`}
        lead="Send us the capacity, application and site, and our team will revert with a specification and quotation."
        tankType={product.tankType}
      />
    </main>
  );
}
