import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { EquipoImagePlaceholder } from "@/components/presentacion/EquipoImagePlaceholder";
import { catalogoProductos } from "@/data/catalogoOficial";
import { equiposDemo } from "@/data/equiposDemo";
import { whatsappProductLink } from "@/lib/whatsapp";
import type { Metadata } from "next";

function getTodosLosProductos() {
  const demos = [
    ...equiposDemo.mas_vendido,
    ...equiposDemo.mejor_valorado,
    ...equiposDemo.nuevo,
  ];

  return [...catalogoProductos, ...demos];
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
      title: "Producto no encontrado | MAQSYMA",
    };
  }

  return {
    title: `${producto.nombre} | Venta y Alquiler - MAQSYMA`,
    description: `${producto.descripcionCorta} Equipamiento industrial en Arequipa.`,
    openGraph: {
      title: `${producto.nombre} | MAQSYMA`,
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

  // Búsqueda estricta del producto por slug o ID
  const producto = todos.find(
    (e) => (e.slug && e.slug === slug) || e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug || e.id === slug
  );

  // Si no existe, mostrar 404 real
  if (!producto) {
    notFound();
  }

  const whatsappHref = whatsappProductLink(
    producto.nombre,
    producto.modelo,
    Boolean(producto.precioAlquiler && !producto.precioVenta),
    producto.unidadAlquiler
  );

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between">
      <Nav />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link
            href="/#productos"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-oro-claro)] hover:underline"
          >
            ← Volver al catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Imagen o Visualización Técnica */}
          <div className="rounded-2xl bg-gradient-to-b from-[#161822] to-[#10121a] border border-[#232737] p-8 flex items-center justify-center min-h-[380px] overflow-hidden shadow-2xl">
            {producto.imagenUrl ? (
              <img
                src={producto.imagenUrl}
                alt={producto.nombre}
                className="max-h-[340px] max-w-full object-contain"
              />
            ) : (
              <EquipoImagePlaceholder
                nombre={producto.nombre}
                familia={producto.proceso || "General"}
              />
            )}
          </div>

          {/* Información y Especificaciones */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#181a24] text-[11px] font-mono text-[var(--color-oro)] uppercase tracking-wider mb-2">
                <span>{producto.marca}</span>
                <span>•</span>
                <span>{producto.proceso || producto.categoria}</span>
              </div>
              <h1 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold text-white">
                {producto.nombre}
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">
                Modelo: {producto.modelo}
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              {producto.descripcionCorta}
            </p>

            {/* Precios y Disponibilidad */}
            <div className="p-5 rounded-xl bg-[#11131b] border border-[#202330] space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Precio Referencial</span>
                  {producto.precioVenta ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-mono font-bold text-white">
                        S/ {producto.precioVenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                      </span>
                      {producto.precioAntesVenta && (
                        <span className="text-sm font-mono text-neutral-400 line-through">
                          S/ {producto.precioAntesVenta.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-base font-semibold text-[var(--color-oro-claro)]">
                      Consultar precio comercial
                    </span>
                  )}
                </div>

                {producto.disponibleAlquiler && (
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase block">Modalidad Alquiler</span>
                    <span className="text-xs font-mono text-amber-300 font-semibold">Disponible por día/semana/mes</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] hover:brightness-110 active:scale-95 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] block transition-all shadow-lg shadow-[var(--color-oro)]/20"
                >
                  Cotizar disponibilidad y entrega inmediata →
                </a>
              </div>
            </div>

            {/* Ficha de Especificaciones Técnicas */}
            {producto.especificaciones && Object.keys(producto.especificaciones).length > 0 && (
              <div className="space-y-3">
                <h2 className="font-['Syne',sans-serif] text-base font-bold text-white">
                  Especificaciones Técnicas
                </h2>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  {Object.entries(producto.especificaciones).map(([clave, valor]) => {
                    if (!valor) return null;
                    return (
                      <div key={clave} className="p-3 rounded bg-[#101218] border border-[#1d202b]">
                        <span className="text-neutral-400 text-[10px] uppercase block mb-0.5">{clave}:</span>
                        <span className="font-semibold text-neutral-200">{valor}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
