import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import { Reveal } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { products } from "@/config/products-config";
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
  return createMetadata({
    title: product.name,
    description: `${product.lede} Supplied and installed by Pipeco Tanks South Africa with complete turnkey water storage.`,
    path: `/products/${product.pageSlug}`,
  });
}

export default function ProductPage({ params }: { params: Params }) {
  const product = find(params.product);
  if (!product) notFound();

  const feature = imageSlots[product.image];
  const others = products.filter((p) => p.pageSlug !== product.pageSlug);

  return (
    <main>
      <PageHero
        overline={`Sectional range · ${product.index}`}
        title={product.name}
        lead={product.lede}
        image={feature}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/#tank-solutions" },
          { label: product.shortName, href: `/products/${product.pageSlug}` },
        ]}
      >
        <Button
          href={`/contact?tank=${product.tankType}`}
          variant="primary"
          size="lg"
          withArrow
        >
          Enquire about {product.shortName}
        </Button>
      </PageHero>

      {/* Overview — narrative + qualitative detail card */}
      <section className="bg-paper">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <SectionIntro overline="The range" title="Built for the duty." />
              <div className="mt-6 space-y-5 font-body text-lg leading-8 text-ink/70">
                <p>{product.advantages}</p>
                <p>
                  Every tank is supplied and installed as a complete turnkey
                  solution — Pipeco builds the civil foundations and, where
                  storage must be elevated, the steel stands, then assembles,
                  seals and commissions the tank on site.
                </p>
              </div>
            </Reveal>

            <Reveal preset="fadeIn" className="lg:col-span-5">
              <div className="rounded-[16px] border border-ink/10 bg-white p-8 md:p-10">
                <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-forest-muted">
                  Ideal for
                </h3>
                <p className="mt-4 font-body leading-7 text-ink/75">
                  {product.applications}
                </p>

                <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.16em] text-forest-muted">
                  Turnkey delivery
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Civil foundations and dwarf walls",
                    "Elevated steel stands where required",
                    "On-site assembly, sealing and commissioning",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-ink/75">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-forest-base" />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 border-t border-ink/10 pt-6 font-body text-sm leading-6 text-graphite">
                  Panel configuration, capacity and coating or grade are
                  confirmed with Pipeco for your specific project and site.
                </p>
                <div className="mt-6">
                  <Button
                    href={`/contact?tank=${product.tankType}`}
                    variant="outlineInk"
                    size="md"
                    radius="sm"
                    withArrow
                  >
                    Enquire about {product.shortName}
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Gallery — real photographs of this range, when supplied */}
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

      {/* Other ranges */}
      <section className="bg-paper">
        <Container className="py-16 md:py-20">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-forest-base">
              Explore the other ranges
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {others.map((o) => (
              <Reveal key={o.pageSlug}>
                <Link
                  href={`/products/${o.pageSlug}`}
                  className="group flex items-center justify-between gap-6 rounded-[16px] border border-ink/10 bg-white px-6 py-6 transition-colors hover:border-forest-base/40"
                >
                  <span>
                    <span className="font-display text-sm font-semibold text-forest-muted">
                      {o.index}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold tracking-tight text-forest-base">
                      {o.name}
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 text-forest-base transition-transform duration-300 ease-house group-hover:translate-x-1" />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand tankType={product.tankType} />
    </main>
  );
}
