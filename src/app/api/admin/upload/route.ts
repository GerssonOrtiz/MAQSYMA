import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: "Variables de entorno de Supabase no configuradas en el servidor" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Sanitizar nombre de archivo
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, "-")
      .replace(/-+/g, "-");
    const uniqueFileName = `${Date.now()}-${cleanFileName}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("productos")
      .upload(uniqueFileName, buffer, {
        contentType: file.type || "image/webp",
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("productos")
      .getPublicUrl(uniqueFileName);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error procesando la subida" }, { status: 500 });
  }
}
