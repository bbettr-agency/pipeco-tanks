import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Button.
 *
 * Colour law: `primary` is brass — the single reserved "act here" colour, used
 * only for the primary quote action. `solid` (forest) carries secondary trust
 * paths. The two `outline` variants are tone-specific so contrast is always
 * deliberate. Squared corners (2px) keep the industrial, engineered character —
 * no pill shapes.
 */
type Variant = "primary" | "solid" | "outlineLight" | "outlineInk";
type Size = "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  withArrow?: boolean;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-[2px] font-display font-semibold tracking-tight transition-[background-color,border-color,color] duration-200 ease-house focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brass focus-visible:ring-offset-white";

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

const variants: Record<Variant, string> = {
  // Primary quote action — brass on ink text.
  primary: "bg-brass text-ink hover:bg-brass-dark hover:text-white",
  // Secondary trust path.
  solid: "bg-forest-base text-white hover:bg-forest-dark",
  // On dark surfaces (hero).
  outlineLight:
    "border border-white/30 text-white hover:border-white/70 hover:bg-white/10 focus-visible:ring-offset-forest-deepest",
  // On light surfaces.
  outlineInk:
    "border border-ink/20 text-ink hover:border-forest-base hover:bg-forest-base hover:text-white",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  className,
  withArrow = false,
  external = false,
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
