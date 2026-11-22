import Image from "next/image";
import { Boxes, Building2, Check, MessageCircle } from "lucide-react";
import { divisions } from "@/data/site";
import { whatsappLink } from "@/lib/contact";
import Reveal from "./Reveal";

/** The SA Group divisions, as two simple cards. */
export default function Divisions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      {divisions.map((d, i) => {
        const Icon = i === 0 ? Building2 : Boxes;
        return (
          <Reveal key={d.short} delay={i * 0.08} className="flex flex-col border border-ink/10 bg-bone p-6 md:p-8">
            <div className="flex items-center gap-5">
              <span className="grid size-24 shrink-0 place-items-center bg-ink p-3.5 text-bone md:size-28 md:p-4" aria-hidden={!d.logo}>
                {d.logo ? (
                  <Image src={d.logo} alt={`${d.short} logo`} width={200} height={122} className="h-auto w-full object-contain" />
                ) : (
                  <Icon className="size-11 md:size-12" strokeWidth={1.1} />
                )}
              </span>
              <div>
                <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.85rem)] font-medium uppercase leading-[0.95] tracking-[-0.01em]">
                  {d.name}
                  <span className="block text-[0.72em] tracking-[0.04em]">{d.line2}</span>
                </h3>
                <p className="label mt-2 border-t border-ink/20 pt-2 text-concrete">A division of SA Group</p>
              </div>
            </div>
            <p className="mt-6 text-graphite">{d.description}</p>
            <p className="mt-2 text-sm italic text-concrete">{d.urdu}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {d.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <Check className="size-4 text-bronze" strokeWidth={2} aria-hidden /> {p}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(d.cta.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-7 inline-flex h-12 items-center justify-center gap-2.5 self-start border border-ink/80 px-5 hover:bg-ink hover:text-bone"
            >
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden /> {d.cta.label}
            </a>
          </Reveal>
        );
      })}
    </div>
  );
}
