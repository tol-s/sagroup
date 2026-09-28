"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { materials } from "@/data/home";
import clsx from "@/lib/clsx";

/**
 * Desktop (≥1024px): the section pins and the material tiles travel horizontally as you scroll down.
 * Mobile / tablet / reduced motion: a native swipeable row with snap points.
 *
 * The wrapper element is always rendered so the scroll tracker is attached from the first render.
 */
export default function MaterialsScroller() {
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({ target: wrapper, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, (v) => -v * distance);

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
      const el = track.current;
      const last = el?.lastElementChild as HTMLElement | null;
      if (!el || !last) return;
      // Travel until the last tile sits the same distance from the right edge as the first does from the left.
      const edge = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      setDistance(Math.max(0, last.offsetLeft + last.offsetWidth + edge - el.clientWidth));
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

  return (
    <div ref={wrapper} className="relative" style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={clsx(pinned && "sticky top-0 flex h-screen items-center overflow-hidden")}>
        <motion.ul
          ref={track}
          aria-label="Materials"
          style={pinned ? { x } : undefined}
          className={clsx(
            "flex",
            pinned
              ? "w-full gap-8 pl-[clamp(1.25rem,4vw,4rem)] pr-[clamp(1.25rem,4vw,4rem)] will-change-transform"
              : "-mx-5 snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto overscroll-x-contain px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          {materials.map((m, i) => (
            <li key={m.name} className="group relative w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[26vw]" data-cursor="Explore">
              <div className={`relative overflow-hidden bg-sand ${i % 2 ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
                <Image
                  src={m.image}
                  alt={`${m.name} material`}
                  fill
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 44vw, 72vw"
                  className="object-cover grayscale-[35%] transition-all duration-[1.2s] ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-bone/20 pt-4">
                <p className="font-display text-2xl font-medium uppercase tracking-tight">{m.name}</p>
                <p className="label text-bone/50">{String(i + 1).padStart(2, "0")}</p>
              </div>
              <p className="mt-1 text-sm text-bone/60">{m.note}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
