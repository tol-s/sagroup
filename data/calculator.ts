/**
 * CONSTRUCTION COST CALCULATOR
 *
 * IMPORTANT: The rates below are STARTING ESTIMATES for Karachi and must be
 * confirmed by SA Group before relying on them. Update them here whenever
 * material prices change; the calculator, the packages section and the
 * /calculator page all read from this file.
 *
 * All rates are in PKR per square foot of covered area.
 */

export type WorkTypeId = "grey" | "finishing" | "premium-finishing" | "turnkey" | "premium-turnkey" | "design";

export type WorkType = {
  id: WorkTypeId;
  label: string;
  /** Short Roman Urdu helper shown under the option */
  hint: string;
  /** PKR per sq ft of covered area */
  rate: number;
  /** For turnkey options: how the rate splits into grey structure and finishing */
  split?: { grey: number; finishing: number };
};

export const workTypes: WorkType[] = [
  { id: "grey", label: "Grey Structure", hint: "Dhancha: foundation, RCC, chinai, plaster", rate: 3700 },
  { id: "finishing", label: "Finishing (Standard)", hint: "Tiles, paint, doors, windows, fittings", rate: 4300 },
  { id: "premium-finishing", label: "Finishing (Premium)", hint: "Marble, imported fittings, false ceilings", rate: 5600 },
  { id: "turnkey", label: "Turnkey (Standard)", hint: "Grey structure + standard finishing", rate: 8000, split: { grey: 3700, finishing: 4300 } },
  { id: "premium-turnkey", label: "Turnkey (Premium)", hint: "Grey structure + premium finishing", rate: 9300, split: { grey: 3700, finishing: 5600 } },
  { id: "design", label: "Architectural Design", hint: "Naksha, 3D elevation, CAD drawings", rate: 120 },
];

export type FloorsId = "g" | "g1" | "g2";

export const floorOptions: { id: FloorsId; label: string; hint: string }[] = [
  { id: "g", label: "G", hint: "Ground only" },
  { id: "g1", label: "G+1", hint: "2 floors" },
  { id: "g2", label: "G+2", hint: "3 floors" },
];

export type PlotSize = {
  id: string;
  label: string;
  sqyd: number;
  /** Typical total covered area (sq ft) for each floor configuration, including mumty */
  covered: Partial<Record<FloorsId, number>>;
  /** Typical complete construction time */
  timeline: string;
};

/** Typical covered areas for Karachi plots. Actual area depends on the approved plan and by-laws. */
export const plotSizes: PlotSize[] = [
  { id: "120", label: "120 sq. yd.", sqyd: 120, covered: { g: 1000, g1: 1950, g2: 2900 }, timeline: "6–8 months" },
  { id: "200", label: "200 sq. yd.", sqyd: 200, covered: { g: 1450, g1: 2850, g2: 4200 }, timeline: "7–9 months" },
  { id: "240", label: "240 sq. yd.", sqyd: 240, covered: { g: 1700, g1: 3300, g2: 4900 }, timeline: "8–10 months" },
  { id: "400", label: "400 sq. yd.", sqyd: 400, covered: { g: 2600, g1: 5100 }, timeline: "10–12 months" },
  { id: "500", label: "500 sq. yd.", sqyd: 500, covered: { g: 3100, g1: 6100 }, timeline: "11–13 months" },
  { id: "1000", label: "1,000 sq. yd.", sqyd: 1000, covered: { g: 5200, g1: 10200 }, timeline: "14–18 months" },
];

/** Shown under every estimate. */
export const estimateDisclaimer =
  "This is an approximate estimate to give you an idea of the budget. The final cost depends on your approved naksha, plot conditions, soil, material choices and market rates. Share your details on WhatsApp for an exact quotation.";

export function formatPKR(n: number) {
  return "PKR " + Math.round(n).toLocaleString("en-PK");
}

