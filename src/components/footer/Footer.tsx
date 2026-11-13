import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { copy } from "@/content/copy.es";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="nosotros" className="w-full bg-[#08090b] border-t border-[#1a1c24] py-14 px-6 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
        <div className="space-y-3 max-w-sm">
          <Logo showText />
          <p className="text-xs text-neutral-400 leading-relaxed">
            {copy.brand.legalName}. Equipamiento de soldadura, sistemas de corte, consumibles y caretas de protección en Arequipa y el sur del Perú.
          </p>
          <div className="pt-2 text-[11px] font-mono text-neutral-400">
            <div>📍 {copy.contact.addressDisplay}</div>
            <div>📞 WhatsApp: {copy.contact.phoneDisplay}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
          <div>
            <span className="font-mono text-neutral-300 font-semibold uppercase tracking-wider block mb-3">Navegación</span>
            <ul className="space-y-2">
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Catálogo</a></li>
              <li><a href="/#modalidades" className="hover:text-[var(--color-oro)] transition-colors">Venta & Alquiler</a></li>
              <li><a href="/#soluciones" className="hover:text-[var(--color-oro)] transition-colors">Soluciones</a></li>
              <li><a href="/#soporte" className="hover:text-[var(--color-oro)] transition-colors">Servicio Técnico</a></li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-neutral-300 font-semibold uppercase tracking-wider block mb-3">Líneas</span>
            <ul className="space-y-2">
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Máquinas de Soldar</a></li>
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Corte y Plasma</a></li>
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Caretas y EPP</a></li>
              <li><a href="/#modalidades" className="hover:text-[var(--color-oro)] transition-colors">Alquiler por Mes</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="font-mono text-neutral-300 font-semibold uppercase tracking-wider block mb-3">Administración</span>
            <p className="text-[11px] text-neutral-400 mb-3">Gestión de catálogo y publicaciones.</p>
            <Link
              href="/admin/login"
              className="inline-block px-3 py-1.5 rounded bg-[#13151d] hover:bg-[#1a1d28] border border-[#232736] text-[11px] font-mono text-neutral-300 hover:text-white transition-colors"
            >
              Acceso Privado →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#1a1c24] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-mono">
        <p>© {currentYear} {copy.brand.name}. {copy.footer.rights}</p>
        <span className="text-neutral-400">
          Arequipa, Perú · Soluciones Industriales
        </span>
      </div>
    </footer>
  );
};
