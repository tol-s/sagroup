"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { serviceOptions } from "@/data/services";
import { site } from "@/data/site";
import { budgetRanges, projectTypes, sanitizeEnquiry, validateEnquiry, LIMITS, type EnquiryInput, type FieldErrors } from "@/lib/validation";
import { telLink, whatsappLink } from "@/lib/contact";
import clsx from "@/lib/clsx";

type Status = "idle" | "submitting" | "success" | "error";

const empty: EnquiryInput = { name: "", phone: "", email: "", location: "", service: "", projectType: "", budget: "", message: "" };

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function ContactForm({ initialService }: { initialService?: string }) {
  const [values, setValues] = useState<EnquiryInput>({
    ...empty,
    service: initialService && (serviceOptions as readonly string[]).includes(initialService) ? initialService : "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef<number>(0);
  const submissionId = useRef<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    submissionId.current = newId();
  }, []);

  const set = (key: keyof EnquiryInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const data = sanitizeEnquiry(values as unknown as Record<string, unknown>);
    const errs = validateEnquiry(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: honeypot, startedAt: startedAt.current, submissionId: submissionId.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      setValues(empty);
      submissionId.current = newId();
      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const field = "peer w-full border-0 border-b bg-transparent px-0 pb-3 pt-2 text-[1.0625rem] text-ink placeholder:text-concrete/70 focus:outline-none focus:ring-0 transition-colors";
  const border = (k: keyof EnquiryInput) => (errors[k] ? "border-red-700 focus:border-red-700" : "border-ink/20 focus:border-ink");
  const labelCls = "label mb-1 block text-graphite";

  const err = (k: keyof EnquiryInput) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-sm text-red-700" role="alert">
        {errors[k]}
      </p>
    ) : null;

  const aria = (k: keyof EnquiryInput) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  if (status === "success") {
    return (
      <motion.div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border border-ink/10 bg-paper p-8 focus:outline-none md:p-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="grid size-14 place-items-center rounded-full bg-ink text-bone">
          <Check className="size-6" strokeWidth={1.5} aria-hidden />
        </span>
        <h3 className="display display-sm mt-8">Thank you. Your enquiry has been received.</h3>
        <p className="mt-4 max-w-lg text-graphite">
          Our team will review your requirements and contact you shortly. If you provided an email address, a confirmation is on its way. For anything urgent, call us on {site.phones[0].display}.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={telLink(0)} className="label inline-flex h-12 items-center bg-ink px-6 text-bone">Call Now</a>
          <button type="button" onClick={() => setStatus("idle")} className="label inline-flex h-12 items-center border border-ink/30 px-6">
            Send another enquiry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-8 md:grid-cols-2" aria-describedby="form-note">
      <div>
        <label htmlFor="name" className={labelCls}>Full Name *</label>
        <input id="name" name="name" type="text" autoComplete="name" required maxLength={LIMITS.name} value={values.name} onChange={set("name")} className={clsx(field, border("name"))} placeholder="Your full name" {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="phone" className={labelCls}>Phone Number *</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={LIMITS.phone} value={values.phone} onChange={set("phone")} className={clsx(field, border("phone"))} placeholder="+92 3XX XXXXXXX" {...aria("phone")} />
        {err("phone")}
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} value={values.email} onChange={set("email")} className={clsx(field, border("email"))} placeholder="you@example.com" {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="location" className={labelCls}>Plot / Project Location *</label>
        <input id="location" name="location" type="text" required maxLength={LIMITS.location} value={values.location} onChange={set("location")} className={clsx(field, border("location"))} placeholder="e.g. DHA Phase 8, Karachi" {...aria("location")} />
        {err("location")}
      </div>
      <div>
        <label htmlFor="service" className={labelCls}>Service Required *</label>
        <select id="service" name="service" required value={values.service} onChange={set("service")} className={clsx(field, border("service"), !values.service && "text-concrete")} {...aria("service")}>
          <option value="">Select a service</option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {err("service")}
      </div>
      <div>
        <label htmlFor="projectType" className={labelCls}>Project Type</label>
        <select id="projectType" name="projectType" value={values.projectType} onChange={set("projectType")} className={clsx(field, border("projectType"), !values.projectType && "text-concrete")} {...aria("projectType")}>
          <option value="">Select project type</option>
          {projectTypes.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {err("projectType")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="budget" className={labelCls}>Estimated Budget</label>
        <select id="budget" name="budget" value={values.budget} onChange={set("budget")} className={clsx(field, border("budget"), !values.budget && "text-concrete")} {...aria("budget")}>
          <option value="">Select a budget range</option>
          {budgetRanges.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {err("budget")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="message" className={labelCls}>Message *</label>
        <textarea id="message" name="message" required rows={5} maxLength={LIMITS.message} value={values.message} onChange={set("message")} className={clsx(field, border("message"), "resize-y")} placeholder="Plot size, number of floors, timeline and anything else we should know." {...aria("message")} />
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="md:col-span-2">
        <AnimatePresence>
          {status === "error" && (
            <motion.div
              ref={statusRef}
              tabIndex={-1}
              role="alert"
              className="mb-6 border border-red-700/30 bg-red-50 p-5 text-sm text-red-900 focus:outline-none"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p>{serverError}</p>
              <p className="mt-2">
                Call <a className="underline" href={telLink(0)}>{site.phones[0].display}</a> or{" "}
                <a className="underline" href={whatsappLink(0)} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p id="form-note" className="max-w-sm text-sm text-concrete">
            Fields marked * are required. Your details are used only to respond to your enquiry.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="group/btn label inline-flex h-14 items-center justify-center gap-3 bg-ink px-8 text-bone transition-colors duration-500 hover:bg-charcoal disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
              </>
            ) : (
              <>
                Request a Free Consultation
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" strokeWidth={1.5} aria-hidden />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
