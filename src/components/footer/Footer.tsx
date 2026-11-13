import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { copy } from "@/content/copy.es";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="nosotros" className="w-full bg-[#060709] border-t border-[#181a24] py-16 px-6 text-neutral-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        <div className="space-y-4 max-w-sm">
          <Logo showText={false} />
          <p className="text-xs text-neutral-400 leading-relaxed font-light">
            {copy.brand.legalName}. Equipamiento de soldadura, sistemas de corte plasma, caretas fotosensibles y consumibles industriales en Arequipa y el sur peruano.
          </p>
          <div className="pt-2 text-xs font-mono text-neutral-400 space-y-1">
            <div>📍 {copy.contact.addressDisplay}</div>
            <div>📞 WhatsApp: {copy.contact.phoneDisplay}</div>
          </div>
        </div>

        {/* Navegación limpia sin 'Servicio Técnico' */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs font-mono">
          <div>
            <span className="text-white font-bold uppercase tracking-wider block mb-4">
              NAVEGACIÓN
            </span>
            <ul className="space-y-2.5">
              <li><a href="/#destacados" className="hover:text-[var(--color-oro)] transition-colors">Destacados</a></li>
              <li><a href="/#categorias" className="hover:text-[var(--color-oro)] transition-colors">Categorías</a></li>
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Productos</a></li>
              <li><a href="/#modalidades" className="hover:text-[var(--color-oro)] transition-colors">Venta y Alquiler</a></li>
              <li><a href="/#marcas" className="hover:text-[var(--color-oro)] transition-colors">Marcas</a></li>
              <li><a href="/#contacto" className="hover:text-[var(--color-oro)] transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-bold uppercase tracking-wider block mb-4">
              LÍNEAS
            </span>
            <ul className="space-y-2.5">
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Máquinas de Soldar</a></li>
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Corte y Plasma</a></li>
              <li><a href="/#productos" className="hover:text-[var(--color-oro)] transition-colors">Caretas y EPP</a></li>
              <li><a href="/#modalidades" className="hover:text-[var(--color-oro)] transition-colors">Flota de Alquiler</a></li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-white font-bold uppercase tracking-wider block mb-4">
              ADMINISTRACIÓN
            </span>
            <p className="text-[11px] text-neutral-400 mb-4 leading-relaxed">
              Panel interno para actualización de catálogo y estado operativo.
            </p>
            <Link
              href="/admin/login"
              className="inline-block px-3 py-2 rounded bg-[#11131b] hover:bg-[#181c28] border border-[#222738] text-[11px] text-neutral-300 hover:text-white transition-colors"
            >
              PORTAL ADMIN →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-[#151720] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
        <p>© {currentYear} {copy.brand.name} 2.0. {copy.footer.rights}</p>
        <span>
          Arequipa · Perú // Operaciones Industriales
        </span>
      </div>
    </footer>
  );
};
