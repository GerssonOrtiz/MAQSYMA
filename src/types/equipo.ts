/**
 * Definición central de tipos de Productos y Equipos MAQSYMA 2.0
 * Compatible con máquinas de soldar, corte, caretas, consumibles y complementos.
 */

export type CategoriaPrincipal =
  | "maquinas-soldar"
  | "corte-plasma"
  | "caretas-epp"
  | "antorchas-accesorios"
  | "consumibles-repuestos"
  | "alquiler";

export type ProcesoSoldadura =
  | "MIG/MAG"
  | "TIG"
  | "MMA"
  | "Plasma"
  | "Multiproceso"
  | "Laser"
  | "Motosoldadora"
  | "General";

export type ProcesoFamilia = ProcesoSoldadura | "Accesorios";

export type EtiquetaDestacado = "mas_vendido" | "mejor_valorado" | "nuevo";

export interface EspecificacionesProducto {
  amperajeMax?: string;
  voltajeEntrada?: string;
  cicloTrabajo?: string;
  peso?: string;
  proceso?: string;
  tipoAlimentacion?: string;
  refrigeracion?: string;
  [key: string]: string | undefined;
}

export interface Producto {
  id: string;
  slug?: string;
  nombre: string;
  modelo: string;
  marca: string;
  familia?: ProcesoFamilia; // Compatibilidad con el schema y admin
  categoria?: CategoriaPrincipal;
  subcategoria?: string;
  proceso?: ProcesoSoldadura;
  descripcionCorta: string;
  descripcionLarga?: string;
  especificaciones?: EspecificacionesProducto;
  precioVenta?: number; // En Soles PEN. Si no existe o no está verificado, undefined -> "Consultar precio"
  precioAntesVenta?: number; // Precio anterior de referencia
  precioAlquiler?: number; // En Soles PEN
  unidadAlquiler?: "día" | "semana" | "mes";
  valoracion?: {
    promedio: number;
    resenasCount: number;
  };
  imagenUrl?: string;
  promocion?: string;
  disponibleVenta: boolean;
  disponibleAlquiler: boolean;
  activo: boolean;
  esDemo: boolean; // true si es dato simulado / de prueba
  posicion?: number;
}

/**
 * Alias retrocompatible para el código existente
 */
export type Equipo = Producto;
