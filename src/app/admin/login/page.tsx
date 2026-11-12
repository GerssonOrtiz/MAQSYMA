"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/brand/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Autenticación de demostración protegida y lista para Supabase Auth
    if (email === "admin@maqsyma.com" && password === "demo1234") {
      // Reemplazar localStorage por cookie que el middleware puede leer
      document.cookie = "maqsyma_admin_demo=1; path=/; max-age=86400; SameSite=Lax";
      router.push("/admin/productos");
      return;
    }

    // Si hay credenciales Supabase disponibles
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg("Credenciales incorrectas o usuario no registrado en Supabase Auth.");
      } else {
        router.push("/admin/productos");
      }
    } catch {
      setErrorMsg("Error de conexión al autenticar con el panel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[var(--color-carbon)]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] shadow-2xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Logo showText />
          <h1 className="text-xl font-bold font-['Montserrat',sans-serif] text-[var(--color-plata)] pt-2">
            Panel de Administración
          </h1>
          <p className="text-xs text-[var(--color-gris)]">
            Acceso exclusivo para gestión de catálogo e inventario ESAB
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded bg-red-950/50 border border-red-800/60 text-xs text-red-300">
            {errorMsg}
          </div>
        )}

        {/* Credenciales de prueba DEMO */}
        <div className="p-3 rounded bg-[var(--color-carbon)] border border-[var(--color-oro)]/30 text-xs font-mono text-[var(--color-oro-claro)]">
          <p className="font-bold">Acceso de prueba DEMO:</p>
          <p>Usuario: <span className="text-[var(--color-plata)]">admin@maqsyma.com</span></p>
          <p>Clave: <span className="text-[var(--color-plata)]">demo1234</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[var(--color-gris)] font-medium mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@maqsyma.com"
              className="w-full px-3.5 py-2.5 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:outline-none focus:border-[var(--color-oro)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[var(--color-gris)] font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:outline-none focus:border-[var(--color-oro)] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--color-oro-claro)] transition-colors duration-150 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}
