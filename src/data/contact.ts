import { profile } from "./cv";

/**
 * Canales de contacto.
 *
 * El número de WhatsApp se arma con el formato internacional que espera wa.me:
 * 54 (Argentina) + 9 (móvil) + característica sin 0 + número sin 15.
 * Local 2324 582614  ->  54 9 2324 582614.
 * Si el número cambia, se edita únicamente acá.
 */

const localPhone = profile.phone; // "2324582614"
const whatsappNumber = `549${localPhone}`;

export const contact = {
  email: profile.email,
  phoneLocal: `${localPhone.slice(0, 4)} ${localPhone.slice(4)}`,
  whatsappNumber,
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hola Matías, vi tu portfolio y me gustaría hablar de un proyecto.",
  )}`,
  mailtoHref: `mailto:${profile.email}?subject=${encodeURIComponent(
    "Proyecto — desde el portfolio",
  )}`,
  linkedin: profile.linkedin,
  linkedinLabel: profile.linkedinLabel,
  location: profile.location,
} as const;

/** Los mismos enlaces, con el mensaje precargado en el idioma del visitante. */
export function whatsappHrefWith(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoHrefWith(subject: string) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}`;
}
