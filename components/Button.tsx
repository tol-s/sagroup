import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "@/lib/clsx";

type Variant = "solid" | "outline" | "light" | "ghost-light" | "text";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode | false;
  external?: boolean;
  ariaLabel?: string;
};

const styles: Record<Variant, string> = {
  solid: "bg-ink text-bone hover:bg-charcoal",
  outline: "border border-ink/80 text-ink hover:bg-ink hover:text-bone",
  light: "bg-bone text-ink hover:bg-white",
  "ghost-light": "border border-bone/50 text-bone hover:bg-bone hover:text-ink",
  text: "text-ink px-0! h-auto! link-underline",
};

/** Primary call-to-action. Renders <a> for tel:/https:, Next <Link> for internal routes. */
export default function Button({ href, children, variant = "solid", className, icon, external, ariaLabel }: Props) {
  const cls = clsx(
    "group/btn inline-flex h-12 md:h-13 items-center justify-center gap-3 px-6 md:px-7 label transition-colors duration-500 ease-out-expo whitespace-nowrap",
    styles[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon === false ? null : (
        <span className="relative inline-flex size-4 overflow-hidden" aria-hidden>
          {icon ?? (
            <>
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-full group-hover/btn:-translate-y-full" strokeWidth={1.5} />
              <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" strokeWidth={1.5} />
            </>
          )}
        </span>
      )}
    </>
  );
  const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} aria-label={ariaLabel} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
