import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ productos: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      nombre,
      modelo,
      familia,
      descripcionCorta,
      precioVenta,
      disponibleVenta,
      precioAlquiler,
      unidadAlquiler,
      disponibleAlquiler,
      imagenUrl,
      promocion,
      precioAntesVenta,
      especificaciones,
      activo,
      destacadoSeccion, // 'mas_vendidos' | 'mejor_valorados' | 'nuevos'
    } = body;

    if (!nombre) {
      return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });
    }

    const slug = nombre
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const supabase = getAdminClient();

    const familiaDb = familia === "MIG/MAG" ? "MIG_MAG" : familia;

    const specsCombinadas = {
      ...(especificaciones || {}),
      promocion: promocion || null,
      precioAntesVenta: precioAntesVenta ? Number(precioAntesVenta) : null,
    };

    const { data: producto, error: insertError } = await supabase
      .from("productos")
      .insert({
        nombre,
        slug,
        modelo: modelo || nombre,
        marca: "ESAB",
        familia: familiaDb,
        descripcion_corta: descripcionCorta || "",
        especificaciones: specsCombinadas,
        imagen_url: imagenUrl || null,
        precio_venta: precioVenta ? Number(precioVenta) : null,
        disponible_venta: Boolean(disponibleVenta),
        precio_alquiler: precioAlquiler ? Number(precioAlquiler) : null,
        unidad_alquiler: unidadAlquiler || "mes",
        disponible_alquiler: Boolean(disponibleAlquiler),
        activo: activo !== undefined ? Boolean(activo) : true,
        es_demo: false,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Si se seleccionó una sección destacada, agregarlo a 'destacados'
    if (destacadoSeccion && producto) {
      await supabase.from("destacados").insert({
        seccion: destacadoSeccion,
        producto_id: producto.id,
        posicion: 1,
      });
    }

    // Revalidar caché instantáneamente en Next.js
    revalidatePath("/");
    revalidatePath("/admin/productos");

    return NextResponse.json({ ok: true, producto });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
