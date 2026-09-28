import { site } from "@/data/site";

export function whatsappLink(phoneIndex = 0, message: string = site.whatsappMessage) {
  const phone = site.phones[phoneIndex] ?? site.phones[0];
  return `https://wa.me/${phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** "Atiq Ur Rehman, CEO" style label for a phone entry. */
export function contactName(phone: (typeof site.phones)[number]) {
  return phone.role ? `${phone.name}, ${phone.role}` : phone.name;
}

export function telLink(phoneIndex = 0) {
  const phone = site.phones[phoneIndex] ?? site.phones[0];
  return `tel:${phone.tel}`;
}
