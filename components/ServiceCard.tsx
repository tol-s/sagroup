import { tierLabels, type Service } from "@/data/services";
import Reveal from "./Reveal";
import ImageReveal from "./ImageReveal";
import Button from "./Button";

/** Full service block used on /services. Alternates image side for rhythm. */
export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article id={service.slug} className="scroll-mt-24 border-t border-ink/10 py-16 md:py-24" aria-labelledby={`${service.slug}-title`}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className={`md:col-span-5 ${flip ? "md:order-2 md:col-start-8" : ""}`}>
          <ImageReveal
            src={service.image}
            alt={service.title}
            className="aspect-[4/3] w-full md:aspect-[4/5]"
            sizes="(min-width: 768px) 40vw, 100vw"
            direction={flip ? "right" : "left"}
          />
        </div>
        <div className={`flex flex-col md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
          <Reveal>
            <p className="label flex items-center gap-3 text-concrete">
              <span>{service.number}</span>
              <span className="h-px w-8 bg-current" aria-hidden />
              <span>{tierLabels[service.tier]}</span>
            </p>
            <h2 id={`${service.slug}-title`} className="display display-md mt-6">
              {service.title}
            </h2>
            <p className="lead mt-6 text-graphite">{service.description}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <p className="label mb-4 text-concrete">{service.includedLabel ?? "What is included"}</p>
            <ul className="grid grid-cols-1 border-t border-ink/10 sm:grid-cols-2 sm:gap-x-8">
              {service.included.map((item) => (
                <li key={item} className="flex items-center gap-3 border-b border-ink/10 py-3 text-[0.95rem]">
                  <span className="size-1.5 shrink-0 bg-bronze" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          {service.scope && service.scope.length > 0 && (
            <Reveal delay={0.15} className="mt-10">
              <p className="label mb-5 text-concrete">Complete construction scope</p>
              <dl className="space-y-5">
                {service.scope.map((group) => (
                  <div key={group.title}>
                    <dt className="text-sm font-medium tracking-tight">{group.title}</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li key={item} className="label border border-ink/15 px-3 py-2 text-graphite">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            <Button href={`/contact?service=${encodeURIComponent(service.formLabel)}`}>Discuss this service</Button>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
