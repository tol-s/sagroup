import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";
import clsx from "@/lib/clsx";

type Props = {
  eyebrow?: string;
  index?: string;
  title: string;
  intro?: string;
  className?: string;
  size?: "lg" | "md";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  id?: string;
};

export default function SectionHeading({ eyebrow, index, title, intro, className, size = "md", tone = "dark", as = "h2", id }: Props) {
  return (
    <div className={clsx("grid gap-8 md:grid-cols-12", className)}>
      {(eyebrow || index) && (
        <Reveal className="md:col-span-3">
          <p className={clsx("label flex items-center gap-3", tone === "light" ? "text-bone/60" : "text-concrete")}>
            {index && <span>{index}</span>}
            {index && eyebrow && <span className="h-px w-8 bg-current" aria-hidden />}
            {eyebrow && <span>{eyebrow}</span>}
          </p>
        </Reveal>
      )}
      <div className={clsx(eyebrow || index ? "md:col-span-9" : "md:col-span-12")}>
        <AnimatedText id={id} as={as} text={title} className={clsx("display", size === "lg" ? "display-lg" : "display-md")} />
        {intro && (
          <Reveal delay={0.15}>
            <p className={clsx("lead mt-8 max-w-2xl", tone === "light" ? "text-bone/70" : "text-graphite")}>{intro}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}
