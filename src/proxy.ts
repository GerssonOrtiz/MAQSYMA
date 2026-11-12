import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Proxy de protección de rutas /admin (Next.js 16 — antes middleware.ts)
 * - Modo DEMO (sin Supabase): verifica cookie maqsyma_admin_demo=1
 * - Modo Supabase real: verifica sesión de auth
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // No proteger la ruta de login
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const isDemo = !supabaseUrl || supabaseUrl.includes("placeholder");

  if (isDemo) {
    // Modo DEMO: verificar cookie que establece login/page.tsx al autenticarse
    const demoCookie = request.cookies.get("maqsyma_admin_demo");
    if (!demoCookie || demoCookie.value !== "1") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

  // Modo Supabase real: verificar sesión activa
  try {
    const supabase = createServerClient(
      supabaseUrl,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
