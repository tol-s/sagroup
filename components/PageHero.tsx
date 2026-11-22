"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import AnimatedText from "./AnimatedText";

type Props = {
  eyebrow: string;
  title: string;
  /** Omit image for a compact, light header (no banner) so content is visible straight away. */
  image?: string;
  imageAlt?: string;
  intro?: string;
  children?: ReactNode;
  meta?: { label: string; value: string }[];
  tall?: boolean;
};

/** Inner page header: full-bleed dark hero with an image, or a compact light header without one. */
export default function PageHero(props: Props) {
  return props.image ? <ImageHero {...props} image={props.image} /> : <CompactHeader {...props} />;
}

function CompactHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <section className="border-b border-ink/10 bg-bone pb-8 pt-24 md:pb-12 md:pt-32">
      <div className="wrap grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
        <div className={children ? "md:col-span-7" : "md:col-span-9"}>
          <motion.p
            className="label mb-4 flex items-center gap-3 text-concrete"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="h-px w-8 bg-current" aria-hidden />
            {eyebrow}
          </motion.p>
          <AnimatedText as="h1" trigger="load" delay={0.1} text={title} className="display text-[clamp(2rem,4.6vw,4.25rem)] max-w-[20ch]" />
          {intro && <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-graphite md:text-base">{intro}</p>}
        </div>
        {children && <div className="md:col-span-5 md:justify-self-end">{children}</div>}
      </div>
    </section>
  );
}

function ImageHero({ eyebrow, title, image, imageAlt = "", intro, children, meta, tall }: Props & { image: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      data-hero="dark"
      className={`relative isolate flex items-end overflow-hidden bg-ink text-bone ${tall ? "min-h-[100svh]" : "min-h-[82svh] md:min-h-[88svh]"}`}
    >
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y, scale }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { scale: 1.15, opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/40" aria-hidden />

      <div className="wrap w-full pb-14 pt-36 md:pb-20">
        <motion.p
          className="label mb-6 flex items-center gap-3 text-bone/70"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="h-px w-8 bg-current" aria-hidden />
          {eyebrow}
        </motion.p>
        <AnimatedText as="h1" trigger="load" delay={0.25} text={title} className="display display-xl max-w-[16ch]" />
        {(intro || children) && (
          <motion.div
            className="mt-10 grid gap-8 md:grid-cols-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro && <p className="lead text-bone/80 md:col-span-6">{intro}</p>}
            {children && <div className="md:col-span-5 md:col-start-8 md:self-end">{children}</div>}
          </motion.div>
        )}
        {meta && (
          <motion.dl
            className="mt-12 grid grid-cols-2 gap-6 border-t border-bone/20 pt-6 md:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="label text-bone/50">{m.label}</dt>
                <dd className="mt-2 text-sm md:text-base">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}
