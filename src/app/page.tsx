import React from "react";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { WorkshopExperience } from "@/components/scenes/WorkshopExperience";
import { CategoriasExperiencia } from "@/components/home/CategoriasExperiencia";
import { SeccionVentaAlquiler } from "@/components/home/SeccionVentaAlquiler";
import { SeccionMarcas } from "@/components/home/SeccionMarcas";
import { CatalogoExplorer } from "@/components/home/CatalogoExplorer";
import { Contacto } from "@/components/contact/Contacto";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { IntroScreen } from "@/components/intro/IntroScreen";
import { catalogoProductos } from "@/data/catalogoOficial";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)]">
      {/* Intro cinematográfico de bienvenida */}
      <IntroScreen />

      {/* Navegación premium fija */}
      <Nav />

      {/* Contenido Principal MAQSYMA 2.0 */}
      <main className="flex-1 w-full">
        {/* 1. Hero Cinematográfico en Pantalla Completa (GSAP loop) */}
        <Hero />

        {/* 2. Escenas Cinematográficas Diagonales con pausa al scrollear y equipos integrados */}
        <WorkshopExperience />

        {/* 3. Líneas y Categorías Industriales */}
        <CategoriasExperiencia />

        {/* 4. Modalidad Comercial: Compra y Alquiler */}
        <SeccionVentaAlquiler />

        {/* 5. Respaldo Oficial ESAB */}
        <SeccionMarcas />

        {/* 6. Catálogo Completo al Final con Búsqueda y Filtros Reales */}
        <CatalogoExplorer productos={catalogoProductos} />

        {/* 7. Canal de Atención y Conversión WhatsApp */}
        <Contacto />
      </main>

      {/* Footer Industrial */}
      <Footer />

      {/* Botón Flotante WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
