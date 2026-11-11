import { Suspense } from "react";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import QuoteForm from "@/components/funnel/quote-form";
import { Reveal } from "@/engine/motion";
import { siteConfig } from "@/config/site-config";

/**
 * F — Final quotation / contact section.
 *
 * Deep-forest ground with a light editorial column (left) and the shared
 * multi-step quote form on a clean off-white panel (right). This section is the
 * #contact target for every "Request a Quote" CTA on the page.
 */
const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

const contactRows = [
  { label: "Phone", value: siteConfig.phoneDisplay, href: telHref },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    label: "Address",
    value: `${siteConfig.address}, ${siteConfig.locality}, ${siteConfig.postalCode}`,
  },
];

export default function FinalCta() {
  return (
    <section id="contact" className="bg-forest-deepest">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Pitch + alternative contact */}
          <Reveal className="min-w-0 lg:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-brass-light">
                Request a quote
              </span>
            </div>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tightest text-white md:text-[3rem]">
              Tell us your capacity and site. We&rsquo;ll size the tank.
            </h2>
            <p className="mt-6 max-w-md font-body text-lg leading-8 text-white/70">
              Three quick steps — your details, the tank you need and the site.
              Our team reverts with a specification and quotation.
            </p>

            <div className="mt-8">
              <Button href={waHref} variant="outlineLight" size="lg" external>
                WhatsApp Sales
              </Button>
            </div>

            <dl className="mt-10 space-y-2.5 border-t border-white/15 pt-6 font-body text-sm">
              {contactRows.map((row) => (
                <div key={row.label} className="flex gap-3">
                  <dt className="w-20 shrink-0 text-white/50">{row.label}</dt>
                  <dd className="min-w-0 break-words">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="font-medium text-white transition-colors hover:text-brass-light"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="font-medium text-white/90">{row.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Quote form */}
          <Reveal className="min-w-0 lg:col-span-7" delay={0.05}>
            <Suspense
              fallback={
                <div className="min-h-[520px] rounded-[4px] border border-white/10 bg-white/95" />
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
