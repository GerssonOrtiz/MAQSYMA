import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { EquipoImagePlaceholder } from "@/components/presentacion/EquipoImagePlaceholder";
import { catalogoProductos } from "@/data/catalogoOficial";
import { whatsappProductLink } from "@/lib/whatsapp";
import type { Metadata } from "next";

function getTodosLosProductos() {
  // MAQSYMA 2.0: Solo catálogo oficial documentado, sin datos DEMO
  return catalogoProductos;
}

export async function generateStaticParams() {
  const todos = getTodosLosProductos();

  return todos.map((e) => ({
    slug: e.slug || e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const todos = getTodosLosProductos();

  const producto = todos.find(
    (e) => (e.slug && e.slug === slug) || e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug || e.id === slug
  );

  if (!producto) {
    return {
      title: "Equipo no encontrado | MAQSYMA",
    };
  }

  return {
    title: `${producto.nombre} — Especificaciones y Cotización | MAQSYMA`,
    description: `${producto.descripcionCorta} Venta y alquiler en Arequipa y el sur peruano.`,
    openGraph: {
      title: `${producto.nombre} | MAQSYMA 2.0`,
      description: producto.descripcionCorta,
    },
  };
}

export default async function EquipoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const todos = getTodosLosProductos();

  const producto = todos.find(
    (e) => (e.slug && e.slug === slug) || e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug || e.id === slug
  );

  if (!producto) {
    notFound();
  }

  const whatsappHref = whatsappProductLink(
    producto.nombre,
    producto.modelo,
    Boolean(producto.disponibleAlquiler && !producto.precioVenta),
    producto.unidadAlquiler
  );

  // Equipos relacionados de la misma categoría o proceso
  const relacionados = todos
    .filter((e) => e.id !== producto.id && (e.categoria === producto.categoria || e.proceso === producto.proceso))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#08090b] text-[var(--color-plata)] flex flex-col justify-between selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)]">
      <Nav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-36 pb-24">
        {/* Breadcrumb Técnico */}
        <div className="mb-8 flex items-center gap-3 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">MAQSYMA</Link>
          <span>/</span>
          <Link href="/#productos" className="hover:text-white transition-colors">CATÁLOGO</Link>
          <span>/</span>
          <span className="text-[var(--color-oro)] uppercase">{producto.marca}</span>
          <span>/</span>
          <span className="text-neutral-300">{producto.modelo}</span>
        </div>

        {/* Ficha Editorial de Producto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Bloque Visual Principal con Spotlight Industrial */}
          <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#141824] via-[#0f1118] to-[#090b10] border border-[#272d40] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[460px] relative overflow-hidden shadow-2xl">
            {/* Halo radial de iluminación central para despegar el equipo de fondo */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14)_0%,rgba(245,158,11,0.08)_40%,transparent_75%)] pointer-events-none" />

            {/* Badges Técnicos Superpuestos */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2.5 z-10">
              <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider shadow-lg">
                {producto.marca} OFICIAL
              </span>
              {producto.disponibleAlquiler && (
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  DISPONIBLE EN ALQUILER
                </span>
              )}
            </div>

            {producto.imagenUrl ? (
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                className="max-h-[400px] max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] drop-shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-transform duration-300 hover:scale-105 z-10"
              />
            ) : (
              <div className="py-12 w-full flex flex-col items-center z-10">
                <EquipoImagePlaceholder
                  nombre={producto.nombre}
                  familia={producto.proceso || "General"}
                />
              </div>
            )}
          </div>

          {/* Información Técnica y Conversión */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-2">
                <span className="text-[var(--color-oro)] font-bold">{producto.marca}</span>
                <span>•</span>
                <span className="uppercase">{producto.proceso || producto.categoria}</span>
                {producto.subcategoria && (
                  <>
                    <span>•</span>
                    <span>{producto.subcategoria}</span>
                  </>
                )}
              </div>

              <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {producto.nombre}
              </h1>

              <div className="font-mono text-xs text-neutral-400 mt-2">
                REF / MODELO: <span className="text-white font-semibold">{producto.modelo}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              {producto.descripcionCorta}
            </p>

            {/* Panel Comercial de Adquisición */}
            <div className="p-6 rounded-xl bg-[#11131b] border border-[#222636] space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                    CONDICIÓN COMERCIAL
                  </span>
                  {producto.precioVenta ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-mono font-bold text-white">
                        S/ {producto.precioVenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                      </span>
                      {producto.precioAntesVenta && (
                        <span className="text-sm font-mono text-neutral-400 line-through">
                          S/ {producto.precioAntesVenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-lg font-['Syne',sans-serif] font-bold text-[var(--color-oro-claro)]">
                      Consultar Cotización
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                    ENTREGA Y STOCK
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 justify-end">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Local Arequipa
                  </span>
                </div>
              </div>

              {/* Botón WhatsApp de Alta Conversión */}
              <div className="pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] block transition-all shadow-xl shadow-[var(--color-oro)]/20"
                >
                  CONSULTAR DISPONIBILIDAD Y COTIZACIÓN →
                </a>
              </div>
            </div>

            {/* Especificaciones Técnicas Detalladas */}
            {producto.especificaciones && Object.keys(producto.especificaciones).length > 0 && (
              <div className="space-y-4">
                <h2 className="font-['Syne',sans-serif] text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)]" />
                  Especificaciones del Fabricante
                </h2>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  {Object.entries(producto.especificaciones).map(([clave, valor]) => {
                    if (!valor) return null;
                    return (
                      <div key={clave} className="p-3.5 rounded bg-[#0d0f15] border border-[#1c1f2b]">
                        <span className="text-neutral-400 text-[10px] uppercase block mb-1">{clave}</span>
                        <span className="font-bold text-neutral-200">{valor}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Módulo de Equipos Relacionados */}
        {relacionados.length > 0 && (
          <div className="pt-16 border-t border-[#181a24]">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-oro)] block mb-1">
                  CONFIGURACIONES COMPATIBLES
                </span>
                <h3 className="font-['Syne',sans-serif] text-2xl font-bold text-white">
                  Equipos Relacionados
                </h3>
              </div>
              <Link href="/#productos" className="text-xs font-mono text-neutral-400 hover:text-white transition-colors">
                Ver catálogo completo →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relacionados.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/equipos/${rel.slug}`}
                  className="rounded-2xl bg-[#0f1118] border border-[#202535] hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-bold text-amber-400 uppercase">
                        {rel.marca}
                      </span>
                      <span className="text-neutral-400 text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5">{rel.proceso}</span>
                    </div>

                    {rel.imagenUrl && (
                      <div className="relative w-full h-44 my-3 rounded-xl bg-gradient-to-b from-[#161a25] to-[#0a0c10] border border-[#232737] group-hover:border-amber-500/30 flex items-center justify-center p-3 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                        <img
                          src={rel.imagenUrl}
                          alt={rel.nombre}
                          className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-300 z-10"
                        />
                      </div>
                    )}

                    <h4 className="font-['Syne',sans-serif] text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                      {rel.nombre}
                    </h4>
                    <p className="text-xs text-neutral-300 line-clamp-2 font-normal leading-relaxed">
                      {rel.descripcionCorta}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/10 text-xs font-mono font-bold text-amber-400 flex justify-between items-center group-hover:text-amber-300">
                    <span>Ver ficha técnica</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
