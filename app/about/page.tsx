import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import AnimatedText from "@/components/AnimatedText";
import ImageReveal from "@/components/ImageReveal";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { images } from "@/data/images";
import { serviceAreas } from "@/data/home";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us | Architectural Design & Residential Construction in Karachi",
  description: `${site.companyName} is a Karachi-based architectural design and residential construction company. We design homes before we build them, then deliver the complete project from CAD drawings and 3D elevations to grey structure, finishing and handover.`,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: `About ${site.companyName}` },
};

const pillars = [
  {
    title: "Architecture",
    text: "Every project starts with professional architectural planning: optimized layouts, functional spaces, natural light, ventilation and a modern elevation with proportion and presence.",
    image: images.plans,
  },
  {
    title: "Planning",
    text: "The design is resolved into 2D plans, CAD drawings and 3D visualization, and the construction scope is finalized, before any work begins on site.",
    image: images.engineer,
  },
  {
    title: "Construction",
    text: "Foundation, RCC structure, masonry and roofing are executed according to the approved drawings, with quality materials and supervision at every critical stage.",
    image: images.structure,
  },
  {
    title: "Finishing",
    text: "Building services, interiors and final finishing are completed with attention to detail, so the finished home matches the design it started from.",
    image: images.masonry,
  },
];

export default function AboutPage() {
  const stats = site.stats.filter((s) => s.value);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        title="We build with purpose."
        image={images.aboutHero}
        imageAlt="Contemporary architecture with strong geometry"
        intro="An architectural design and residential construction company in Karachi. We believe a home should be designed before it is built."
      />

      {/* WHO WE ARE */}
      <section aria-labelledby="who-title" className="py-24 md:py-40">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="label mb-6 text-concrete">Who we are</p>
            <AnimatedText id="who-title" as="h2" text={"Architects of\nthe home.\nBuilders of\nthe detail."} className="display display-md uppercase" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="lead text-ink">
                {site.companyName} designs and constructs residential houses, villas and apartments across Karachi. We combine professional architectural planning, optimized layouts, modern elevations and functional spaces with construction execution, quality materials and complete finishing.
              </p>
              <p className="mt-6 leading-relaxed text-graphite">
                Homeowners come to us when they want a home that is professionally designed, not just built. We don&apos;t just build houses. We design and construct them properly, with attention to detail and contemporary aesthetics from the first drawing to the final finish.
              </p>
            </Reveal>
            {stats.length > 0 && (
              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="label text-concrete">{s.label}</dt>
                    <dd className="display display-sm mt-3">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
        <div className="wrap mt-16 grid gap-6 md:mt-28 md:grid-cols-12">
          <ImageReveal src={images.aboutStudio} alt="Architectural drawings and plans" className="aspect-[4/3] md:col-span-7" sizes="(min-width: 768px) 58vw, 100vw" direction="left" />
          <ImageReveal src={images.aboutSite} alt="Residential construction site" className="aspect-[4/3] md:col-span-5 md:mt-40 md:aspect-[3/4]" sizes="(min-width: 768px) 40vw, 100vw" direction="right" />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section aria-labelledby="philosophy-title" className="bg-ink py-24 text-bone md:py-40">
        <div className="wrap">
          <p className="label mb-10 text-bone/50">Our philosophy</p>
          <AnimatedText
            id="philosophy-title"
            as="h2"
            text={"A home should be designed\nbefore it is built."}
            className="display display-lg max-w-6xl uppercase"
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {[
              ["Design before building", "Decisions made on drawings cost nothing. Decisions made on site cost time and money. We resolve the design first."],
              ["Honest materials", "We recommend materials for how they perform and age, and we are clear about what is included and what it costs."],
              ["Accountability", "One team answers for the design, the construction and the finish, so responsibility never falls between separate parties."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="border-t border-bone/15 pt-6">
                <p className="font-serif text-3xl italic text-bronze-light">0{i + 1}</p>
                <h3 className="mt-4 font-display text-xl font-medium uppercase tracking-tight">{t}</h3>
                <p className="mt-3 leading-relaxed text-bone/65">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section aria-labelledby="pillars-title" className="py-24 md:py-40">
        <div className="wrap">
          <SectionHeading id="pillars-title" eyebrow="What we bring" title="Four disciplines. One team." />
          <div className="mt-16 md:mt-24">
            {pillars.map((p, i) => (
              <article key={p.title} className="grid gap-8 border-t border-ink/10 py-12 md:grid-cols-12 md:items-center md:py-16">
                <p className="label text-concrete md:col-span-1">0{i + 1}</p>
                <h3 className="display display-sm md:col-span-4">{p.title}</h3>
                <Reveal className="md:col-span-4">
                  <p className="leading-relaxed text-graphite">{p.text}</p>
                </Reveal>
                <ImageReveal src={p.image} alt={p.title} className="aspect-[4/3] md:col-span-3" sizes="(min-width: 768px) 25vw, 100vw" parallax={4} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* KARACHI + CLIENT EXPERIENCE */}
      <section aria-labelledby="coverage-title" className="bg-paper py-24 md:py-40">
        <div className="wrap grid gap-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="label mb-6 text-concrete">Karachi coverage</p>
            <AnimatedText id="coverage-title" as="h2" text={"Building across\nKarachi."} className="display display-md uppercase" />
            <Reveal>
              <p className="mt-8 leading-relaxed text-graphite">
                Serving residential construction requirements across Karachi. We regularly discuss projects in areas including:
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {serviceAreas.map((a) => (
                  <li key={a} className="label border border-ink/15 px-3 py-2">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="label mb-6 text-concrete">Client experience</p>
            <h2 className="display display-md uppercase">Clear from day one.</h2>
            <ol className="mt-10">
              {[
                ["A single point of contact", "One person responsible for your project, reachable by phone and WhatsApp."],
                ["Transparent scope", "Clear drawings, specifications and a defined scope before work begins."],
                ["Regular updates", "Progress shared at each stage, with site visits whenever you want them."],
                ["A proper handover", "Final inspection, snag resolution and a clean, complete home."],
              ].map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 0.06} className="grid grid-cols-[3rem_1fr] border-t border-ink/10 py-6 last:border-b">
                  <span className="label pt-1 text-concrete">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{t}</h3>
                    <p className="mt-2 text-graphite">{d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/process">Our process</Button>
              <Button href="/services" variant="outline">Our services</Button>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
