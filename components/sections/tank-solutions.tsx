import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import Placeholder from "@/components/ui/placeholder";
import { Reveal } from "@/engine/motion";
import { products } from "@/config/products-config";
import { imageSlots } from "@/config/image-config";
import { cn } from "@/utils/cn";

/**
 * Tank Solutions showcase.
 *
 * Editorial product index — large index numerals, hairline separators and an
 * alternating composition, rather than three identical cards. Descriptions are
 * category-accurate; hard specifications are deliberately held as a pending
 * line until PIPECO confirms them.
 */
export default function TankSolutions() {
  return (
    <section id="tank-solutions" className="bg-paper">
      <Container className="py-20 md:py-28">
        {/* Section header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-forest-muted">
                The tank range
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tightest text-forest-base md:text-5xl">
              Three sectional systems,
              <br className="hidden sm:block" /> one engineering standard.
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.05}>
            <p className="font-body text-lg leading-8 text-ink/70">
              Select by water quality, environment and capacity – or let our
              technical team recommend the right configuration for your site.
            </p>
          </Reveal>
        </div>

        {/* Product rows */}
        <div className="mt-16 md:mt-20">
          {products.map((product, i) => {
            const imageRight = i % 2 === 0;
            const isLast = i === products.length - 1;

            return (
              <Reveal key={product.slug}>
                <article
                  className={cn(
                    "grid items-center gap-10 border-t border-ink/10 py-16 lg:grid-cols-12 lg:gap-16 md:py-24",
                    isLast && "border-b"
                  )}
                >
                  {/*
                    Text + CTA group. On mobile this is `display: contents`, so
                    the copy and the CTA become direct grid items of the article
                    and can be ordered around the image (copy → image → CTA)
                    without duplicating the button. On desktop it collapses back
                    to a single centred column, leaving the zigzag unchanged.
                  */}
                  <div
                    className={cn(
                      "contents lg:block lg:col-span-5",
                      imageRight ? "lg:order-1" : "lg:order-2"
                    )}
                  >
                    {/* Copy (order 1 on mobile) */}
                    <div className="order-1">
                      <div className="flex items-start gap-5 md:gap-6">
                        <span
                          aria-hidden
                          className="font-display text-4xl font-bold leading-none text-forest-base/15 md:text-5xl"
                        >
                          {product.index}
                        </span>
                        <div className="min-w-0">
                          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-forest-base md:text-[1.9rem]">
                            {product.name}
                          </h3>
                          <p className="mt-4 max-w-md font-body leading-7 text-ink/70">
                            {product.lede}
                          </p>
                          <p className="mt-4 max-w-md font-body text-sm leading-6 text-graphite">
                            {product.advantages}
                          </p>

                          {/* Ideal for — applications, no unverified specs. */}
                          <p className="mt-5 flex items-start gap-3 font-body text-sm">
                            <span
                              className="mt-2 h-px w-7 shrink-0 bg-brass"
                              aria-hidden
                            />
                            <span className="text-forest-base">
                              <span className="font-semibold">Ideal for</span>{" "}
                              {product.applications}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/*
                      CTA (order 3 on mobile → directly below the image; sits
                      under the copy on desktop). The invisible index span
                      mirrors the number column so the button keeps the same
                      left alignment as the copy at every breakpoint. Mobile
                      spacing comes from the grid gap; desktop keeps the mt-8.
                    */}
                    <div className="order-3 mt-0 lg:mt-8">
                      <div className="flex items-start gap-5 md:gap-6">
                        <span
                          aria-hidden
                          className="invisible font-display text-4xl font-bold leading-none md:text-5xl"
                        >
                          {product.index}
                        </span>
                        <div className="min-w-0">
                          <Button
                            href={product.enquiryHref}
                            variant="outlineInk"
                            size="md"
                            radius="sm"
                            withArrow
                          >
                            Enquire about {product.shortName}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image (order 2 on mobile, between copy and CTA) */}
                  <div
                    className={cn(
                      "order-2 lg:col-span-7",
                      imageRight ? "lg:order-2" : "lg:order-1"
                    )}
                  >
                    <Placeholder
                      slot={imageSlots[product.image]}
                      tone="onLight"
                      variant="minimal"
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="w-full overflow-hidden rounded-[16px] border border-ink/10"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
