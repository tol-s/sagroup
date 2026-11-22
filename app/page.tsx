import HomeHero from "@/components/home/HomeHero";
import { FaqSection, PackagesSection, ServiceCards, TimelineSection, TrustBar, WhatsAppCta } from "@/components/home/HomeSections";
import CostCalculator from "@/components/CostCalculator";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import AnimatedText from "@/components/AnimatedText";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import JsonLd from "@/components/JsonLd";
import { processSteps } from "@/data/process";
import { projects, showSampleNotice } from "@/data/projects";
import { faqs } from "@/data/calculator";

/**
 * HOME PAGE
 * Kept deliberately simple for Pakistani homeowners: what we do, what it costs,
 * what is included, how long it takes, and how to reach us.
 */
export default function HomePage() {
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

      {/* COST CALCULATOR */}
      <section id="calculator" aria-labelledby="calculator-title" className="scroll-mt-20 border-y border-ink/10 bg-paper py-20 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="calculator-title"
            index="02"
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
      <section aria-labelledby="packages-title" className="py-20 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="packages-title"
            index="03"
            eyebrow="Packages"
            title="What's included."
            intro="Clear scope for every package. Material brands and specifications are confirmed in your written quotation."
          />
          <div className="mt-14 md:mt-20">
            <PackagesSection />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section aria-labelledby="projects-title" className="border-t border-ink/10 bg-paper py-20 md:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="projects-title" index="04" eyebrow="Projects" title="Homes we design and build." className="flex-1" />
            <Reveal className="shrink-0">
              <Button href="/projects" variant="outline">All projects</Button>
            </Reveal>
          </div>
          {showSampleNotice && (
            <p className="mt-8 max-w-xl border-l-2 border-bronze pl-4 text-sm text-graphite">
              Sample projects shown to demonstrate our design direction. Our completed project portfolio will be published here.
            </p>
          )}
          <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} aspect="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section aria-labelledby="process-title" className="py-20 md:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="process-title" index="05" eyebrow="How it works" title="Eight steps to handover." className="flex-1" />
            <Reveal className="shrink-0">
              <Button href="/process" variant="outline">See the full process</Button>
            </Reveal>
          </div>
          <ol className="mt-14 grid grid-cols-2 border-l border-t border-ink/10 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <Reveal as="li" key={s.number} delay={(i % 4) * 0.05} className="border-b border-r border-ink/10 p-5 md:p-7">
                <p className="font-serif text-2xl italic text-bronze">{s.number}</p>
                <h3 className="mt-6 font-display text-base font-medium uppercase tracking-tight md:text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{s.summary}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TIMELINE */}
      <section aria-labelledby="timeline-title" className="border-t border-ink/10 bg-paper py-20 md:py-32">
        <div className="wrap">
          <SectionHeading
            id="timeline-title"
            index="06"
            eyebrow="Timeline"
            title="How long will it take?"
            intro="Typical time to complete a full house in Karachi. Your exact schedule comes with your quotation."
          />
          <div className="mt-14 md:mt-20">
            <TimelineSection />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 md:py-32">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="label mb-6 flex items-center gap-3 text-concrete">
              <span>08</span>
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
