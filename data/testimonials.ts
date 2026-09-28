export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  location: string;
  /** Set to false once a real, client-approved testimonial is added. */
  placeholder: boolean;
};

/**
 * TESTIMONIALS
 * No client reviews have been provided yet, so these are clearly labelled placeholders.
 * Replace each entry with a real testimonial (with the client's permission) and set placeholder: false.
 */
export const testimonials: Testimonial[] = [
  { quote: "Client testimonial will be added here.", name: "Client Name", project: "Project Type", location: "Karachi", placeholder: true },
  { quote: "Client testimonial will be added here.", name: "Client Name", project: "Project Type", location: "Karachi", placeholder: true },
  { quote: "Client testimonial will be added here.", name: "Client Name", project: "Project Type", location: "Karachi", placeholder: true },
];
