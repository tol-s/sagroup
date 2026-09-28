import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.companyName} handles information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

const updated = "28 September 2026";

export default function PrivacyPage() {
  const h2 = "mt-14 font-display text-2xl font-medium uppercase tracking-tight";
  const p = "mt-4 leading-relaxed text-graphite";
  return (
    <section className="pb-24 pt-36 md:pb-36 md:pt-48">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="label text-concrete">Legal</p>
          <h1 className="display display-lg mt-6 uppercase">Privacy policy.</h1>
          <p className="mt-6 text-sm text-concrete">Last updated: {updated}</p>
        </div>
        <article className="max-w-2xl md:col-span-7 md:col-start-6">
          <p className="lead text-ink">
            This policy explains what information {site.companyName} collects through this website, why, and how it is used. We keep data collection to the minimum needed to respond to your enquiry.
          </p>

          <h2 className={h2}>Contact form information</h2>
          <p className={p}>
            When you submit the enquiry form we receive the details you enter: your name, phone number, email address (optional), plot or project location, the service you are interested in, project type, estimated budget (optional) and your message. We use this information only to respond to your enquiry and discuss your project.
          </p>

          <h2 className={h2}>Email communication</h2>
          <p className={p}>
            Form submissions are delivered to our team by email using Resend, a transactional email provider that processes the message on our behalf. If you provide your email address, we also send you a single confirmation email. We do not add you to marketing lists and we do not sell or share your information with third parties for marketing.
          </p>

          <h2 className={h2}>Phone and WhatsApp</h2>
          <p className={p}>
            If you contact us by phone or WhatsApp, those conversations are handled through the respective service providers and are subject to their own privacy policies. WhatsApp links on this site simply open a chat with a pre-filled message; nothing is sent until you choose to send it.
          </p>

          <h2 className={h2}>Analytics and cookies</h2>
          <p className={p}>
            This website does not use advertising cookies or third-party analytics tracking. The site is hosted on Vercel, which may keep standard technical server logs (such as IP address and request time) for security and reliability. Images are served from Unsplash&apos;s image CDN.
          </p>

          <h2 className={h2}>Retention</h2>
          <p className={p}>
            Enquiries are kept in our email for as long as needed to respond and manage any resulting project, and are deleted when no longer required.
          </p>

          <h2 className={h2}>Your choices</h2>
          <p className={p}>
            You can ask us to access, correct or delete the information you have sent us at any time by calling {site.phones[0].name} on {site.phones[0].display} or {site.phones[1].name} on {site.phones[1].display}.
          </p>

          <h2 className={h2}>Contact</h2>
          <p className={p}>
            {site.companyName}, {site.location.display}. Phone: {site.phones.map((x) => `${x.display} (${x.name})`).join(", ")}.
          </p>
        </article>
      </div>
    </section>
  );
}
