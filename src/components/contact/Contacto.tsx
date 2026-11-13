import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Contacto: React.FC = () => {
  const whatsappHref = whatsappLink(
    "Hola Maqsyma, deseo consultar sobre disponibilidad, cotizaciones y ubicación en Arequipa."
  );

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="relative w-full py-20 md:py-28 bg-[#090a0d] border-t border-[#1e2029]"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl bg-gradient-to-b from-[#141620] to-[#0e1017] border border-[#232737] p-8 sm:p-14 text-center space-y-6 shadow-2xl shadow-black/80">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1e2230] text-xs font-mono text-[var(--color-oro-claro)] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-oro)] animate-ping" />
            Canal Oficial de Atención Inmediata
          </div>

          <h2
            id="contacto-titulo"
            className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
          >
            {copy.footer.ctaHeading}
          </h2>

          <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {copy.footer.ctaBody}
          </p>

          {/* Información Comercial Verificada */}
          <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
            <div className="p-4 rounded-lg bg-[#0e1016] border border-[#202330]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">Local Comercial</span>
              <span className="text-xs font-semibold text-white block">{copy.contact.addressDisplay}</span>
              <span className="text-[10px] text-neutral-400">Atención técnica y despacho</span>
            </div>
            <div className="p-4 rounded-lg bg-[#0e1016] border border-[#202330]">
              <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">WhatsApp & Teléfono</span>
              <span className="text-xs font-mono font-semibold text-emerald-400 block">{copy.contact.phoneDisplay}</span>
              <span className="text-[10px] text-neutral-400">Cotizaciones inmediatas</span>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-md bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--color-carbon)] shadow-xl shadow-[var(--color-oro)]/20 transition-all duration-200 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
            >
              <span>{copy.footer.quoteButton}</span>
              <span className="text-base">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
