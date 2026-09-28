"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType } from "react";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** "load" animates on mount, "view" animates when scrolled into view */
  trigger?: "load" | "view";
  stagger?: number;
  id?: string;
};

/** Splits text into lines/words and reveals each word from behind a mask. */
export default function AnimatedText({ text, as: Tag = "h2", className, delay = 0, trigger = "view", stagger = 0.06, id }: Props) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");
  let wordIndex = 0;

  const animateProps =
    trigger === "load"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag id={id} className={className} aria-label={text.replace(/\n/g, " ")}>
      <motion.span aria-hidden className="block" {...animateProps}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(" ").map((word, wi) => {
              const i = wordIndex++;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: reduce ? { opacity: 0 } : { y: "105%" },
                      show: reduce
                        ? { opacity: 1, transition: { duration: 0.4, delay } }
                        : { y: "0%", transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger } },
                    }}
                  >
                    {word}
                  </motion.span>
                  {wi < line.split(" ").length - 1 ? " " : null}
                </span>
              );
            })}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
