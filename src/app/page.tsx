import React from "react";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { WorkshopExperience } from "@/components/scenes/WorkshopExperience";
import { PresentacionEquipos } from "@/components/presentacion/PresentacionEquipos";
import { Contacto } from "@/components/contact/Contacto";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { copy } from "@/content/copy.es";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)]">
      {/* 1. Barra superior fija de TODOs y avisos de cliente */}
      <aside
        aria-label="Aviso de pendientes del cliente"
        className="w-full bg-[var(--color-grafito-2)] border-b border-[var(--color-oro)]/30 px-4 py-2 text-xs font-mono text-[var(--color-oro-claro)] flex flex-wrap items-center justify-between gap-2 z-50 relative"
      >
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-oro)] animate-pulse" />
          <span>
            <strong>[MODO DEMO - TODO VISIBLE]:</strong> {copy.contact.whatsappPendingClientNotice}
          </span>
        </div>
        <span className="text-[10px] text-[var(--color-gris)] uppercase tracking-wider">
          Etapa 3: Secciones y Componentes Completados
        </span>
      </aside>

      {/* 2. Barra de Navegación fija con blur y responsive */}
      <Nav />

      {/* 3. Hero principal con llamada a WhatsApp y recorrido */}
      <main className="flex-1 w-full">
        <Hero />

        {/* 4. Recorrido por el taller técnico ESAB (Escenas con scroll suave) */}
        <WorkshopExperience />

        {/* 5. Tres secciones de equipos: Más Vendidos, Mejor Valorados y Nuevos */}
        <PresentacionEquipos />

        {/* 6. Llamada a contacto final */}
        <Contacto />
      </main>

      {/* 7. Pie de página institucional */}
      <Footer />

      {/* 8. Botón flotante accesible de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
