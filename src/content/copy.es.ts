/**
 * Centralización de textos (Copy oficial de Maqsyma 2.0)
 * Sincronizado con la identidad comercial de Arequipa y catálogo ampliado.
 */

export const copy = {
  brand: {
    name: "MAQSYMA",
    legalName: "Maquinaria, Sistemas y Materiales Avanzados",
    location: "Arequipa, Perú",
    address: "Av. Venezuela 866, Arequipa, Perú",
    tagline: "Equipos y soluciones industriales de soldadura y corte",
  },
  contact: {
    // Número oficial verificado: 907 438 497 (prefijo Perú 51)
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51907438497",
    phoneDisplay: "+51 907 438 497",
    addressDisplay: "Av. Venezuela 866 - Arequipa",
    defaultMessage: "Hola Maqsyma, deseo información sobre venta y alquiler de equipos de soldadura y corte.",
    productQuoteMessage: (productName: string, sku?: string) =>
      `Hola Maqsyma, deseo cotizar el producto ${productName}${sku ? ` (${sku})` : ""}. ¿Tienen disponibilidad y asesoría técnica?`,
    rentalQuoteMessage: (productName: string, unidad: string = "mes") =>
      `Hola Maqsyma, deseo cotizar el alquiler del equipo ${productName} por ${unidad}. ¿Cuáles son los requisitos y disponibilidad en Arequipa?`,
  },
  hero: {
    badge: "Soluciones Industriales en Arequipa",
    titlePrimary: "POTENCIA",
    titleHighlight: "INDUSTRIAL.",
    subtitle: "Equipos de soldadura y corte de alta gama para minería, calderería y montaje estructural. Venta, alquiler y asesoría técnica en Arequipa.",
    primaryCta: "Explorar catálogo",
    secondaryCta: "Cotizar por WhatsApp",
  },
  categorias: [
    {
      id: "maquinas-soldar",
      titulo: "Máquinas de Soldar",
      descripcion: "MIG/MAG, TIG Alta Frecuencia, Electrodo (SMAW) y Multiprocesos.",
      icono: "Wrench",
    },
    {
      id: "corte-plasma",
      titulo: "Equipos de Corte y Plasma",
      descripcion: "Sistemas de corte de alta definición y precisión para planchas metálicas.",
      icono: "Flame",
    },
    {
      id: "caretas-epp",
      titulo: "Caretas y Protección EPP",
      descripcion: "Línea Sentinel, filtros fotosensibles de alta claridad óptica y sistemas PAPR.",
      icono: "Shield",
    },
    {
      id: "alquiler",
      titulo: "Flota de Alquiler",
      descripcion: "Disponibilidad inmediata para frentes de obra y proyectos de parada de planta.",
      icono: "Truck",
    },
  ],
  soluciones: [
    {
      titulo: "Minería y Paradas de Planta",
      descripcion: "Equipos heavy duty multiproceso (500A+) para trabajo severo y ranurado por arco-aire.",
    },
    {
      titulo: "Estructuras Metálicas y Calderería",
      descripcion: "Sistemas MIG/MAG y alambre tubular para alta tasa de deposición y juntas de penetración completa.",
    },
    {
      titulo: "Tuberías y Aceros Inoxidables",
      descripcion: "Fuentes TIG con arco pulsado de alta frecuencia para tolerancias sanitarias y de presión.",
    },
    {
      titulo: "Mantenimiento y Montaje en Campo",
      descripcion: "Inversores portátiles multivoltaje con tolerancia a fluctuaciones y generadores.",
    },
  ],
  servicioTecnico: {
    titulo: "Soporte Técnico y Asesoría Especializada",
    descripcion: "Acompañamos a su equipo técnico en la selección del proceso óptimo, parámetros de soldadura y configuración en obra.",
    puntos: [
      "Diagnóstico y calibración de parámetros para soldadores",
      "Demostraciones técnicas y asesoría en campo",
      "Equipos de respaldo para continuidad operativa en proyectos críticos",
    ],
  },
  modalidades: {
    venta: {
      titulo: "Venta Directa de Equipos",
      descripcion: "Adquiera maquinaria de alto rendimiento con garantía de fábrica, repuestos originales y soporte local.",
    },
    alquiler: {
      titulo: "Flota de Alquiler Operativo",
      descripcion: "Tarifas por día, semana o mes adaptadas a la duración de su obra sin inmovilizar capital de inversión.",
    },
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
    ctaHeading: "¿Listo para equipar su próximo proyecto industrial?",
    ctaBody: "Consulte stock disponible en nuestro local de Arequipa o coordine despacho directo a su frente de trabajo.",
    quoteButton: "Contactar a un Asesor Técnico",
    rights: "Todos los derechos reservados. Maquinaria, Sistemas y Materiales Avanzados.",
  },
};
