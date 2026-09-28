import type { Metadata } from "next";
import { MessageCircle, Phone, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import JsonLd from "@/components/JsonLd";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/contact";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact | Free Construction Consultation in Karachi",
  description: `Request a free consultation for house construction, architectural design, CAD drawings or renovation in Karachi. Call ${site.phones[0].display} or ${site.phones[1].display}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: `Contact ${site.companyName}` },
};

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const sp = await searchParams;
  const service = typeof sp.service === "string" ? sp.service : undefined;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title="Let's build your home."
        image={images.contactHero}
        imageAlt="Modern house at dusk"
        intro="Tell us about your plot, your vision and your requirements. The first consultation is free."
      >
        <div className="flex flex-wrap gap-3">
          <Button href={telLink(0)} variant="light">Call Now</Button>
          <Button href={whatsappLink(0)} variant="ghost-light">WhatsApp</Button>
          <Button href="#enquiry" variant="ghost-light" icon={false}>Free Consultation</Button>
        </div>
      </PageHero>

      <section className="py-20 md:py-32" aria-labelledby="enquiry-title">
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4" aria-label="Contact details">
            <div className="lg:sticky lg:top-28">
              <p className="label mb-6 text-concrete">Speak with us</p>
              <ul className="border-t border-ink/10">
                {site.phones.map((p, i) => (
                  <li key={p.tel} className="border-b border-ink/10 py-6">
                    <p className="label text-concrete">{p.label} line</p>
                    <a href={`tel:${p.tel}`} className="mt-2 block font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium tracking-tight hover:text-bronze">
                      {p.display}
                    </a>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={telLink(i)} className="label inline-flex h-10 items-center gap-2 border border-ink/20 px-4 hover:bg-ink hover:text-bone">
                        <Phone className="size-3.5" strokeWidth={1.5} aria-hidden /> Call
                      </a>
                      <a href={whatsappLink(i)} target="_blank" rel="noopener noreferrer" className="label inline-flex h-10 items-center gap-2 border border-ink/20 px-4 hover:bg-ink hover:text-bone">
                        <MessageCircle className="size-3.5" strokeWidth={1.5} aria-hidden /> WhatsApp
                      </a>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3 border-b border-ink/10 py-6">
                  <MapPin className="mt-0.5 size-4 text-concrete" strokeWidth={1.5} aria-hidden />
                  <div>
                    <p className="label text-concrete">Location</p>
                    <p className="mt-2">{site.location.display}</p>
                    <p className="mt-1 text-sm text-graphite">Serving residential projects across Karachi.</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>

          <div id="enquiry" className="scroll-mt-28 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="label mb-6 text-concrete">Free consultation</p>
              <h2 id="enquiry-title" className="display display-md uppercase">
                Tell us about your project.
              </h2>
              <p className="lead mt-6 max-w-xl text-graphite">Share a few details and we will get back to you to arrange a consultation.</p>
            </Reveal>
            <div className="mt-14">
              <ContactForm initialService={service} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
