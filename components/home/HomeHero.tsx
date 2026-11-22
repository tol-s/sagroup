"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedText from "../AnimatedText";
import Button from "../Button";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { contactName, telLink } from "@/lib/contact";

export default function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section ref={ref} data-hero="dark" className="relative isolate flex min-h-[calc(100svh-4rem-env(safe-area-inset-bottom))] flex-col overflow-hidden bg-ink text-bone md:min-h-[100svh]">
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

      <motion.div style={reduce ? undefined : { opacity: fade }} className="wrap flex flex-1 flex-col justify-end pb-6 pt-24 md:pb-24 md:pt-32">
        <motion.div
          className="mb-5 flex items-center justify-between gap-6 md:mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <p className="label flex items-center gap-3 text-bone/75">
            <span className="h-px w-8 bg-current" aria-hidden />
            {site.location.display.toUpperCase()}
          </p>
          <p className="label hidden text-bone/60 md:block">Architecture · Construction · Execution</p>
        </motion.div>

        <AnimatedText
          as="h1"
          trigger="load"
          delay={0.6}
          stagger={0.07}
          text={"We build homes\ndesigned to\nstand out."}
          className="display display-xl uppercase"
        />

        <div className="mt-6 grid gap-5 border-t border-bone/20 pt-5 md:mt-14 md:grid-cols-12 md:items-center md:gap-8 md:pt-8">
          <motion.p
            className="max-w-md text-[0.95rem] leading-relaxed text-bone/80 md:col-span-12 md:text-base lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease }}
          >
            From design and grey structure to finishing and handover, we build your home end to end.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-2 md:col-span-7 md:flex md:flex-nowrap md:items-center md:gap-3 lg:col-span-5 lg:col-start-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.45, ease }}
          >
            <Button href="/contact" variant="light" className="w-full gap-2 px-2 md:w-auto md:gap-3 md:px-7">
              <span className="xl:hidden">Start Project</span>
              <span className="hidden xl:inline">Start Your Project</span>
            </Button>
            <Button href={telLink(0)} variant="ghost-light" className="w-full gap-2 px-2 md:w-auto md:gap-3 md:px-7">
              Call Now
            </Button>
          </motion.div>

          <motion.ul
            className="grid grid-cols-2 gap-3 md:col-span-5 md:block md:space-y-3 md:text-right lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.6, ease }}
          >
            {site.phones.map((p) => (
              <li key={p.tel}>
                <a href={`tel:${p.tel}`} className="group block" aria-label={`Call ${contactName(p)} on ${p.display}`}>
                  <span className="block text-[0.68rem] uppercase leading-snug tracking-[0.14em] text-bone/55 md:hidden">
                    {p.name}
                    <span className="block normal-case tracking-normal text-bone/45">{p.role}</span>
                  </span>
                  <span className="label hidden text-bone/55 md:block">{contactName(p)}</span>
                  <span className="link-underline text-[0.95rem] tracking-tight md:text-lg">{p.display}</span>
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
