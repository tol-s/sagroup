"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import clsx from "@/lib/clsx";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Parallax travel in percent (0 disables) */
  parallax?: number;
  direction?: "up" | "left" | "right";
  cursor?: string;
  imgClassName?: string;
};

/** Image that is unveiled by a clip-path mask and drifts with a subtle parallax. */
export default function ImageReveal({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  parallax = 8,
  direction = "up",
  cursor = "Explore",
  imgClassName,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  const hidden =
    direction === "left" ? "inset(0 100% 0 0)" : direction === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";

  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      className={clsx("relative overflow-hidden bg-sand", className)}
      initial={reduce ? { opacity: 0 } : { clipPath: hidden }}
      whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.3 : 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute inset-[-10%]"
        style={reduce || !parallax ? undefined : { y }}
        initial={reduce ? undefined : { scale: 1.2 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={clsx("object-cover", imgClassName)} />
      </motion.div>
    </motion.div>
  );
}
