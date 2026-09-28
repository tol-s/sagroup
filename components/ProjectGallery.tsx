"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/projects";
import clsx from "@/lib/clsx";

/** Editorial gallery grid with an accessible keyboard/touch lightbox. */
const pattern = [
  "md:col-span-12 aspect-[4/3] md:aspect-[16/8]",
  "md:col-span-7 aspect-[4/5]",
  "md:col-span-5 aspect-[4/5] md:mt-32",
  "md:col-span-5 md:col-start-2 aspect-square",
  "md:col-span-6 aspect-[4/3] md:mt-20",
  "md:col-span-8 md:col-start-3 aspect-[16/10]",
  "md:col-span-6 aspect-[4/5]",
  "md:col-span-6 aspect-[4/5] md:mt-24",
];

export default function ProjectGallery({ images, title }: { images: GalleryImage[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + images.length) % images.length)), [images.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-12 md:gap-8">
        {images.map((img, i) => (
          <motion.li
            key={img.src + i}
            className={clsx("relative", pattern[i % pattern.length])}
            initial={{ opacity: 0, y: reduce ? 0 : 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              data-cursor="Explore"
              className="group absolute inset-0 block overflow-hidden bg-sand text-left"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setIndex(i);
              }}
              aria-label={`Open image ${i + 1} of ${images.length}: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.04]"
              />
              <span className="label absolute bottom-0 left-0 bg-bone px-3 py-2 text-ink">
                {String(i + 1).padStart(2, "0")} · {img.caption}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-[80] flex flex-col bg-ink/97 text-bone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            data-lenis-prevent
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div className="wrap flex h-16 shrink-0 items-center justify-between md:h-20">
              <p className="label text-bone/60">
                {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")} · {images[index].caption}
              </p>
              <button ref={closeRef} type="button" onClick={close} className="grid size-11 place-items-center border border-bone/25 hover:bg-bone hover:text-ink" aria-label="Close gallery">
                <X className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  className="absolute inset-0 mx-4 md:mx-24"
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-bone/25 bg-ink/40 hover:bg-bone hover:text-ink md:left-6" aria-label="Previous image">
                <ArrowLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-bone/25 bg-ink/40 hover:bg-bone hover:text-ink md:right-6" aria-label="Next image">
                <ArrowRight className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="wrap flex h-20 shrink-0 items-center gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={img.src + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={clsx("relative h-12 w-16 shrink-0 overflow-hidden transition-opacity", i === index ? "opacity-100 ring-1 ring-bone" : "opacity-40 hover:opacity-80")}
                  aria-label={`Show image ${i + 1}: ${img.caption}`}
                  aria-current={i === index}
                >
                  <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
