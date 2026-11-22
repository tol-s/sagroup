import { MessageCircle, Phone } from "lucide-react";
import type { Project } from "@/data/projects";
import { site } from "@/data/site";
import { telLink, whatsappLink } from "@/lib/contact";
import clsx from "@/lib/clsx";

/** "This house is for sale" enquiry box for SA Group's own projects. */
export default function ForSaleBox({ project, className }: { project: Project; className?: string }) {
  if (!project.forSale) return null;
  const { headline, text, whatsappMessage } = project.forSale;
  return (
    <div className={clsx("flex flex-col gap-5 bg-ink p-5 text-bone md:flex-row md:items-center md:justify-between md:gap-8 md:p-7", className)}>
      <div>
        <p className="label inline-flex items-center gap-2 bg-[#7a5f43] px-2.5 py-1.5 text-white">For sale · Price on request</p>
        <p className="mt-3 font-display text-xl font-medium uppercase tracking-tight text-white md:text-2xl">{headline}</p>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/90">{text}</p>
      </div>
      <div className="grid shrink-0 grid-cols-2 gap-2 md:flex">
        <a
          href={whatsappLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex h-12 items-center justify-center gap-2 bg-[#25D366] px-4 text-ink transition-opacity hover:opacity-90 md:px-6"
        >
          <MessageCircle className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Enquire
        </a>
        <a
          href={telLink(0)}
          className="label inline-flex h-12 items-center justify-center gap-2 border border-white/40 px-4 text-white hover:bg-white hover:text-ink md:px-6"
          aria-label={`Call ${site.phones[0].name} about ${project.title}`}
        >
          <Phone className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          Call
        </a>
      </div>
    </div>
  );
}
