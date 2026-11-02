import { ReactNode, ElementType } from "react";
import { cn } from "@/utils/cn";

/**
 * The single responsive wrapper. 1280px max, consistent gutters.
 * Section vertical rhythm is applied by callers so tone bands can own their
 * own spacing.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
