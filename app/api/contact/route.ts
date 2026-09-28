import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/data/site";
import { confirmationEmail, enquiryEmail } from "@/lib/email";
import { sanitizeEnquiry, validateEnquiry } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort per-instance rate limit: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam traps: hidden honeypot field and minimum fill time.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }
  const startedAt = Number(body.startedAt);
  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2500) {
    return NextResponse.json({ ok: false, error: "Please take a moment to review your details and try again." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please call or WhatsApp us instead." },
      { status: 429 },
    );
  }

  const data = sanitizeEnquiry(body);
  const errors = validateEnquiry(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const recipients = [process.env.CONTACT_EMAIL_1, process.env.CONTACT_EMAIL_2].filter(
    (v): v is string => typeof v === "string" && v.includes("@"),
  );

  if (!apiKey || !from || recipients.length === 0) {
    console.error("[contact] Email is not configured. Set RESEND_API_KEY, EMAIL_FROM, CONTACT_EMAIL_1 and CONTACT_EMAIL_2.");
    return NextResponse.json(
      { ok: false, error: "Our enquiry form is temporarily unavailable. Please call or WhatsApp us directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "full", timeStyle: "short" }) + " (PKT)";
  const submissionId = typeof body.submissionId === "string" ? body.submissionId.replace(/[^a-zA-Z0-9-]/g, "").slice(0, 64) : "";
  const { html, text } = enquiryEmail(data, timestamp);

  const { error } = await resend.emails.send(
    {
      from,
      to: recipients,
      subject: "New Construction Website Enquiry",
      html,
      text,
      ...(data.email ? { replyTo: data.email } : {}),
    },
    submissionId ? { idempotencyKey: `enquiry-${submissionId}` } : undefined,
  );

  if (error) {
    console.error("[contact] Resend error:", error.name, error.message);
    return NextResponse.json(
      { ok: false, error: "We could not send your enquiry right now. Please call or WhatsApp us directly." },
      { status: 502 },
    );
  }

  if (data.email) {
    const confirmation = confirmationEmail(data);
    const { error: confirmError } = await resend.emails.send(
      {
        from,
        to: [data.email],
        subject: `We have received your enquiry | ${site.companyName}`,
        html: confirmation.html,
        text: confirmation.text,
        replyTo: recipients[0],
      },
      submissionId ? { idempotencyKey: `confirm-${submissionId}` } : undefined,
    );
    if (confirmError) console.warn("[contact] Confirmation email not sent:", confirmError.message);
  }

  return NextResponse.json({ ok: true });
}
