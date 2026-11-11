import { Plus } from "lucide-react";

import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal } from "@/engine/motion";

export type FaqItem = { q: string; a: string };

/**
 * FAQ section — native <details> disclosures (no client JS, fully accessible
 * and keyboard-operable). The icon rotates via the open state.
 */
export default function Faq({
  items,
  overline = "FAQs",
  title = "Common questions.",
  description,
}: {
  items: FaqItem[];
  overline?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-paper">
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionIntro overline={overline} title={title} description={description} />
          </Reveal>

          <div className="divide-y divide-ink/10 border-t border-ink/10 lg:col-span-8">
            {items.map((item) => (
              <Reveal key={item.q} preset="fadeUpItem">
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-display text-lg font-semibold tracking-tight text-forest-base">
                      {item.q}
                    </span>
                    <Plus
                      className="mt-1 h-5 w-5 shrink-0 text-forest-base transition-transform duration-300 ease-house group-open:rotate-45"
                      strokeWidth={2}
                    />
                  </summary>
                  <p className="mt-3 max-w-2xl font-body leading-7 text-ink/70">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
