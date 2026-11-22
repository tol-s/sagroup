import { site } from "@/data/site";

/** WhatsApp Business chat link with a pre-filled message. */
export function whatsappLink(message: string = site.whatsappMessage) {
  return `https://wa.me/${site.whatsappBusiness.number}?text=${encodeURIComponent(message)}`;
}

/** "Atiq Ur Rehman, CEO" style label for a phone entry. */
export function contactName(phone: (typeof site.phones)[number]) {
  return phone.role ? `${phone.name}, ${phone.role}` : phone.name;
}

export function telLink(phoneIndex = 0) {
  const phone = site.phones[phoneIndex] ?? site.phones[0];
  return `tel:${phone.tel}`;
}
