import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import Button from "@/components/ui/button";
import QuoteForm from "@/components/funnel/quote-form";
import { Reveal } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact Pipeco Tanks South Africa for a sectional water tank quotation — GRP, pressed steel and stainless steel storage, supplied and installed with complete turnkey solutions. Call, WhatsApp, email or request a quote online.",
  path: "/contact",
});

const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp}`;

const details = [
  { icon: Phone, label: "Phone", value: siteConfig.phoneDisplay, href: telHref },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: siteConfig.phoneDisplay,
    href: waHref,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        overline="Contact"
        title="Request a quote."
        lead="Send us the tank type, capacity, application and location, and our team will revert with a specification and quotation. Prefer to talk? Call or WhatsApp us."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
      />

      <section className="bg-mint">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Direct contact */}
            <Reveal className="lg:col-span-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-forest-base">
                Talk to our team
              </h2>
              <p className="mt-4 max-w-md font-body leading-7 text-ink/70">
                We supply and install sectional water tanks across South Africa,
                with complete turnkey water storage — foundations, steel stands
                and installation.
              </p>

              <ul className="mt-8 space-y-4">
                {details.map((d) => (
                  <li key={d.label}>
                    <a
                      href={d.href}
                      {...(d.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-4"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-forest-base/15 bg-white text-forest-base transition-colors group-hover:border-forest-base group-hover:bg-forest-base group-hover:text-white">
                        <d.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block font-body text-xs uppercase tracking-[0.14em] text-graphite">
                          {d.label}
                        </span>
                        <span className="font-body text-[15px] font-medium text-forest-base transition-colors group-hover:text-brass-dark">
                          {d.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-forest-base/15 bg-white text-forest-base">
                    <MapPin className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block font-body text-xs uppercase tracking-[0.14em] text-graphite">
                      Address
                    </span>
                    <span className="font-body text-[15px] font-medium text-forest-base">
                      {siteConfig.address}, {siteConfig.locality},{" "}
                      {siteConfig.region}, {siteConfig.postalCode}
                    </span>
                  </span>
                </li>
              </ul>

              <div className="mt-9">
                <Button href={waHref} variant="outlineInk" size="lg" external>
                  WhatsApp Sales
                </Button>
              </div>
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
    </main>
  );
}
