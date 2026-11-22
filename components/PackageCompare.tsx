"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Check, ChevronDown, MessageCircle, Minus } from "lucide-react";
import { formatPKR, packages, packageSpecs, workTypes } from "@/data/calculator";
import { whatsappLink } from "@/lib/contact";
import clsx from "@/lib/clsx";

const PREVIEW = 8;

function rateOf(id: string) {
  return workTypes.find((w) => w.id === id)?.rate ?? 0;
}

/**
 * The four SA Builders & Developers packages: pick one to see its material
 * specification. With `table`, desktop also shows all four side by side.
 */
export default function PackageCompare({ table = false }: { table?: boolean }) {
  const [sel, setSel] = useState(Math.max(0, packages.findIndex((p) => p.featured)));
  const [all, setAll] = useState(false);
  const pkg = packages[sel];
  const included = packageSpecs.filter((r) => r[sel + 1]).length;
  const rows = all ? packageSpecs : packageSpecs.slice(0, PREVIEW);

  return (
    <div>
      {/* Package selector */}
      <div role="tablist" aria-label="Packages" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {packages.map((p, i) => {
          const rate = rateOf(p.id);
          const active = i === sel;
          return (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setSel(i)}
              className={clsx(
                "flex flex-col items-start border p-4 text-left transition-colors duration-300 md:p-5",
                active ? "border-ink bg-ink text-bone" : "border-ink/15 bg-bone hover:border-ink/50",
              )}
            >
              <span className={clsx("label", active ? "text-bronze-light" : "text-bronze")}>{p.name}</span>
              <span className="mt-1.5 font-display text-base font-medium uppercase leading-tight tracking-tight md:text-lg">{p.title}</span>
              <span className={clsx("mt-3 whitespace-nowrap text-[0.78rem] md:text-sm", active ? "text-bone/70" : "text-graphite")}>
                {rate ? (
                  <>
                    From <span className={clsx("font-medium", active ? "text-bone" : "text-ink")}>{formatPKR(rate)}</span>/sq ft
                  </>
                ) : (
                  "Price on request"
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected package */}
      <div className={clsx("mt-4 border border-ink/10 bg-bone p-5 md:p-8", table && "lg:hidden")}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pkg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-display text-2xl font-medium uppercase tracking-tight md:text-3xl">{pkg.name}</p>
                <p className="mt-1 text-graphite">
                  {pkg.subtitle} · <span className="italic">{pkg.urdu}</span>
                </p>
                <p className="label mt-3 text-concrete">
                  {included} of {packageSpecs.length} items included
                </p>
              </div>
              <QuoteLink name={`${pkg.name} (${pkg.title})`} />
            </div>

            <dl className="mt-6 grid border-t border-ink/10 md:grid-cols-2 md:gap-x-10">
              {rows.map((r) => {
                const v = r[sel + 1];
                return (
                  <div key={r[0]} className="flex items-start gap-3 border-b border-ink/10 py-3">
                    {v ? (
                      <Check className="mt-0.5 size-4 shrink-0 text-bronze" strokeWidth={2} aria-hidden />
                    ) : (
                      <Minus className="mt-0.5 size-4 shrink-0 text-concrete/60" strokeWidth={2} aria-hidden />
                    )}
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-[0.1em] text-concrete">{r[0]}</dt>
                      <dd className={clsx("mt-0.5 text-[0.95rem]", !v && "text-concrete/70")}>{v ?? "Not included"}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>
            {packageSpecs.length > PREVIEW && (
              <button type="button" onClick={() => setAll((v) => !v)} className="label mt-5 inline-flex items-center gap-2 text-ink" aria-expanded={all}>
                {all ? "Show less" : `Show all ${packageSpecs.length} items`}
                <ChevronDown className={clsx("size-4 transition-transform", all && "rotate-180")} aria-hidden />
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop: full comparison table */}
      {table && (
        <div className="mt-4 hidden border border-ink/10 bg-bone lg:block">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <caption className="sr-only">Material specifications by package</caption>
            <thead>
              <tr className="border-b border-ink/15">
                <th scope="col" className="label w-[16%] p-4 text-concrete">Item</th>
                {packages.map((p, i) => (
                  <th key={p.id} scope="col" className={clsx("p-4 align-bottom transition-colors", i === sel && "bg-sand/60")}>
                    <span className="label block text-bronze">{p.name}</span>
                    <span className="mt-1 block font-display text-base font-medium uppercase tracking-tight">{p.title}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageSpecs.map((r) => (
                <tr key={r[0]} className="border-b border-ink/10 last:border-0">
                  <th scope="row" className="p-4 font-medium">{r[0]}</th>
                  {r.slice(1).map((v, i) => (
                    <td key={i} className={clsx("p-4 align-top transition-colors", i === sel && "bg-sand/60", !v && "text-concrete/60")}>
                      {v ?? "Not included"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td />
                {packages.map((p, i) => (
                  <td key={p.id} className={clsx("p-4", i === sel && "bg-sand/60")}>
                    <QuoteLink name={`${p.name} (${p.title})`} small />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function QuoteLink({ name, small }: { name: string; small?: boolean }) {
  return (
    <a
      href={whatsappLink(`Hi SA Group, I would like a quotation for the ${name} package. My plot size is: `)}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "label inline-flex shrink-0 items-center justify-center gap-2 bg-ink text-bone transition-colors hover:bg-charcoal",
        small ? "h-10 px-4" : "h-12 px-6",
      )}
    >
      <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
      {small ? "Get quote" : "Get quotation"}
    </a>
  );
}
