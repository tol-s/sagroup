import Image from "next/image";
import HomeHero from "@/components/home/HomeHero";
import ServicesList from "@/components/home/ServicesList";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import MaterialsScroller from "@/components/home/MaterialsScroller";
import SectionHeading from "@/components/SectionHeading";
import AnimatedText from "@/components/AnimatedText";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import Testimonials from "@/components/Testimonials";
import { images } from "@/data/images";
import { qualityStages, reasons, serviceAreas } from "@/data/home";
import { processSteps } from "@/data/process";
import { showSampleNotice } from "@/data/projects";
import { constructionDisciplines } from "@/data/services";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* INTRO */}
      <section aria-labelledby="intro-title" className="relative py-24 md:py-40">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p className="label flex items-center gap-3 text-concrete">
                <span>01</span>
                <span className="h-px w-8 bg-current" aria-hidden />
                <span>Who we are</span>
              </p>
            </Reveal>
            <div className="md:col-span-9">
              <AnimatedText id="intro-title" as="h2" text={"From the first drawing\nto the final detail."} className="display display-lg uppercase" />
            </div>
          </div>

          <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
            <div className="relative md:col-span-7">
              <ImageReveal src={images.intro} alt="Architect reviewing construction drawings" className="aspect-[4/3] w-full md:aspect-[5/4]" sizes="(min-width: 768px) 58vw, 100vw" direction="left" />
              <ImageReveal
                src={images.introDetail}
                alt="Detail of white contemporary architecture"
                className="absolute -bottom-16 right-4 hidden aspect-[3/4] w-[34%] border-[10px] border-bone md:block lg:-right-16"
                sizes="20vw"
                parallax={14}
              />
            </div>
            <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
              <Reveal>
                <p className="lead text-graphite">
                  We combine architectural design, structural planning, quality materials and professional construction execution to deliver modern residential spaces across Karachi.
                </p>
                <p className="mt-6 leading-relaxed text-graphite">
                  We don&apos;t just build houses. We design and construct them properly, so the home that is built is exactly the home that was designed.
                </p>
                <div className="mt-10">
                  <Button href="/about" variant="outline">About our company</Button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section aria-labelledby="services-title" className="bg-paper py-24 md:py-40">
        <div className="wrap">
          <SectionHeading id="services-title" index="02" eyebrow="Services" title="Design. Build. Deliver." intro="Architecturally designed residential homes, villas and apartments, planned and constructed by one professional team." />
          <div className="mt-16 md:mt-24">
            <ServicesList />
          </div>
          <Reveal className="mt-14 flex justify-end">
            <Button href="/services">View all services</Button>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section aria-labelledby="projects-title" className="py-24 md:py-40">
        <div className="wrap">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="projects-title" index="03" eyebrow="Selected work" title="Homes with presence." className="flex-1" />
            <Reveal className="shrink-0">
              <Button href="/projects" variant="outline">All projects</Button>
            </Reveal>
          </div>
          {showSampleNotice && (
            <p className="mt-8 max-w-xl border-l-2 border-bronze pl-4 text-sm text-graphite">
              Sample projects shown to demonstrate our design direction and presentation. Our completed project portfolio will be published here.
            </p>
          )}
          <div className="mt-16 md:mt-24">
            <FeaturedProjects />
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section aria-labelledby="quality-title" className="relative bg-ink py-24 text-bone md:py-40">
        <div className="wrap">
          <SectionHeading
            id="quality-title"
            index="04"
            eyebrow="Complete construction"
            tone="light"
            title={"Complete construction.\nOne professional team."}
            intro="From structural work to building services, interiors and final finishing, we coordinate every stage required to deliver a complete project while keeping architectural quality and design consistency at the center."
          />
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <Reveal delay={0.2} className="md:col-span-9 md:col-start-4">
              <p className="label leading-loose text-bone/45">{constructionDisciplines.join(" · ")}</p>
            </Reveal>
          </div>
          <ol className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-24 md:grid-cols-4 md:gap-x-6 md:gap-y-16">
            {qualityStages.map((q, i) => (
              <Reveal as="li" key={q.title} delay={(i % 4) * 0.08} className={i % 2 === 1 ? "md:mt-16" : ""}>
                <div className="group" data-cursor="Explore">
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                    <Image src={q.image} alt={`${q.title} stage of construction`} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover opacity-80 transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:opacity-100" />
                    <span className="label absolute left-3 top-3 text-bone/80">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium uppercase tracking-tight md:text-xl">{q.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bone/60">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* MATERIALS */}
      <section aria-labelledby="materials-title" className="bg-charcoal pt-24 text-bone md:pt-40 lg:pb-0">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="label mb-6 flex items-center gap-3 text-bone/50">
                <span>05</span>
                <span className="h-px w-8 bg-current" aria-hidden />
                <span>Materials</span>
              </p>
              <AnimatedText id="materials-title" as="h2" text="The materials matter." className="display display-lg uppercase" />
            </div>
            <Reveal className="md:col-span-4 md:col-start-9 md:self-end">
              <p className="leading-relaxed text-bone/65">
                Every material is chosen for how it performs, how it ages and how it feels. We help you select finishes that suit your design, your budget and the Karachi climate.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="wrap pb-24 pt-16 lg:max-w-none lg:px-0 lg:pb-0 lg:pt-0">
          <MaterialsScroller />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section aria-labelledby="why-title" className="py-24 md:py-40">
        <div className="wrap">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-32">
                <p className="label mb-6 flex items-center gap-3 text-concrete">
                  <span>06</span>
                  <span className="h-px w-8 bg-current" aria-hidden />
                  <span>Why choose us</span>
                </p>
                <AnimatedText id="why-title" as="h2" text={"Built around\nquality."} className="display display-lg uppercase" />
                <ImageReveal src={images.worker} alt="Construction professional on site" className="mt-12 hidden aspect-[4/3] w-full md:block" sizes="40vw" />
              </div>
            </div>
            <ol className="md:col-span-6 md:col-start-7">
              {reasons.map((r, i) => (
                <Reveal as="li" key={r.number} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-ink/10 py-8 last:border-b md:grid-cols-[5rem_1fr] md:py-10">
                  <span className="font-serif text-3xl italic text-bronze md:text-4xl">{r.number}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium uppercase tracking-tight md:text-2xl">{r.title}</h3>
                    <p className="mt-3 leading-relaxed text-graphite">{r.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PROCESS PREVIEW */}
      <section aria-labelledby="process-title" className="border-t border-ink/10 bg-paper py-24 md:py-32">
        <div className="wrap">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="process-title" index="07" eyebrow="Process" title="Eight steps to handover." className="flex-1" />
            <Reveal className="shrink-0">
              <Button href="/process" variant="outline">See the full process</Button>
            </Reveal>
          </div>
          <ol className="mt-16 grid grid-cols-2 border-l border-t border-ink/10 lg:grid-cols-4">
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

      {/* KARACHI COVERAGE */}
      <section aria-labelledby="karachi-title" className="relative overflow-hidden py-24 md:py-40">
        <div className="wrap">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6">
              <p className="label mb-6 flex items-center gap-3 text-concrete">
                <span>08</span>
                <span className="h-px w-8 bg-current" aria-hidden />
                <span>Coverage</span>
              </p>
              <AnimatedText id="karachi-title" as="h2" text={"Building across\nKarachi."} className="display display-lg uppercase" />
              <Reveal delay={0.1}>
                <p className="lead mt-8 max-w-lg text-graphite">
                  Serving residential construction requirements across Karachi, from 120 sq. yd. family homes to 1,000 sq. yd. residences, apartments and complete renovations of existing homes.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <ImageReveal src={images.karachi} alt="Modern residence" className="aspect-[4/5] w-full" sizes="(min-width: 768px) 40vw, 100vw" direction="right" />
            </div>
          </div>
          <ul className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/10 pt-10 md:mt-24" aria-label="Areas we serve">
            {serviceAreas.map((a, i) => (
              <Reveal as="li" key={a} delay={i * 0.04} className="font-display text-[clamp(1.75rem,4.5vw,4rem)] font-medium uppercase leading-[1.05] tracking-[-0.03em]">
                {a}
                {i < serviceAreas.length - 1 && <span className="ml-6 text-stone" aria-hidden>/</span>}
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-sm text-concrete">
            Areas listed indicate where we accept residential projects in {site.location.city}. Other areas are welcome. Just ask.
          </p>
        </div>
      </section>

      <Testimonials />

      <CTASection />
    </>
  );
}
