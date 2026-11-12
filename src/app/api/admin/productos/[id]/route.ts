import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ producto: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      destacadoSeccion,
    } = body;

    const supabase = getAdminClient();
    const familiaDb = familia === "MIG/MAG" ? "MIG_MAG" : familia;

    const specsCombinadas = {
      ...(especificaciones || {}),
      promocion: promocion || null,
      precioAntesVenta: precioAntesVenta ? Number(precioAntesVenta) : null,
    };

    const updatePayload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (nombre !== undefined) updatePayload.nombre = nombre;
    if (modelo !== undefined) updatePayload.modelo = modelo;
    if (familia !== undefined) updatePayload.familia = familiaDb;
    if (descripcionCorta !== undefined) updatePayload.descripcion_corta = descripcionCorta;
    if (especificaciones !== undefined || promocion !== undefined || precioAntesVenta !== undefined) {
      updatePayload.especificaciones = specsCombinadas;
    }
    if (imagenUrl !== undefined) updatePayload.imagen_url = imagenUrl;
    if (precioVenta !== undefined) updatePayload.precio_venta = precioVenta ? Number(precioVenta) : null;
    if (disponibleVenta !== undefined) updatePayload.disponible_venta = Boolean(disponibleVenta);
    if (precioAlquiler !== undefined) updatePayload.precio_alquiler = precioAlquiler ? Number(precioAlquiler) : null;
    if (unidadAlquiler !== undefined) updatePayload.unidad_alquiler = unidadAlquiler;
    if (disponibleAlquiler !== undefined) updatePayload.disponible_alquiler = Boolean(disponibleAlquiler);
    if (activo !== undefined) updatePayload.activo = Boolean(activo);

    const { data: producto, error: updateError } = await supabase
      .from("productos")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (destacadoSeccion) {
      // Limpiar asignación previa en esa sección y reasignar
      await supabase.from("destacados").delete().eq("producto_id", id);
      await supabase.from("destacados").insert({
        seccion: destacadoSeccion,
        producto_id: id,
        posicion: 1,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/productos");

    return NextResponse.json({ ok: true, producto });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = getAdminClient();

    // Eliminar referencias en destacados primero
    await supabase.from("destacados").delete().eq("producto_id", id);

    const { error } = await supabase.from("productos").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    revalidatePath("/");
    revalidatePath("/admin/productos");

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
