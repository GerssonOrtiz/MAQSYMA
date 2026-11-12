/**
 * Centralización de textos (Copy oficial de Maqsyma)
 * Requisito: Todo el copy debe poder cambiarse desde un solo archivo (01-concepto-y-marca.md).
 */

export const copy = {
  brand: {
    name: "MAQSYMA",
    legalName: "Maquinaria, Sistemas y Materiales Avanzados",
    location: "Arequipa, Perú",
    tagline: "Venta y alquiler de equipos de soldadura ESAB",
  },
  contact: {
    // Número de WhatsApp oficial (configurar vía variable de entorno NEXT_PUBLIC_WHATSAPP_NUMBER)
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999",
    defaultMessage: "Hola Maqsyma, deseo cotizar equipos de soldadura ESAB para venta/alquiler.",
    productQuoteMessage: (productName: string, sku?: string) =>
      `Hola Maqsyma, deseo cotizar el equipo ESAB ${productName}${sku ? ` (Ref: ${sku})` : ""}.`,
  },
  hero: {
    title: "Equipos de soldadura ESAB para venta y alquiler",
    subtitle: "Maquinaria, sistemas y materiales avanzados para su taller, en Arequipa.",
    primaryCta: "Cotizar por WhatsApp",
    secondaryCta: "Explorar el taller",
  },
  scenes: {
    sectionHeading: "Recorrido del taller",
    sectionSubheading: "Conozca los procesos técnicos y la potencia industrial de nuestros equipos.",
    items: [
      {
        id: "entrada",
        title: "Recepción Técnica",
        subtitle: "Bienvenido a Maqsyma.",
        process: "Recepción",
      },
      {
        id: "mig-mag",
        title: "Área MIG/MAG",
        subtitle: "Soldadura de alta productividad para producción continua.",
        process: "MIG/MAG (GMAW/FCAW)",
      },
      {
        id: "tig",
        title: "Área TIG",
        subtitle: "Precisión para acero inoxidable, aluminio y trabajos finos.",
        process: "TIG (GTAW Alta Frecuencia)",
      },
      {
        id: "mma",
        title: "Área MMA",
        subtitle: "Robustez para campo, mantenimiento y trabajos a la intemperie.",
        process: "Electrodo Revestido (SMAW)",
      },
      {
        id: "plasma",
        title: "Área Plasma",
        subtitle: "Corte limpio para planchas metálicas.",
        process: "Corte por Plasma",
      },
      {
        id: "alquiler",
        title: "Flota de Alquiler",
        subtitle: "Equipos listos para su obra, por día, semana o mes.",
        process: "Alquiler Operativo",
      },
    ],
  },
  sections: {
    bestSellers: {
      title: "Más Vendidos",
      subtitle: "Equipos con mayor demanda operativa comprobada en talleres de la región.",
    },
    topRated: {
      title: "Mejor Valorados",
      subtitle: "Rendimiento y confiabilidad técnica recomendada por soldadores expertos.",
    },
    newModels: {
      title: "Nuevos Modelos",
      subtitle: "Última generación tecnológica ESAB con control de arco avanzado.",
    },
  },
  footer: {
    ctaHeading: "¿Necesita un equipo?",
    ctaBody: "Escríbanos por WhatsApp y le respondemos con precio y disponibilidad inmediata.",
    quoteButton: "Contactar a un Asesor",
    rights: "Todos los derechos reservados. Distribución autorizada de equipos ESAB.",
  },
} as const;
