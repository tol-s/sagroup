import { testimonials } from "@/data/testimonials";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/** Testimonials. Entries marked placeholder are visibly labelled as such. */
export default function Testimonials() {
  const hasPlaceholders = testimonials.some((t) => t.placeholder);
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="wrap">
        <SectionHeading id="testimonials-title" index="09" eyebrow="Client words" title="In their words." />
        {hasPlaceholders && (
          <p className="mt-8 max-w-xl border-l-2 border-bronze pl-4 text-sm text-graphite">
            Client testimonials will be published here once received with our clients&apos; permission.
          </p>
        )}
        <ul className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.08} className="flex min-h-72 flex-col justify-between border border-ink/10 bg-bone p-7 md:p-9">
              <figure className="flex h-full flex-col justify-between">
                <span className="font-serif text-6xl leading-none text-bronze" aria-hidden>
                  &ldquo;
                </span>
                <blockquote className={`mt-4 text-xl leading-snug tracking-tight ${t.placeholder ? "italic text-concrete" : ""}`}>{t.quote}</blockquote>
                <figcaption className="mt-10 border-t border-ink/10 pt-5">
                  <p className="label">{t.placeholder ? "Placeholder" : t.name}</p>
                  <p className="mt-1 text-sm text-concrete">
                    {t.project} · {t.location}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
