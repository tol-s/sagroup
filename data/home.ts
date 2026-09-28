import { images } from "./images";

/**
 * Stages of the complete construction scope, shown on the home page ("Complete construction. One professional team.").
 * These are components of one project, not standalone services.
 */
export const qualityStages = [
  { title: "Foundation", text: "Excavation, PCC and footings as per the structural drawings.", image: images.site },
  { title: "RCC Structure", text: "Columns, beams and slabs with proper shuttering and curing.", image: images.structure },
  { title: "Masonry & Roofing", text: "True lines, correct bonding, aligned openings and a sound roof.", image: images.masonry },
  { title: "Waterproofing", text: "Roofs, terraces and wet areas protected at the right stage.", image: images.house9 },
  { title: "Electrical", text: "Conduits and points planned around the approved layout.", image: images.electrical },
  { title: "Plumbing", text: "Pressure-tested supply lines and properly sloped drainage.", image: images.bathroom2 },
  { title: "Flooring & Tiling", text: "Level substrates, planned layouts and clean joints.", image: images.interior2 },
  { title: "Carpentry, Ceilings & Paint", text: "Joinery, false ceilings and careful preparation before every final coat.", image: images.painting },
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
  { number: "01", title: "Design-Led Approach", text: "We design the building before we build it: optimized layouts, natural light, ventilation and modern elevations planned around your plot." },
  { number: "02", title: "Proper Drawings & 3D", text: "2D plans, CAD drawings and 3D visualization before work starts, so decisions are made on paper, not on site." },
  { number: "03", title: "Quality Materials", text: "Materials selected for performance and longevity, with clear specifications you can review." },
  { number: "04", title: "Built to the Approved Design", text: "Construction follows the approved architectural and structural drawings, from RCC to fine finishing." },
  { number: "05", title: "Professional Supervision", text: "Regular site supervision and quality checks at every critical stage." },
  { number: "06", title: "End-to-End Project Delivery", text: "One accountable team coordinating design, construction, building services, interiors and handover." },
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
