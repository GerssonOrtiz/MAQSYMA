import { copy } from "@/content/copy.es";

const number = copy.contact.whatsappNumber;

/**
 * Generador oficial de links de WhatsApp para Maqsyma (03-secciones-y-componentes)
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensaje parametrizado para cotizar un equipo según directiva oficial
 */
export function whatsappProductLink(
  nombre: string,
  modelo: string,
  esAlquiler?: boolean,
  unidad?: string
): string {
  if (esAlquiler) {
    return whatsappLink(
      `Hola, quisiera cotizar el equipo ${nombre} (${modelo}) de ESAB. ¿Me puede indicar precio de alquiler y disponibilidad por ${
        unidad || "mes"
      }?`
    );
  }

  return whatsappLink(
    `Hola, quisiera cotizar el equipo ${nombre} (${modelo}) de ESAB. ¿Me puede indicar precio y disponibilidad?`
  );
}
