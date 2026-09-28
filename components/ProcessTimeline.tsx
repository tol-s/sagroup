"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { processSteps } from "@/data/process";
import clsx from "@/lib/clsx";

/**
 * Interactive vertical timeline. A progress line fills as you scroll;
 * the sticky image on desktop follows the step in view (or the one hovered/focused).
 */
export default function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const step = processSteps[active];

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-8">
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand" data-cursor="Explore">
            <AnimatePresence initial={false}>
              <motion.div
                key={step.number}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", scale: 1.1 }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)", scale: 1 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image src={step.image} alt={step.title} fill sizes="40vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 bg-bone px-5 py-4">
              <p className="label text-concrete">Step {step.number}</p>
              <p className="font-display text-2xl font-medium uppercase tracking-tight">{step.title}</p>
            </div>
          </div>
        </div>
      </div>

      <ol ref={ref} className="relative md:col-span-6 md:col-start-7">
        <span className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-ink/10 md:left-[0.9375rem]" aria-hidden />
        <motion.span
          className="absolute left-[0.6875rem] top-0 w-px origin-top bg-ink md:left-[0.9375rem]"
          style={{ scaleY: reduce ? 1 : progress, height: "100%" }}
          aria-hidden
        />
        {processSteps.map((s, i) => (
          <motion.li
            key={s.number}
            className="relative pb-14 pl-12 last:pb-0 md:pb-20 md:pl-20"
            onViewportEnter={() => setActive(i)}
            viewport={{ margin: "-45% 0px -45% 0px" }}
            onMouseEnter={() => setActive(i)}
          >
            <span
              className={clsx(
                "absolute left-0 top-1 grid size-6 place-items-center rounded-full border bg-bone transition-colors duration-500 md:size-8",
                i <= active ? "border-ink" : "border-ink/20",
              )}
              aria-hidden
            >
              <span className={clsx("size-2 rounded-full transition-all duration-500", i === active ? "scale-100 bg-bronze" : i < active ? "bg-ink" : "scale-0 bg-ink")} />
            </span>
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="label text-concrete">Step {s.number}</p>
              <h3 className={clsx("display mt-3 text-[clamp(1.75rem,3.2vw,3rem)] transition-colors duration-500", i === active ? "text-ink" : "text-ink/50")}>{s.title}</h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/85">{s.summary}</p>
              <p className="mt-3 max-w-md leading-relaxed text-graphite">{s.detail}</p>
              <div className="relative mt-6 aspect-[16/10] overflow-hidden bg-sand md:hidden">
                <Image src={s.image} alt={s.title} fill sizes="100vw" className="object-cover" />
              </div>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
