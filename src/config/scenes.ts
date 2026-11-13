import { Producto } from "@/types/equipo";

export type Scene = {
  id: string;
  label: string;          // etiqueta de cabecera
  title: string;          // titular industrial
  lead: string;           // frase de enganche
  process: string;        // proceso técnico correspondiente
  featuredSlugs: string[]; // slugs de equipos del catálogo oficial a presentar en esta escena
  image: {
    desktop: string;
    mobile: string;
    alt: string;
    placeholder: boolean;
  };
  cta: { label: string; message: string };
};

export const scenes: Scene[] = [
  // Escena 1: Entrada industrial con Equipos Destacados Insignia
  {
    id: "entrada",
    label: "Equipos Destacados",
    title: "Potencia de Alto Ciclo.",
    lead: "Equipamiento insignia ESAB para minería y montaje estructural con disponibilidad inmediata en Arequipa.",
    process: "Insignias Industriales",
    featuredSlugs: ["aristo-500ix", "fabricator-em-500i", "warrior-350i-mv-cccv"],
    image: {
      desktop: "/scenes/entrada.webp",
      mobile: "/scenes/entrada-m.webp",
      alt: "Línea insignia de soldadura Maqsyma",
      placeholder: false,
    },
    cta: {
      label: "Cotizar Equipos Insignia",
      message: "Hola MAQSYMA, deseo cotizar equipos destacados de alta potencia (Aristo/Fabricator/Warrior).",
    },
  },

  // Escena 2: Zona MIG/MAG con sus máquinas y alimentadores reales
  {
    id: "mig-mag",
    label: "Zona MIG/MAG",
    title: "Producción Continua.",
    lead: "Sistemas semiautomáticos para alambre sólido y tubular. Máxima tasa de deposición para calderería severa.",
    process: "MIG/MAG (GMAW / FCAW)",
    featuredSlugs: ["rustler-em-300i", "rustler-em-215i", "robust-feed-pro-basic"],
    image: {
      desktop: "/scenes/mig-mag.webp",
      mobile: "/scenes/mig-mag-m.webp",
      alt: "Zona de soldadura MIG/MAG",
      placeholder: false,
    },
    cta: {
      label: "Cotizar Sistemas MIG/MAG",
      message: "Hola MAQSYMA, deseo información y cotización de la línea MIG/MAG (Rustler y alimentadores Robust Feed).",
    },
  },

  // Escena 3: Zona TIG con inversores de alta frecuencia
  {
    id: "tig",
    label: "Zona TIG",
    title: "Precisión Milimétrica.",
    lead: "Control absoluto del arco con alta frecuencia pulsada para acero inoxidable, tuberías sanitarias y recipientes a presión.",
    process: "TIG (GTAW HF Pulsado)",
    featuredSlugs: ["renegade-et-300ip", "rogue-et-205ip", "rebel-emp-215ic"],
    image: {
      desktop: "/scenes/tig.webp",
      mobile: "/scenes/tig-m.webp",
      alt: "Zona de soldadura TIG de precisión",
      placeholder: true,
    },
    cta: {
      label: "Cotizar Fuentes TIG",
      message: "Hola MAQSYMA, deseo cotizar equipos TIG de alta frecuencia (Renegade ET / Rogue ET).",
    },
  },

  // Escena 4: Zona MMA con equipos celulósicos y portátiles de campo
  {
    id: "mma",
    label: "Zona Electrodo (MMA)",
    title: "Robustez en Campo.",
    lead: "Inversores blindados con dinámica de arco para electrodos celulósicos E6010 y bajo hidrógeno E7018 a la intemperie.",
    process: "SMAW (Electrodo Revestido)",
    featuredSlugs: ["renegade-es-300i", "rogue-es-201ip-pro", "renegade-volt-es200i"],
    image: {
      desktop: "/scenes/mma.webp",
      mobile: "/scenes/mma-m.webp",
      alt: "Zona de soldadura con electrodo revestido",
      placeholder: true,
    },
    cta: {
      label: "Cotizar Equipos MMA",
      message: "Hola MAQSYMA, deseo cotizar inversores para electrodo revestido (Rogue / Renegade / Batería Volt).",
    },
  },

  // Escena 5: Zona Corte Plasma y Protección EPP
  {
    id: "plasma-epp",
    label: "Corte y Protección",
    title: "Separación y Seguridad.",
    lead: "Sistemas de corte por plasma térmico limpio acompañados de caretas ópticas Sentinel con visión panorámica 1/1/1/1.",
    process: "Plasma Térmico & EPP",
    featuredSlugs: ["corte-plasma-industrial", "sentinel-a-60", "sentinel-a-60-havoc"],
    image: {
      desktop: "/scenes/plasma.webp",
      mobile: "/scenes/plasma-m.webp",
      alt: "Sistemas de corte plasma y caretas Sentinel",
      placeholder: true,
    },
    cta: {
      label: "Consultar Plasma y Sentinel",
      message: "Hola MAQSYMA, deseo información sobre sistemas Cutmaster y caretas fotosensibles Sentinel.",
    },
  },

  // Escena 6: Modalidad Alquiler Operativo
  {
    id: "alquiler",
    label: "Flota de Alquiler",
    title: "Disponibilidad Inmediata.",
    lead: "Equipos industriales calibrados listos para faenas mineras y paradas de planta por día, semana o mes.",
    process: "Alquiler Operativo",
    featuredSlugs: ["arc-601i", "smashweld-455-topflex", "ruffian-emp-270g-edw"],
    image: {
      desktop: "/scenes/alquiler.webp",
      mobile: "/scenes/alquiler-m.webp",
      alt: "Flota de alquiler para obras y minería",
      placeholder: true,
    },
    cta: {
      label: "Cotizar Flota de Alquiler",
      message: "Hola MAQSYMA, deseo consultar tarifas y disponibilidad de flota de alquiler de soldadura en Arequipa.",
    },
  },
];
