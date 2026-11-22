import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { hasSampleProjects } from "@/data/projects";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Projects | Modern Homes & Villas in Karachi",
  description: "Modern residences, villas and contemporary elevations. Explore how we present architecture and construction projects across Karachi.",
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: `Projects | ${site.companyName}` },
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
      <PageHero
        eyebrow="Projects"
        title="Modern homes. Built properly."
        intro="Residences shaped by clean geometry, natural light and carefully chosen materials."
      />

      <section aria-label="Project portfolio" className="py-8 md:py-14">
        <div className="wrap">
          {hasSampleProjects && (
            <p className="mb-8 max-w-2xl border-l-2 border-bronze pl-4 text-sm text-graphite">
              Projects marked &ldquo;Sample&rdquo; are demonstration projects that show our design direction. Projects marked &ldquo;SA Group design&rdquo; are our own designs.
            </p>
          )}
          <ProjectsGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
