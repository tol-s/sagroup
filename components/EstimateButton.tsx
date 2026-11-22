"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

/**
 * Desktop: floating "Get an estimate" button pinned to the bottom of the screen.
 * Appears after the first screen, hides on the calculator page and while the
 * home page calculator is on screen.
 */
export default function EstimateButton() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const onHome = pathname === "/";

  useEffect(() => {
    const update = () => {
      const calc = onHome ? document.getElementById("calculator")?.getBoundingClientRect() : null;
      const calcVisible = !!calc && calc.top < innerHeight * 0.85 && calc.bottom > innerHeight * 0.15;
      const nearEnd = innerHeight + scrollY > document.documentElement.scrollHeight - 160;
      setShow(scrollY > innerHeight * 0.6 && !calcVisible && !nearEnd);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [onHome, pathname]);

  if (pathname.startsWith("/calculator")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 md:block"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={onHome ? "#calculator" : "/calculator"}
            className="group flex items-center gap-4 rounded-full bg-ink py-2 pl-2 pr-6 text-bone shadow-[0_12px_40px_rgba(0,0,0,0.28)] ring-1 ring-bone/10 transition-colors hover:bg-charcoal"
          >
            <span className="grid size-11 place-items-center rounded-full bg-[#7a5f43] text-white">
              <Calculator className="size-5" strokeWidth={1.6} aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.95rem] font-medium">Get an estimate</span>
              <span className="block text-xs text-bone/60">Apne ghar ki cost janiye</span>
            </span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} aria-hidden />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
