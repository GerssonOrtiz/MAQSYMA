import { copy } from "@/content/copy.es";

const number = copy.contact.whatsappNumber;

/**
 * Generador oficial de links de WhatsApp para Maqsyma 2.0
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Enlace parametrizado para cotización de producto con mensaje profesional
 */
export function whatsappProductLink(
  nombre: string,
  modelo?: string,
  esAlquiler?: boolean,
  unidad?: string
): string {
  if (esAlquiler) {
    return whatsappLink(
      copy.contact.rentalQuoteMessage(nombre + (modelo ? ` (${modelo})` : ""), unidad || "mes")
    );
  }

  return whatsappLink(
    copy.contact.productQuoteMessage(nombre, modelo)
  );
}
