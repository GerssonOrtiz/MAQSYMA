import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { whatsappLink } from "@/lib/whatsapp";
import { copy } from "@/content/copy.es";

export const metadata: Metadata = {
  title: "Página no encontrada | MAQSYMA",
  description: "La página que busca no existe. Explore nuestro catálogo de equipos ESAB o contáctenos por WhatsApp.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  const whatsappHref = whatsappLink("Hola Maqsyma, estuve buscando un equipo en su web y requiero asistencia.");

  return (
    <div className="min-h-screen bg-[var(--color-carbon)] text-[var(--color-plata)] flex flex-col justify-between p-6">
      <header className="max-w-7xl mx-auto w-full py-4">
        <Link href="/">
          <Logo showText />
        </Link>
      </header>

      <main className="max-w-md mx-auto text-center space-y-6 my-auto">
        <span className="text-5xl font-mono font-bold text-[var(--color-oro)]">404</span>

        <h1 className="text-2xl sm:text-3xl font-bold font-['Montserrat',sans-serif] text-[var(--color-plata)]">
          Página no encontrada
        </h1>

        <p className="text-sm text-[var(--color-gris)] leading-relaxed">
          La ruta que intenta consultar no existe o ha sido reubicada. Puede regresar al catálogo principal o escribirnos directamente a WhatsApp.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-[var(--color-grafito-2)] border border-[var(--color-oro)]/40 text-xs font-bold text-[var(--color-plata)] hover:border-[var(--color-oro)] transition-colors"
          >
            ← Volver al inicio
          </Link>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-[var(--color-oro)] text-xs font-bold text-[var(--color-carbon)] hover:bg-[var(--color-oro-claro)] transition-colors active:scale-95"
          >
            Consultar por WhatsApp →
          </a>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto w-full text-center text-xs text-[var(--color-gris)] py-4">
        © 2026 {copy.brand.legalName}. Arequipa, Perú.
      </footer>
    </div>
  );
}
