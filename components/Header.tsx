"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import Logo from "./Logo";
import { nav, site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/contact";
import clsx from "@/lib/clsx";

export default function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [darkHero, setDarkHero] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pages with a dark full-bleed hero mark it with data-hero="dark"; others get a solid header immediately.
  useEffect(() => {
    const check = () => setDarkHero(!!document.querySelector('[data-hero="dark"]'));
    check();
    const t = window.setTimeout(check, 150);
    return () => window.clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || !darkHero;
  const light = !solid && !open;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-bone">
        Skip to content
      </a>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-500",
          open ? "text-bone" : light ? "text-bone" : "text-ink",
          solid && !open ? "border-b border-ink/10 bg-bone/85 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <div className={clsx("wrap flex items-center justify-between transition-[height] duration-500", solid ? "h-16 md:h-18" : "h-20 md:h-24")}>
          <Logo onClick={() => setOpen(false)} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={clsx("label link-underline py-1", isActive(item.href) ? "bg-[length:100%_1px]" : "opacity-80 hover:opacity-100")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telLink(0)}
              className={clsx(
                "label hidden h-11 items-center gap-2 px-4 transition-colors md:inline-flex",
                light ? "hover:bg-bone/10" : "hover:bg-ink/5",
              )}
              aria-label={`Call now ${site.phones[0].display}`}
            >
              <Phone className="size-3.5" strokeWidth={1.5} aria-hidden />
              Call Now
            </a>
            <Link
              href="/contact"
              className={clsx(
                "label hidden h-11 items-center px-5 transition-colors duration-500 sm:inline-flex",
                light ? "bg-bone text-ink hover:bg-white" : "bg-ink text-bone hover:bg-charcoal",
              )}
            >
              Free Consultation
            </Link>
            <button
              type="button"
              className="relative grid size-11 place-items-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={clsx("absolute h-px w-6 bg-current transition-transform duration-500", open ? "rotate-45" : "-translate-y-1")} />
              <span className={clsx("absolute h-px w-6 bg-current transition-transform duration-500", open ? "-rotate-45" : "translate-y-1")} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[45] flex flex-col bg-ink text-bone lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center overflow-y-auto pt-24 pb-10">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="flex items-baseline gap-4 py-1"
                      >
                        <span className="label w-6 text-bone/40">0{i + 1}</span>
                        <span className={clsx("display text-[clamp(2.5rem,11vw,4.5rem)]", isActive(item.href) ? "text-bronze-light" : "")}>{item.label}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 grid gap-6 border-t border-bone/15 pt-8 sm:grid-cols-2"
              >
                <div>
                  <p className="label mb-3 text-bone/50">Call</p>
                  {site.phones.map((p) => (
                    <a key={p.tel} href={`tel:${p.tel}`} className="block text-lg">
                      {p.display}
                    </a>
                  ))}
                </div>
                <div className="flex flex-col items-start gap-3">
                  <p className="label text-bone/50">{site.location.display}</p>
                  <a href={whatsappLink(0)} target="_blank" rel="noopener noreferrer" className="label border border-bone/40 px-5 py-3">
                    WhatsApp Us
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
