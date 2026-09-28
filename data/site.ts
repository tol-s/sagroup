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
    "Residential architecture and construction company in Karachi. Architectural design, CAD drawings, modern elevations, grey structure, finishing and turnkey home construction from concept to handover.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sagroup.vercel.app",

  phones: [
    { label: "Primary", display: "+92 316 2839917", tel: "+923162839917", whatsapp: "923162839917" },
    { label: "Secondary", display: "+92 345 2008343", tel: "+923452008343", whatsapp: "923452008343" },
  ],

  // Public contact email shown on the website (enquiry recipients are configured via env vars).
  emails: ["talhasaeed687@gmail.com", "atiqu8104@gmail.com"],

  location: {
    city: "Karachi",
    region: "Sindh",
    country: "Pakistan",
    countryCode: "PK",
    display: "Karachi, Pakistan",
  },

  whatsappMessage:
    "Hi, I am interested in constructing a modern home in Karachi. I would like to discuss my project.",

  // Leave href empty ("") until real profiles exist. Empty links render as "Coming soon".
  social: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "YouTube", href: "" },
  ],

  // Optional statistics. Leave value empty ("") to hide a stat. Do not publish unverified numbers.
  stats: [
    { value: "", label: "Years of experience" },
    { value: "", label: "Homes delivered" },
    { value: "", label: "Specialist trades" },
  ],

  foundedYear: "",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;
