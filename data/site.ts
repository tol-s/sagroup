/**
 * SITE CONFIGURATION
 * Change company details here. Every page, the footer, metadata, emails and
 * structured data read from this file.
 */
export const site = {
  companyName: "SA Group",
  shortName: "SA Group",
  tagline: "Modern Design. Solid Construction. Complete Execution.",
  description:
    "Architectural design and residential construction company in Karachi. Professionally designed and constructed houses, villas and apartments, from 2D plans, CAD drawings and 3D elevations to grey structure, finishing and handover.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagroup.pk",

  // The first entry is the main business number: every "Call Now" button dials it.
  // `person: false` marks the business line (not shown as a team member).
  phones: [
    { label: "Main line", name: "SA Group", role: "Call & WhatsApp", display: "+92 333 2008343", tel: "+923332008343", whatsapp: "923332008343", person: false },
    { label: "CEO", name: "Atiq Ur Rehman", role: "CEO", display: "+92 315 1209720", tel: "+923151209720", whatsapp: "923151209720", person: true },
    { label: "Project Director", name: "M Abubakar", role: "Project Director", display: "+92 300 2237363", tel: "+923002237363", whatsapp: "923002237363", person: true },
  ],

  // WhatsApp Business: every WhatsApp button on the site opens a chat with this number.
  whatsappBusiness: { display: "+92 333 2008343", number: "923332008343" },

  // Public business email shown on the website (enquiry recipients are configured via env vars).
  email: "info@sagroup.pk",

  location: {
    city: "Karachi",
    region: "Sindh",
    country: "Pakistan",
    countryCode: "PK",
    display: "Karachi, Pakistan",
  },

  whatsappMessage:
    "Hi, I am interested in constructing a modern home in Karachi. I would like to discuss my project.",

  // Social profiles shown in the footer and contact page.
  social: [
    { label: "Facebook", href: "https://www.facebook.com/sagroup.pk" },
    { label: "Instagram", href: "https://www.instagram.com/sagroup.pk" },
  ],

  // Optional statistics. Leave value empty ("") to hide a stat. Do not publish unverified numbers.
  stats: [
    { value: "", label: "Years of experience" },
    { value: "", label: "Homes delivered" },
    { value: "", label: "Specialist trades" },
  ],

  foundedYear: "",
} as const;

/**
 * SA GROUP DIVISIONS
 * Shown on the home page, About page and footer. To show a division's logo,
 * put the file in public/divisions/ and set `logo` (e.g. "/divisions/sa-builders.png").
 */
export const divisions: {
  name: string;
  line2: string;
  short: string;
  description: string;
  urdu: string;
  points: string[];
  logo?: string;
  cta: { label: string; message: string };
}[] = [
  {
    name: "SA Builders",
    line2: "& Developers",
    short: "SA Builders & Developers",
    description: "Architecture, construction and real estate. Design and construction of houses, villas, apartments and commercial buildings in Karachi, from the naksha to the keys.",
    urdu: "Ghar ka naksha, grey structure, finishing aur mukammal turnkey construction.",
    points: ["Architectural design & 3D elevation", "Grey structure & finishing", "Turnkey houses & apartments"],
    logo: "/divisions/sa-builders-white.png",
    cta: { label: "Discuss your project", message: "Hi SA Builders & Developers, I would like to discuss a construction project." },
  },
  {
    name: "SA Building",
    line2: "Materials",
    short: "SA Building Materials",
    description: "The building materials division of SA Group, supplying construction materials for building projects in Karachi.",
    urdu: "Construction ka saman, ek bharosemand naam se.",
    points: ["Construction material supply", "A division of SA Group", "Rates and availability on WhatsApp"],
    cta: { label: "Ask for material rates", message: "Hi SA Building Materials, please share current rates and availability for construction materials." },
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Cost Calculator", href: "/calculator" },
  { label: "Contact", href: "/contact" },
] as const;
