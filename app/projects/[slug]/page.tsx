import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import Container from "@/components/layout/container";
import PageHero from "@/components/layout/page-hero";
import SectionIntro from "@/components/ui/section-intro";
import Button from "@/components/ui/button";
import CtaBand from "@/components/sections/cta-band";
import JsonLd from "@/components/ui/json-ld";
import { Reveal } from "@/engine/motion";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { verifiedProjects } from "@/config/projects-config";

/**
 * Verified project detail page.
 *
 * Generated only for projects PIPECO has confirmed for publication
 * (config/projects-config → verifiedProjects). That list is currently empty, so
 * no detail pages are produced and any /projects/<slug> returns 404 — no
 * fabricated project records. The layout is ready for real records.
 */
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return verifiedProjects.map((p) => ({ slug: p.slug }));
}

function find(slug: string) {
  return verifiedProjects.find((p) => p.slug === slug);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = find(params.slug);
  if (!project) return createMetadata({ title: "Project" });
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default function ProjectDetailPage({ params }: { params: Params }) {
  const project = find(params.slug);
  if (!project) notFound();

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <PageHero
        variant={project.images[0] ? "photo" : "band"}
        overline="Project"
        title={project.title}
        lead={project.summary}
        media={
          project.images[0]
            ? { src: project.images[0], alt: project.title }
            : undefined
        }
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title, href: `/projects/${project.slug}` },
        ]}
      >
        <Button href="/contact" variant="primary" size="lg" withArrow>
          Discuss a similar project
        </Button>
      </PageHero>

      {project.facts && project.facts.length > 0 && (
        <section className="bg-paper">
          <Container className="py-16 md:py-20">
            <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {project.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-forest-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-2 font-display text-xl font-semibold text-forest-base">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {project.images.length > 0 && (
        <section className="bg-shell">
          <Container className="py-16 md:py-24">
            <Reveal>
              <SectionIntro overline="Gallery" title="On site." />
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {project.images.map((src) => (
                <Reveal key={src}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px] border border-ink/10">
                    <Image
                      src={src}
                      alt={project.title}
                      fill
                      sizes="(min-width: 640px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />
    </main>
  );
}
