import Link from "next/link";
import { Pickaxe, Factory, Building2, Flame, Sprout, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal, Stagger } from "@/engine/motion";
import { applications } from "@/config/homepage-config";

/**
 * C — Industries & Applications.
 *
 * A refined editorial grid on deep forest green: five sectors, each a flat
 * bordered cell with a single brass top-rule, an outline icon, the sector name,
 * its application note and a quiet arrow link. Adapts the reference layout to
 * the PIPECO system — no glassy cards, gold glow, blur or decorative effects.
 * A 3 + 2 composition on desktop, two-up on tablet, single column on mobile.
 */
const icons: Record<string, LucideIcon> = {
  Mining: Pickaxe,
  "Commercial & industrial": Factory,
  "Infrastructure & municipal": Building2,
  "Fire-water storage": Flame,
  Agriculture: Sprout,
};

export default function Industries() {
  return (
    <section id="industries" className="bg-forest-deepest text-white">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionIntro
            tone="dark"
            align="center"
            overline="Industries & applications"
            title="Where Pipeco tanks are put to work."
            description="Sectional water storage scales from a single rooftop reserve to bulk municipal and mining supply. These are the settings our tanks are built for."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((app) => {
            const Icon = icons[app.name] ?? Factory;
            return (
              <Reveal key={app.name} preset="fadeUpItem" className="h-full">
                <Link
                  href={app.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border-t-2 border-t-brass bg-white/[0.03] p-7 ring-1 ring-inset ring-white/10 transition-colors duration-200 ease-house hover:bg-white/[0.06] hover:ring-white/20 md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className="h-7 w-7 text-sage"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <ArrowUpRight
                      className="h-5 w-5 text-white/35 transition-all duration-300 ease-house group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brass-light"
                      aria-hidden
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-white">
                    {app.name}
                  </h3>
                  <p className="mt-3 font-body leading-7 text-white/60">
                    {app.note}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
