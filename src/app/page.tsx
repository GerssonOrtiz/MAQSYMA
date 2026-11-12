import React from "react";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { WorkshopExperience } from "@/components/scenes/WorkshopExperience";
import { PresentacionEquipos } from "@/components/presentacion/PresentacionEquipos";
import { Contacto } from "@/components/contact/Contacto";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { IntroScreen } from "@/components/intro/IntroScreen";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)]">

      {/* Pantalla de inicio con logo — solo se muestra en la primera carga de sesión */}
      <IntroScreen />

      {/* Barra de Navegación fija con blur y responsive */}
      <Nav />

      {/* Contenido principal */}
      <main className="flex-1 w-full">
        {/* Hero principal con llamada a WhatsApp y recorrido */}
        <Hero />

        {/* Recorrido por el taller técnico ESAB (Escenas con scroll suave) */}
        <WorkshopExperience />

        {/* Tres secciones de equipos: Más Vendidos, Mejor Valorados y Nuevos */}
        <PresentacionEquipos />

        {/* Llamada a contacto final */}
        <Contacto />
      </main>

      {/* Pie de página institucional */}
      <Footer />

      {/* Botón flotante accesible de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
