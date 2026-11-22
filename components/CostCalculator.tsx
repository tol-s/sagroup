"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import {
  estimateDisclaimer,
  floorOptions,
  coverageChoices,
  coveredArea,
  defaultCoverage,
  SQFT_PER_SQYD,
  formatCroreLakh,
  formatPKR,
  plotSizes,
  workTypes,
  type FloorsId,
  type WorkTypeId,
} from "@/data/calculator";
import { site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/contact";
import clsx from "@/lib/clsx";

function Choice({
  active,
  disabled,
  onClick,
  children,
  hint,
  className,
}: {
  className?: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex min-h-12 flex-col justify-center border px-4 py-2.5 text-left transition-colors duration-300",
        active ? "border-ink bg-ink text-bone" : "border-ink/15 bg-paper text-ink hover:border-ink/50",
        disabled && "cursor-not-allowed opacity-35 hover:border-ink/15",
        className,
      )}
    >
      <span className="text-[0.95rem] font-medium tracking-tight">{children}</span>
      {hint && <span className={clsx("mt-0.5 text-xs leading-snug", active ? "text-bone/65" : "text-concrete")}>{hint}</span>}
    </button>
  );
}

/** Construction cost calculator: plot size × floors × type of work → estimated budget. */
export default function CostCalculator() {
  const [plotId, setPlotId] = useState("240");
  const [floors, setFloors] = useState<FloorsId>("g1");
  const [workId, setWorkId] = useState<WorkTypeId>("turnkey");
  const [custom, setCustom] = useState(false);
  const [customArea, setCustomArea] = useState("");
  const [presetPct, setPresetPct] = useState(defaultCoverage);
  const [customPct, setCustomPct] = useState("");
  // A typed percentage (1 to 100) overrides the preset buttons.
  const typedPct = Math.max(0, Math.min(100, Number(customPct) || 0));
  const pct = typedPct > 0 ? typedPct : presetPct;
  const [otherYd, setOtherYd] = useState("");

  // Any plot size in sq yd: typed values override the preset buttons.
  const typedYd = Math.max(0, Math.min(20000, Number(otherYd) || 0));
  const plot =
    plotId === "other" && typedYd > 0
      ? {
          id: "other",
          label: `${typedYd.toLocaleString("en-PK")} sq. yd.`,
          sqyd: typedYd,
          timeline: ([...plotSizes].reverse().find((p) => p.sqyd <= typedYd) ?? plotSizes[0]).timeline,
        }
      : (plotSizes.find((p) => p.id === plotId) ?? plotSizes[2]);
  const plotYd = plot.sqyd;
  const plotSqft = plotYd * SQFT_PER_SQYD;
  const work = workTypes.find((w) => w.id === workId) ?? workTypes[0];
  const effectiveFloors = floors;
  const floorCount = floorOptions.find((f) => f.id === floors)?.count ?? 1;
  const perFloor = Math.round(plot.sqyd * SQFT_PER_SQYD * (pct / 100));

  /** Architectural design is priced on the plot area only (sq yd × 9), not on coverage or floors. */
  const byPlot = workId === "design";
  const area = useMemo(() => {
    if (custom) return Math.max(0, Math.min(200000, Number(customArea) || 0));
    if (byPlot) return plotYd * SQFT_PER_SQYD;
    return coveredArea(plotYd, pct, floorCount);
  }, [custom, customArea, byPlot, plotYd, pct, floorCount]);

  const total = area * work.rate;
  /** Packages without a published rate are quoted on request. */
  const onRequest = work.rate === 0;
  const floor = floorOptions.find((f) => f.id === effectiveFloors);
  const floorLabel = floor ? `${floor.label} (${floor.hint.toLowerCase()})` : "";

  const message = [
    `Hi ${site.companyName}, I used the cost calculator on your website.`,
    custom
      ? `Covered area: ${area.toLocaleString("en-PK")} sq ft`
      : byPlot
        ? `Plot: ${plot.label} (${plotSqft.toLocaleString("en-PK")} sq ft plot area)`
        : `Plot: ${plot.label} (${plotSqft.toLocaleString("en-PK")} sq ft), ${pct}% covered, ${floorLabel}, approx. ${area.toLocaleString("en-PK")} sq ft covered`,
    `Work: ${work.label}`,
    onRequest ? "Please share the price for this package." : `Estimate shown: ${formatPKR(total)}`,
    "Please share an exact quotation.",
  ].join("\n");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      {/* INPUTS */}
      <div className="min-w-0 space-y-7 md:space-y-9 lg:col-span-7">
        <fieldset>
          <legend className="label mb-1 text-concrete">1. Plot size</legend>
          <p className="mb-4 text-sm text-graphite">Aapka plot kitne gaz ka hai?</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {plotSizes.map((p) => (
              <Choice key={p.id} active={!custom && plotId === p.id} onClick={() => { setPlotId(p.id); setOtherYd(""); setCustom(false); }}>
                {p.label.replace(" sq. yd.", "")}
                <span className="block text-xs font-normal opacity-70">sq. yd.</span>
              </Choice>
            ))}
          </div>
          {!custom && (
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
              <label htmlFor="plot-yd" className="text-sm text-graphite">
                Other size
              </label>
              <span className="flex items-center gap-2">
                <input
                  id="plot-yd"
                  type="number"
                  inputMode="numeric"
                  min={20}
                  max={20000}
                  placeholder="e.g. 300"
                  value={otherYd}
                  onChange={(e) => {
                    setOtherYd(e.target.value);
                    setPlotId(e.target.value ? "other" : "240");
                  }}
                  className={clsx(
                    "w-28 border px-3 py-2 text-base focus:border-ink focus:outline-none",
                    plotId === "other" && typedYd > 0 ? "border-ink bg-bone" : "border-ink/20 bg-paper",
                  )}
                />
                <span className="text-sm text-graphite">sq. yd.</span>
              </span>
            </div>
          )}
          {!custom && (
            <p className="mt-3 bg-sand/60 px-3 py-2 text-sm">
              {plot.sqyd.toLocaleString("en-PK")} sq yd × 9 = <span className="font-medium">{plotSqft.toLocaleString("en-PK")} sq ft</span> plot area
            </p>
          )}
          <button
            type="button"
            onClick={() => setCustom((v) => !v)}
            aria-pressed={custom}
            className="link-underline mt-3 text-sm text-graphite hover:text-ink"
          >
            {custom ? "Use plot size instead" : "I know my covered area (sq ft)"}
          </button>
          {custom && (
            <div className="mt-3 max-w-xs">
              <label htmlFor="custom-area" className="label mb-1 block text-graphite">
                Total covered area (sq ft)
              </label>
              <input
                id="custom-area"
                type="number"
                inputMode="numeric"
                min={100}
                max={200000}
                placeholder="e.g. 3200"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                className="w-full border-0 border-b border-ink/20 bg-transparent px-0 pb-2 pt-1 text-lg focus:border-ink focus:outline-none focus:ring-0"
              />
            </div>
          )}
        </fieldset>

        {!custom && !byPlot && (
          <fieldset>
            <legend className="label mb-1 text-concrete">2. Covered area %</legend>
            <p className="mb-4 text-sm text-graphite">Plot ka kitna hissa har manzil par banega?</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {coverageChoices.map((c) => (
                <Choice key={c} active={!typedPct && presetPct === c} onClick={() => { setPresetPct(c); setCustomPct(""); }}>
                  {c}%
                </Choice>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <label htmlFor="custom-pct" className="text-sm text-graphite">
                Other %
              </label>
              <span className="flex items-center gap-2">
                <input
                  id="custom-pct"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={100}
                  placeholder="e.g. 58"
                  value={customPct}
                  onChange={(e) => setCustomPct(e.target.value)}
                  className={clsx(
                    "w-24 border px-3 py-2 text-base focus:border-ink focus:outline-none",
                    typedPct ? "border-ink bg-bone" : "border-ink/20 bg-paper",
                  )}
                />
                <span className="text-sm text-graphite">%</span>
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-graphite">
              {plotSqft.toLocaleString("en-PK")} sq ft × {pct}% = approx. {perFloor.toLocaleString("en-PK")} sq ft per floor
            </p>
          </fieldset>
        )}

        {!custom && !byPlot && (
          <fieldset>
            <legend className="label mb-1 text-concrete">3. Floors</legend>
            <p className="mb-4 text-sm text-graphite">Kitni manzil banwani hai?</p>
            <div className="grid grid-cols-3 gap-2">
              {floorOptions.map((f) => (
                <Choice key={f.id} active={effectiveFloors === f.id} onClick={() => setFloors(f.id)} hint={f.hint}>
                  {f.label}
                </Choice>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="label mb-1 text-concrete">{custom || byPlot ? "2" : "4"}. Type of work</legend>
          <p className="mb-4 text-sm text-graphite">Aap ko kya kaam karwana hai?</p>
          <div className="grid grid-cols-2 gap-2">
            {workTypes.map((w, i) => (
              <Choice
                key={w.id}
                active={workId === w.id}
                onClick={() => setWorkId(w.id)}
                hint={w.hint}
                className={i === workTypes.length - 1 && workTypes.length % 2 ? "col-span-2" : undefined}
              >
                {w.label}
              </Choice>
            ))}
          </div>
        </fieldset>

        {/* MOBILE: live estimate pinned to the bottom of the screen while choosing */}
        <div className="sticky bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-30 md:bottom-4 lg:hidden">
          <div className="flex items-center gap-3 bg-ink py-3 pl-4 pr-3 text-bone shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
            <div className="min-w-0 flex-1">
              <p className="label text-white/75">Estimated cost</p>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={total}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="whitespace-nowrap font-display text-[1.3rem] font-medium leading-tight tracking-tight min-[400px]:text-[1.5rem]"
                >
                  {onRequest ? "Price on request" : area > 0 ? formatCroreLakh(total) : "Enter area"}
                </motion.p>
              </AnimatePresence>
              {area > 0 && (
                <p className="truncate text-xs text-white/75">
                  {onRequest ? `${area.toLocaleString("en-PK")} sq ft · ${work.label}` : `${area.toLocaleString("en-PK")} sq ft × ${formatPKR(work.rate)}`}
                </p>
              )}
            </div>
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get exact quote on WhatsApp"
              className="grid size-11 shrink-0 place-items-center bg-[#25D366] text-ink"
            >
              <MessageCircle className="size-5" strokeWidth={1.75} aria-hidden />
            </a>
            <a href="#calc-result" className="label inline-flex h-11 shrink-0 items-center gap-1 border border-bone/30 px-2.5">
              Details <ChevronDown className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      {/* RESULT */}
      <div id="calc-result" className="min-w-0 scroll-mt-20 lg:col-span-5">
        <div className="bg-ink p-6 text-bone md:p-8 lg:sticky lg:top-28" aria-live="polite">
          <p className="label text-white/75">Estimated cost</p>
          <p className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-none tracking-[-0.03em]">
            {onRequest ? "Price on request" : area > 0 ? formatCroreLakh(total) : "PKR —"}
          </p>
          {onRequest ? (
            <p className="mt-2 text-sm text-white/80">{work.label} includes luxury finishing and full furnishing. Ask us on WhatsApp for a quotation.</p>
          ) : (
            area > 0 && <p className="mt-2 text-sm text-white/80">{formatPKR(total)}</p>
          )}

          <dl className="mt-8 divide-y divide-bone/10 border-y border-bone/10 text-sm">
            {!custom && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/75">Plot</dt>
                <dd className="text-right">
                  {plot.label} ({plotSqft.toLocaleString("en-PK")} sq ft){byPlot ? "" : `, ${floorLabel}`}
                </dd>
              </div>
            )}
            {!custom && !byPlot && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/75">Coverage</dt>
                <dd className="text-right">{pct}% per floor</dd>
              </div>
            )}
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-white/75">{byPlot && !custom ? "Plot area" : `Covered area${custom ? "" : " (approx.)"}`}</dt>
              <dd>{area.toLocaleString("en-PK")} sq ft</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-white/75">Package</dt>
              <dd className="text-right">{work.label}</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-white/75">Rate</dt>
              <dd>{onRequest ? "On request" : `${formatPKR(work.rate)} / sq ft`}</dd>
            </div>
            {work.split && area > 0 && (
              <>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-white/75">Grey structure</dt>
                  <dd>{formatPKR(area * work.split.grey)}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-white/75">Finishing</dt>
                  <dd>{formatPKR(area * work.split.finishing)}</dd>
                </div>
              </>
            )}
            {!custom && work.id !== "design" && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/75">Typical time (complete house)</dt>
                <dd>{plot.timeline}</dd>
              </div>
            )}
          </dl>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex h-13 items-center justify-center gap-3 bg-[#25D366] px-6 text-ink transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-4" strokeWidth={1.75} aria-hidden />
              Get exact quote on WhatsApp
            </a>
            <a href={telLink(0)} className="label inline-flex h-13 items-center justify-center gap-3 border border-bone/30 px-6 hover:bg-bone hover:text-ink">
              <Phone className="size-4" strokeWidth={1.5} aria-hidden />
              Call {site.phones[0].display}
            </a>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/70">{estimateDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}
