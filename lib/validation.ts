import { serviceOptions } from "@/data/services";

export const projectTypes = [
  "New house construction",
  "Design & drawings only",
  "Grey structure only",
  "Finishing only",
  "Renovation / remodeling",
  "Turnkey (design to handover)",
  "Other",
] as const;

export const budgetRanges = [
  "Under PKR 1 crore",
  "PKR 1 – 2 crore",
  "PKR 2 – 4 crore",
  "PKR 4 – 7 crore",
  "Above PKR 7 crore",
  "Not sure yet",
] as const;

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  projectType: string;
  budget: string;
  message: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export const LIMITS = {
  name: 100,
  phone: 30,
  email: 160,
  location: 160,
  service: 80,
  projectType: 80,
  budget: 80,
  message: 3000,
} as const;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

/** Removes control characters and angle brackets, collapses whitespace (except newlines in messages). */
export function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let v = value.normalize("NFKC").replace(/[<>]/g, "");
  v = v.replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ");
  v = multiline ? v.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : v.replace(/\s+/g, " ");
  return v.trim().slice(0, max);
}

export function sanitizeEnquiry(raw: Record<string, unknown>): EnquiryInput {
  return {
    name: clean(raw.name, LIMITS.name),
    phone: clean(raw.phone, LIMITS.phone),
    email: clean(raw.email, LIMITS.email).toLowerCase(),
    location: clean(raw.location, LIMITS.location),
    service: clean(raw.service, LIMITS.service),
    projectType: clean(raw.projectType, LIMITS.projectType),
    budget: clean(raw.budget, LIMITS.budget),
    message: clean(raw.message, LIMITS.message, true),
  };
}

export function isValidPhone(phone: string) {
  if (!/^[+\d\s\-()]+$/.test(phone)) return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function validateEnquiry(data: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!data.phone) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(data.phone)) errors.phone = "Please enter a valid phone number, e.g. +92 300 1234567.";
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.location.length < 2) errors.location = "Please tell us where your plot or project is.";
  if (!data.service) errors.service = "Please select the service you need.";
  else if (!(serviceOptions as readonly string[]).includes(data.service)) errors.service = "Please select a service from the list.";
  if (data.projectType && !(projectTypes as readonly string[]).includes(data.projectType)) errors.projectType = "Please select a project type from the list.";
  if (data.budget && !(budgetRanges as readonly string[]).includes(data.budget)) errors.budget = "Please select a budget from the list.";
  if (data.message.length < 10) errors.message = "Please add a short message (at least 10 characters).";
  return errors;
}
