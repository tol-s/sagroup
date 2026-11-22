/**
 * CONSTRUCTION COST CALCULATOR
 *
 * Package rates confirmed by SA Group (November 2026):
 *   Grey Structure 2,800 · Turnkey Standard 4,000 · Turnkey Premium 5,000 ·
 *   Turnkey Signature on request.
 * Finishing-only rates are derived as turnkey minus grey structure (1,200 / 2,200).
 * The architectural design rate (120) is still a starting estimate to confirm.
 * Update them here whenever material prices change; the calculator, the
 * packages section and the /calculator page all read from this file.
 *
 * All rates are in PKR per square foot of covered area.
 */

export type WorkTypeId = "grey" | "finishing" | "premium-finishing" | "turnkey" | "premium-turnkey" | "signature-turnkey" | "design";

export type WorkType = {
  id: WorkTypeId;
  label: string;
  /** Package name from the SA Builders & Developers specification sheet */
  pkg?: string;
  /** Short Roman Urdu helper shown under the option */
  hint: string;
  /** PKR per sq ft of covered area (0 = price on request) */
  rate: number;
  /** For turnkey options: how the rate splits into grey structure and finishing */
  split?: { grey: number; finishing: number };
};

export const workTypes: WorkType[] = [
  { id: "grey", label: "Grey Structure", pkg: "SA Core", hint: "Dhancha: foundation, RCC, blocks, plaster", rate: 2800 },
  { id: "turnkey", label: "Turnkey (Standard)", pkg: "SA Element", hint: "Mukammal ghar, standard finishing", rate: 4000, split: { grey: 2800, finishing: 1200 } },
  { id: "premium-turnkey", label: "Turnkey (Premium)", pkg: "SA Sovereign", hint: "Structure + high-end finishing", rate: 5000, split: { grey: 2800, finishing: 2200 } },
  { id: "signature-turnkey", label: "Turnkey (Signature)", pkg: "SA Signature", hint: "Luxury finishing + full furnishing", rate: 0 },
  { id: "finishing", label: "Finishing (Standard)", hint: "Grey structure ready? Tiles, paint, doors", rate: 1200 },
  { id: "premium-finishing", label: "Finishing (Premium)", hint: "Premium tiles, fittings, ceilings", rate: 2200 },
  { id: "design", label: "Architectural Design", hint: "Naksha, 3D elevation, CAD · on plot area", rate: 120 },
];

export type FloorsId = "g" | "g1" | "g2";

export const floorOptions: { id: FloorsId; label: string; hint: string; count: number }[] = [
  { id: "g", label: "G", hint: "Ground only", count: 1 },
  { id: "g1", label: "G+1", hint: "2 floors", count: 2 },
  { id: "g2", label: "G+2", hint: "3 floors", count: 3 },
];

/**
 * COVERAGE: the share of the plot that may be built on each floor. It depends
 * on the plot's society / location (for example about 50% in Bahria Town and
 * 65% in Aligarh Muslim Society), so the visitor picks the percentage.
 */
export const coverageChoices = [50, 55, 60, 65, 70, 75, 80, 100];
export const defaultCoverage = 65;

export const SQFT_PER_SQYD = 9;

/** Covered area (sq ft) = plot (sq yd) × 9 × coverage % × number of floors. */
export function coveredArea(sqyd: number, pct: number, floorCount: number) {
  return Math.round(sqyd * SQFT_PER_SQYD * (pct / 100)) * floorCount;
}

export type PlotSize = {
  id: string;
  label: string;
  sqyd: number;
  /** Typical complete construction time */
  timeline: string;
};

