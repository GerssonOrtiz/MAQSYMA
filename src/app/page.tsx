import React from "react";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { TransicionNarrativa } from "@/components/home/TransicionNarrativa";
import { CategoriasExperiencia } from "@/components/home/CategoriasExperiencia";
import { ProductosDestacados } from "@/components/home/ProductosDestacados";
import { CatalogoExplorer } from "@/components/home/CatalogoExplorer";
import { SeccionVentaAlquiler } from "@/components/home/SeccionVentaAlquiler";
import { SeccionMarcas } from "@/components/home/SeccionMarcas";
import { WorkshopExperience } from "@/components/scenes/WorkshopExperience";
import { Contacto } from "@/components/contact/Contacto";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { IntroScreen } from "@/components/intro/IntroScreen";
import { catalogoProductos } from "@/data/catalogoOficial";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#08090b] text-[var(--color-plata)] flex flex-col justify-between selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)]">
      {/* Intro cinematográfico de entrada */}
      <IntroScreen />

      {/* Navegación premium minimalista */}
      <Nav />

      {/* Arquitectura Narrativa y Comercial MAQSYMA 2.0 */}
      <main className="flex-1 w-full">
        {/* 1. Hero Cinematográfico Industrial */}
        <Hero />

        {/* 2. Transición Narrativa Editorial */}
        <TransicionNarrativa />

        {/* 3. Composición Asimétrica de Productos Destacados */}
        <ProductosDestacados productos={catalogoProductos} />

        {/* 4. Sistema de Categorías */}
        <CategoriasExperiencia />

        {/* 5. Catálogo Industrial con Filtros Reales */}
        <CatalogoExplorer productos={catalogoProductos} />

        {/* 6. Sección Comercial: Compra y Alquiler */}
        <SeccionVentaAlquiler />

        {/* 7. Respaldo de Fabricante y Marcas */}
        <SeccionMarcas />

        {/* 8. Experiencia Inmersiva de Taller e Industria */}
        <WorkshopExperience />

        {/* 9. Contacto y Conversión Directa */}
        <Contacto />
      </main>

      {/* Footer Industrial Oficial */}
      <Footer />

      {/* Botón flotante WhatsApp contextual */}
      <FloatingWhatsApp />
    </div>
  );
}
