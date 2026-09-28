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
  { number: "01", title: "Consultation", summary: "Understand requirements, plot, lifestyle, budget and vision.", detail: "We meet to understand how you live, what you need from the home, your budget and your expectations for design and quality.", image: images.living2 },
  { number: "02", title: "Site & Requirements", summary: "Review site dimensions and project requirements.", detail: "We review the plot, its dimensions, access, orientation and surroundings, and confirm the brief before design begins.", image: images.site },
  { number: "03", title: "Architectural Design", summary: "Develop floor plans, elevations and architectural concepts.", detail: "Floor plans, elevation concepts and 3D views are developed and refined with you until the design is right.", image: images.plans },
  { number: "04", title: "CAD Drawings", summary: "Prepare detailed construction drawings.", detail: "The approved design is translated into a complete set of dimensioned CAD drawings for every trade.", image: images.drawings },
  { number: "05", title: "Structural Planning", summary: "Develop structural requirements.", detail: "Foundations, columns, beams and slabs are planned in coordination with the architecture.", image: images.engineer },
  { number: "06", title: "Grey Structure", summary: "Execute foundations, RCC, masonry, slabs and structural works.", detail: "Excavation, foundations, RCC frame, slabs and masonry are executed under supervision and checked against drawings.", image: images.structure },
  { number: "07", title: "Services", summary: "Electrical, plumbing and utility infrastructure.", detail: "Conduits, wiring, water supply, drainage and utility infrastructure are installed and tested before finishing.", image: images.electrical },
  { number: "08", title: "Finishing", summary: "Plaster, flooring, ceilings, paint, doors, windows and interiors.", detail: "Plaster, flooring, ceilings, paint, woodwork, aluminium, glass and interiors bring the home to life.", image: images.interior2 },
  { number: "09", title: "Final Inspection", summary: "Review construction and finishing quality.", detail: "A detailed walkthrough checks workmanship, finishes and services, and any snags are resolved.", image: images.living },
  { number: "10", title: "Handover", summary: "Complete the project and hand over the residence.", detail: "Your completed home is handed over, clean and ready to live in.", image: images.house },
];
