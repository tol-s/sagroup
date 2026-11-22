"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { GalleryImage } from "@/data/projects";
import clsx from "@/lib/clsx";

/** 3D exterior views: big image with crossfade, arrows, swipe and thumbnails. */
export default function RenderViewer({
  images,
  facts,
  className,
  label = "3D view",
}: {
  images: GalleryImage[];
  facts?: { label: string; value: string }[];
  className?: string;
  label?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((v) => (v + d + images.length) % images.length);
  const img = images[i];

  return (
    <div className={className}>
      <div
        className="relative mx-auto aspect-video w-full max-w-[calc(62svh*16/9)] overflow-hidden bg-ink"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={img.src}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-bone md:p-6">
          <div>
            <p className="label text-bone/60">{label} {i + 1} / {images.length}</p>
            <p className="mt-1 font-display text-lg font-medium uppercase tracking-tight md:text-2xl">{img.caption}</p>
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} className="grid size-10 place-items-center border border-bone/30 backdrop-blur hover:bg-bone hover:text-ink" aria-label="Previous view">
                <ArrowLeft className="size-4" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => go(1)} className="grid size-10 place-items-center border border-bone/30 backdrop-blur hover:bg-bone hover:text-ink" aria-label="Next view">
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-3 flex max-w-[calc(62svh*16/9)] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {images.length > 1 && (
          <div className="-mx-1 flex min-w-0 gap-2 overflow-x-auto p-1 [scrollbar-width:none]" role="tablist" aria-label={`${label}s`}>
            {images.map((im, n) => (
              <button
                key={im.src}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={im.caption}
                onClick={() => setI(n)}
                className={clsx("relative h-12 w-16 shrink-0 overflow-hidden transition-opacity sm:h-14 sm:w-20 md:h-16 md:w-28", n === i ? "opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-bone" : "opacity-55 hover:opacity-100")}
              >
                <Image src={im.src} alt="" fill sizes="112px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        {facts && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 md:flex md:gap-8">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="label text-concrete">{f.label}</dt>
                <dd className="mt-1 text-sm font-medium md:text-base">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
