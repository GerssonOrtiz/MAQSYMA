/**
 * Centralización de textos (Copy oficial de MAQSYMA 2.0)
 * Rediseño integral: Identidad Industrial Cinematográfica y Comercial.
 * Sin "Servicio Técnico" como servicio/sección.
 */

export const copy = {
  brand: {
    name: "MAQSYMA",
    legalName: "Maquinaria, Sistemas y Materiales Avanzados",
    location: "Arequipa, Perú",
    address: "Av. Venezuela 866, Arequipa, Perú",
    tagline: "Equipamiento para soldadura y corte industrial",
  },
  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51907438497",
    phoneDisplay: "+51 907 438 497",
    addressDisplay: "Av. Venezuela 866 - Arequipa",
    defaultMessage: "Hola MAQSYMA, deseo cotizar equipamiento para soldadura y corte industrial.",
    productQuoteMessage: (productName: string, sku?: string) =>
      `Hola MAQSYMA, deseo consultar el equipo ${productName}${sku ? ` (Ref: ${sku})` : ""}. ¿Tienen disponibilidad para compra o alquiler?`,
    rentalQuoteMessage: (productName: string, unidad: string = "mes") =>
      `Hola MAQSYMA, deseo consultar disponibilidad de alquiler para ${productName} por ${unidad} en Arequipa.`,
    brandConsultMessage: (brandName: string) =>
      `Hola MAQSYMA, deseo información sobre catálogo y disponibilidad de la marca ${brandName}.`,
  },
  hero: {
    badge: "MAQSYMA 2.0 · AREQUIPA & SUR DEL PERÚ",
    titlePrimary: "POTENCIA Y PRECISIÓN",
    titleHighlight: "INDUSTRIAL.",
    subtitle: "Maquinaria de soldadura de alto ciclo, corte plasma, antorchas y consumibles para operaciones de máxima exigencia operativa.",
    primaryCta: "EXPLORAR EQUIPOS",
    secondaryCta: "HABLAR CON MAQSYMA",
  },
  narrative: {
    quote: "La industria exige equipos que respondan bajo fuego continuo.",
    lead: "Soldadura. Corte. Potencia. Precisión.",
    statement: "Suministramos tecnología de arco y corte directo a faenas mineras, caldererías pesadas y frentes estructurales del sur peruano con disponibilidad inmediata.",
  },
  categorias: [
    {
      id: "maquinas-soldar",
      titulo: "SOLDADURA",
      subtitulo: "MIG/MAG · TIG · MMA · MULTIPROCESO",
      descripcion: "Fuentes de poder industriales para trabajo continuo, inversoras de alta estabilidad de arco y sistemas sinérgicos.",
      count: "18+ Modelos",
    },
    {
      id: "corte-plasma",
      titulo: "CORTE Y PLASMA",
      subtitulo: "CORTE MANUAL Y AUTOMATIZADO",
      descripcion: "Sistemas de corte de alta definición y precisión en aceros al carbono, inoxidables y aluminio hasta espesores severos.",
      count: "Modelos Especializados",
    },
    {
      id: "caretas-epp",
      titulo: "EPP Y SEGURIDAD",
      subtitulo: "CARETAS FOTOSENSIBLES · PAPR",
      descripcion: "Protección ocular y respiratoria de vanguardia. Línea Sentinel con claridad óptica 1/1/1/2 y confort ergonómico superior.",
      count: "Línea Premium",
    },
    {
      id: "antorchas-accesorios",
      titulo: "ANTORCHAS Y ACCESORIOS",
      subtitulo: "CONSUMIBLES · ALIMENTADORES · ANTORCHAS",
      descripcion: "Antorchas TIG/MIG refrigeradas por gas o agua, alimentadores de alambre robustos y consumibles de alta vida útil.",
      count: "Disponibilidad Inmediata",
    },
  ],
  modalidades: {
    venta: {
      titulo: "COMPRA DIRECTA",
      subtitulo: "Operación Permanente",
      descripcion: "Equipamiento nuevo con garantía directa de fábrica, soporte de consumibles originales y puesta en marcha técnica.",
      ventajas: [
        "Garantía oficial y trazabilidad de componentes",
        "Disponibilidad de repuestos críticos y consumibles",
        "Asesoría técnica en selección de parámetros de arco",
      ],
      cta: "CONSULTAR COMPRA",
    },
    alquiler: {
      titulo: "ALQUILER OPERATIVO",
      subtitulo: "Proyectos y Paradas de Planta",
      descripcion: "Flota de soldadura y corte disponible por día, semana o mes cerrado. Inicie operaciones sin descapitalizar su proyecto.",
      ventajas: [
        "Tarifas flexibles según la duración de la faena",
        "Equipos calibrados y probados antes de despacho",
        "Respaldo y sustitución para continuidad de faena",
      ],
      cta: "CONSULTAR DISPONIBILIDAD",
    },
  },
  marcas: {
    principal: "ESAB",
    tagline: "Líder global en equipos de soldadura y sistemas de corte industrial",
    descripcion: "MAQSYMA comercializa y distribuye tecnología ESAB en el sur peruano, brindando respaldo de gama industrial comprobada mundialmente.",
  },
  footer: {
    ctaHeading: "¿Listo para impulsar su operación industrial?",
    ctaBody: "Consulte especificaciones técnicas, disponibilidad y cotizaciones directas con nuestro equipo en Arequipa.",
    quoteButton: "HABLAR CON MAQSYMA",
    rights: "Todos los derechos reservados. Maquinaria, Sistemas y Materiales Avanzados.",
  },
};
