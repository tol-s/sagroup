import ProjectCard from "../ProjectCard";
import { projects } from "@/data/projects";

/** Asymmetric editorial grid of featured projects. */
const layout = [
  { className: "md:col-span-7", aspect: "aspect-[4/5]", sizes: "(min-width: 768px) 58vw, 100vw" },
  { className: "md:col-span-4 md:col-start-9 md:mt-56", aspect: "aspect-[3/4]", sizes: "(min-width: 768px) 33vw, 100vw" },
  { className: "md:col-span-5 md:col-start-2", aspect: "aspect-square", sizes: "(min-width: 768px) 42vw, 100vw" },
  { className: "md:col-span-6 md:col-start-7 md:mt-32", aspect: "aspect-[5/4]", sizes: "(min-width: 768px) 50vw, 100vw" },
  { className: "md:col-span-12", aspect: "aspect-[4/3] md:aspect-[21/9]", sizes: "100vw" },
];

export default function FeaturedProjects() {
  return (
    <div className="grid gap-x-8 gap-y-16 md:grid-cols-12 md:gap-y-24">
      {projects.slice(0, layout.length).map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} aspect={layout[i].aspect} sizes={layout[i].sizes} className={layout[i].className} />
      ))}
    </div>
  );
}
