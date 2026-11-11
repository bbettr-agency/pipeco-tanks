import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import { Reveal } from "@/engine/motion";
import { siteConfig } from "@/config/site-config";
import { quoteCta } from "@/config/navigation-config";

/**
 * Closing call-to-action band for interior pages.
 *
 * A deep-forest band that routes to the dedicated quotation page, with WhatsApp
 * as the immediate alternative. Reused across the interior pages so every page
 * ends on the same clear next step without repeating the full contact form.
 */
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

type CtaBandProps = {
  title?: string;
  lead?: string;
  /** Preselect a tank type on the quote page, e.g. "grp". */
  tankType?: string;
};

export default function CtaBand({
  title = "Ready to size your water storage?",
  lead = "Tell us the tank type, capacity, application and site, and our team will revert with a specification and quotation.",
  tankType,
}: CtaBandProps) {
  const quoteHref = tankType
    ? `${quoteCta.href}?tank=${tankType}`
    : quoteCta.href;

  return (
    <section className="bg-forest-deepest text-white">
      <Container className="py-20 md:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brass" />
              <span className="font-body text-sm font-medium text-sage">
                Request a quote
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tightest md:text-[2.75rem]">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-8 text-white/75">
              {lead}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button href={quoteHref} variant="primary" size="lg" withArrow>
                Request a Quote
              </Button>
              <Button href={waHref} variant="outlineLight" size="lg" external>
                WhatsApp Sales
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
