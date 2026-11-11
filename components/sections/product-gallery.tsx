import Image from "next/image";

import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import MobileCarousel from "@/components/ui/mobile-carousel";
import { Reveal } from "@/engine/motion";

/**
 * Product gallery — a balanced multi-column grid on desktop/tablet, and a
 * one-at-a-time swipeable carousel on mobile (no tall vertical stack). The same
 * real photographs drive both; image quality and rounded corners are preserved.
 */
export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (images.length === 0) return null;

  const alt = `Pipeco ${title.toLowerCase()} sectional water tank`;

  return (
    <section className="bg-shell">
      <Container className="py-20 md:py-28">
        <Reveal>
          <SectionIntro overline="Gallery" title={`${title} tanks in the field.`} />
        </Reveal>

        {/* Mobile — swipe carousel */}
        <div className="mt-10 md:hidden">
          <MobileCarousel
            images={images.map((src) => ({ src, alt }))}
            sizes="100vw"
          />
        </div>

        {/* Desktop / tablet — grid */}
        <div className="mt-12 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {images.map((src, i) => (
            <Reveal key={src} delay={(i % 3) * 0.05}>
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-ink/10">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 46vw"
                  className="object-cover transition-transform duration-700 ease-house group-hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
