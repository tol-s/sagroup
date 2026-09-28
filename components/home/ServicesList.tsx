"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { featuredServiceSlugs, featuredServiceTitles, services, type Service } from "@/data/services";
import clsx from "@/lib/clsx";

/** Interactive services index: hovering (or focusing) a row reveals its image and description. */
export default function ServicesList() {
  const reduce = useReducedMotion();
  const items = featuredServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-8">
      <ol className="md:col-span-7">
        {items.map((s, i) => {
          const isActive = i === active;
          return (
            <li key={s.slug} className="border-t border-ink/10 last:border-b">
              <Link
                href={`/services#${s.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 py-6 md:grid-cols-[4.5rem_1fr_auto] md:gap-4 md:py-8"
              >
                <span className={clsx("label pt-2 transition-colors duration-500", isActive ? "text-bronze" : "text-concrete")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={clsx(
                      "display block text-[clamp(1.5rem,3.4vw,3.25rem)] transition-[color,transform] duration-700 ease-out-expo",
                      isActive ? "text-ink md:translate-x-3" : "text-ink/70 md:text-ink/35",
                    )}
                  >
                    {featuredServiceTitles[s.slug] ?? s.title}
                  </span>
                  <span className="mt-3 block max-w-md text-[0.95rem] leading-relaxed text-graphite md:hidden">{s.shortDescription}</span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        className="hidden overflow-hidden md:block"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="block max-w-md pl-3 pt-4 text-[0.95rem] leading-relaxed text-graphite">{s.shortDescription}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span
                  className={clsx(
                    "mt-1 grid size-10 place-items-center rounded-full border transition-all duration-500 md:size-12",
                    isActive ? "border-ink bg-ink text-bone md:rotate-45" : "border-ink/20 text-ink",
                  )}
                  aria-hidden
                >
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="hidden md:col-span-4 md:col-start-9 md:block">
        <div className="sticky top-28">
          <div className="relative aspect-[3/4] overflow-hidden bg-sand" data-cursor="Explore">
            <AnimatePresence initial={false}>
              <motion.div
                key={current.slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", scale: 1 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image src={current.image} alt={current.title} fill sizes="33vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="label text-concrete">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <p className="label">{featuredServiceTitles[current.slug] ?? current.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
