import Image from "next/image";
import type { ReactNode } from "react";

import Container from "@/components/layout/container";
import SectionIntro from "@/components/ui/section-intro";
import { Reveal } from "@/engine/motion";
import type { ImageSlot } from "@/config/image-config";
import { cn } from "@/utils/cn";

type Media = { slot?: ImageSlot; src?: string; alt?: string };

/**
 * Alternating editorial split — photograph on one side, copy on the other.
 * Reused across pages with `reverse` and `tone` to create rhythm without every
 * section looking identical.
 */
export default function FeatureSplit({
  overline,
  title,
  children,
  media,
  reverse = false,
  tone = "light",
  focus = "center",
}: {
  overline: string;
  title: ReactNode;
  children: ReactNode;
  media: Media;
  reverse?: boolean;
  tone?: "light" | "dark";
  focus?: string;
}) {
  const dark = tone === "dark";
  const src = media.slot?.src ?? media.src ?? "";
  const alt = media.slot?.alt ?? media.alt ?? "";

  return (
    <section className={cn(dark ? "bg-forest-dark text-white" : "bg-paper")}>
      <Container className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal
            className={cn("lg:col-span-6", reverse ? "lg:order-2" : "lg:order-1")}
          >
            <SectionIntro tone={dark ? "dark" : "light"} overline={overline} title={title} />
            <div
              className={cn(
                "mt-6 space-y-5 font-body text-lg leading-8",
                dark ? "text-white/75" : "text-ink/70"
              )}
            >
              {children}
            </div>
          </Reveal>

          <Reveal
            preset="fadeIn"
            className={cn("lg:col-span-6", reverse ? "lg:order-1" : "lg:order-2")}
          >
            {src ? (
              <div
                className={cn(
                  "relative aspect-[4/3] w-full overflow-hidden rounded-[18px] border",
                  dark ? "border-white/10" : "border-ink/10"
                )}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: focus }}
                />
              </div>
            ) : (
              /* Premium text-led panel when no verified photograph exists. */
              <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-forest-deepest px-8 text-center text-white">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.14] blur-3xl"
                  style={{ background: "radial-gradient(circle, #B4895A 0%, transparent 70%)" }}
                />
                <span aria-hidden className="h-px w-10 bg-brass" />
                <p className="mt-5 font-display text-xl font-semibold tracking-tight">
                  {title}
                </p>
                <p className="mt-2 max-w-xs font-body text-sm leading-6 text-white/55">
                  Grade, finish and capacity confirmed with Pipeco for your project.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
