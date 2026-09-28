"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import clsx from "@/lib/clsx";

type Props = {
  project: Project;
  index: number;
  aspect?: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export default function ProjectCard({ project, index, aspect = "aspect-[4/5]", sizes = "(min-width: 768px) 50vw, 100vw", className, priority }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={clsx("group", className)}
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="block" data-cursor="View" aria-label={`View project: ${project.title}, ${project.location}`}>
        <div className={clsx("relative overflow-hidden bg-sand", aspect)}>
          <Image
            src={project.cardImage ?? project.heroImage}
            alt={`${project.title}, ${project.location}`}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/25" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-bone px-5 py-4 text-ink transition-transform duration-700 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
            <span className="label">View Project</span>
            <ArrowRight className="size-4" strokeWidth={1.5} aria-hidden />
          </div>
          <span className="label absolute left-4 top-4 bg-bone/90 px-2.5 py-1.5 text-ink backdrop-blur-sm">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-[clamp(1.35rem,2vw,1.85rem)] font-medium uppercase leading-none tracking-[-0.02em]">{project.title}</h3>
            <p className="mt-2 text-sm text-graphite">{project.location}</p>
          </div>
          <p className="label mt-1 max-w-[12rem] text-right text-concrete">{project.category}</p>
        </div>
      </Link>
    </motion.article>
  );
}