/** Karachi plot sizes and typical complete construction time. */
export const plotSizes: PlotSize[] = [
  { id: "120", label: "120 sq. yd.", sqyd: 120, timeline: "4–5 months" },
  { id: "200", label: "200 sq. yd.", sqyd: 200, timeline: "5–6 months" },
  { id: "240", label: "240 sq. yd.", sqyd: 240, timeline: "5–6 months" },
  { id: "400", label: "400 sq. yd.", sqyd: 400, timeline: "7–8 months" },
  { id: "500", label: "500 sq. yd.", sqyd: 500, timeline: "7–8 months" },
  { id: "1000", label: "1,000 sq. yd.", sqyd: 1000, timeline: "10–12 months" },
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

/**
 * PACKAGES: from the SA Builders & Developers Material Specifications sheet
 * (Ref SAB/MAT-SPEC/2026). Values are in package order: Core, Element, Sovereign, Signature.
 * null = not included.
 */
export const packages: { id: WorkTypeId; name: string; title: string; subtitle: string; urdu: string; featured?: boolean }[] = [
  { id: "grey", name: "SA Core", title: "Grey Structure", subtitle: "Grey structure only", urdu: "Sirf dhancha" },
  { id: "turnkey", name: "SA Element", title: "Turnkey (Standard)", subtitle: "Structure + standard finishing", urdu: "Mukammal ghar, basic finishing", featured: true },
  { id: "premium-turnkey", name: "SA Sovereign", title: "Turnkey (Premium)", subtitle: "Structure + high-end finishing", urdu: "Premium finishing ke saath" },
  { id: "signature-turnkey", name: "SA Signature", title: "Turnkey (Signature)", subtitle: "Structure + luxury + furnishing", urdu: "Luxury finishing aur furniture ke saath" },
];

type Spec = [string, string | null, string | null, string | null, string | null];

export const packageSpecs: Spec[] = [
  ["Cement", "DG Cement / Lucky", "DG Cement / Lucky", "DG Cement / Lucky", "DG Cement / Lucky / Falcon"],
  ["Steel", "Deformed 60 Grade", "Deformed 60 Grade", "Naveena / Rasheedson / Grade 60", "Amreli Steel (Grade 60)"],
  ["Aggregates & blocks", "5×8×12 A+ quality blocks", "5×8×12 A+ quality blocks", "5×8×12 A+ quality blocks", "A++ aggregates, 5×8×12 A++ solid / hollow blocks"],
  ["Plaster work", "Standard base plaster", "Standard smooth finish", "Premium high-finish plaster", "Plaster premium finishes"],
  ["Plumbing piping", "PPRC / PVC underground & overhead lines", "PPRC / PVC drainage piping (6\" Steelex)", "6\" PVC Steelex pipes", "6\" PVC Steelex pipes"],
  ["Wiring & conduits", "PVC electrical pipes & backboxes (conduiting)", "Pak Cables / Popular wiring", "Popular / Million Cables", "Pakistan Cables"],
  ["Tiles & flooring", null, "China / imported 2×2 ft (Times, Orient)", "China / imported 2×4 ft (Times, Orient, City)", "Imported 2×4 ft (Times, City, Casa)"],
  ["False ceiling", null, "A+ quality ceiling", "A+ quality ceiling", "A++ quality false ceiling"],
  ["Sanitary & bathroom fittings", null, "Open imported shower set", "Concealed shower set / piano set", "Concealed / piano set (Porta, WKI, Polo, Idrees)"],
  ["Commode & vanities", null, "One-piece commode, basin / PVC vanity", "Wall-hanging / one-piece, imported vanity", "Wall-hanging / one-piece, imported vanity"],
  ["Doors & woodwork", null, "Pasting doors (8 ft)", "Semi-solid / pasting (8 / 9 ft)", "Solid wood doors (9 ft height)"],
  ["Wardrobes", null, null, "Tactile sheet wardrobes", "Glass and aluminium wardrobes"],
  ["Kitchen top & sinks", null, "Artificial marble, standard SS sink", "Artificial marble, imported sink", "Granite top, 2 imported sinks"],
  ["Kitchen appliances", null, "Cooking stove", "Stove & hood", "Oven, stove, microwave & hood"],
  ["Refrigerator", null, null, null, "Double door refrigerator"],
  ["Chokhat (door frames)", "Solid wood / steel chokhats installed", "Solid wood / 18 gauge steel", "Solid wood / 16 gauge steel", "Wood or 16 gauge heavy chokhat"],
  ["Windows", null, "Deluxe aluminium windows", "Premium heavy aluminium windows", "High-grade aluminium windows"],
  ["Paint & wall finish", null, "High-quality interior & exterior paint", "Premium high-end paint", "Premium high-end paint"],
  ["Furnishing", null, null, null, "Full furnishing (bed sets, dressing units)"],
  ["Lighting fixtures", null, "COB ceiling lights", "COB lights & chandeliers", "COB lights, chandeliers, profile lights"],
];

/** General execution terms from the specification sheet. */
export const packageTerms: { title: string; text: string }[] = [
  { title: "Brand availability", text: "Materials are procured as specified. If a brand or item is unavailable in the market, an equal-quality alternative is used only with your prior written consent." },
  { title: "Your approvals", text: "Tile shade and design, paint colours, laminate textures and sanitary finishes are approved by you in writing before installation." },
  { title: "Material testing", text: "Lab test certificates for Grade 60 steel and cement can be provided on request during site inspections." },
  { title: "Not included", text: "External utility connection fees (K-Electric meter, SSGC gas connection, municipal approvals) are outside the package scope." },
];

/** FAQs shown on the home page and calculator page. */
export const faqs: { q: string; a: string }[] = [
  {
    q: "How is the construction cost calculated?",
    a: "Construction in Pakistan is priced per square foot of covered area (the total built-up area of all floors). The covered area depends on your plot size, the covered area % allowed for your plot and the number of floors. Multiply it by the rate for the type of work: grey structure, finishing or complete turnkey. Our calculator does this for you.",
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
    a: "As a guide, a complete 120 sq. yd. house takes about 4–5 months, 200 or 240 sq. yd. about 5–6 months, 400 or 500 sq. yd. about 7–8 months and 1,000 sq. yd. about 10–12 months. The exact schedule is shared with your quotation.",
  },
  {
    q: "Which brands do you use?",
    a: "Every package has a written material specification: for example DG / Lucky cement and Grade 60 steel in all packages, and tiles from Times, Orient, City or Casa depending on the package. See the full list under Packages. Any brand substitution needs your written consent.",
  },
  {
    q: "What is not included in the packages?",
    a: "External utility connection fees such as the K-Electric meter, SSGC gas connection and municipal approvals are not part of the package price.",
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
