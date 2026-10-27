import { ReactNode } from "react";
import { cn } from "@/utils/cn";

/**
 * Shared section intro — a short brass rule + overline, then the heading and an
 * optional lead line. No pill badges or all-caps headlines. Used across the
 * homepage so every section opens in the same restrained voice.
 */
type SectionIntroProps = {
  overline: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export default function SectionIntro({
  overline,
  title,
  description,
  tone = "light",
  align = "left",
  className,
}: SectionIntroProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-10 bg-brass" />
        <span
          className={cn(
            "font-body text-sm font-medium",
            dark ? "text-sage" : "text-forest-muted"
          )}
        >
          {overline}
        </span>
      </div>
      <h2
        className={cn(
          "font-display text-4xl font-bold leading-[1.06] tracking-tightest md:text-5xl",
          dark ? "text-white" : "text-forest-base"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-6 max-w-2xl font-body text-lg leading-8",
            align === "center" && "mx-auto",
            dark ? "text-white/70" : "text-ink/70"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
