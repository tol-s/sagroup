import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CostCalculator from "@/components/CostCalculator";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { FaqSection, PackagesSection, TimelineSection } from "@/components/home/HomeSections";
import { images } from "@/data/images";
import { faqs } from "@/data/calculator";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "House Construction Cost Calculator Karachi",
  description:
    "Estimate the construction cost of your house in Karachi. Choose plot size (120, 200, 240, 400, 500 or 1,000 sq. yd.), floors and grey structure, finishing or turnkey to get an instant per sq ft estimate.",
  alternates: { canonical: "/calculator" },
  openGraph: { url: "/calculator", title: `Construction Cost Calculator | ${site.companyName}` },
};

export default function CalculatorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Cost Calculator", path: "/calculator" }])} />
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="Cost calculator"
        title="Plan your budget."
        image={images.plans}
        imageAlt="Architectural plans for a house"
        intro="An instant construction estimate for your plot in Karachi. Apne ghar ka budget pehle se plan karein."
      />

      <section aria-labelledby="calc-title" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHeading id="calc-title" eyebrow="Instant estimate" title="Calculate your cost." />
          <div className="mt-14 md:mt-20">
            <CostCalculator />
          </div>
        </div>
      </section>

      <section aria-labelledby="pkg-title" className="border-t border-ink/10 bg-paper py-20 md:py-28">
        <div className="wrap">
          <SectionHeading id="pkg-title" eyebrow="Packages" title="What's included." />
          <div className="mt-14">
            <PackagesSection />
          </div>
        </div>
      </section>

      <section aria-labelledby="time-title" className="py-20 md:py-28">
        <div className="wrap">
          <SectionHeading id="time-title" eyebrow="Timeline" title="How long will it take?" />
          <div className="mt-14">
            <TimelineSection />
          </div>
        </div>
      </section>

      <section aria-labelledby="calc-faq-title" className="border-t border-ink/10 bg-paper py-20 md:py-28">
        <div className="wrap">
          <SectionHeading id="calc-faq-title" eyebrow="FAQ" title="Common questions." />
          <div className="mt-12">
            <FaqSection />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
