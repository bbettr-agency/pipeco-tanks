"use client";

/**
 * Reveal — the standard way to animate content into view.
 *
 * Standard: SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §4
 *
 *   <Reveal>            …</Reveal>   // section content, scroll-triggered
 *   <Reveal eager>      …</Reveal>   // above the fold — animates on mount
 *   <Reveal preset="fadeUpItem" index={i}>…</Reveal>   // card in a list
 *
 * Centralising this is proven: of the five audited sites, the one that routed
 * its reveals through a single component had 26 consistent call sites, while the
 * other four hand-wrote 57 variations with eight stagger steps and five
 * distances between them.
 *
 * Above-the-fold safety: `whileInView` waits for an IntersectionObserver. If the
 * element is already on screen at first paint, that observer has not fired and
 * the content is invisible — which is both an LCP failure and a no-JS failure.
 * `eager` switches to a mount animation. In development this component warns
 * when it detects a likely above-the-fold misuse.
 */

import { m } from "motion/react";
import {
  Children,
  isValidElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { fadeIn, fadeUp, fadeUpItem, imageReveal, scaleIn, slideX } from "./presets";
import type { MotionCharacter } from "./tokens";
import { useMotionSafe } from "./useMotionSafe";

const PRESETS = { fadeUp, fadeUpItem, fadeIn, scaleIn, imageReveal, slideX } as const;

export type RevealPreset = keyof typeof PRESETS;

export interface RevealProps {
  children: ReactNode;
  /** Which approved preset to use. Defaults to the house reveal. */
  preset?: RevealPreset;
  /** Rendered element. Use a semantic tag — motion must never change semantics. */
  as?: ElementType;
  /** Index in a staggered group. Delay is capped automatically (STAGGER_CAP). */
  index?: number;
  /** Extra delay in seconds, applied after the staggered delay. */
  delay?: number;
  /** REQUIRED above the fold: animate on mount rather than on scroll. */
  eager?: boolean;
  /** Override the project's motion character. Rarely needed. */
  character?: MotionCharacter;
  className?: string;
}

/**
 * Development guard: an element carrying Next's `priority` flag is a declared
 * LCP candidate. Fading it in defeats the preload it just requested — a defect
 * found in production during the audit.
 */
function warnOnPriorityImage(children: ReactNode, preset: RevealPreset) {
  if (process.env.NODE_ENV === "production") return;
  if (preset === "imageReveal") return; // scale-only, never hides the image

  const hasPriority = Children.toArray(children).some(
    (child) =>
      isValidElement<{ priority?: boolean }>(child) &&
      child.props?.priority === true,
  );

  if (hasPriority) {
    console.error(
      "[bbettr/motion] <Reveal> wraps an image marked `priority`, so an opacity " +
        "animation will hide the LCP image and defeat its preload. Move the image " +
        "outside <Reveal>, or use preset=\"imageReveal\" (scale only). " +
        "See SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §5.",
    );
  }
}

export function Reveal({
  children,
  preset = "fadeUp",
  as = "div",
  index = 0,
  delay = 0,
  eager = false,
  character,
  className,
}: RevealProps) {
  const reduced = useMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const MotionTag = m[as as keyof typeof m] as typeof m.div;

  warnOnPriorityImage(children, preset);

  // Development guard: scroll-triggered content that is already on screen at
  // mount would have been invisible until an observer fired.
  useEffect(() => {
    if (process.env.NODE_ENV === "production" || eager || reduced) return;
    const node = ref.current;
    if (!node) return;
    const { top } = node.getBoundingClientRect();
    if (top < window.innerHeight) {
      console.warn(
        "[bbettr/motion] <Reveal> is above the fold but scroll-triggered, so its " +
          "content is invisible at first paint. Add the `eager` prop. " +
          "See SYSTEM/DESIGN-LANGUAGE/02-MOTION-SYSTEM.md §5.",
      );
    }
  }, [eager, reduced]);

  const props = PRESETS[preset]({ character, index, delay, reduced, eager });

  // `data-reveal` is the hook for the no-JS fallback. A scroll-triggered reveal
  // ships `opacity: 0` in the server-rendered HTML, so without this the whole
  // page below the fold stays invisible if JavaScript never runs. The root
  // layout must carry the <noscript> rule — see NOSCRIPT_FALLBACK.
  return (
    <MotionTag ref={ref} className={className} data-reveal="" {...props}>
      {children}
    </MotionTag>
  );
}

/**
 * Required in the root layout <head>, verbatim:
 *
 *   <noscript>
 *     <style>{NOSCRIPT_FALLBACK}</style>
 *   </noscript>
 *
 * Gate 3 checks for it. Without it, a JavaScript failure hides every revealed
 * section on the page.
 */
export const NOSCRIPT_FALLBACK =
  "[data-reveal]{opacity:1!important;transform:none!important}";
