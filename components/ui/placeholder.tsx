import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ImageSlot } from "@/config/image-config";
import { cn } from "@/utils/cn";

/**
 * Image placeholder.
 *
 * No photography is used yet. Each slot renders a deliberately designed,
 * labelled placeholder with a fixed aspect ratio so the layout is fully
 * balanced without a photo. When a real image path is set on the slot (see
 * config/image-config.ts), the same component renders that photograph instead —
 * no layout change.
 *
 * The treatment (blueprint grid + corner registration ticks) reads as an
 * engineering drawing, which suits an industrial manufacturer and makes the
 * placeholder unmistakably intentional rather than an empty box.
 */
type PlaceholderProps = {
  slot: ImageSlot;
  tone?: "onDark" | "onLight";
  /**
   * "blueprint" — engineering-drawing treatment (used for the hero).
   * "minimal" — clean neutral container with a small label (used for products).
   */
  variant?: "blueprint" | "minimal";
  /**
   * Fill the parent (absolute inset-0) instead of enforcing the slot's aspect
   * ratio. The parent must be positioned and set its own height. Lets an image
   * match an adjacent panel's height on desktop while staying a sane band on
   * small screens.
   */
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

const BLUEPRINT_DARK =
  "linear-gradient(rgba(142,182,155,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(142,182,155,0.10) 1px, transparent 1px)";
const BLUEPRINT_LIGHT =
  "linear-gradient(rgba(12,26,23,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(12,26,23,0.055) 1px, transparent 1px)";

function CornerTicks({ color }: { color: string }) {
  const arm = "absolute h-4 w-4";
  return (
    <>
      <span className={cn(arm, "left-4 top-4 border-l border-t", color)} />
      <span className={cn(arm, "right-4 top-4 border-r border-t", color)} />
      <span className={cn(arm, "bottom-4 left-4 border-b border-l", color)} />
      <span className={cn(arm, "bottom-4 right-4 border-b border-r", color)} />
    </>
  );
}

export default function Placeholder({
  slot,
  tone = "onLight",
  variant = "blueprint",
  fill = false,
  className,
  sizes,
  priority,
}: PlaceholderProps) {
  const dark = tone === "onDark";
  const frame = fill ? "absolute inset-0" : "relative";
  const frameStyle = fill ? undefined : { aspectRatio: slot.ratio };

  if (slot.src) {
    return (
      <div
        className={cn("overflow-hidden", frame, className)}
        style={frameStyle}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          priority={priority}
          sizes={sizes ?? "100vw"}
          className="object-cover"
        />
      </div>
    );
  }

  // Premium text-led panel — shown when a range has no verified photograph yet
  // (e.g. stainless steel). Deliberately on-brand, not an "image pending" box.
  if (variant === "minimal") {
    return (
      <div
        role="img"
        aria-label={slot.alt}
        className={cn(
          "relative flex flex-col items-center justify-center bg-forest-deepest px-8 text-center text-white",
          frame,
          className
        )}
        style={frameStyle}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.14] blur-3xl"
          style={{ background: "radial-gradient(circle, #B4895A 0%, transparent 70%)" }}
        />
        <span aria-hidden className="h-px w-10 bg-brass" />
        <span className="mt-5 font-display text-lg font-semibold tracking-tight">
          {slot.alt}
        </span>
        <span className="mt-2 max-w-xs font-body text-sm leading-6 text-white/55">
          Grade, finish and capacity confirmed with Pipeco for your project.
        </span>
      </div>
    );
  }

  // Blueprint treatment — used by the hero's right-side image.
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${slot.alt}`}
      className={cn(
        "flex items-center justify-center overflow-hidden",
        frame,
        dark
          ? "bg-forest-dark text-sage/90"
          : "bg-shell text-forest-base",
        className
      )}
      style={frameStyle}
    >
      {/* Blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: dark ? BLUEPRINT_DARK : BLUEPRINT_LIGHT,
          backgroundSize: "34px 34px",
        }}
      />
      <CornerTicks color={dark ? "border-sage/40" : "border-forest-base/25"} />

      {/* Centre label */}
      <div className="relative z-10 flex max-w-[82%] flex-col items-center text-center">
        <span
          className={cn(
            "mb-4 flex h-11 w-11 items-center justify-center rounded-[2px] border",
            dark ? "border-sage/30 bg-white/5" : "border-forest-base/20 bg-white"
          )}
        >
          <ImageIcon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span
          className={cn(
            "font-display text-[11px] font-semibold uppercase tracking-[0.22em]",
            dark ? "text-sage" : "text-forest-base"
          )}
        >
          {slot.label}
        </span>
        <span
          className={cn(
            "mt-2 font-body text-xs",
            dark ? "text-white/45" : "text-graphite/80"
          )}
        >
          Image to be supplied by PIPECO
        </span>
      </div>
    </div>
  );
}
