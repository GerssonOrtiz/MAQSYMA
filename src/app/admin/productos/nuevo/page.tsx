"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProcesoFamilia } from "@/types/equipo";

export default function AdminNuevoProductoPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [familia, setFamilia] = useState<ProcesoFamilia>("MIG/MAG");
  const [descripcionCorta, setDescripcionCorta] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [precioAntesVenta, setPrecioAntesVenta] = useState("");
  const [promocion, setPromocion] = useState("");
  const [disponibleVenta, setDisponibleVenta] = useState(true);
  const [precioAlquiler, setPrecioAlquiler] = useState("");
  const [unidadAlquiler, setUnidadAlquiler] = useState<"día" | "semana" | "mes">("mes");
  const [disponibleAlquiler, setDisponibleAlquiler] = useState(false);
  const [destacadoSeccion, setDestacadoSeccion] = useState<string>("mas_vendidos");
  const [activo, setActivo] = useState(true);

  // Gestión de imagen
  const [imagenUrl, setImagenUrl] = useState("");
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubiendoImagen(true);
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      setImagenUrl(data.url);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al subir la foto");
    } finally {
      setSubiendoImagen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          modelo,
          familia,
          descripcionCorta,
          precioVenta: precioVenta ? Number(precioVenta) : null,
          precioAntesVenta: precioAntesVenta ? Number(precioAntesVenta) : null,
          promocion: promocion.trim() || null,
          disponibleVenta,
          precioAlquiler: precioAlquiler ? Number(precioAlquiler) : null,
          unidadAlquiler,
          disponibleAlquiler,
          imagenUrl: imagenUrl.trim() || null,
          activo,
          destacadoSeccion: destacadoSeccion || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "No se pudo registrar el equipo");
      }

      router.push("/admin/productos");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Error guardando el equipo");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)] min-h-screen">
      <AdminHeader titulo="Nuevo Equipo ESAB" />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <div className="bg-[var(--color-carbon)] rounded-2xl border border-[var(--color-grafito-2)] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-grafito-2)] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-plata)] font-['Montserrat',sans-serif]">
                Registrar Nuevo Equipo
              </h2>
              <p className="text-xs text-[var(--color-gris)]">
                Agregue un equipo con foto, precios y promociones para publicarlo en la web.
              </p>
            </div>
            <Link
              href="/admin/productos"
              className="text-xs text-[var(--color-gris)] hover:text-[var(--color-plata)]"
            >
              ← Volver al listado
            </Link>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-lg bg-red-950/50 border border-red-500/50 text-red-300 text-xs">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Foto del Equipo */}
            <div className="p-4 rounded-xl bg-[var(--color-grafito)]/60 border border-[var(--color-grafito-2)] space-y-3">
              <label className="block text-[var(--color-oro-claro)] font-bold uppercase tracking-wider text-[11px]">
                Fotografía del Equipo
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Preview de la imagen */}
                <div className="relative w-36 h-36 rounded-lg bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] flex items-center justify-center overflow-hidden shrink-0">
                  {imagenUrl ? (
                    <Image
                      src={imagenUrl}
                      alt="Vista previa"
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <span className="text-[var(--color-gris)] text-[11px] text-center px-2">
                      Sin foto seleccionada
                    </span>
                  )}
                  {subiendoImagen && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-xs text-[var(--color-oro)] font-bold">
                      Subiendo...
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div>
                    <label className="block text-[var(--color-plata)] mb-1 font-medium">
                      Subir archivo desde su equipo:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={subiendoImagen}
                      className="block w-full text-xs text-[var(--color-gris)] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[var(--color-oro)] file:text-[var(--color-carbon)] hover:file:bg-[var(--color-oro-claro)] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[var(--color-gris)] mb-1">
                      O pegar URL directa de la imagen:
                    </label>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/soldadora.webp"
                      value={imagenUrl}
                      onChange={(e) => setImagenUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] font-mono text-xs focus:border-[var(--color-oro)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Datos básicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Nombre Comercial del Equipo *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Warrior 500i CC/CV"
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Modelo Técnico *
                </label>
                <input
                  type="text"
                  required
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Ej. WARRIOR-500I"
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Familia de Proceso ESAB *
                </label>
                <select
                  value={familia}
                  onChange={(e) => setFamilia(e.target.value as ProcesoFamilia)}
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                >
                  <option value="MIG/MAG">MIG/MAG</option>
                  <option value="TIG">TIG</option>
                  <option value="MMA">MMA</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--color-gris)] font-medium mb-1">
                  Sección Destacada en la Portada
                </label>
                <select
                  value={destacadoSeccion}
                  onChange={(e) => setDestacadoSeccion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                >
                  <option value="mas_vendidos">🔥 Más Vendidos</option>
                  <option value="mejor_valorados">⭐ Mejor Valorados</option>
                  <option value="nuevos">✨ Nuevos Modelos</option>
                  <option value="">(No destacar en portada)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[var(--color-gris)] font-medium mb-1">
                Descripción Corta (máx. 120 caracteres) *
              </label>
              <textarea
                required
                maxLength={120}
                rows={2}
                value={descripcionCorta}
                onChange={(e) => setDescripcionCorta(e.target.value)}
                placeholder="Resumen del equipo para la tarjeta..."
                className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
              />
            </div>

            {/* Promociones y Precios */}
            <div className="p-4 rounded-xl bg-[var(--color-grafito)]/60 border border-[var(--color-grafito-2)] space-y-4">
              <h3 className="font-bold text-[var(--color-oro-claro)] uppercase tracking-wider text-[11px]">
                Precios y Promociones
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--color-gris)] font-medium mb-1">
                    Etiqueta de Promoción / Oferta (opcional)
                  </label>
                  <input
                    type="text"
                    value={promocion}
                    onChange={(e) => setPromocion(e.target.value)}
                    placeholder="Ej. 15% OFF, Incluye antorcha, etc."
                    className="w-full px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-oro-claro)] font-bold placeholder:font-normal placeholder:text-[var(--color-gris)]"
                  />
                </div>

                <div>
                  <label className="block text-[var(--color-gris)] font-medium mb-1">
                    Precio Anterior de Referencia (S/)
                  </label>
                  <input
                    type="number"
                    value={precioAntesVenta}
                    onChange={(e) => setPrecioAntesVenta(e.target.value)}
                    placeholder="Para mostrar precio tachado si hay descuento"
                    className="w-full px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-gris)] font-mono line-through"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--color-grafito-2)]">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={disponibleVenta}
                      onChange={(e) => setDisponibleVenta(e.target.checked)}
                    />
                    <span className="font-medium text-[var(--color-plata)]">Disponible para Venta</span>
                  </label>
                  {disponibleVenta && (
                    <input
                      type="number"
                      required
                      placeholder="Precio de venta en S/"
                      value={precioVenta}
                      onChange={(e) => setPrecioVenta(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] font-mono font-bold"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={disponibleAlquiler}
                      onChange={(e) => setDisponibleAlquiler(e.target.checked)}
                    />
                    <span className="font-medium text-[var(--color-plata)]">Disponible para Alquiler</span>
                  </label>
                  {disponibleAlquiler && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        required
                        placeholder="Tarifa alquiler S/"
                        value={precioAlquiler}
                        onChange={(e) => setPrecioAlquiler(e.target.value)}
                        className="w-2/3 px-3 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] font-mono"
                      />
                      <select
                        value={unidadAlquiler}
                        onChange={(e) => setUnidadAlquiler(e.target.value as any)}
                        className="w-1/3 px-2 py-2 rounded bg-[var(--color-carbon)] border border-[var(--color-grafito-2)] text-[var(--color-plata)]"
                      >
                        <option value="día">por día</option>
                        <option value="semana">por semana</option>
                        <option value="mes">por mes</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activo}
                  onChange={(e) => setActivo(e.target.checked)}
                  className="rounded border-[var(--color-grafito-2)] text-[var(--color-oro)] focus:ring-[var(--color-oro)]"
                />
                <span className="text-[var(--color-plata)] font-medium">
                  Publicar de inmediato (visible para clientes en la web)
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--color-grafito-2)]">
              <Link
                href="/admin/productos"
                className="px-4 py-2.5 rounded bg-[var(--color-grafito)] text-[var(--color-gris)] hover:text-[var(--color-plata)]"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={guardando || subiendoImagen}
                className="px-6 py-2.5 rounded bg-[var(--color-oro)] text-[var(--color-carbon)] font-bold hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95 disabled:opacity-50"
              >
                {guardando ? "Guardando equipo..." : "Guardar y Publicar Equipo"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
