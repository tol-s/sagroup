import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CostCalculator from "@/components/CostCalculator";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import JsonLd from "@/components/JsonLd";
import { FaqSection, PackagesSection, TimelineSection } from "@/components/home/HomeSections";
import { faqs, packageTerms } from "@/data/calculator";
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
        intro="An instant construction estimate for your plot in Karachi. Apne ghar ka budget pehle se plan karein."
      />

      <section aria-label="Cost calculator" className="py-8 md:py-14">
        <div className="wrap">
          <CostCalculator />
        </div>
      </section>

      <section aria-labelledby="pkg-title" className="border-t border-ink/10 bg-paper py-20 md:py-28">
        <div className="wrap">
          <SectionHeading id="pkg-title" eyebrow="Packages" title="What's included." intro="Material specifications for each SA Builders & Developers package. Tap a package to see every item." />
          <div className="mt-12">
            <PackagesSection table />
          </div>
          <ul className="mt-10 grid gap-6 border-t border-ink/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {packageTerms.map((t) => (
              <li key={t.title}>
                <p className="label text-ink">{t.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">{t.text}</p>
              </li>
            ))}
          </ul>
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
