import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import { Reveal } from "@/engine/motion";
import { siteConfig } from "@/config/site-config";

/**
 * F — Final quotation / contact section.
 * Strong closing conversion band. Primary: Request a Quote. Secondary: WhatsApp.
 * Also surfaces the real contact details (this section is the #contact target).
 * No CRM is connected — the quote action is an email for now.
 */
const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const mailHref = `mailto:${siteConfig.email}?subject=Tank quote request`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

export default function FinalCta() {
  return (
    <section id="contact" className="bg-mint">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Lead + CTAs */}
          <Reveal className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-forest-muted">
                Request a quote
              </span>
            </div>
            <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tightest text-forest-base md:text-[3.25rem]">
              Tell us your capacity and site. We&rsquo;ll size the tank.
            </h2>
            <p className="mt-6 max-w-lg font-body text-lg leading-8 text-ink/70">
              Send us your required capacity, footprint and location, and our
              team will revert with a specification and quotation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button
                href={mailHref}
                variant="primary"
                size="lg"
                external
                withArrow
                className="px-9 py-4 text-base shadow-card md:text-[17px]"
              >
                Request a Quote
              </Button>
              <Button href={waHref} variant="outlineInk" size="lg" external>
                WhatsApp Sales
              </Button>
            </div>
          </Reveal>

          {/* Contact details */}
          <Reveal className="lg:col-span-5" delay={0.05}>
            <div className="rounded-[3px] border border-forest-base/15 bg-white p-8 md:p-10">
              <dl className="divide-y divide-ink/10">
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <dt className="font-body text-sm text-graphite">Phone</dt>
                  <dd>
                    <a
                      href={telHref}
                      className="font-body font-medium text-forest-base transition-colors hover:text-brass-dark"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="font-body text-sm text-graphite">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-body font-medium text-forest-base transition-colors hover:text-brass-dark"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="font-body text-sm text-graphite">WhatsApp</dt>
                  <dd>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body font-medium text-forest-base transition-colors hover:text-brass-dark"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-4">
                  <dt className="font-body text-sm text-graphite">Address</dt>
                  <dd className="text-right font-body font-medium text-forest-base">
                    {siteConfig.address},<br />
                    {siteConfig.locality}, {siteConfig.postalCode}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
