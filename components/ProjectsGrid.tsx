"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import Button from "./Button";
import { projectFilters, projects, type ProjectFilter } from "@/data/projects";
import clsx from "@/lib/clsx";

/** Projects index with instant client-side filtering. */
export default function ProjectsGrid() {
  const [filter, setFilter] = useState<"all" | ProjectFilter>("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.filters.includes(filter));

  return (
    <div>
      <div role="toolbar" aria-label="Filter projects" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {projectFilters.map((f) => {
          const count = f.value === "all" ? projects.length : projects.filter((p) => p.filters.includes(f.value as ProjectFilter)).length;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.value)}
              className={clsx(
                "label relative isolate inline-flex h-11 shrink-0 items-center gap-2 border px-5 transition-colors duration-500",
                active ? "border-ink text-bone" : "border-ink/15 text-ink hover:border-ink/60",
              )}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 bg-ink" transition={{ type: "spring", stiffness: 400, damping: 36 }} />}
              <span className="relative">{f.label}</span>
              <span className={clsx("relative tabular-nums", active ? "text-bone/60" : "text-concrete")}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <LayoutGroup>
        <motion.div layout className="mt-12 grid gap-x-8 gap-y-16 md:mt-16 md:grid-cols-2 md:gap-y-20">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={clsx(i % 2 === 1 && "md:mt-40")}
              >
                <ProjectCard project={p} index={projects.indexOf(p)} aspect="aspect-[4/5]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {visible.length === 0 && (
        <div className="mt-16 border-y border-ink/10 py-16 text-center">
          <p className="display display-sm">Case studies coming soon.</p>
          <p className="mx-auto mt-4 max-w-md text-graphite">We are preparing this part of the portfolio. Tell us about your project and we will share relevant work directly.</p>
          <div className="mt-8 flex justify-center">
            <Button href="/contact">Discuss your project</Button>
          </div>
        </div>
      )}
    </div>
  );
}
