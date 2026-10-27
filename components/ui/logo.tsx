import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/utils/cn";

/**
 * Brand lockup. Uses the official supplied logo — the only real image asset in
 * use. Links home.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.businessName} — home`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src="/brand/pipeco-logo.png"
        alt={siteConfig.businessName}
        width={247}
        height={120}
        priority
        className="h-14 w-auto md:h-16"
      />
    </Link>
  );
}