/** "PKR 2.34 crore" / "PKR 85 lakh" — how most Pakistani clients think about budgets. */
export function formatCroreLakh(n: number) {
  if (n >= 10_000_000) return `PKR ${(n / 10_000_000).toFixed(2).replace(/\.?0+$/, "")} crore`;
  if (n >= 100_000) return `PKR ${(n / 100_000).toFixed(1).replace(/\.0$/, "")} lakh`;
  return formatPKR(n);
}

/** PACKAGES: what each type of work includes. Brands are confirmed in the quotation. */
export const packages: { id: WorkTypeId; title: string; subtitle: string; items: string[]; featured?: boolean }[] = [
  {
    id: "grey",
    title: "Grey Structure",
    subtitle: "The strong frame of your home, built to the approved drawings.",
    items: [
      "Excavation, PCC and foundation",
      "RCC columns, beams and slabs",
      "Brick / block masonry",
      "Internal and external plaster",
      "Roof and staircase structure",
      "Plumbing and electrical conduits",
      "Waterproofing preparation",
      "Site supervision",
    ],
  },
  {
    id: "turnkey",
    title: "Turnkey (Standard)",
    subtitle: "Complete house from foundation to keys, ready to move in.",
    featured: true,
    items: [
      "Everything in Grey Structure",
      "Porcelain / ceramic tile flooring",
      "Emulsion paint inside and weather coat outside",
      "Aluminium windows and wooden doors",
      "Kitchen cabinets and countertop",
      "Bathroom fittings and fixtures",
      "Wiring, switches, lights and fans points",
      "False ceiling in main rooms",
      "Final cleaning and handover",
    ],
  },
  {
    id: "premium-turnkey",
    title: "Turnkey (Premium)",
    subtitle: "A refined home with premium materials and detailing.",
    items: [
      "Everything in Turnkey (Standard)",
      "Marble or large-format tiles",
      "Imported bathroom and kitchen fittings",
      "Designer false ceilings with lighting",
      "Media wall and feature walls",
      "Premium elevation finishes",
      "Wardrobes and built-in woodwork",
    ],
  },
];

/** FAQs shown on the home page and calculator page. */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How is the construction cost calculated?",
    a: "Construction in Pakistan is priced per square foot of covered area (the total built-up area of all floors). Multiply the covered area by the rate for the type of work: grey structure, finishing or complete turnkey. Our calculator does this for typical Karachi plot sizes.",
  },
  {
    q: "What is the difference between grey structure and finishing?",
    a: "Grey structure is the frame of the house: foundation, RCC columns, beams, slabs, brick work and plaster. Finishing is everything after that: tiles, paint, doors, windows, kitchen, bathrooms, electrical fittings and false ceilings. Turnkey means both, delivered as one complete project.",
  },
  {
    q: "Do you make the naksha (architectural design) as well?",
    a: "Yes. We prepare the floor plans, 3D elevation and CAD construction drawings before construction starts, so your home is designed properly first and then built exactly to that design.",
  },
  {
    q: "How long does it take to build a house?",
    a: "As a guide, a complete 120 sq. yd. house takes about 6–8 months, 240 sq. yd. about 8–10 months, 500 sq. yd. about 11–13 months and 1,000 sq. yd. about 14–18 months. The exact schedule is shared with your quotation.",
  },
  {
    q: "Is the calculator price final?",
    a: "No. It is an estimate to help you plan your budget. The final quotation depends on your approved naksha, soil and plot conditions, and the materials you choose. Send us your details on WhatsApp and we will prepare an exact quotation.",
  },
  {
    q: "How will I get updates on my project?",
    a: "You will have one point of contact and regular progress updates with photos on WhatsApp. You are welcome to visit the site at any stage.",
  },
  {
    q: "Which areas of Karachi do you work in?",
    a: "We take residential projects across Karachi, including DHA, Clifton, Bahria Town, PECHS, Gulshan-e-Iqbal, Gulistan-e-Johar, North Nazimabad, Scheme 33 and Malir.",
  },
];
