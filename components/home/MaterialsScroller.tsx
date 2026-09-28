"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { materials } from "@/data/home";

/**
 * Desktop: the section pins and the material tiles travel horizontally with scroll.
 * Mobile / reduced motion: a native swipeable row.
 */
export default function MaterialsScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pinned = desktop && !reduce;

  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const tiles = materials.map((m, i) => (
    <li key={m.name} className="group relative w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[26vw]" data-cursor="Explore">
      <div className={`relative overflow-hidden bg-sand ${i % 2 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
        <Image src={m.image} alt={`${m.name} material`} fill sizes="(min-width: 1024px) 26vw, 72vw" className="object-cover grayscale-[35%] transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:grayscale-0" />
      </div>
      <div className="mt-4 flex items-baseline justify-between border-t border-bone/20 pt-4">
        <p className="font-display text-2xl font-medium uppercase tracking-tight">{m.name}</p>
        <p className="label text-bone/50">{String(i + 1).padStart(2, "0")}</p>
      </div>
      <p className="mt-1 text-sm text-bone/60">{m.note}</p>
    </li>
  ));

  if (!pinned) {
    return (
      <ul className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none]" aria-label="Materials">
        {tiles}
      </ul>
    );
  }

  return (
    <div ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.ul ref={track} style={{ x }} className="flex gap-8 pl-[clamp(1.25rem,4vw,4rem)] pr-16" aria-label="Materials">
          {tiles}
        </motion.ul>
      </div>
    </div>
  );
}
