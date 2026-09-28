import { images } from "./images";

export type ProjectFilter = "modern-homes" | "villas" | "elevation" | "turnkey" | "renovation";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  type: string;
  style: string;
  scope: string;
  description: string;
  overview: string;
  designApproach: string;
  heroImage: string;
  cardImage?: string;
  gallery: GalleryImage[];
  features: string[];
  filters: ProjectFilter[];
};

/**
 * IMPORTANT: These are SAMPLE / DEMONSTRATION projects that show how the
 * portfolio will be presented. They are not claims of completed work.
 * Replace them with real projects (and real photography) when available.
 * The notice shown on the website is controlled by `showSampleNotice` below.
 */
export const showSampleNotice = true;

export const projectFilters: { value: "all" | ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "modern-homes", label: "Modern Homes" },
  { value: "villas", label: "Villas" },
  { value: "elevation", label: "Elevation" },
  { value: "turnkey", label: "Turnkey" },
  { value: "renovation", label: "Renovation" },
];

export const projects: Project[] = [
  {
    slug: "the-concrete-residence",
    title: "The Concrete Residence",
    location: "DHA Karachi",
    category: "Modern Residential Construction",
    type: "Double-Storey Residence",
    style: "Contemporary Minimal",
    scope: "Architecture, CAD drawings, grey structure, finishing and interiors",
    description:
      "A contemporary residence built around clean horizontal lines, large openings, textured surfaces and a restrained material palette.",
    overview:
      "Conceived as a calm retreat from the city, the Concrete Residence stacks two long horizontal volumes over a recessed ground floor. Deep overhangs shade the large openings from the Karachi sun, while the textured facade gives the house a quiet, monolithic presence from the street. Inside, living, dining and kitchen flow into one generous space that opens to the garden.",
    designApproach:
      "The design is driven by horizontality and restraint. A limited palette of textured render, dark metal and warm timber lets light and shadow do the decorative work. Openings are placed deliberately: wide to the garden, narrow and high to the street, balancing daylight with privacy.",
    heroImage: images.house,
    gallery: [
      { src: images.house, alt: "Exterior of a contemporary two-storey residence with horizontal volumes", caption: "Exterior" },
      { src: images.house8, alt: "Front elevation with large glazed openings", caption: "Front elevation" },
      { src: images.living, alt: "Open-plan living room with neutral finishes", caption: "Living room" },
      { src: images.interior, alt: "Minimal interior with natural light", caption: "Interior" },
      { src: images.kitchen, alt: "Modern kitchen with island", caption: "Kitchen" },
      { src: images.bedroom2, alt: "Calm bedroom with soft daylight", caption: "Bedroom" },
      { src: images.facade, alt: "Detail of white architectural surfaces and shadows", caption: "Material details" },
    ],
    features: ["Modern facade", "Large windows", "Open living spaces", "Architectural lighting", "Minimal staircase", "Contemporary interiors"],
    filters: ["modern-homes", "elevation", "turnkey"],
  },
  {
    slug: "the-monochrome-house",
    title: "The Monochrome House",
    location: "Bahria Town Karachi",
    category: "Modern Home",
    type: "Double-Storey Residence",
    style: "Minimal Monochrome",
    scope: "Architecture, elevation design, grey structure and finishing",
    description:
      "A clean modern residence using white architectural volumes, dark frames, large windows and subtle lighting.",
    overview:
      "The Monochrome House is an exercise in contrast. Crisp white volumes are cut by dark aluminium frames and large panes of glass, creating a graphic composition that changes throughout the day. At night, concealed lighting washes the walls and turns the house into a lantern.",
    designApproach:
      "Geometry comes first. Each volume is expressed clearly, with setbacks and projections used to create depth rather than applied decoration. The black and white palette continues inside, softened by timber and textiles.",
    heroImage: images.house4,
    gallery: [
      { src: images.house4, alt: "White modern house with dark window frames", caption: "Exterior" },
      { src: images.house6, alt: "Geometric front elevation of a modern home", caption: "Elevation" },
      { src: images.living2, alt: "Minimal living room in neutral tones", caption: "Living" },
      { src: images.kitchen2, alt: "White modern kitchen", caption: "Kitchen" },
      { src: images.bedroom3, alt: "Minimal bedroom", caption: "Bedroom" },
      { src: images.bathroom, alt: "Contemporary bathroom", caption: "Bathroom" },
    ],
    features: ["White facade", "Dark aluminium frames", "Large glazing", "Modern lighting", "Geometric massing", "Minimal interiors"],
    filters: ["modern-homes", "elevation"],
  },
  {
    slug: "the-courtyard-residence",
    title: "The Courtyard Residence",
    location: "Clifton Karachi",
    category: "Contemporary Residential",
    type: "Family Residence",
    style: "Courtyard Architecture",
    scope: "Architecture, structural planning, turnkey construction",
    description:
      "A modern family home organised around a private courtyard to maximise daylight, privacy and natural ventilation.",
    overview:
      "Turning inward from a busy street, the Courtyard Residence places a planted open-air court at the heart of the plan. Every principal room looks onto it, drawing in daylight and cross-ventilation while keeping family life private.",
    designApproach:
      "The courtyard is treated as the main room of the house. Circulation wraps around it, and large sliding openings allow living spaces to extend outdoors. Solid street-facing walls give privacy, while the inner facades are almost entirely glass.",
    heroImage: images.house5,
    gallery: [
      { src: images.house5, alt: "Modern home arranged around an open courtyard", caption: "Courtyard" },
      { src: images.house10, alt: "Residence with landscaped surroundings", caption: "Exterior" },
      { src: images.house13, alt: "Outdoor space around a modern family home", caption: "Outdoor living" },
      { src: images.living3, alt: "Living space opening to outdoor areas", caption: "Living" },
      { src: images.interior3, alt: "Bright interior with large openings", caption: "Open living" },
      { src: images.kitchen3, alt: "Family kitchen", caption: "Kitchen" },
      { src: images.bedroom, alt: "Bedroom with natural light", caption: "Bedroom" },
      { src: images.bathroom3, alt: "Bathroom with stone finishes", caption: "Bathroom" },
    ],
    features: ["Central courtyard", "Open living", "Natural lighting", "Modern staircase", "Landscape integration", "Large openings"],
    filters: ["modern-homes", "turnkey"],
  },
  {
    slug: "the-modern-villa",
    title: "The Modern Villa",
    location: "DHA Phase 6 Karachi",
    category: "Luxury Villa",
    type: "Triple-Storey Residence",
    style: "Contemporary Luxury",
    scope: "Architecture, 3D visualisation, turnkey construction and interiors",
    description:
      "A premium modern villa using strong vertical elements, large openings and layered facade volumes.",
    overview:
      "Rising over three levels, the Modern Villa announces itself with a double-height entrance and a layered facade of solid planes and glass. The plan is organised for entertaining on the ground floor, family life above and a private retreat at the top.",
    designApproach:
      "Vertical fins and projecting frames give the elevation rhythm and depth, while carefully integrated lighting reveals the layers at night. Premium materials are used sparingly and precisely: stone at the base, glass in the middle, and a light, floating roof.",
    heroImage: images.villa,
    gallery: [
      { src: images.villa, alt: "Luxury modern villa with pool", caption: "Exterior" },
      { src: images.villa2, alt: "Villa elevation with layered volumes", caption: "Elevation" },
      { src: images.house12, alt: "Villa exterior with glazing and landscaping", caption: "Garden facade" },
      { src: images.interiorLuxe, alt: "Luxury living room interior", caption: "Living" },
      { src: images.kitchen4, alt: "Premium kitchen", caption: "Kitchen" },
      { src: images.bedroom2, alt: "Master bedroom", caption: "Bedroom" },
      { src: images.bathroom2, alt: "Luxury bathroom", caption: "Bathroom" },
      { src: images.lighting, alt: "Detail of architectural lighting", caption: "Lighting details" },
    ],
    features: ["Double-height entrance", "Modern facade", "Architectural lighting", "Large glazing", "Premium interiors", "Contemporary staircase"],
    filters: ["villas", "elevation", "turnkey"],
  },
  {
    slug: "the-urban-residence",
    title: "The Urban Residence",
    location: "Gulshan-e-Iqbal Karachi",
    category: "Residential Construction",
    type: "Double-Storey Family Home",
    style: "Modern Practical",
    scope: "Architecture, CAD drawings, grey structure and finishing",
    description:
      "A practical modern family residence designed around efficient circulation, natural light and contemporary architecture.",
    overview:
      "On a compact urban plot, every square foot matters. The Urban Residence uses a disciplined plan, a central stair and carefully placed openings to deliver bright, generous rooms for a growing family without wasted space.",
    designApproach:
      "Efficiency and light guided every decision. A single well-lit stair core organises the plan, services are stacked for economy, and a clean modern elevation gives the house a strong identity on the street.",
    heroImage: images.house3,
    gallery: [
      { src: images.house3, alt: "Modern family home at dusk", caption: "Exterior" },
      { src: images.house7, alt: "Modern home elevation", caption: "Elevation" },      { src: images.living4, alt: "Bright family living room", caption: "Living" },
      { src: images.living6, alt: "Compact open-plan living and dining", caption: "Dining" },
      { src: images.kitchen2, alt: "Efficient modern kitchen", caption: "Kitchen" },
      { src: images.bedroom3, alt: "Family bedroom", caption: "Bedroom" },
    ],
    features: ["Functional planning", "Modern elevation", "Natural lighting", "Efficient floor plan", "Contemporary interiors"],
    filters: ["modern-homes", "elevation"],
  },
  {
    slug: "the-stone-and-glass-house",
    title: "The Stone & Glass House",
    location: "Scheme 33 Karachi",
    category: "Modern Architecture",
    type: "Contemporary Residence",
    style: "Stone + Glass",
    scope: "Architecture, facade, turnkey construction and landscape",
    description:
      "A contemporary residence combining stone textures, glass openings and warm architectural lighting.",
    overview:
      "Heavy and light at once, the Stone & Glass House grounds itself with textured stone walls and then dissolves into floor-to-ceiling glazing. Warm lighting draws out the texture of the stone after dark.",
    designApproach:
      "The house is composed of two materials in conversation. Stone forms the protective, private elements; glass forms the open, social ones. Landscape is brought right up to the glazing so the garden reads as part of the interior.",
    heroImage: images.house2,
    gallery: [
      { src: images.house2, alt: "Contemporary residence with glass openings lit at dusk", caption: "Exterior" },
      { src: images.house11, alt: "House with landscape surroundings", caption: "Landscape" },
      { src: images.living5, alt: "Warm living room interior", caption: "Living" },
      { src: images.interior2, alt: "Living space with warm, natural finishes", caption: "Lounge" },
      { src: images.kitchen, alt: "Kitchen with warm lighting", caption: "Kitchen" },
      { src: images.bathroom, alt: "Stone bathroom", caption: "Bathroom" },
      { src: images.lamp, alt: "Warm pendant lighting detail", caption: "Details" },
    ],
    features: ["Stone facade", "Large glass openings", "Warm lighting", "Modern staircase", "Contemporary interiors", "Landscape integration"],
    filters: ["modern-homes", "villas", "turnkey"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return { prev, next };
}
