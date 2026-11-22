import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Clock, Compass, MapPin, MessageCircle, Plus } from "lucide-react";
import Reveal from "../Reveal";
import Button from "../Button";
import { featuredServiceSlugs, services, type Service } from "@/data/services";
import { faqs, formatPKR, packages, plotSizes, workTypes } from "@/data/calculator";
import { whatsappLink } from "@/lib/contact";
import clsx from "@/lib/clsx";

/** Four short reasons to trust us, right under the hero. */
export function TrustBar() {
  const items = [
    { icon: Compass, title: "Design + construction", text: "Naksha, 3D elevation and construction by one team" },
    { icon: Check, title: "Free consultation", text: "Discuss your plot and budget at no cost" },
    { icon: MessageCircle, title: "Updates on WhatsApp", text: "Regular progress photos from site" },
    { icon: MapPin, title: "All of Karachi", text: "DHA, Bahria Town, Gulshan, Scheme 33 and more" },
  ];
  return (
    <section aria-label="Why clients choose us" className="border-b border-ink/10 bg-paper">
      <ul className="wrap grid grid-cols-2 gap-px lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} delay={i * 0.05} className="flex gap-4 py-7 pr-4 md:py-9">
            <Icon className="mt-0.5 size-5 shrink-0 text-bronze" strokeWidth={1.5} aria-hidden />
            <div>
              <p className="font-medium tracking-tight">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-graphite">{text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** Simple service cards; residential house construction gets the wide first card. */
export function ServiceCards() {
  const items = featuredServiceSlugs.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is Service => Boolean(s));
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal as="li" key={s.slug} delay={(i % 4) * 0.05} className={clsx(i === 0 && "sm:col-span-2")}>
          <Link href={`/services#${s.slug}`} className="group block" data-cursor="View">
            <div className={clsx("relative overflow-hidden bg-sand", i === 0 ? "aspect-[4/3] sm:aspect-[2/1] lg:aspect-[2/1]" : "aspect-[4/3]")}>
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
              />
              {i === 0 && <span className="label absolute left-4 top-4 bg-bone px-2.5 py-1.5 text-ink">Our main focus</span>}
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <h3 className="font-display text-xl font-medium uppercase leading-tight tracking-tight">{s.title}</h3>
              <ArrowUpRight className="mt-1 size-4 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden />
            </div>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-graphite">{s.shortDescription}</p>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}

/** What each package includes, with the starting rate from the calculator data. */
export function PackagesSection() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {packages.map((p, i) => {
        const rate = workTypes.find((w) => w.id === p.id)?.rate ?? 0;
        return (
          <Reveal
            as="li"
            key={p.id}
            delay={i * 0.06}
            className={clsx("flex flex-col border p-7 md:p-9", p.featured ? "border-ink bg-ink text-bone" : "border-ink/10 bg-paper")}
          >
            {p.featured && <p className="label mb-4 text-bronze-light">Most chosen</p>}
            <h3 className="font-display text-2xl font-medium uppercase tracking-tight">{p.title}</h3>
            <p className={clsx("mt-2 text-sm leading-relaxed", p.featured ? "text-bone/65" : "text-graphite")}>{p.subtitle}</p>
            <p className="mt-6">
              <span className={clsx("label", p.featured ? "text-bone/55" : "text-concrete")}>From </span>
              <span className="font-display text-3xl font-medium tracking-tight">{formatPKR(rate)}</span>
              <span className={clsx("text-sm", p.featured ? "text-bone/55" : "text-concrete")}> / sq ft</span>
            </p>
            <ul className={clsx("mt-6 flex-1 space-y-3 border-t pt-6 text-[0.95rem]", p.featured ? "border-bone/15" : "border-ink/10")}>
              {p.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className={clsx("mt-0.5 size-4 shrink-0", p.featured ? "text-bronze-light" : "text-bronze")} strokeWidth={2} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink(`Hi, I would like a quotation for ${p.title}. My plot size is: `)}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "label mt-8 inline-flex h-12 items-center justify-center gap-2 px-6 transition-colors",
                p.featured ? "bg-bone text-ink hover:bg-white" : "border border-ink/30 hover:bg-ink hover:text-bone",
              )}
            >
              <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
              Get quotation
            </a>
          </Reveal>
        );
      })}
    </ul>
  );
}

/** Typical construction timeline by plot size. */
export function TimelineSection() {
  const shown = plotSizes.filter((p) => ["120", "240", "500", "1000"].includes(p.id));
  return (
    <ul className="grid grid-cols-2 border-l border-t border-ink/10 lg:grid-cols-4">
      {shown.map((p, i) => (
        <Reveal as="li" key={p.id} delay={i * 0.05} className="border-b border-r border-ink/10 p-5 md:p-8">
          <Clock className="size-5 text-bronze" strokeWidth={1.5} aria-hidden />
          <p className="mt-6 font-display text-lg font-medium uppercase tracking-tight md:text-xl">{p.label} house</p>
          <p className="mt-1 text-sm text-graphite">Complete construction</p>
          <p className="mt-4 font-display text-2xl font-medium tracking-tight md:text-3xl">{p.timeline}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/** Frequently asked questions, using native details/summary for accessibility. */
export function FaqSection() {
  return (
    <div className="border-t border-ink/10">
      {faqs.map((f) => (
        <details key={f.q} className="group border-b border-ink/10">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="mt-1 size-5 shrink-0 transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} aria-hidden />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-graphite">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function WhatsAppCta({ label = "Ask on WhatsApp" }: { label?: string }) {
  return (
    <Button href={whatsappLink()} variant="outline" icon={<MessageCircle className="size-4" strokeWidth={1.5} />}>
      {label}
    </Button>
  );
}
