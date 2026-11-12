import type { Metadata } from "next";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";
import LeadConversion from "@/components/funnel/lead-conversion";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Thank you",
  description:
    "Your quotation request has been submitted to Pipeco Tanks South Africa.",
  path: "/thank-you",
  noindex: true,
});

/**
 * Quotation confirmation page. The visitor only reaches it after the quote form
 * receives a server-confirmed { ok: true }. No form data is shown and no
 * customer detail appears in the URL.
 */
export default function ThankYouPage() {
  return (
    <main className="bg-forest-deepest text-white">
      {/* Fires the one-time, non-PII generate_lead signal (if present). */}
      <LeadConversion />

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full opacity-[0.12] blur-3xl"
          style={{ background: "radial-gradient(circle, #B4895A 0%, transparent 70%)" }}
        />
        <Container className="flex min-h-[72vh] flex-col items-center justify-center py-24 text-center md:py-32">
          <div className="mb-6 flex items-center gap-3">
            <span aria-hidden className="h-px w-10 bg-brass" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.22em] text-brass-light">
              Enquiry received
            </span>
            <span aria-hidden className="h-px w-10 bg-brass" />
          </div>

          <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tightest md:text-5xl lg:text-[3.5rem]">
            Thank you for your enquiry.
          </h1>

          <p className="mt-6 max-w-xl font-body text-lg leading-8 text-white/80">
            Your quotation request has been successfully submitted to PIPECO.
          </p>
          <p className="mt-3 max-w-xl font-body leading-8 text-white/60">
            Our team will review your project requirements and contact you
            regarding the next steps.
          </p>

          <div className="mt-10">
            <Button href="/" variant="primary" size="lg" withArrow>
              Return to homepage
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
