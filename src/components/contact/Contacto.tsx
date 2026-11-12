import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Contacto: React.FC = () => {
  const whatsappHref = whatsappLink(
    "Hola Maqsyma, deseo consultar sobre precio, disponibilidad y opciones de alquiler de equipos ESAB."
  );

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="relative w-full py-20 md:py-32 bg-gradient-to-b from-[var(--color-carbon)] via-[var(--color-grafito)] to-[var(--color-carbon)] border-t border-[var(--color-grafito-2)]"
    >
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--color-grafito-2)] text-xs text-[var(--color-oro-claro)] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)]" />
          Atención Inmediata
        </div>

        <h2
          id="contacto-titulo"
          className="font-['Montserrat',sans-serif] text-3xl sm:text-5xl md:text-6xl font-extrabold text-[var(--color-plata)] tracking-tight leading-tight"
        >
          {copy.footer.ctaHeading}
        </h2>

        <p className="text-base sm:text-xl text-[var(--color-gris)] max-w-xl mx-auto leading-relaxed">
          {copy.footer.ctaBody}
        </p>

        <div className="pt-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-8 py-4 text-base font-bold text-[var(--color-carbon)] shadow-xl shadow-[var(--color-oro)]/20 transition-all duration-200 hover:brightness-110 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
          >
            <span>{copy.footer.quoteButton}</span>
            <span className="text-lg">→</span>
          </a>
        </div>

        {/* Pendientes TODOs del cliente expuestos de forma visible */}
        <div className="mt-12 pt-8 border-t border-[var(--color-grafito-2)] text-left max-w-lg mx-auto bg-[var(--color-carbon)]/60 p-4 rounded-lg border border-dashed border-[var(--color-oro)]/30">
          <p className="text-[11px] font-mono text-[var(--color-oro-claro)] uppercase tracking-wider mb-2">
            Información comercial pendiente de confirmación:
          </p>
          <ul className="space-y-1 text-xs text-[var(--color-gris)] font-mono">
            {copy.footer.todoNotice.map((todo, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-[var(--color-oro)]">▪</span>
                <span>{todo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
