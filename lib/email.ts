import { site } from "@/data/site";
import type { EnquiryInput } from "@/lib/validation";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const rows = (d: EnquiryInput, timestamp: string): [string, string][] => [
  ["Name", d.name],
  ["Phone", d.phone],
  ["Email", d.email || "Not provided"],
  ["Location", d.location],
  ["Service", d.service],
  ["Project Type", d.projectType || "Not specified"],
  ["Budget", d.budget || "Not specified"],
  ["Message", d.message],
  ["Timestamp", timestamp],
];

function shell(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f1ec;font-family:Helvetica,Arial,sans-serif;color:#141412">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ec;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e3ddd3">
<tr><td style="background:#141412;color:#f4f1ec;padding:24px 28px;font-size:12px;letter-spacing:3px;text-transform:uppercase">${esc(site.companyName)}</td></tr>
<tr><td style="padding:28px"><h1 style="margin:0 0 20px;font-size:22px;font-weight:600;letter-spacing:-0.3px">${esc(title)}</h1>${inner}</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #e3ddd3;font-size:12px;color:#77736b">${esc(site.tagline)}<br>${esc(site.location.display)} · ${site.phones.map((p) => `${esc(p.name)} ${esc(p.display)}`).join(" · ")}</td></tr>
</table></td></tr></table></body></html>`;
}

export function enquiryEmail(d: EnquiryInput, timestamp: string) {
  const table = rows(d, timestamp)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px 10px 0;border-bottom:1px solid #efeae2;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#77736b;vertical-align:top;width:120px">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #efeae2;font-size:15px;line-height:1.5;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");
  const html = shell("New Construction Website Enquiry", `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${table}</table>`);
  const text = ["New Construction Website Enquiry", "", ...rows(d, timestamp).map(([k, v]) => `${k}: ${v}`)].join("\n");
  return { html, text };
}

export function confirmationEmail(d: EnquiryInput) {
  const phones = site.phones.map((p) => `${p.name} on ${p.display}`).join(" or ");
  const inner = `<p style="font-size:15px;line-height:1.6;margin:0 0 14px">Dear ${esc(d.name)},</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 14px">Thank you for contacting ${esc(site.companyName)}. We have received your enquiry about <strong>${esc(d.service)}</strong> for your project in <strong>${esc(d.location)}</strong>.</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 14px">A member of our team will review your requirements and get back to you shortly. If you would like to speak with us sooner, please call ${esc(phones)}.</p>
<p style="font-size:15px;line-height:1.6;margin:0">Regards,<br>${esc(site.companyName)}</p>`;
  const html = shell("We have received your enquiry", inner);
  const text = `Dear ${d.name},\n\nThank you for contacting ${site.companyName}. We have received your enquiry about ${d.service} for your project in ${d.location}.\n\nA member of our team will get back to you shortly. To speak with us sooner, please call ${phones}.\n\nRegards,\n${site.companyName}`;
  return { html, text };
}
