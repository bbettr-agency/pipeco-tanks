"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { projects, projectCategories } from "@/config/projects-config";
import { cn } from "@/utils/cn";

/**
 * Filterable installations portfolio.
 *
 * The five categories are always shown (All, GRP, Pressed steel, Stainless
 * steel, Tank installations) with live counts. Photographs appear in a material
 * category only when their classification is verified; a category with no
 * verified entries (stainless steel) shows a professional empty state rather
 * than fabricated content. Works on desktop and mobile; filtering is instant.
 */
export default function Portfolio() {
  const [active, setActive] = useState<string>("All");
  const shown =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter bar */}
      <div
        role="group"
        aria-label="Filter installations by type"
        className="flex flex-wrap gap-2.5"
      >
        {projectCategories.map((cat) => {
          const isActive = cat === active;
          const count =
            cat === "All"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-4 py-2 font-body text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brass",
                isActive
                  ? "border-forest-base bg-forest-base text-white"
                  : "border-ink/15 text-ink/70 hover:border-forest-base/40 hover:text-forest-base"
              )}
            >
              {cat}
              <span
                className={cn(
                  "ml-1.5 text-xs",
                  isActive ? "text-white/60" : "text-graphite"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty state — honest, no fabricated content */}
      {shown.length === 0 ? (
        <div className="mt-10 rounded-[16px] border border-dashed border-ink/20 bg-shell/60 px-6 py-16 text-center">
          <h3 className="font-display text-lg font-semibold tracking-tight text-forest-base">
            Photography coming soon
          </h3>
          <p className="mx-auto mt-3 max-w-md font-body leading-7 text-ink/60">
            We&rsquo;re compiling verified {active.toLowerCase()} installation
            photography. In the meantime, our team can share references relevant
            to your project.
          </p>
          <Link
            href="/contact?tank=stainless"
            className="group mt-6 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-forest-base"
          >
            Request a stainless steel tank quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-house group-hover:translate-x-1" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <figure key={project.src}>
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-ink/10">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-house group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/10 pt-3">
                <span className="font-display text-base font-semibold tracking-tight text-forest-base">
                  {project.caption}
                </span>
                <span className="font-body text-xs uppercase tracking-[0.14em] text-graphite">
                  {project.category}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
