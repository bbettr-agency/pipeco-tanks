import Hero from "@/components/sections/hero";
import TankSolutions from "@/components/sections/tank-solutions";
import Capabilities from "@/components/sections/capabilities";
import RefugeChambers from "@/components/sections/refuge-chambers";
import Industries from "@/components/sections/industries";
import Installations from "@/components/sections/installations";
import WhyPipeco from "@/components/sections/why-pipeco";
import FinalCta from "@/components/sections/final-cta";

/**
 * Homepage composition.
 *
 * Tone rhythm alternates dark / light so no two adjacent sections share a
 * surface:
 *   Hero (dark) → Tanks (light) → Capabilities (dark) → Refuge (light) →
 *   Industries (dark) → Installations (light) → Why (dark) → Quote (light).
 */
export default function Homepage() {
  return (
    <main>
      <Hero />
      <TankSolutions />
      <Capabilities />
      <RefugeChambers />
      <Industries />
      <Installations />
      <WhyPipeco />
      <FinalCta />
    </main>
  );
}
