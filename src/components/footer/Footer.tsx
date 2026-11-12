import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { copy } from "@/content/copy.es";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[var(--color-carbon)] border-t border-[var(--color-grafito-2)] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2 max-w-sm">
          <Logo showText />
          <p className="text-xs text-[var(--color-gris)] leading-relaxed">
            {copy.brand.legalName}. Equipos ESAB, venta y alquiler en Arequipa y el sur del Perú.
          </p>
        </div>

        <nav aria-label="Navegación del pie" className="flex flex-wrap gap-6 text-xs text-[var(--color-gris)]">
          <a href="#taller" className="hover:text-[var(--color-plata)] transition-colors">
            Taller
          </a>
          <a href="#mas-vendidos" className="hover:text-[var(--color-plata)] transition-colors">
            Más vendidos
          </a>
          <a href="#mejor-valorados" className="hover:text-[var(--color-plata)] transition-colors">
            Mejor valorados
          </a>
          <a href="#nuevos" className="hover:text-[var(--color-plata)] transition-colors">
            Nuevos
          </a>
          <a href="#contacto" className="hover:text-[var(--color-plata)] transition-colors">
            Contacto
          </a>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[var(--color-grafito-2)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--color-gris)]">
        <p>© {currentYear} {copy.brand.name}. {copy.footer.rights}</p>
        <span className="font-mono text-[10px] text-[var(--color-oro-oscuro)]">
          [ESAB AUTHORIZED DEALER PORTAL]
        </span>
      </div>
    </footer>
  );
};
