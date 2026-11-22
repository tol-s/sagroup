import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import RenderViewer from "@/components/RenderViewer";
import AnimatedText from "@/components/AnimatedText";
import Reveal from "@/components/Reveal";
import ImageReveal from "@/components/ImageReveal";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { getAdjacentProjects, getProject, projects, showSampleNotice } from "@/data/projects";
import FloorPlanExplorer from "@/components/FloorPlanExplorer";
import { site } from "@/data/site";
import { breadcrumbSchema, projectSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title}, ${project.location}`;
  return {
    title,
    description: `${project.description} ${project.type} in ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      url: `/projects/${project.slug}`,
      title: `${title} | ${site.companyName}`,
      description: project.description,
      images: [{ url: project.heroImage.replace("w=2400", "w=1200"), width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: "summary_large_image", title, description: project.description, images: [project.heroImage.replace("w=2400", "w=1200")] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(project.slug);
  const isSample = showSampleNotice && project.sample;
  const gallery = project.floorPlans ? project.gallery.filter((g) => !project.floorPlans!.some((f) => f.image === g.src)) : project.gallery;

  const details = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
    { label: "Type", value: project.type },
    { label: "Design Style", value: project.style },
    { label: "Scope", value: project.scope },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: project.title, path: `/projects/${project.slug}` }])} />
      <JsonLd data={projectSchema(project)} />

      <PageHero eyebrow={isSample ? "Sample project" : (project.status ?? "Project")} title={project.title} intro={`${project.type} · ${project.location}`} />

      {/* SHOWCASE: full house visible, front view first */}
      <section aria-label={`${project.title} views`} className="pt-6 md:pt-10">
        <div className="wrap">
          <RenderViewer
            images={gallery}
            label={project.sample ? "Photo" : "3D view"}
            facts={project.facts ?? [
              { label: "Location", value: project.location },
              { label: "Category", value: project.category },
              { label: "Style", value: project.style },
            ]}
          />
        </div>
      </section>

      {/* OVERVIEW */}
      <section aria-labelledby="overview-title" className="py-16 md:py-28">
        <div className="wrap grid gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="label mb-6 text-concrete">Project overview</p>
            <h2 id="overview-title" className="sr-only">Project overview</h2>
            <Reveal>
              <p className="text-[clamp(1.4rem,2.4vw,2.25rem)] leading-[1.3] tracking-[-0.015em]">{project.description}</p>
              <p className="lead mt-8 text-graphite">{project.overview}</p>
            </Reveal>
            {isSample && (
              <p className="mt-10 max-w-xl border-l-2 border-bronze pl-4 text-sm text-graphite">
                This is a sample / demonstration project used to illustrate our design direction and project presentation.
              </p>
            )}
          </div>
          <aside className="md:col-span-4 md:col-start-9" aria-labelledby="details-title">
            <h2 id="details-title" className="label mb-6 text-concrete">
              Project details
            </h2>
            <dl className="border-t border-ink/10">
              {details.map((d) => (
                <div key={d.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-ink/10 py-4">
                  <dt className="label pt-0.5 text-concrete">{d.label}</dt>
                  <dd className="text-[0.95rem]">{d.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {/* INTERACTIVE FLOOR PLANS */}
      {project.floorPlans && (
        <section aria-labelledby="plans-title" className="border-t border-ink/10 bg-paper py-20 md:py-28">
          <div className="wrap">
            <p className="label mb-6 text-concrete">Floor plans · Naksha</p>
            <AnimatedText id="plans-title" as="h2" text="Walk through the house." className="display display-md uppercase" />
            <p className="lead mt-6 max-w-2xl text-graphite">Choose a floor, then tap any room to zoom in and see its size. Press Tour to walk through every room.</p>
            <div className="mt-12 md:mt-16">
              <FloorPlanExplorer plans={project.floorPlans} title={project.title} />
            </div>
          </div>
        </section>
      )}

      {/* DESIGN APPROACH */}
      <section aria-labelledby="approach-title" className="bg-paper py-24 md:py-36">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <ImageReveal src={gallery[2]?.src ?? gallery[1]?.src ?? project.heroImage} alt={gallery[2]?.alt ?? gallery[1]?.alt ?? project.title} className="aspect-[16/9] w-full" sizes="(min-width: 768px) 40vw, 100vw" direction="left" />
          </div>
          <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
            <p className="label mb-6 text-concrete">Design approach</p>
            <AnimatedText id="approach-title" as="h2" text="The concept." className="display display-md uppercase" />
            <Reveal>
              <p className="lead mt-8 text-graphite">{project.designApproach}</p>
            </Reveal>
            <h3 className="label mb-5 mt-14 text-concrete">Key features</h3>
            <ul className="grid gap-px bg-ink/10 sm:grid-cols-2">
              {project.features.map((f, i) => (
                <Reveal as="li" key={f} delay={i * 0.05} className="flex items-center gap-4 bg-paper py-5 pr-4">
                  <span className="font-serif text-2xl italic text-bronze">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-base font-medium uppercase tracking-tight">{f}</span>
                </Reveal>
              ))}
            </ul>
            <h3 className="label mb-4 mt-12 text-concrete">Complete construction scope</h3>
            <Reveal>
              <ul className="flex flex-wrap gap-2">
                {project.constructionScope.map((item) => (
                  <li key={item} className="label border border-ink/15 px-3 py-2 text-graphite">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <nav aria-label="More projects" className="grid border-t border-ink/10 md:grid-cols-2">
        {[
          { p: prev, dir: "Previous project" as const },
          { p: next, dir: "Next project" as const },
        ].map(({ p, dir }) => (
          <Link
            key={dir}
            href={`/projects/${p.slug}`}
            className={`group relative isolate flex min-h-72 flex-col justify-end overflow-hidden p-8 text-bone md:min-h-96 md:p-12 ${dir === "Next project" ? "md:items-end md:text-right" : ""}`}
            data-cursor="View"
          >
            <Image src={p.heroImage} alt="" fill sizes="50vw" className="-z-10 object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105" />
            <span className="absolute inset-0 -z-10 bg-ink/55 transition-colors duration-700 group-hover:bg-ink/40" aria-hidden />
            <span className="label flex items-center gap-3 text-bone/70">
              {dir === "Previous project" && <ArrowLeft className="size-4" strokeWidth={1.5} aria-hidden />}
              {dir}
              {dir === "Next project" && <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />}
            </span>
            <span className="display mt-4 text-[clamp(1.75rem,3.5vw,3.5rem)]">{p.title}</span>
            <span className="mt-2 text-sm text-bone/70">{p.location}</span>
          </Link>
        ))}
      </nav>

      <CTASection title={"Ready to build\nyour home?"} copy="Tell us about your plot and your vision. We will guide you from the first drawing to final handover." image={project.heroImage} />
    </>
  );
}
