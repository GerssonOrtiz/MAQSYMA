/**
 * Definición de tipos de Equipos de Soldadura ESAB
 * (Sincronizado con 03-secciones-y-componentes y 04-admin-y-datos)
 */

export type ProcesoFamilia = "MIG/MAG" | "TIG" | "MMA" | "Plasma" | "Accesorios";

export type EtiquetaDestacado = "mas_vendido" | "mejor_valorado" | "nuevo";

export interface Equipo {
  id: string;
  nombre: string;
  modelo: string;
  marca: "ESAB";
  familia: ProcesoFamilia;
  descripcionCorta: string;
  descripcionLarga?: string;
  especificaciones?: {
    amperajeMax?: string;
    voltajeEntrada?: string;
    cicloTrabajo?: string;
    peso?: string;
  };
  precioVenta?: number; // en Soles S/
  precioAlquiler?: number; // en Soles S/
  unidadAlquiler?: "día" | "semana" | "mes";
  valoracion?: {
    promedio: number; // e.g. 4.9
    resenasCount: number; // e.g. 18
  };
  imagenUrl?: string;
  disponibleVenta: boolean;
  disponibleAlquiler: boolean;
  activo: boolean;
  esDemo: boolean; // Todo dato no confirmado por el cliente debe marcarse como DEMO
  posicion?: number;
}
