import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav/Nav";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { EquipoImagePlaceholder } from "@/components/presentacion/EquipoImagePlaceholder";
import { equiposDemo } from "@/data/equiposDemo";
import { whatsappProductLink } from "@/lib/whatsapp";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const todos = [
    ...equiposDemo.mas_vendido,
    ...equiposDemo.mejor_valorado,
    ...equiposDemo.nuevo,
  ];

  return todos.map((e) => ({
    slug: e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const todos = [
    ...equiposDemo.mas_vendido,
    ...equiposDemo.mejor_valorado,
    ...equiposDemo.nuevo,
  ];
  const equipo = todos.find((e) => e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug || e.id === slug) || todos[0];

  return {
    title: `${equipo.nombre} | ESAB en Venta y Alquiler - Maqsyma`,
    description: `${equipo.descripcionCorta} Venta y alquiler de soldadura ESAB en Arequipa.`,
    openGraph: {
      title: `${equipo.nombre} ESAB | Maqsyma`,
      description: equipo.descripcionCorta,
    },
  };
}

export default async function EquipoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const todos = [
    ...equiposDemo.mas_vendido,
    ...equiposDemo.mejor_valorado,
    ...equiposDemo.nuevo,
  ];

  const equipo = todos.find(
    (e) => e.modelo.toLowerCase().replace(/[^a-z0-9]/g, "-") === slug || e.id === slug
  ) || todos[0];

  if (!equipo) {
    notFound();
  }

  const whatsappHref = whatsappProductLink(
    equipo.nombre,
    equipo.modelo,
    Boolean(equipo.precioAlquiler && !equipo.precioVenta),
    equipo.unidadAlquiler
  );

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between">
      <Nav />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="mb-6">
          <Link
            href="/#equipos"
            className="text-xs text-[var(--color-gris)] hover:text-[var(--color-oro-claro)] transition-colors flex items-center gap-1.5"
          >
            ← Volver al catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Imagen / Placeholder del equipo */}
          <div className="aspect-[4/3] w-full rounded-2xl bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] overflow-hidden relative">
            <EquipoImagePlaceholder familia={equipo.familia} nombre={equipo.nombre} />
            {equipo.esDemo && (
              <span className="absolute top-4 right-4 px-2.5 py-1 rounded bg-[var(--color-carbon)]/90 border border-[var(--color-oro)]/40 font-mono text-[10px] text-[var(--color-oro-claro)]">
                DATOS DEMO
              </span>
            )}
          </div>

          {/* Información técnica y comercial */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-oro-claro)]">
                {equipo.marca} · {equipo.familia}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-['Montserrat',sans-serif] text-[var(--color-plata)]">
                {equipo.nombre}
              </h1>
              <p className="text-xs font-mono text-[var(--color-gris)]">
                Modelo: {equipo.modelo}
              </p>
            </div>

            <p className="text-base text-[var(--color-gris)] leading-relaxed">
              {equipo.descripcionCorta}
            </p>

            {/* Especificaciones técnicas */}
            {equipo.especificaciones && (
              <div className="p-4 rounded-xl bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] space-y-2.5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-oro-claro)]">
                  Ficha Técnica Resumida
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(equipo.especificaciones).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] text-[var(--color-gris)] uppercase">{key}:</span>
                      <span className="font-semibold text-[var(--color-plata)] font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Precios y opciones */}
            <div className="pt-2 border-t border-[var(--color-grafito-2)] space-y-2">
              {equipo.precioVenta && (
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[var(--color-gris)]">Precio de Venta:</span>
                  <span className="text-xl font-bold font-mono text-[var(--color-plata)]">
                    S/ {equipo.precioVenta.toLocaleString("es-PE")}
                  </span>
                </div>
              )}

              {equipo.precioAlquiler && (
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[var(--color-gris)]">Alquiler por {equipo.unidadAlquiler}:</span>
                  <span className="text-xl font-bold font-mono text-[var(--color-oro-claro)]">
                    S/ {equipo.precioAlquiler.toLocaleString("es-PE")}
                  </span>
                </div>
              )}
            </div>

            <div className="pt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 rounded-md bg-[var(--color-oro)] px-6 py-4 text-sm font-bold text-[var(--color-carbon)] hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95"
              >
                <span>Cotizar este equipo por WhatsApp</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
