import Link from "next/link";
import { MessageCircle, Phone, CalendarCheck } from "lucide-react";
import { telLink, whatsappLink } from "@/lib/contact";
import { site } from "@/data/site";

/** Fixed bottom bar on small screens. Body gets matching bottom padding in globals.css. */
export default function MobileContactBar() {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 label !text-[0.625rem] !tracking-[0.16em]";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-ink/10 bg-bone/95 text-ink backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={telLink(0)} className={`${item} h-16`} aria-label={`Call ${site.phones[0].display}`}>
        <Phone className="size-4" strokeWidth={1.5} aria-hidden />
        Call
      </a>
      <a href={whatsappLink(0)} target="_blank" rel="noopener noreferrer" className={`${item} h-16 border-x border-ink/10`} aria-label="Chat on WhatsApp">
        <MessageCircle className="size-4" strokeWidth={1.5} aria-hidden />
        WhatsApp
      </a>
      <Link href="/contact" className={`${item} h-16 bg-ink text-bone`}>
        <CalendarCheck className="size-4" strokeWidth={1.5} aria-hidden />
        Consultation
      </Link>
    </nav>
  );
}
