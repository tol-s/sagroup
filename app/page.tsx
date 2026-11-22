import HomeHero from "@/components/home/HomeHero";
import { FaqSection, PackagesSection, ServiceCards, TrustBar, WhatsAppCta } from "@/components/home/HomeSections";
import CostCalculator from "@/components/CostCalculator";
import RenderViewer from "@/components/RenderViewer";
import FloorPlanExplorer from "@/components/FloorPlanExplorer";
import Divisions from "@/components/Divisions";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import AnimatedText from "@/components/AnimatedText";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { featuredProject, projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import ForSaleBox from "@/components/ForSaleBox";
import { faqs } from "@/data/calculator";

/**
 * HOME PAGE
 * Kept deliberately simple for Pakistani homeowners: what we do, what it costs,
 * what is included, how long it takes, and how to reach us.
 */
export default function HomePage() {
  const moreDesigns = projects.filter((p) => !p.sample && p.slug !== featuredProject.slug).slice(0, 2);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <HomeHero />
      <TrustBar />

      {/* SERVICES */}
      <section aria-labelledby="services-title" className="py-20 md:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="services-title"
              index="01"
              eyebrow="Services"
              title="What we do."
              intro="Houses, villas and apartments, designed and built by one team. From the naksha to the keys."
              className="flex-1"
            />
            <Reveal className="shrink-0">
              <Button href="/services" variant="outline">All services</Button>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-20">
            <ServiceCards />
          </div>
        </div>
      </section>

      {/* FEATURED DESIGN: real SA Group project with interactive floor plans */}
      <section aria-labelledby="featured-title" className="border-t border-ink/10 bg-paper py-20 md:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="featured-title"
              index="02"
              eyebrow={featuredProject.forSale ? "Own project · For sale" : "Our design"}
              title={`${featuredProject.title}.`}
              intro={
                featuredProject.forSale
                  ? "Our own project, designed and built by SA Group and now for sale. See the 3D views, then tap any room on the naksha to see its size."
                  : "A family home designed by SA Group. See the 3D views, then tap any room on the naksha to see its size."
              }
              className="flex-1"
            />
            <Reveal className="shrink-0">
              <Button href={`/projects/${featuredProject.slug}`} variant="outline">View project</Button>
            </Reveal>
          </div>
          <RenderViewer className="mt-12 md:mt-16" images={featuredProject.gallery.filter((g) => !g.src.includes("floor"))} facts={featuredProject.facts} />
          <ForSaleBox project={featuredProject} className="mx-auto mt-6 max-w-[calc(62svh*16/9)]" />
          {featuredProject.floorPlans && (
            <div className="mt-16 md:mt-24">
              <p className="label mb-6 flex items-center gap-3 text-concrete">
                <span className="h-px w-8 bg-current" aria-hidden />
                Explore the floor plans
              </p>
              <FloorPlanExplorer plans={featuredProject.floorPlans} title={featuredProject.title} />
            </div>
          )}
          {moreDesigns.length > 0 && (
            <div className="mt-16 md:mt-24">
              <p className="label mb-6 flex items-center gap-3 text-concrete">
                <span className="h-px w-8 bg-current" aria-hidden />
                More SA Group designs
              </p>
              <div className="grid gap-x-6 gap-y-12 md:grid-cols-2">
                {moreDesigns.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i + 1} aspect="aspect-[16/10]" sizes="(min-width: 768px) 50vw, 100vw" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COST CALCULATOR */}
      <section id="calculator" aria-labelledby="calculator-title" className="scroll-mt-20 border-t border-ink/10 py-20 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="calculator-title"
            index="03"
            eyebrow="Cost calculator"
            title="What will your house cost?"
            intro="Choose your plot size, floors and type of work to see an instant estimate. Apne ghar ki construction cost minton mein janiye."
          />
          <div className="mt-14 md:mt-20">
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section aria-labelledby="packages-title" className="border-t border-ink/10 bg-paper py-20 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="packages-title"
            index="04"
            eyebrow="Packages"
            title="What's included."
            intro="Four packages with clear material specifications, from grey structure to a fully furnished home. Tap a package to see what you get."
          />
          <div className="mt-14 md:mt-20">
            <PackagesSection />
          </div>
        </div>
      </section>

      {/* DIVISIONS */}
      <section aria-labelledby="divisions-title" className="border-t border-ink/10 py-20 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="divisions-title"
            index="05"
            eyebrow="SA Group"
            title="Our divisions."
            intro="Two specialist companies under one trusted name."
          />
          <div className="mt-12 md:mt-16">
            <Divisions />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="label mb-6 flex items-center gap-3 text-concrete">
              <span>07</span>
              <span className="h-px w-8 bg-current" aria-hidden />
              <span>FAQ</span>
            </p>
            <AnimatedText id="faq-title" as="h2" text={"Common\nquestions."} className="display display-md uppercase" />
            <Reveal className="mt-8">
              <WhatsAppCta label="Ask your question" />
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <FaqSection />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
