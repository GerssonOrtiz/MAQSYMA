import React from "react";
import { Nav } from "@/components/nav/Nav";
import { Hero } from "@/components/hero/Hero";
import { AccesoCategorias } from "@/components/catalogo/AccesoCategorias";
import { CatalogoExplorer } from "@/components/catalogo/CatalogoExplorer";
import { ModalidadesVentaAlquiler } from "@/components/secciones/ModalidadesVentaAlquiler";
import { SolucionesAplicacion } from "@/components/secciones/SolucionesAplicacion";
import { SoporteTecnico } from "@/components/secciones/SoporteTecnico";
import { WorkshopExperience } from "@/components/scenes/WorkshopExperience";
import { Contacto } from "@/components/contact/Contacto";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsApp } from "@/components/floating/FloatingWhatsApp";
import { IntroScreen } from "@/components/intro/IntroScreen";
import { catalogoProductos } from "@/data/catalogoOficial";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between selection:bg-[var(--color-oro)] selection:text-[var(--color-carbon)]">
      {/* Pantalla de bienvenida con logo al abrir sesión */}
      <IntroScreen />

      {/* Barra de navegación superior fija */}
      <Nav />

      {/* Contenido principal de MAQSYMA 2.0 */}
      <main className="flex-1 w-full">
        {/* 1. Hero industrial cinematográfico */}
        <Hero />

        {/* 2. Acceso directo a líneas de producto */}
        <AccesoCategorias />

        {/* 3. Catálogo interactivo con filtros reales y búsqueda */}
        <CatalogoExplorer productos={catalogoProductos} />

        {/* 4. Modalidades de negocio: Venta y Alquiler */}
        <ModalidadesVentaAlquiler />

        {/* 5. Soluciones aplicadas por sector industrial */}
        <SolucionesAplicacion />

        {/* 6. Soporte técnico y asesoría */}
        <SoporteTecnico />

        {/* 7. Recorrido visual del taller industrial */}
        <WorkshopExperience />

        {/* 8. Contacto directo y canal de atención */}
        <Contacto />
      </main>

      {/* Footer comercial */}
      <Footer />

      {/* Botón flotante oficial de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
