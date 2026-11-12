export type Scene = {
  id: string;
  label: string;          // etiqueta pequeña, ej. "Zona MIG/MAG"
  title: string;          // titular de la escena
  text: string;           // una o dos frases
  process: string;        // proceso técnico correspondiente
  image: {
    desktop: string;      // ruta en /public/scenes/...
    mobile: string;       // versión ligera
    alt: string;
    placeholder: boolean; // true mientras no haya foto real
  };
  cta?: { label: string; message: string };
};

export const scenes: Scene[] = [
  {
    id: "entrada",
    label: "Entrada",
    title: "Bienvenido a Maqsyma.",
    text: "Equipos de soldadura ESAB para venta y alquiler en Arequipa.",
    process: "Recepción Técnica",
    image: {
      desktop: "/scenes/entrada.webp",
      mobile: "/scenes/entrada-m.webp",
      alt: "Entrada del taller Maqsyma",
      placeholder: false,
    },
  },
  {
    id: "mig-mag",
    label: "Zona MIG/MAG",
    title: "Producción continua.",
    text: "Soldadura de alta productividad para series largas y calderería pesada.",
    process: "MIG/MAG (GMAW/FCAW)",
    image: {
      desktop: "/scenes/mig-mag.webp",
      mobile: "/scenes/mig-mag-m.webp",
      alt: "Zona de soldadura MIG/MAG",
      placeholder: false,
    },
    cta: {
      label: "Cotizar equipos MIG/MAG",
      message: "Hola Maqsyma, deseo información y cotización de equipos MIG/MAG ESAB.",
    },
  },
  {
    id: "tig",
    label: "Zona TIG",
    title: "Precisión extrema.",
    text: "Arco de alta frecuencia para acero inoxidable, aluminio y trabajos finos.",
    process: "TIG (GTAW Alta Frecuencia)",
    image: {
      desktop: "/scenes/tig.webp",
      mobile: "/scenes/tig-m.webp",
      alt: "Zona de soldadura TIG",
      placeholder: true,
    },
    cta: {
      label: "Cotizar equipos TIG",
      message: "Hola Maqsyma, deseo información sobre equipos TIG ESAB de alta precisión.",
    },
  },
  {
    id: "mma",
    label: "Zona MMA",
    title: "Robustez total.",
    text: "Rendimiento confiable para campo, minería y mantenimiento a la intemperie.",
    process: "Electrodo Revestido (SMAW)",
    image: {
      desktop: "/scenes/mma.webp",
      mobile: "/scenes/mma-m.webp",
      alt: "Zona de soldadura MMA",
      placeholder: true,
    },
    cta: {
      label: "Cotizar equipos MMA",
      message: "Hola Maqsyma, deseo consultar equipos MMA/Electrodo ESAB para trabajo pesado.",
    },
  },
  {
    id: "plasma",
    label: "Zona Plasma",
    title: "Corte térmico limpio.",
    text: "Velocidad y precisión milimétrica en corte de planchas metálicas.",
    process: "Corte por Plasma",
    image: {
      desktop: "/scenes/plasma.webp",
      mobile: "/scenes/plasma-m.webp",
      alt: "Zona de corte por plasma",
      placeholder: true,
    },
    cta: {
      label: "Consultar sistemas de corte",
      message: "Hola Maqsyma, deseo cotizar equipos de corte por plasma ESAB.",
    },
  },
  {
    id: "alquiler",
    label: "Flota de Alquiler",
    title: "Listos para su obra.",
    text: "Equipos certificados disponibles para entrega inmediata por día, semana o mes.",
    process: "Alquiler Operativo",
    image: {
      desktop: "/scenes/alquiler.webp",
      mobile: "/scenes/alquiler-m.webp",
      alt: "Flota de alquiler de soldadura ESAB lista para entrega",
      placeholder: true,
    },
    cta: {
      label: "Consultar alquiler de flota",
      message: "Hola Maqsyma, quisiera cotizar el alquiler de equipos ESAB para obra.",
    },
  },
];
