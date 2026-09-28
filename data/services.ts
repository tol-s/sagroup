import { images } from "./images";

export type ServiceTier = "primary" | "major" | "supporting" | "additional";

export type ScopeGroup = {
  title: string;
  items: string[];
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** Importance of the service. Used for the service index and card eyebrow. */
  tier: ServiceTier;
  shortDescription: string;
  description: string;
  image: string;
  /** Heading shown above `included` (defaults to "What is included") */
  includedLabel?: string;
  included: string[];
  /**
   * Complete construction scope: the construction disciplines handled within this service.
   * Trades (plumbing, electrical, painting...) live here as project components, never as standalone services.
   */
  scope?: ScopeGroup[];
  /** Name used in the contact form dropdown */
  formLabel: string;
};

export const tierLabels: Record<ServiceTier, string> = {
  primary: "Primary focus",
  major: "Major service",
  supporting: "Supporting service",
  additional: "Additional service",
};

/**
 * SERVICES
 * The seven primary services. Each gets its own section on /services (anchor: /services#slug).
 * Individual construction disciplines (plumbing, electrical, painting, flooring, waterproofing,
 * carpentry, masonry, tiling, roofing, false ceilings) are listed inside each service's `scope`.
 */
export const services: Service[] = [
  {
    slug: "residential-house-construction",
    number: "01",
    title: "Residential House Construction",
    tier: "primary",
    shortDescription: "Professionally designed and constructed homes, from 120 sq. yd. family houses to 1,000 sq. yd. residences.",
    description:
      "Professionally designed and constructed residential homes from concept to completion. Every house begins with architectural planning, an optimized layout and a modern elevation, then moves into construction planning, quality materials and complete execution through to interiors, finishing and handover. One professionally managed residential project, from design to completion.",
    image: images.house,
    includedLabel: "Plot sizes & project types",
    included: [
      "120 sq. yd. houses",
      "240 sq. yd. houses",
      "500 sq. yd. houses",
      "1,000 sq. yd. houses",
      "Villas & contemporary residences",
      "Grey structure",
      "Turnkey construction",
      "Renovation & remodeling",
    ],
    scope: [
      { title: "Architectural planning", items: ["2D plans", "CAD drawings", "3D elevations", "3D visualization"] },
      { title: "Construction", items: ["Grey structure", "Foundation", "RCC structure", "Masonry", "Roofing", "Plastering"] },
      { title: "Building services", items: ["Plumbing", "Electrical", "Waterproofing"] },
      { title: "Interior & finishing", items: ["Flooring", "Tiling", "Painting", "Carpentry", "False ceilings", "Kitchens", "Bathrooms"] },
      { title: "Final delivery", items: ["Complete inspection", "Final finishing", "Handover"] },
    ],
    formLabel: "Residential House Construction",
  },
  {
    slug: "apartment-flat-construction",
    number: "02",
    title: "Apartment & Flat Construction",
    tier: "major",
    shortDescription: "Apartment buildings and residential flats, planned and built with the same architectural care as a home.",
    description:
      "Professional residential construction and development for apartment buildings, residential flats and multi-storey residential buildings. Layouts are planned for natural light, ventilation and efficient use of space, and every floor is constructed and finished according to the approved architectural design.",
    image: images.apartments,
    included: ["Apartment buildings", "Residential flats", "Multi-storey residential buildings", "Complete construction", "Complete finishing"],
    scope: [
      { title: "Planning & structure", items: ["Architectural planning", "Structural construction", "Grey structure", "Masonry", "Roofing"] },
      { title: "Building services", items: ["Plumbing", "Electrical", "Waterproofing"] },
      { title: "Interior & finishing", items: ["Flooring", "Tiling", "Painting", "Carpentry", "False ceilings", "Complete finishing"] },
    ],
    formLabel: "Apartment & Flat Construction",
  },
  {
    slug: "commercial-construction",
    number: "03",
    title: "Commercial Construction",
    tier: "additional",
    shortDescription: "Commercial buildings, shops, plazas and offices, delivered with the same planning discipline.",
    description:
      "Alongside our residential work, we plan and construct commercial buildings, shops and plazas, offices and retail spaces, with the same focus on proper drawings, structural quality and clean, durable finishing.",
    image: images.glass,
    included: ["Commercial buildings", "Shops & plazas", "Offices", "Retail spaces"],
    scope: [
      { title: "Structure", items: ["Structural work", "Masonry", "Roofing"] },
      { title: "Building services", items: ["Plumbing", "Electrical"] },
      { title: "Interior & finishing", items: ["Flooring", "Tiling", "Painting", "Carpentry", "False ceilings", "Finishing"] },
    ],
    formLabel: "Commercial Construction",
  },
  {
    slug: "grey-structure-construction",
    number: "04",
    title: "Grey Structure Construction",
    tier: "supporting",
    shortDescription: "Foundation, RCC structure and masonry, executed to approved architectural and structural drawings.",
    description:
      "Professionally planned structural construction. The grey structure is executed according to proper architectural and structural planning, with supervised workmanship, correct curing and quality materials, creating a sound base for everything that follows.",
    image: images.structure,
    included: ["Foundation", "RCC structure", "Masonry", "Roofing", "Plastering"],
    scope: [
      {
        title: "Structural execution",
        items: ["Excavation & earthwork", "PCC & footings", "Columns, beams & slabs", "Brick & block masonry", "Staircase structure", "Waterproofing preparation"],
      },
      { title: "Coordinated with", items: ["Plumbing provisions", "Electrical conduits", "Approved structural drawings"] },
    ],
    formLabel: "Grey Structure Construction",
  },
  {
    slug: "architectural-design",
    number: "05",
    title: "Architectural Design",
    tier: "major",
    shortDescription: "A better home starts with better architectural planning: 2D plans, CAD drawings, 3D elevations and visualization.",
    description:
      "We design the building before we build it. Plans are developed around your plot, lifestyle and budget, with optimized layouts, natural light, ventilation and efficient use of space, then resolved into modern elevations, detailed CAD drawings and 3D visualization, always with practical construction in mind.",
    image: images.plans,
    included: ["2D architectural plans", "CAD drawings", "3D elevation", "3D visualization"],
    scope: [
      {
        title: "Design priorities",
        items: ["Optimized layouts", "Functional planning", "Space optimization", "Modern elevations", "Natural light", "Ventilation", "Aesthetic consistency", "Construction practicality"],
      },
    ],
    formLabel: "Architectural Design",
  },
  {
    slug: "interior-finishing",
    number: "06",
    title: "Interior & Finishing",
    tier: "supporting",
    shortDescription: "Complete interior execution: flooring, tiles, paint, ceilings, woodwork, kitchens and bathrooms.",
    description:
      "Complete interior execution that carries the architectural design through to the final detail. Floors, walls, ceilings, joinery, kitchens and bathrooms are delivered as one coordinated finishing scope, keeping materials and aesthetics consistent throughout the home.",
    image: images.living3,
    included: ["Flooring & tiles", "Paint", "False ceilings", "Woodwork", "Kitchens", "Bathrooms"],
    scope: [
      { title: "Finishing scope", items: ["Flooring", "Tiling", "Painting", "Carpentry", "False ceilings", "Kitchens", "Bathrooms"] },
      { title: "Coordinated with", items: ["Electrical & lighting points", "Plumbing fixtures", "Wet-area waterproofing"] },
    ],
    formLabel: "Interior & Finishing",
  },
  {
    slug: "renovation-remodeling",
    number: "07",
    title: "Renovation & Remodeling",
    tier: "supporting",
    shortDescription: "Modern transformation of existing houses, flats and offices, planned before work begins.",
    description:
      "Modern transformation of existing homes, flats and offices. Every renovation starts with architectural redesign and space planning, then is delivered as one complete project, from structural changes and services to new kitchens, bathrooms and finishes.",
    image: images.living4,
    included: ["House renovation", "Flat renovation", "Office renovation", "Kitchen remodeling", "Bathroom remodeling"],
    scope: [
      { title: "Planning", items: ["Architectural redesign", "Space planning"] },
      { title: "Construction & services", items: ["Masonry", "Plumbing", "Electrical", "Waterproofing"] },
      {
        title: "Interior & finishing",
        items: ["Flooring", "Tiling", "Painting", "Carpentry", "Kitchens", "Bathrooms", "False ceilings", "Final finishing"],
      },
    ],
    formLabel: "Renovation & Remodeling",
  },
];

/** Services shown on the home page, in display order (residential first). */
export const featuredServiceSlugs = [
  "residential-house-construction",
  "architectural-design",
  "apartment-flat-construction",
  "grey-structure-construction",
  "interior-finishing",
  "renovation-remodeling",
  "commercial-construction",
];

/** Optional shorter titles for the home page list. */
export const featuredServiceTitles: Record<string, string> = {};

/** Construction disciplines handled within projects (shown as secondary scope, never as primary services). */
export const constructionDisciplines = [
  "Structural Work",
  "Masonry",
  "Roofing",
  "Plumbing",
  "Electrical",
  "Waterproofing",
  "Flooring",
  "Tiling",
  "Carpentry",
  "Painting",
  "False Ceilings",
];

/** Options shown in the contact form "Service Required" dropdown. */
export const serviceOptions = [
  "Residential House Construction",
  "Apartment & Flat Construction",
  "Commercial Construction",
  "Grey Structure Construction",
  "Architectural Design",
  "Interior & Finishing",
  "Renovation & Remodeling",
] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
