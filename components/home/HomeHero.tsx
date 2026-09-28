"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "../AnimatedText";
import Button from "../Button";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { contactName } from "@/lib/contact";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section ref={ref} data-hero="dark" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-bone">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y, scale }}>
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(12% 8% 12% 8%)", scale: 1.25 }}
          animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          transition={{ duration: 1.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <Image src={images.hero} alt="Contemporary residence with warm architectural lighting at dusk" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/50" aria-hidden />

      <motion.div style={reduce ? undefined : { opacity: fade }} className="wrap flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-14">
        <motion.div
          className="mb-8 flex items-center justify-between gap-6 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="label flex items-center gap-3 text-bone/75">
            <span className="h-px w-8 bg-current" aria-hidden />
            {site.location.display.toUpperCase()}
          </p>
          <p className="label hidden text-bone/60 md:block">Architectural Design · Residential Construction</p>
        </motion.div>

        <AnimatedText
          as="h1"
          trigger="load"
          delay={0.6}
          stagger={0.07}
          text={"Designed first.\nBuilt properly."}
          className="display display-xl uppercase"
        />

        <div className="mt-10 grid gap-10 border-t border-bone/20 pt-8 md:mt-14 md:grid-cols-12 md:gap-8">
          <motion.p
            className="lead text-bone/80 md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease }}
          >
            Architecturally designed, professionally built. We design and construct thoughtfully planned residential homes, villas and apartments with optimized layouts, refined architectural aesthetics and professional construction standards.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-start gap-3 md:col-span-4 md:col-start-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.45, ease }}
          >
            <Button href="/contact" variant="light">Start Your Project</Button>
            <Button href="/projects" variant="ghost-light">View Residential Projects</Button>
          </motion.div>

          <motion.ul
            className="space-y-3 md:col-span-3 md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease }}
          >
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="group block" aria-label={`Call ${contactName(p)} on ${p.display}`}>
                  <span className="label block text-bone/55">{contactName(p)}</span>
                  <span className="link-underline text-lg tracking-tight">{p.display}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-hidden
      >
        <span className="label text-bone/60">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-bone/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-bone"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
