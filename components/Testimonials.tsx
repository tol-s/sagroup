import { showSampleTestimonialNotice, testimonials } from "@/data/testimonials";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/** Client testimonials in English and Roman Urdu. */
export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="wrap">
        <SectionHeading id="testimonials-title" index="09" eyebrow="Client words" title="In their words." />
        {showSampleTestimonialNotice && (
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-concrete">Sample testimonials</p>
        )}
        <ul className="mt-10 grid gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.name} delay={(i % 3) * 0.08} className="flex border border-ink/10 bg-bone p-7 md:p-9">
              <figure className="flex w-full flex-col justify-between">
                <div>
                  <span className="block font-serif text-6xl leading-none text-bronze" aria-hidden>
                    &ldquo;
                  </span>
                  <blockquote lang={t.lang} className="mt-2 text-lg leading-relaxed tracking-tight text-ink/90">
                    {t.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-10 border-t border-ink/10 pt-5">
                  <p className="font-display text-base font-medium uppercase tracking-tight">{t.name}</p>
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
