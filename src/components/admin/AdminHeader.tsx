import React from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

interface AdminHeaderProps {
  titulo: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ titulo }) => {
  return (
    <header className="w-full bg-[var(--color-carbon)] border-b border-[var(--color-grafito-2)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-6">
        <Link href="/" target="_blank" title="Ver sitio público">
          <Logo showText />
        </Link>
        <span className="text-[var(--color-grafito-2)]">|</span>
        <h1 className="text-base font-bold text-[var(--color-plata)] font-['Montserrat',sans-serif]">
          {titulo}
        </h1>
      </div>

      <nav className="flex items-center gap-6 text-xs font-medium">
        <Link
          href="/admin/productos"
          className="text-[var(--color-plata)] hover:text-[var(--color-oro)] transition-colors"
        >
          Equipos
        </Link>
        <Link
          href="/admin/rankings"
          className="text-[var(--color-gris)] hover:text-[var(--color-oro)] transition-colors"
        >
          Rankings
        </Link>
        <Link
          href="/admin/login"
          className="text-red-400 hover:text-red-300 transition-colors ml-4"
        >
          Cerrar Sesión
        </Link>
      </nav>
    </header>
  );
};
