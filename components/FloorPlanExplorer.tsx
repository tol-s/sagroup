"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Hand, Pause, Play, Scan } from "lucide-react";
import type { FloorPlan, Room, RoomKind } from "@/data/projects";
import clsx from "@/lib/clsx";

export const kindMeta: Record<RoomKind, { label: string; color: string }> = {
  bedroom: { label: "Bedrooms", color: "#b38b52" },
  living: { label: "Living", color: "#3f6f8f" },
  kitchen: { label: "Kitchen", color: "#c2643a" },
  bath: { label: "Bathrooms", color: "#4f8f7b" },
  outdoor: { label: "Outdoor", color: "#6d8f35" },
  circulation: { label: "Entry & stairs", color: "#8b8580" },
};

/** "15'6\" x 17'0\"" → approx. sq ft */
function areaOf(size?: string) {
  if (!size) return null;
  const parts = [...size.matchAll(/(\d+)'\s*(\d+)?/g)].map((m) => Number(m[1]) + Number(m[2] ?? 0) / 12);
  return parts.length === 2 ? Math.round(parts[0] * parts[1]) : null;
}

function prettySize(size?: string) {
  return size?.replace(/'0"/g, "'").replace(" x ", " × ");
}

function countOf(rooms: Room[], test: (r: Room) => boolean) {
  return rooms.filter(test).length;
}

/**
 * Interactive floor plan: pick a floor, tap a room (on the plan or in the list)
 * and the plan zooms to it with a spotlight, its size and area.
 */
export default function FloorPlanExplorer({ plans, title }: { plans: FloorPlan[]; title: string }) {
  const reduce = useReducedMotion();
  const [floorId, setFloorId] = useState(plans[0].id);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [colour, setColour] = useState(false);
  const [touring, setTouring] = useState(false);

  const floor = plans.find((p) => p.id === floorId) ?? plans[0];
  const rooms = floor.rooms;
  const room = rooms.find((r) => r.id === roomId) ?? null;
  const index = room ? rooms.indexOf(room) : -1;

  // Guided tour: steps through every room on this floor.
  useEffect(() => {
    if (!touring) return;
    const t = setInterval(() => {
      setRoomId((cur) => {
        const i = rooms.findIndex((r) => r.id === cur);
        return rooms[(i + 1) % rooms.length].id;
      });
    }, 2600);
    return () => clearInterval(t);
  }, [touring, rooms]);

  const view = useMemo(() => {
    if (!room) return { s: 1, x: 0, y: 0 };
    const [x1, y1, x2, y2] = room.box;
    const bw = (x2 - x1) / floor.width;
    const bh = (y2 - y1) / floor.height;
    const s = Math.min(2.8, Math.max(1.35, 0.62 / Math.max(bw, bh)));
    const cx = (x1 + x2) / 2 / floor.width;
    const cy = (y1 + y2) / 2 / floor.height;
    const max = ((s - 1) / 2) * 100;
    const clamp = (v: number) => Math.max(-max, Math.min(max, v));
    return { s, x: clamp(s * (0.5 - cx) * 100), y: clamp(s * (0.5 - cy) * 100) };
  }, [room, floor]);

  const select = (id: string | null) => {
    setTouring(false);
    setRoomId(id);
  };
  const step = (d: number) => {
    const i = index < 0 ? (d > 0 ? -1 : 0) : index;
    select(rooms[(i + d + rooms.length) % rooms.length].id);
  };
  const toggleTour = () => {
    if (touring) return setTouring(false);
    setRoomId(roomId ?? rooms[0].id);
    setTouring(true);
  };
  const switchFloor = (id: string) => {
    setTouring(false);
    setRoomId(null);
    setFloorId(id);
  };

  const stats = [
    { label: "Bedrooms", value: countOf(rooms, (r) => /^(bedroom|guest room)/i.test(r.name)) },
    { label: "Baths", value: countOf(rooms, (r) => r.kind === "bath") },
    { label: "Living", value: countOf(rooms, (r) => r.kind === "living") },
    { label: "Outdoor", value: countOf(rooms, (r) => r.kind === "outdoor") },
  ].filter((s) => s.value > 0);

  const kindsHere = (Object.keys(kindMeta) as RoomKind[]).filter((k) => rooms.some((r) => r.kind === k));
  const area = areaOf(room?.size);
  const accent = room ? kindMeta[room.kind].color : "#b38b52";
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.9 };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-6">
      {/* FLOOR TABS (mobile: above the plan) */}
      <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-1">
        <div role="tablist" aria-label={`${title} floors`} className="grid grid-cols-2 gap-2">
          {plans.map((p) => (
            <button
              key={p.id}
              role="tab"
              type="button"
              aria-selected={p.id === floor.id}
              onClick={() => switchFloor(p.id)}
              className={clsx(
                "flex flex-col items-start border px-4 py-3 text-left transition-colors duration-300",
                p.id === floor.id ? "border-ink bg-ink text-bone" : "border-ink/15 bg-bone hover:border-ink/50",
              )}
            >
              <span className="font-display text-base font-medium uppercase tracking-tight md:text-lg">{p.label}</span>
              <span className={clsx("text-xs", p.id === floor.id ? "text-bone/60" : "text-concrete")}>
                {p.urdu} · {p.rooms.length} spaces
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* PLAN VIEWER */}
      <div className="min-w-0 lg:col-span-5 lg:row-span-2 lg:row-start-1">
        <div
          className="relative mx-auto overflow-hidden border border-ink/10 bg-[#f4f2ee]"
          style={{ aspectRatio: `${floor.width} / ${floor.height}`, width: "min(100%, calc(78svh * 0.7064))" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={floor.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="absolute inset-0 origin-center" animate={{ scale: view.s, x: `${view.x}%`, y: `${view.y}%` }} transition={spring}>
                <Image src={floor.image} alt={`${title}: ${floor.label.toLowerCase()} plan`} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                <svg viewBox={`0 0 ${floor.width} ${floor.height}`} preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
                  {/* spotlight */}
                  <motion.path
                    fillRule="evenodd"
                    fill="#0e0e0e"
                    initial={false}
                    animate={{ opacity: room ? 0.58 : 0 }}
                    transition={{ duration: 0.4 }}
                    d={`M0 0H${floor.width}V${floor.height}H0Z${room ? `M${room.box[0]} ${room.box[1]}H${room.box[2]}V${room.box[3]}H${room.box[0]}Z` : ""}`}
                  />
                  {rooms.map((r) => {
                    const [x1, y1, x2, y2] = r.box;
                    const active = r.id === room?.id;
                    const c = kindMeta[r.kind].color;
                    return (
                      <rect
                        key={r.id}
                        x={x1}
                        y={y1}
                        width={x2 - x1}
                        height={y2 - y1}
                        onClick={() => select(active ? null : r.id)}
                        className={clsx("cursor-pointer transition-[fill-opacity,stroke-opacity] duration-300", !active && "hover:[fill-opacity:0.22] hover:[stroke-opacity:1]")}
                        fill={c}
                        fillOpacity={active ? 0.1 : colour && !room ? 0.32 : 0}
                        stroke={active ? "#fff" : c}
                        strokeOpacity={active ? 1 : colour && !room ? 0.9 : 0}
                        strokeWidth={active ? 2.5 : 1.5}
                        vectorEffect="non-scaling-stroke"
                      />
                    );
                  })}
                  {room && (
                    <motion.rect
                      key={room.id}
                      x={room.box[0]}
                      y={room.box[1]}
                      width={room.box[2] - room.box[0]}
                      height={room.box[3] - room.box[1]}
                      fill="none"
                      stroke={accent}
                      strokeWidth={6}
                      vectorEffect="non-scaling-stroke"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: reduce ? 0.8 : [0.9, 0.25, 0.9] }}
                      transition={reduce ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      pointerEvents="none"
                    />
                  )}
                </svg>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              onClick={toggleTour}
              className="label inline-flex h-9 items-center gap-2 bg-bone/90 px-3 text-ink shadow-sm backdrop-blur hover:bg-bone"
              aria-pressed={touring}
            >
              {touring ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
              {touring ? "Pause" : "Tour"}
            </button>
            {room && (
              <button
                type="button"
                onClick={() => select(null)}
                className="label inline-flex h-9 items-center gap-2 bg-bone/90 px-3 text-ink shadow-sm backdrop-blur hover:bg-bone"
              >
                <Scan className="size-3.5" aria-hidden /> Full plan
              </button>
            )}
          </div>

          {/* Hint / info bar */}
          <AnimatePresence mode="wait" initial={false}>
            {room ? (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-3 bottom-3 flex items-center gap-3 bg-ink/90 p-2 pl-4 text-bone backdrop-blur"
                aria-live="polite"
              >
                <span className="size-2.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-medium uppercase tracking-tight md:text-base">{room.name}</p>
                  <p className="text-xs text-bone/65">
                    {room.size ? `${prettySize(room.size)}${area ? ` · approx. ${area} sq ft` : ""}` : kindMeta[room.kind].label}
                  </p>
                </div>
                <button type="button" onClick={() => step(-1)} className="grid size-9 place-items-center border border-bone/20 hover:bg-bone hover:text-ink" aria-label="Previous room">
                  <ArrowLeft className="size-4" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => step(1)} className="grid size-9 place-items-center border border-bone/20 hover:bg-bone hover:text-ink" aria-label="Next room">
                  <ArrowRight className="size-4" strokeWidth={1.5} />
                </button>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="label pointer-events-none absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap bg-ink/85 px-4 py-2.5 text-bone backdrop-blur"
              >
                <Hand className="size-3.5" aria-hidden /> Tap any room
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* PANEL */}
      <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-start-2">
        {/* Floor stats */}
        <dl className="grid grid-cols-4 gap-2 border-y border-ink/10">
          {stats.map((s) => (
            <div key={s.label} className="py-4">
              <dd className="font-display text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-none tracking-tight">{s.value}</dd>
              <dt className="mt-2 text-[0.68rem] uppercase tracking-[0.12em] text-concrete md:text-xs">{s.label}</dt>
            </div>
          ))}
        </dl>

        {/* Selected room detail (desktop) */}
        <div className="mt-6 hidden min-h-28 lg:block" aria-hidden={!room}>
          <AnimatePresence mode="wait" initial={false}>
            {room ? (
              <motion.div key={room.id} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }}>
                <p className="label flex items-center gap-2" style={{ color: accent }}>
                  <span className="size-2 rounded-full" style={{ background: accent }} /> {kindMeta[room.kind].label} · {floor.label}
                </p>
                <p className="display mt-2 text-[clamp(1.75rem,3vw,2.75rem)]">{room.name}</p>
                <p className="mt-2 text-graphite">
                  {room.size && <span className="font-medium text-ink">{prettySize(room.size)}</span>}
                  {area ? ` · approx. ${area} sq ft` : ""}
                  {room.note ? <span className="block text-sm">{room.note}</span> : null}
                </p>
              </motion.div>
            ) : (
              <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md text-graphite">
                Tap a room on the plan or below to zoom in and see its size. Press <span className="font-medium text-ink">Tour</span> to walk through every room.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Legend + colour toggle */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          {kindsHere.map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-xs text-graphite">
              <span className="size-2 rounded-full" style={{ background: kindMeta[k].color }} aria-hidden />
              {kindMeta[k].label}
            </span>
          ))}
          <button type="button" onClick={() => setColour((v) => !v)} aria-pressed={colour} className="link-underline ml-auto text-xs font-medium text-ink">
            {colour ? "Hide colours" : "Colour the rooms"}
          </button>
        </div>

        {/* Room chips: one swipeable row on mobile, wrapped on desktop */}
        <ul className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0" aria-label={`Rooms on the ${floor.label.toLowerCase()}`}>
          {rooms.map((r) => {
            const active = r.id === room?.id;
            return (
              <li key={r.id} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(active ? null : r.id)}
                  className={clsx(
                    "flex items-center gap-2 border px-3 py-2 text-sm transition-colors duration-300",
                    active ? "border-ink bg-ink text-bone" : "border-ink/15 bg-bone hover:border-ink/50",
                  )}
                >
                  <span className="size-2 rounded-full" style={{ background: kindMeta[r.kind].color }} aria-hidden />
                  {r.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
