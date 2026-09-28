import { images } from "./images";

export type ProcessStep = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  image: string;
};

/** CONSTRUCTION PROCESS shown on /process and summarised on the home page. */
export const processSteps: ProcessStep[] = [
  { number: "01", title: "Consultation", summary: "Understand requirements, lifestyle, plot and goals.", detail: "We meet to understand how you live, the size and location of your plot, your budget and what you want the finished home to feel like.", image: images.living2 },
  { number: "02", title: "Site & Requirements", summary: "Review site, dimensions and project requirements.", detail: "We review the plot, its dimensions, orientation, access and surroundings, and confirm the brief before any design work begins.", image: images.site },
  { number: "03", title: "Architectural Design", summary: "Develop layouts, plans and elevations.", detail: "Floor plans are optimized for space, natural light and ventilation, and a modern elevation is developed and refined with you.", image: images.plans },
  { number: "04", title: "CAD & 3D Visualization", summary: "Create detailed drawings and visualizations.", detail: "The approved design is resolved into detailed CAD drawings and 3D visualization, so you see the home before construction starts.", image: images.house3 },
  { number: "05", title: "Construction Planning", summary: "Finalize construction requirements.", detail: "Structural requirements, materials, schedule and the complete construction scope are finalized before work begins on site.", image: images.engineer },
  { number: "06", title: "Construction", summary: "Execute the approved design.", detail: "Foundation, RCC structure, masonry and roofing are executed under supervision, strictly according to the approved drawings.", image: images.structure },
  { number: "07", title: "Interior & Finishing", summary: "Complete building services, interiors and finishing.", detail: "Plumbing, electrical and waterproofing are completed, followed by flooring, tiling, carpentry, false ceilings, painting, kitchens and bathrooms.", image: images.interior2 },
  { number: "08", title: "Handover", summary: "Final inspection and project handover.", detail: "A detailed final inspection checks workmanship, finishes and services, any snags are resolved, and your completed home is handed over.", image: images.house },
];
