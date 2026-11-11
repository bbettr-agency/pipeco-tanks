"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/utils/cn";

export type CarouselImage = { src: string; alt: string; caption?: string };

/**
 * Mobile image carousel — one photograph at a time, native horizontal
 * scroll-snap (smooth on touch, no JS scrolling), with subtle pagination dots
 * that track the active slide. Used on small screens only; parents render a
 * grid at md+. No cards, shadows or gradients — just the rounded photograph.
 */
export default function MobileCarousel({
  images,
  aspect = "aspect-[4/3]",
  sizes = "100vw",
  className,
}: {
  images: CarouselImage[];
  /** Tailwind aspect class for each slide frame. */
  aspect?: string;
  sizes?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    if (index !== active) setActive(index);
  }

  return (
    <div className={className}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={img.src} className="w-full shrink-0 snap-center px-0.5">
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-[16px] border border-ink/10",
                aspect
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={sizes}
                className="object-cover"
              />
            </div>
            {img.caption && (
              <p className="mt-3 text-center font-body text-sm text-ink/60">
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div
          className="mt-5 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Gallery position"
        >
          {images.map((img, i) => (
            <span
              key={img.src}
              aria-hidden
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 ease-house",
                i === active ? "w-5 bg-forest-base" : "w-1.5 bg-ink/20"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
