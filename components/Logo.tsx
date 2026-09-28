import Link from "next/link";
import { site } from "@/data/site";
import clsx from "@/lib/clsx";

/** Text wordmark built from site.companyName. Replace with an <Image> of the real logo when available. */
export default function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const words = site.companyName.split(" ");
  const mark = words[0].length <= 3 ? words[0] : words.map((w) => w[0]).join("").slice(0, 2);
  return (
    <Link href="/" onClick={onClick} className={clsx("group flex items-center gap-3", className)} aria-label={`${site.companyName} home`}>
      <span className="relative grid size-9 place-items-end border border-current p-1" aria-hidden>
        <span className="font-display text-[0.8rem] font-semibold leading-none tracking-tight">{mark.toUpperCase()}</span>
        <span className="absolute left-1 top-1 h-2.5 w-px bg-current opacity-50" />
        <span className="absolute left-1 top-1 h-px w-2.5 bg-current opacity-50" />
      </span>
      <span className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.18em]">{site.companyName}</span>
    </Link>
  );
}
