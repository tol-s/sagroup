import { images } from "./images";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  included: string[];
  /** Name used in the contact form dropdown */
  formLabel: string;
};

/**
 * SERVICES
 * Edit, reorder, add or remove services here. Numbers are displayed as written.
 * Each service gets its own section on /services (anchor: /services#slug).
 */
export const services: Service[] = [
  {
    slug: "architectural-design",
    number: "01",
    title: "Architectural Design",
    shortDescription: "Planning shaped by your plot, your lifestyle and the way you want to live.",
    description:
      "Architectural planning based on plot dimensions, lifestyle, functional requirements and desired aesthetic. We study orientation, light, privacy and circulation before a single line is fixed, so every room earns its place.",
    image: images.plans,
    included: ["Requirement and lifestyle brief", "Space programming", "Zoning and circulation", "Concept floor plans", "Design development", "Client review sessions"],
    formLabel: "Architectural Design",
  },
  {
    slug: "cad-design-drawings",
    number: "02",
    title: "CAD Design & Drawings",
    shortDescription: "Precise, buildable drawings that leave nothing to guesswork on site.",
    description:
      "Professional CAD drawings that translate the design into clear instructions for every trade on site, reducing errors, rework and cost overruns.",
    image: images.drawings,
    included: ["Floor plans", "Elevations", "Sections", "Dimensions", "Door and window schedules", "Construction drawings", "Detail drawings"],
    formLabel: "CAD Design & Drawings",
  },
  {
    slug: "3d-visualization",
    number: "03",
    title: "3D Architectural Visualization",
    shortDescription: "See the home before it is built, and make decisions with confidence.",
    description:
      "Photorealistic or presentation-quality 3D concepts to visualize the home before construction. Test materials, colours and lighting while changes are still easy.",
    image: images.house3,
    included: ["Exterior 3D views", "Elevation renders", "Material and colour options", "Day and night lighting studies", "Interior concept views"],
    formLabel: "3D Visualization",
  },
  {
    slug: "modern-elevation-design",
    number: "04",
    title: "Modern Elevation Design",
    shortDescription: "Contemporary front elevations with proportion, texture and presence.",
    description:
      "Contemporary front elevations built on clean geometry, honest materials and balanced proportions. Designed to look striking by day and considered by night.",
    image: images.house2,
    included: ["Clean geometry", "Modern materials", "Architectural lighting", "Texture", "Glass", "Stone", "Metal", "Balanced proportions"],
    formLabel: "Modern Elevation",
  },
  {
    slug: "structural-design-planning",
    number: "05",
    title: "Structural Design & Planning",
    shortDescription: "The engineering that keeps a beautiful home standing for generations.",
    description:
      "Structural planning coordinated with the architecture, so spans, openings and cantilevers are designed to be built safely and efficiently.",
    image: images.engineer,
    included: ["Foundations", "Footings", "Columns", "Beams", "Slabs", "Staircases", "Structural elements"],
    formLabel: "Structural Planning",
  },
  {
    slug: "site-survey-planning",
    number: "06",
    title: "Site Survey & Planning",
    shortDescription: "Understanding the plot before committing to the plan.",
    description:
      "Site assessment and project planning based on plot conditions and requirements, including access, levels, neighbouring structures and services.",
    image: images.site,
    included: ["Plot measurement", "Level and access review", "Existing structure assessment", "Services and utilities review", "Preliminary project plan"],
    formLabel: "Other",
  },
  {
    slug: "grey-structure-construction",
    number: "07",
    title: "Grey Structure Construction",
    shortDescription: "Foundations, RCC frame and masonry executed to drawing.",
    description:
      "The structural shell of your home, executed with supervised workmanship, correct curing and quality materials, following the approved architectural and structural drawings.",
    image: images.structure,
    included: ["Excavation", "Earthwork", "PCC", "Foundation", "Footings", "RCC", "Columns", "Beams", "Slabs", "Brick and block masonry", "Roof structure", "Staircase structure", "Basic waterproofing preparation"],
    formLabel: "Grey Structure",
  },
  {
    slug: "brickwork-masonry",
    number: "08",
    title: "Brickwork & Masonry",
    shortDescription: "True lines, proper bonding and walls built to last.",
    description: "Professional masonry execution according to architectural and structural drawings, with attention to alignment, bonding and openings.",
    image: images.masonry,
    included: ["Brick masonry", "Block masonry", "Boundary walls", "Openings and lintels", "Line and level checks"],
    formLabel: "Brickwork & Masonry",
  },
  {
    slug: "plastering",
    number: "09",
    title: "Plastering",
    shortDescription: "Level, well-prepared surfaces that make every finish look better.",
    description: "Internal and external plastering with proper levels and surface preparation, ready for paint, texture or cladding.",
    image: images.scaffolding,
    included: ["Internal plaster", "External plaster", "Surface preparation", "Level and plumb checks", "Curing"],
    formLabel: "Other",
  },
  {
    slug: "electrical-work",
    number: "10",
    title: "Electrical Work",
    shortDescription: "Safe, well-planned electrical infrastructure for modern living.",
    description: "Complete electrical infrastructure planned around furniture layouts, lighting design and future needs.",
    image: images.electrical,
    included: ["Conduits", "Wiring", "Distribution boards", "Lighting points", "Power points", "Switch points", "Electrical infrastructure"],
    formLabel: "Electrical",
  },
  {
    slug: "plumbing-sanitary",
    number: "11",
    title: "Plumbing & Sanitary",
    shortDescription: "Reliable water supply and drainage, hidden neatly behind the finish.",
    description: "Water supply, drainage and sanitary installations executed with correct slopes, pressure testing and clean routing.",
    image: images.bathroom2,
    included: ["Water supply", "Drainage", "Sewerage", "Bathroom plumbing", "Kitchen plumbing", "Water tanks", "Pipe installation"],
    formLabel: "Plumbing",
  },
  {
    slug: "waterproofing",
    number: "12",
    title: "Waterproofing",
    shortDescription: "Protection against seepage for roofs, terraces and wet areas.",
    description: "Waterproofing treatments applied at the right stage, protecting structure and finishes from Karachi's humidity and monsoon rain.",
    image: images.house9,
    included: ["Roof waterproofing", "Bathroom waterproofing", "Terrace waterproofing", "Wet-area treatment"],
    formLabel: "Waterproofing",
  },
  {
    slug: "flooring-tiling",
    number: "13",
    title: "Flooring & Tiling",
    shortDescription: "Precise layouts, clean joints and durable surfaces.",
    description: "Floor and wall finishes laid to planned layouts, with correct levels, slopes and joint alignment.",
    image: images.interior2,
    included: ["Porcelain", "Ceramic", "Marble", "Granite", "Outdoor flooring", "Bathroom tiles", "Kitchen tiles"],
    formLabel: "Flooring & Tiling",
  },
  {
    slug: "false-ceiling",
    number: "14",
    title: "False Ceiling",
    shortDescription: "Modern ceilings with integrated, layered lighting.",
    description: "Modern false ceilings designed together with the lighting plan, concealing services and adding depth to every room.",
    image: images.living3,
    included: ["Gypsum ceilings", "Cove and profile lighting", "Concealed services", "Access panels", "Finishing"],
    formLabel: "False Ceiling",
  },
  {
    slug: "painting-finishing",
    number: "15",
    title: "Painting & Finishing",
    shortDescription: "The final layer, applied with patience and preparation.",
    description: "Interior and exterior painting with thorough surface preparation for an even, lasting finish.",
    image: images.painting,
    included: ["Surface preparation", "Interior painting", "Exterior painting", "Texture", "Finishing"],
    formLabel: "Painting & Finishing",
  },
  {
    slug: "kitchen-design-execution",
    number: "16",
    title: "Kitchen Design & Execution",
    shortDescription: "Kitchens planned around how you cook, store and gather.",
    description: "Complete kitchen design and execution, from workflow planning to cabinets, countertops and lighting.",
    image: images.kitchen,
    included: ["Kitchen layout", "Cabinets", "Countertops", "Storage", "Lighting", "Complete execution"],
    formLabel: "Kitchen",
  },
  {
    slug: "woodwork-carpentry",
    number: "17",
    title: "Woodwork & Carpentry",
    shortDescription: "Custom joinery that brings warmth and craft into the home.",
    description: "Doors, wardrobes, cabinets and wall panels built to measure, with durable hardware and careful detailing.",
    image: images.bedroom,
    included: ["Doors", "Wardrobes", "Cabinets", "Wall panels", "Custom woodwork"],
    formLabel: "Woodwork",
  },
  {
    slug: "aluminum-glass",
    number: "18",
    title: "Aluminum & Glass",
    shortDescription: "Slim frames and large openings that bring light inside.",
    description: "Aluminium windows, doors and architectural glazing that frame views and bring daylight deep into the plan.",
    image: images.glass,
    included: ["Windows", "Doors", "Glass partitions", "Shower enclosures", "Architectural glazing"],
    formLabel: "Aluminum & Glass",
  },
  {
    slug: "facade-exterior-finishing",
    number: "19",
    title: "Facade & Exterior Finishing",
    shortDescription: "Stone, cladding, texture and light: the face of your home.",
    description: "Execution of the approved elevation using stone, cladding, textures, metal elements and architectural lighting.",
    image: images.facade,
    included: ["Stone", "Cladding", "Texture", "Paint", "Metal elements", "Architectural lighting"],
    formLabel: "Facade",
  },
  {
    slug: "interior-design-execution",
    number: "20",
    title: "Interior Design & Execution",
    shortDescription: "Calm, cohesive interiors designed and delivered by one team.",
    description: "Interior planning and execution that connects architecture, materials and lighting into one coherent home.",
    image: images.interiorLuxe,
    included: ["Interior planning", "Materials", "Lighting", "Finishes", "Execution"],
    formLabel: "Interior Design",
  },
  {
    slug: "renovation-remodeling",
    number: "21",
    title: "Renovation & Remodeling",
    shortDescription: "Modern transformation of existing homes.",
    description: "Modern transformation of existing homes, from new elevations and layouts to complete interior renewal.",
    image: images.living4,
    included: ["Condition assessment", "Layout changes", "Elevation upgrades", "Services replacement", "Complete refinishing"],
    formLabel: "Renovation",
  },
  {
    slug: "turnkey-construction",
    number: "22",
    title: "Turnkey Construction",
    shortDescription: "One team, one contract, from design through handover.",
    description: "Complete end-to-end project management from design through handover. You make the decisions; we manage everything else.",
    image: images.villa,
    included: ["Design and drawings", "Approvals coordination support", "Grey structure", "Services", "Finishing", "Handover"],
    formLabel: "Turnkey Construction",
  },
  {
    slug: "project-management",
    number: "23",
    title: "Project Management",
    shortDescription: "Supervision, coordination and quality control on your behalf.",
    description: "Dedicated management that keeps your project on schedule, on specification and transparent at every stage.",
    image: images.worker,
    included: ["Site supervision", "Contractor coordination", "Material coordination", "Progress tracking", "Quality control", "Construction scheduling"],
    formLabel: "Project Management",
  },
];

/** Services highlighted on the home page, in display order. */
export const featuredServiceSlugs = [
  "architectural-design",
  "cad-design-drawings",
  "modern-elevation-design",
  "structural-design-planning",
  "grey-structure-construction",
  "painting-finishing",
  "renovation-remodeling",
  "turnkey-construction",
];

/** Short titles for the home page list (keeps numbering 01–08 as specified). */
export const featuredServiceTitles: Record<string, string> = {
  "painting-finishing": "Complete Finishing",
  "renovation-remodeling": "Renovation",
  "structural-design-planning": "Structural Planning",
};

/** Options shown in the contact form "Service Required" dropdown. */
export const serviceOptions = [
  "Architectural Design",
  "CAD Design & Drawings",
  "3D Visualization",
  "Modern Elevation",
  "Structural Planning",
  "Grey Structure",
  "Brickwork & Masonry",
  "Electrical",
  "Plumbing",
  "Waterproofing",
  "Flooring & Tiling",
  "False Ceiling",
  "Painting & Finishing",
  "Kitchen",
  "Woodwork",
  "Aluminum & Glass",
  "Facade",
  "Interior Design",
  "Renovation",
  "Turnkey Construction",
  "Project Management",
  "Other",
] as const;

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
