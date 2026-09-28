import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { services } from "@/data/services";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Construction & Architecture Services in Karachi",
  description:
    "Architectural design, CAD drawings, 3D visualisation, modern elevations, structural planning, grey structure, finishing, interiors, renovation and turnkey house construction in Karachi.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services", title: `Services | ${site.companyName}` },
};

const groups = [
  { title: "Design", range: [0, 6] },
  { title: "Structure", range: [6, 9] },
  { title: "Services & Finishing", range: [9, 20] },
  { title: "Complete Delivery", range: [20, 23] },
] as const;

export default function ServicesPage() {
  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: s.title, description: s.description, areaServed: "Karachi", provider: { "@id": `${site.url}/#business` }, url: `${site.url}/services#${s.slug}` },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <JsonLd data={serviceListSchema} />
      <PageHero
        eyebrow="Services"
        title="Everything your home needs."
        image={images.servicesHero}
        imageAlt="Modern residence with clean architectural lines"
        intro="Twenty-three services, from the first sketch to the final coat of paint. Choose a single service or let us deliver the complete project."
      />

      {/* INDEX */}
      <section aria-labelledby="index-title" className="py-20 md:py-28">
        <div className="wrap">
          <h2 id="index-title" className="label mb-10 text-concrete">
            Service index
          </h2>
          <div className="grid gap-10 md:grid-cols-4 md:gap-8">
            {groups.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.06}>
                <p className="font-display text-lg font-medium uppercase tracking-tight">{g.title}</p>
                <ul className="mt-4 border-t border-ink/10">
                  {services.slice(g.range[0], g.range[1]).map((s) => (
                    <li key={s.slug} className="border-b border-ink/10">
                      <Link href={`#${s.slug}`} className="group flex items-baseline gap-3 py-2.5 text-[0.95rem] text-graphite transition-colors hover:text-ink">
                        <span className="label w-6 text-concrete">{s.number}</span>
                        <span className="link-underline">{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Service details" className="pb-16 md:pb-24">
        <div className="wrap">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      <CTASection title={"Not sure what\nyou need?"} copy="Share your plot details and goals. We will recommend the right scope, whether that is drawings only, grey structure, finishing or a complete turnkey build." />
    </>
  );
}
