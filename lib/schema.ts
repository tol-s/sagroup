import { site } from "@/data/site";
import { services } from "@/data/services";
import { serviceAreas } from "@/data/home";
import { images } from "@/data/images";
import type { Project } from "@/data/projects";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": `${site.url}/#business`,
    name: site.companyName,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    image: images.hero,
    telephone: site.phones.map((p) => p.tel),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Karachi" },
      ...serviceAreas.map((a) => ({ "@type": "Place", name: `${a}, Karachi` })),
    ],
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      name: p.role ? `${p.name}, ${p.role}` : p.name,
      telephone: p.tel,
      contactType: "customer service",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"],
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architectural design and residential construction services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.shortDescription, areaServed: "Karachi" },
      })),
    },
    sameAs: site.social.map((s) => s.href).filter(Boolean),  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}

export function projectSchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.title,
    description: p.description,
    image: p.gallery.map((g) => g.src),
    locationCreated: { "@type": "Place", name: p.location },
    genre: p.category,
    creator: { "@id": `${site.url}/#business` },
    url: `${site.url}/projects/${p.slug}`,
  };
}
