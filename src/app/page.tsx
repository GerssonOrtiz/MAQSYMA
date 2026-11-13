import React from "react";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { TransicionNarrativa } from "@/components/home/TransicionNarrativa";
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
      {/* Intro cinematográfico de entrada */}
      <IntroScreen />

      {/* Navegación premium industrial */}
      <Nav />

      {/* Arquitectura Unificada MAQSYMA 2.0: Escenas Cinematográficas + Equipos en Venta */}
      <main className="flex-1 w-full">
        {/* 1. Hero Cinematográfico Industrial con Video y Acceso Directo */}
        <Hero />

        {/* 2. Manifiesto Operativo / Transición Narrativa */}
        <TransicionNarrativa />

        {/* 3. Escenas Cinematográficas Diagonales Integradas con Equipos Reales por Proceso */}
        {/* Entrada = Equipos Insignia; Zonas MIG/MAG, TIG, MMA, Plasma/EPP y Alquiler con fotos reales */}
        <WorkshopExperience />

        {/* 4. Sistema de Exploración por Líneas y Categorías */}
        <CategoriasExperiencia />

        {/* 5. Modalidad Comercial: Compra y Alquiler Operativo */}
        <SeccionVentaAlquiler />

        {/* 6. Respaldo de Fabricante (ESAB Oficial) */}
        <SeccionMarcas />

        {/* 7. Catálogo Completo al Final con Buscador, Filtros y Fichas */}
        <CatalogoExplorer productos={catalogoProductos} />

        {/* 8. Canal de Atención y Conversión Oficial WhatsApp */}
        <Contacto />
      </main>

      {/* Footer Industrial Oficial */}
      <Footer />

      {/* Botón flotante WhatsApp contextual */}
      <FloatingWhatsApp />
    </div>
  );
}
