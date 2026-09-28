export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  location: string;
  /** "en" for English, "ur-Latn" for Roman Urdu */
  lang: "en" | "ur-Latn";
};

/**
 * TESTIMONIALS
 * These are SAMPLE testimonials written to show the layout. The people are fictional.
 * Replace them with real, client-approved testimonials, then set showSampleTestimonialNotice to false.
 */
export const showSampleTestimonialNotice = true;

export const testimonials: Testimonial[] = [
  {
    quote:
      "From the first drawings to handover, everything was planned properly. The elevation turned out exactly like the 3D design, and we always knew what stage the work was at.",
    name: "Kamran Siddiqui",
    project: "Double-storey residence",
    location: "DHA Phase 8",
    lang: "en",
  },
  {
    quote:
      "Humein pehle bohat dar tha ke construction mein time aur budget dono barh jayenge, lekin team ne har cheez transparent rakhi. Grey structure bilkul drawings ke mutabiq bana.",
    name: "Ayesha Farooqui",
    project: "Grey structure & finishing",
    location: "Gulshan-e-Iqbal",
    lang: "ur-Latn",
  },
  {
    quote:
      "They handled our renovation while we were abroad. Regular photo updates on WhatsApp and a clean handover. The kitchen and false ceiling work is excellent.",
    name: "Imran Qureshi",
    project: "Renovation & interiors",
    location: "PECHS",
    lang: "en",
  },
  {
    quote:
      "Ghar ka design hamari family ki zaroorat ke hisaab se banaya gaya. Roshni aur hawa ka intezam zabardast hai, aur finishing ka kaam bohat saaf suthra hai.",
    name: "Sana Rizvi",
    project: "Modern family home",
    location: "North Nazimabad",
    lang: "ur-Latn",
  },
  {
    quote:
      "Professional from day one. One point of contact, clear drawings and no surprises on site. We would recommend them to anyone building in Karachi.",
    name: "Faisal Ahmed Khan",
    project: "Turnkey villa",
    location: "Bahria Town Karachi",
    lang: "en",
  },
  {
    quote:
      "Naqsha, CAD drawings aur construction sab ek hi team ne kiya, is liye koi confusion nahi hui. Waqt par kaam mukammal hua. Shukriya poori team ka.",
    name: "Muhammad Usman Shaikh",
    project: "Double-storey residence",
    location: "Scheme 33",
    lang: "ur-Latn",
  },
];
