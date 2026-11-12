import Link from "next/link";

import Container from "@/components/layout/container";
import Button from "@/components/ui/button";

/**
 * Branded 404. Renders inside the root layout (header + footer present), so it
 * stays on-brand and always offers a clear route back.
 */
export default function NotFound() {
  return (
    <main className="bg-paper">
      <Container className="flex min-h-[62vh] flex-col items-center justify-center py-24 text-center md:py-32">
        <div className="mb-5 flex items-center gap-3">
          <span aria-hidden className="h-px w-10 bg-brass" />
          <span className="font-body text-sm font-medium text-forest-muted">
            Error 404
          </span>
          <span aria-hidden className="h-px w-10 bg-brass" />
        </div>

        <h1 className="font-display text-5xl font-extrabold tracking-tightest text-forest-base md:text-6xl">
          Page not found.
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg leading-8 text-ink/70">
          The page you&rsquo;re looking for has moved or no longer exists. Let&rsquo;s
          get you back to the water storage.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="lg" withArrow>
            Back to home
          </Button>
          <Button href="/products" variant="outlineInk" size="lg">
            View products
          </Button>
        </div>

        <nav
          aria-label="Helpful links"
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-sm"
        >
          {[
            { label: "Solutions", href: "/solutions" },
            { label: "Projects", href: "/projects" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-graphite underline-offset-4 transition-colors hover:text-forest-base hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </main>
  );
}
