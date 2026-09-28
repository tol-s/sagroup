import ImageReveal from "./ImageReveal";
import AnimatedText from "./AnimatedText";
import Button from "./Button";
import Reveal from "./Reveal";
import { site } from "@/data/site";
import { images } from "@/data/images";
import { telLink } from "@/lib/contact";

type Props = {
  title?: string;
  copy?: string;
  image?: string;
};

export default function CTASection({
  title = "Ready to build\nyour next home?",
  copy = "Tell us about your plot, your vision and your requirements. Let's discuss how we can bring your home to life.",
  image = images.cta,
}: Props) {
  return (
    <section aria-label="Start your project" className="relative isolate overflow-hidden bg-ink text-bone">
      <div className="absolute inset-0 -z-10 opacity-45">
        <ImageReveal src={image} alt="" className="h-full w-full" sizes="100vw" parallax={10} cursor="" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/30" aria-hidden />
      <div className="wrap py-28 md:py-44">
        <p className="label mb-8 text-bone/60">Start your project</p>
        <AnimatedText as="h2" text={title.toUpperCase()} className="display display-lg max-w-6xl" />
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-6">
            <p className="lead text-bone/75">{copy}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/contact" variant="light">Get a Free Consultation</Button>
              <Button href={telLink(0)} variant="ghost-light">Call Now</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
            <ul className="divide-y divide-bone/15 border-y border-bone/15">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="group flex items-center justify-between py-5">
                    <span className="label text-bone/50">{p.label}</span>
                    <span className="text-xl tracking-tight transition-transform duration-500 group-hover:-translate-x-2 md:text-2xl">{p.display}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
