import { Suspense } from "react";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import QuoteForm from "@/components/funnel/quote-form";
import { Reveal } from "@/engine/motion";
import { siteConfig } from "@/config/site-config";

/**
 * F — Final quotation / contact section.
 *
 * Primary conversion is the integrated quote form (right), which posts to the
 * server-side /api/quote route. WhatsApp and direct contact details remain as
 * alternatives (left). This section is the #contact target for every
 * "Request a Quote" CTA on the page.
 */
const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

export default function FinalCta() {
  return (
    <section id="contact" className="bg-mint">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch + alternative contact */}
          <Reveal className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-forest-muted">
                Request a quote
              </span>
            </div>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tightest text-forest-base md:text-[3rem]">
              Tell us your capacity and site. We&rsquo;ll size the tank.
            </h2>
            <p className="mt-6 max-w-md font-body text-lg leading-8 text-ink/70">
              Send us the tank type, capacity, application and location, and our
              team will revert with a specification and quotation.
            </p>

            <div className="mt-8">
              <Button href={waHref} variant="outlineInk" size="lg" external>
                WhatsApp Sales
              </Button>
            </div>

            <dl className="mt-10 space-y-2.5 border-t border-forest-base/15 pt-6 font-body text-sm">
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-graphite">Phone</dt>
                <dd>
                  <a
                    href={telHref}
                    className="font-medium text-forest-base transition-colors hover:text-brass-dark"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-graphite">Email</dt>
                <dd>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-forest-base transition-colors hover:text-brass-dark"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-graphite">Address</dt>
                <dd className="font-medium text-forest-base">
                  {siteConfig.address}, {siteConfig.locality},{" "}
                  {siteConfig.postalCode}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Quote form */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <Suspense
              fallback={
                <div className="min-h-[520px] rounded-[3px] border border-forest-base/15 bg-white" />
              }
            >
              <QuoteForm />
            </Suspense>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
