import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProjectsGrid from "@/components/ProjectsGrid";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { images } from "@/data/images";
import { showSampleNotice } from "@/data/projects";
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
        image={images.villa}
        imageAlt="Modern villa with pool"
        intro="Residences shaped by clean geometry, natural light and carefully chosen materials."
      />

      <section aria-label="Project portfolio" className="py-20 md:py-32">
        <div className="wrap">
          {showSampleNotice && (
            <p className="mb-12 max-w-2xl border-l-2 border-bronze pl-4 text-sm text-graphite">
              The projects below are sample / demonstration projects that show our design direction and how each project will be presented. They are not a record of completed work. Our completed portfolio will be added here.
            </p>
          )}
          <ProjectsGrid />
        </div>
      </section>

      <CTASection />
    </>
  );
}
