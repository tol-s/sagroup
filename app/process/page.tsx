import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { images } from "@/data/images";
import { processSteps } from "@/data/process";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our House Construction Process",
  description:
    "How we build homes in Karachi: consultation, site review, architectural design, CAD drawings, structural planning, grey structure, services, finishing, final inspection and handover.",
  alternates: { canonical: "/process" },
  openGraph: { url: "/process", title: `Construction Process | ${site.companyName}` },
};

export default function ProcessPage() {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How we build your home",
    step: processSteps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.detail })),
  };
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Process", path: "/process" }])} />
      <JsonLd data={howTo} />
      <PageHero
        eyebrow="Construction process"
        title="From architectural planning to final handover."
        image={images.processHero}
        imageAlt="Construction professional at work on site"
        intro="Ten clear stages. Each one reviewed with you before the next begins, so you always know what is happening and what comes next."
      />

      <section aria-labelledby="timeline-title" className="py-24 md:py-40">
        <div className="wrap">
          <SectionHeading id="timeline-title" eyebrow="Ten stages" title="How we build your home." />
          <div className="mt-16 md:mt-28">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section aria-labelledby="commitments-title" className="bg-ink py-24 text-bone md:py-32">
        <div className="wrap">
          <SectionHeading id="commitments-title" tone="light" eyebrow="At every stage" title="What you can expect." />
          <div className="mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
            {[
              ["Approval gates", "Nothing moves to the next stage until you have reviewed and approved the current one."],
              ["Site supervision", "Critical works such as foundations, steel and concrete are supervised and checked."],
              ["Progress updates", "Regular updates with photos, so you can follow your home from anywhere."],
              ["Clear communication", "One point of contact, reachable by phone and WhatsApp."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06} className="border-t border-bone/15 pt-6">
                <p className="font-serif text-3xl italic text-bronze-light">0{i + 1}</p>
                <h3 className="mt-4 font-display text-lg font-medium uppercase tracking-tight">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone/65">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={"Start with\nstep one."} copy="Book a free consultation. Bring your plot details and ideas, and we will walk you through the process, the scope and the next steps." />
    </>
  );
}
