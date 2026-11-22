"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import {
  estimateDisclaimer,
  floorOptions,
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
}: {
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

  const plot = plotSizes.find((p) => p.id === plotId) ?? plotSizes[0];
  const work = workTypes.find((w) => w.id === workId) ?? workTypes[0];
  const effectiveFloors: FloorsId = plot.covered[floors] ? floors : "g1";

  const area = useMemo(() => {
    if (custom) return Math.max(0, Math.min(200000, Number(customArea) || 0));
    return plot.covered[effectiveFloors] ?? 0;
  }, [custom, customArea, plot, effectiveFloors]);

  const total = area * work.rate;
  const floor = floorOptions.find((f) => f.id === effectiveFloors);
  const floorLabel = floor ? `${floor.label} (${floor.hint.toLowerCase()})` : "";

  const message = [
    `Hi ${site.companyName}, I used the cost calculator on your website.`,
    custom ? `Covered area: ${area.toLocaleString("en-PK")} sq ft` : `Plot: ${plot.label}, ${floorLabel} (approx. ${area.toLocaleString("en-PK")} sq ft covered)`,
    `Work: ${work.label}`,
    `Estimate shown: ${formatPKR(total)}`,
    "Please share an exact quotation.",
  ].join("\n");

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* INPUTS */}
      <div className="space-y-9 lg:col-span-7">
        <fieldset>
          <legend className="label mb-1 text-concrete">1. Plot size</legend>
          <p className="mb-4 text-sm text-graphite">Aapka plot kitne gaz ka hai?</p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {plotSizes.map((p) => (
              <Choice key={p.id} active={!custom && plotId === p.id} onClick={() => { setPlotId(p.id); setCustom(false); }}>
                {p.label.replace(" sq. yd.", "")}
                <span className="block text-xs font-normal opacity-70">sq. yd.</span>
              </Choice>
            ))}
          </div>
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

        {!custom && (
          <fieldset>
            <legend className="label mb-1 text-concrete">2. Floors</legend>
            <p className="mb-4 text-sm text-graphite">Kitni manzil banwani hai?</p>
            <div className="grid grid-cols-3 gap-2">
              {floorOptions.map((f) => (
                <Choice key={f.id} active={effectiveFloors === f.id} disabled={!plot.covered[f.id]} onClick={() => setFloors(f.id)} hint={f.hint}>
                  {f.label}
                </Choice>
              ))}
            </div>
            {!plot.covered.g2 && <p className="mt-2 text-xs text-concrete">G+2 is shown for plots up to 240 sq. yd.</p>}
          </fieldset>
        )}

        <fieldset>
          <legend className="label mb-1 text-concrete">{custom ? "2" : "3"}. Type of work</legend>
          <p className="mb-4 text-sm text-graphite">Aap ko kya kaam karwana hai?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {workTypes.map((w) => (
              <Choice key={w.id} active={workId === w.id} onClick={() => setWorkId(w.id)} hint={w.hint}>
                {w.label}
              </Choice>
            ))}
          </div>
        </fieldset>
      </div>

      {/* RESULT */}
      <div className="lg:col-span-5">
        <div className="bg-ink p-6 text-bone md:p-8 lg:sticky lg:top-28" aria-live="polite">
          <p className="label text-bone/55">Estimated cost</p>
          <p className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-medium leading-none tracking-[-0.03em]">
            {area > 0 ? formatCroreLakh(total) : "PKR —"}
          </p>
          {area > 0 && <p className="mt-2 text-sm text-bone/60">{formatPKR(total)}</p>}

          <dl className="mt-8 divide-y divide-bone/10 border-y border-bone/10 text-sm">
            {!custom && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-bone/55">Plot</dt>
                <dd>
                  {plot.label}, {floorLabel}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-bone/55">Covered area {custom ? "" : "(approx.)"}</dt>
              <dd>{area.toLocaleString("en-PK")} sq ft</dd>
            </div>
            <div className="flex justify-between gap-4 py-3">
              <dt className="text-bone/55">Rate</dt>
              <dd>{formatPKR(work.rate)} / sq ft</dd>
            </div>
            {work.split && area > 0 && (
              <>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-bone/55">Grey structure</dt>
                  <dd>{formatPKR(area * work.split.grey)}</dd>
                </div>
                <div className="flex justify-between gap-4 py-3">
                  <dt className="text-bone/55">Finishing</dt>
                  <dd>{formatPKR(area * work.split.finishing)}</dd>
                </div>
              </>
            )}
            {!custom && work.id !== "design" && (
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-bone/55">Typical time (complete house)</dt>
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
          <p className="mt-6 text-xs leading-relaxed text-bone/50">{estimateDisclaimer}</p>
        </div>
      </div>
    </div>
  );
}
