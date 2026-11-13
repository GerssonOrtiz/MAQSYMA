import { Equipo } from "@/types/equipo";
import { catalogoProductos } from "@/data/catalogoOficial";
import { createClient } from "@/lib/supabase/server";

export type SeccionTipo = "mas_vendidos" | "mejor_valorados" | "nuevos";

/**
 * Consulta de equipos destacados para la web pública (04-admin-y-datos):
 * - Intenta leer de Supabase (si las credenciales están configuradas).
 * - En caso de error o ausencia de backend conectado, devuelve el fallback
 *   con los datos marcados explícitamente como DEMO sin romper la web.
 */
export async function getSeccion(seccion: SeccionTipo): Promise<Equipo[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
      return getDemoFallback(seccion);
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("destacados")
      .select("posicion, productos!inner(*)")
      .eq("seccion", seccion)
      .eq("productos.activo", true)
      .order("posicion", { ascending: true })
      .limit(6);

    if (error || !data || data.length === 0) {
      return getDemoFallback(seccion);
    }

    return data.map((row: any) => {
      const p = row.productos;
      return {
        id: p.id,
        nombre: p.nombre,
        modelo: p.modelo || "",
        marca: "ESAB",
        familia: mapFamilia(p.familia),
        descripcionCorta: p.descripcion_corta || "",
        especificaciones: p.especificaciones || {},
        precioVenta: p.precio_venta ? Number(p.precio_venta) : undefined,
        precioAlquiler: p.precio_alquiler ? Number(p.precio_alquiler) : undefined,
        unidadAlquiler: p.unidad_alquiler,
        valoracion: p.valoracion ? { promedio: Number(p.valoracion), resenasCount: p.num_resenas } : undefined,
        imagenUrl: p.imagen_url,
        promocion: p.especificaciones?.promocion,
        precioAntesVenta: p.especificaciones?.precioAntesVenta,
        disponibleVenta: p.disponible_venta,
        disponibleAlquiler: p.disponible_alquiler,
        activo: p.activo,
        esDemo: p.es_demo,
        posicion: row.posicion,
      };
    });
  } catch (err) {
    return getDemoFallback(seccion);
  }
}

function getDemoFallback(seccion: SeccionTipo): Equipo[] {
  const lista: Equipo[] = catalogoProductos.map((p) => ({
    id: p.id,
    nombre: p.nombre,
    modelo: p.modelo,
    marca: p.marca || "ESAB",
    familia: (p.proceso === "MMA" ? "ELECTRODO" : p.proceso === "MIG/MAG" ? "MIG/MAG" : p.proceso === "TIG" ? "TIG" : "MULTIPROCESO") as any,
    descripcionCorta: p.descripcionCorta,
    especificaciones: (p.especificaciones as Record<string, string>) || {},
    precioVenta: p.precioVenta,
    precioAntesVenta: p.precioAntesVenta,
    precioAlquiler: p.precioAlquiler,
    unidadAlquiler: p.unidadAlquiler,
    imagenUrl: p.imagenUrl || undefined,
    disponibleVenta: p.disponibleVenta,
    disponibleAlquiler: p.disponibleAlquiler,
    activo: p.activo ?? true,
    esDemo: false,
  }));

  switch (seccion) {
    case "mas_vendidos":
      return lista.slice(0, 3);
    case "mejor_valorados":
      return lista.slice(3, 6);
    case "nuevos":
      return lista.slice(6, 9);
  }
}

function mapFamilia(raw: string): any {
  if (raw === "MIG_MAG") return "MIG/MAG";
  return raw;
}
