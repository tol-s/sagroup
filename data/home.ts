import { images } from "./images";

/** QUALITY stages shown on the home page. */
export const qualityStages = [
  { title: "Foundation", text: "Correct excavation, PCC and footings as per structural drawings.", image: images.site },
  { title: "Structure", text: "RCC columns, beams and slabs with proper shuttering and curing.", image: images.structure },
  { title: "Masonry", text: "True lines, correct bonding and aligned openings.", image: images.masonry },
  { title: "Waterproofing", text: "Roofs, terraces and wet areas protected at the right stage.", image: images.house9 },
  { title: "Electrical", text: "Planned conduits, safe wiring and organised distribution.", image: images.electrical },
  { title: "Plumbing", text: "Pressure-tested supply lines and properly sloped drainage.", image: images.bathroom2 },
  { title: "Flooring", text: "Level substrates, planned layouts and clean joints.", image: images.interior2 },
  { title: "Finishing", text: "Patient surface preparation before every final coat.", image: images.painting },
];

/** MATERIALS section. No brand claims: add brands only when confirmed. */
export const materials = [
  { name: "Concrete", note: "Structure and texture", image: images.facade },
  { name: "Brick", note: "Masonry and warmth", image: images.masonry },
  { name: "Stone", note: "Facades and grounding", image: images.bathroom3 },
  { name: "Marble", note: "Floors and surfaces", image: images.bathroom },
  { name: "Wood", note: "Joinery and doors", image: images.bedroom },
  { name: "Glass", note: "Light and openness", image: images.glass },
  { name: "Metal", note: "Frames and detailing", image: images.house4 },
  { name: "Tiles", note: "Wet areas and kitchens", image: images.bathroom2 },
  { name: "Paint", note: "Colour and protection", image: images.painting },
  { name: "Lighting", note: "Atmosphere and emphasis", image: images.lighting },
];

/** WHY CHOOSE US */
export const reasons = [
  { number: "01", title: "Modern Architectural Design", text: "Contemporary homes designed around your plot, your family and the Karachi climate." },
  { number: "02", title: "Detailed Planning", text: "Complete CAD and structural drawings before work starts, so decisions are made on paper, not on site." },
  { number: "03", title: "Quality Materials", text: "Materials selected for performance and longevity, with clear specifications you can review." },
  { number: "04", title: "Skilled Execution", text: "Experienced trades for every stage, from RCC to fine finishing." },
  { number: "05", title: "Professional Supervision", text: "Regular site supervision and quality checks at every critical stage." },
  { number: "06", title: "Complete Project Management", text: "One accountable team coordinating design, materials, trades and schedule." },
];

/** KARACHI service areas. These are areas served, not a list of completed projects. */
export const serviceAreas = [
  "DHA",
  "Clifton",
  "Bahria Town",
  "PECHS",
  "Gulshan-e-Iqbal",
  "Gulistan-e-Johar",
  "North Nazimabad",
  "Scheme 33",
  "Malir",
];
