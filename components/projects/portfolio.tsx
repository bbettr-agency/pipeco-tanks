"use client";

import { useState } from "react";
import Image from "next/image";

import { projects, projectCategories } from "@/config/projects-config";
import { cn } from "@/utils/cn";

/**
 * Filterable installations portfolio. Filters reflect only the categories that
 * are actually present in the data — no empty or invented filters. With a small
 * number of verified installations it still reads as a professional grid, and
 * expands automatically as projects are added to projects-config.
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
        aria-label="Filter projects"
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
              <span className={cn("ml-1.5 text-xs", isActive ? "text-white/60" : "text-graphite")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
        {shown.map((project) => (
          <figure key={project.slot.id}>
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-ink/10">
              {project.slot.src && (
                <Image
                  src={project.slot.src}
                  alt={project.slot.alt}
                  fill
                  sizes="(min-width: 640px) 46vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-house group-hover:scale-[1.04]"
                />
              )}
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
    </div>
  );
}
