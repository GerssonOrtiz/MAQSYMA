"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProcesoFamilia } from "@/types/equipo";

export default function AdminEditarProductoClient() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [familia, setFamilia] = useState<ProcesoFamilia>("MIG/MAG");
  const [descripcionCorta, setDescripcionCorta] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [precioAntesVenta, setPrecioAntesVenta] = useState("");
  const [promocion, setPromocion] = useState("");
  const [disponibleVenta, setDisponibleVenta] = useState(true);
  const [precioAlquiler, setPrecioAlquiler] = useState("");
  const [unidadAlquiler, setUnidadAlquiler] = useState<"día" | "semana" | "mes">("mes");
  const [disponibleAlquiler, setDisponibleAlquiler] = useState(false);
  const [destacadoSeccion, setDestacadoSeccion] = useState<string>("");
  const [activo, setActivo] = useState(true);

  // Cargar datos actuales del producto
  useEffect(() => {
    if (!id) return;
    const fetchProducto = async () => {
      try {
        const res = await fetch(`/api/admin/productos/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar el equipo");
        const data = await res.json();
        const p = data.producto;
        if (p) {
          setNombre(p.nombre || "");
          setModelo(p.modelo || "");
          setFamilia(p.familia === "MIG_MAG" ? "MIG/MAG" : p.familia);
          setDescripcionCorta(p.descripcion_corta || "");
          setImagenUrl(p.imagen_url || "");
          setPrecioVenta(p.precio_venta ? String(p.precio_venta) : "");
          setDisponibleVenta(Boolean(p.disponible_venta));
          setPrecioAlquiler(p.precio_alquiler ? String(p.precio_alquiler) : "");
          setUnidadAlquiler(p.unidad_alquiler || "mes");
          setDisponibleAlquiler(Boolean(p.disponible_alquiler));
          setActivo(Boolean(p.activo));
          if (p.especificaciones) {
            setPromocion(p.especificaciones.promocion || "");
            setPrecioAntesVenta(p.especificaciones.precioAntesVenta ? String(p.especificaciones.precioAntesVenta) : "");
          }
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Error al leer datos");
      } finally {
        setCargando(false);
      }
    };
    fetchProducto();
  }, [id]);

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
      const res = await fetch(`/api/admin/productos/${id}`, {
        method: "PUT",
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
        throw new Error(data.error || "Error actualizando el equipo");
      }

      router.push("/admin/productos");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar cambios");
    } finally {
      setGuardando(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`¿Está seguro de eliminar el equipo "${nombre}"?`)) return;
    setEliminando(true);

    try {
      const res = await fetch(`/api/admin/productos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("No se pudo eliminar");
      }

      router.push("/admin/productos");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Error eliminando el equipo");
    } finally {
      setEliminando(false);
    }
  };

  if (cargando) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-grafito)] min-h-screen text-[var(--color-gris)]">
        Cargando datos del equipo...
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[var(--color-grafito)] min-h-screen">
      <AdminHeader titulo={`Editar: ${nombre || "Equipo"}`} />

      <main className="flex-1 max-w-4xl w-full mx-auto p-6">
        <div className="bg-[var(--color-carbon)] rounded-2xl border border-[var(--color-grafito-2)] p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--color-grafito-2)] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[var(--color-plata)] font-['Montserrat',sans-serif]">
                Editar Equipo
              </h2>
              <p className="text-xs text-[var(--color-gris)]">
                Modifique la fotografía, precios, promociones o datos técnicos
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
                      Cambiar foto (subir archivo):
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
                      O pegar URL directa:
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
                  Nombre Comercial *
                </label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
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
                  Reasignar a Sección Destacada
                </label>
                <select
                  value={destacadoSeccion}
                  onChange={(e) => setDestacadoSeccion(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:border-[var(--color-oro)] focus:outline-none"
                >
                  <option value="">(Mantener actual / No cambiar)</option>
                  <option value="mas_vendidos">🔥 Más Vendidos</option>
                  <option value="mejor_valorados">⭐ Mejor Valorados</option>
                  <option value="nuevos">✨ Nuevos Modelos</option>
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
                      placeholder="Precio venta S/"
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
                  Publicar en la web (visible para clientes)
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-[var(--color-grafito-2)]">
              <button
                type="button"
                onClick={handleDelete}
                disabled={eliminando}
                className="px-4 py-2.5 rounded bg-red-950/40 border border-red-500/40 text-red-400 font-medium hover:bg-red-900/50 transition-colors"
              >
                {eliminando ? "Eliminando..." : "Eliminar Equipo"}
              </button>

              <div className="flex items-center gap-3">
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
                  {guardando ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
