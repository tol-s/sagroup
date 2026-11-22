"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/** Becomes true after the first page has hydrated; later pages are client navigations. */
let hydrated = false;

/**
 * Wraps each page (via app/template.tsx). On client-side navigation a dark curtain
 * wipes away to reveal the new page. The very first load renders instantly for fast LCP.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [animate] = useState(() => hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);

  if (reduce || !animate) return <>{children}</>;
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
        {children}
      </motion.div>
    </>
  );
}
