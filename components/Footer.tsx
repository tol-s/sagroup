import Link from "next/link";
import { nav, site } from "@/data/site";
import { services } from "@/data/services";
import { contactName, whatsappLink } from "@/lib/contact";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="wrap pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="display display-sm mt-10 max-w-md text-bone/90">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone/55">
              Residential architecture, construction and complete execution across {site.location.city}.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-2">
            <p className="label mb-5 text-bone/45">Navigate</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-underline text-bone/85 hover:text-bone">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="link-underline text-bone/85 hover:text-bone">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="label mb-5 text-bone/45">Services</p>
            <ul className="space-y-3 text-bone/85">
              {services
                .filter((s) => ["architectural-design", "cad-design-drawings", "modern-elevation-design", "grey-structure-construction", "interior-design-execution", "turnkey-construction"].includes(s.slug))
                .map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services#${s.slug}`} className="link-underline hover:text-bone">
                      {s.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label mb-5 text-bone/45">Contact</p>
            <ul className="space-y-3">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <span className="block text-sm text-bone/55">{contactName(p)}</span>
                  <a href={`tel:${p.tel}`} className="link-underline text-lg text-bone">
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={whatsappLink(0)} target="_blank" rel="noopener noreferrer" className="link-underline text-bone/85">
                  WhatsApp
                </a>
              </li>
              <li className="text-bone/60">{site.location.display}</li>
            </ul>
            <p className="label mb-4 mt-10 text-bone/45">Social</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-bone/85">
                      {s.label}
                    </a>
                  </li>
                ) : (
                  <li key={s.label} className="text-sm text-bone/35" title="Profile link coming soon">
                    {s.label}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-20 select-none overflow-hidden border-t border-bone/10 pt-6" aria-hidden>
          <p className="display whitespace-nowrap text-[clamp(4rem,17vw,19rem)] leading-[0.8] text-bone/[0.07]">{site.companyName}</p>
        </div>

        <div className="flex flex-col gap-3 border-t border-bone/10 py-6 text-xs text-bone/45 md:flex-row md:items-center md:justify-between md:pr-20">
          <p>
            © {year} {site.companyName}. All Rights Reserved.
          </p>
          <p>
            Designed &amp; built by{" "}
            <a href="https://tegnol.agency/" target="_blank" rel="noopener" className="link-underline font-medium text-bone">
              tegnol.agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
