import React from "react";
import { copy } from "@/content/copy.es";
import { whatsappLink } from "@/lib/whatsapp";

export const Contacto: React.FC = () => {
  const whatsappHref = whatsappLink(copy.contact.defaultMessage);

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="relative w-full py-24 md:py-32 bg-[#07080b] border-t border-[#181a24] overflow-hidden"
    >
      {/* Fondo ambiental */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-oro)]/5 blur-[200px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Declaración central */}
        <div className="text-center mb-16 space-y-5">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-oro)] block">
            07 // CANAL OFICIAL DE ATENCIÓN
          </span>
          <h2
            id="contacto-titulo"
            className="font-['Syne',sans-serif] text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight"
          >
            {copy.footer.ctaHeading}
          </h2>
          <p className="text-sm sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
            {copy.footer.ctaBody}
          </p>
        </div>

        {/* Grid de Datos y CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Bloque Ubicación */}
          <div className="p-6 rounded-xl bg-[#0d0f16] border border-[#1e2232] flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">LOCAL COMERCIAL</span>
            <span className="text-sm font-bold text-white">{copy.contact.addressDisplay}</span>
            <span className="text-xs text-neutral-400 font-light">Atención técnica, retiro en almacén y despacho regional.</span>
          </div>

          {/* Bloque WhatsApp */}
          <div className="p-6 rounded-xl bg-[#0d0f16] border border-[#1e2232] flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">WHATSAPP OFICIAL</span>
            <span className="text-sm font-mono font-bold text-emerald-400">{copy.contact.phoneDisplay}</span>
            <span className="text-xs text-neutral-400 font-light">Respuesta directa para cotizaciones y disponibilidad de equipo.</span>
          </div>

          {/* Bloque Horario */}
          <div className="p-6 rounded-xl bg-[#0d0f16] border border-[#1e2232] flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">COBERTURA</span>
            <span className="text-sm font-bold text-white">Arequipa y Sur Peruano</span>
            <span className="text-xs text-neutral-400 font-light">Despacho a Moquegua, Tacna, Puno, Cusco y frentes mineros.</span>
          </div>
        </div>

        {/* CTA Principal de Conversión */}
        <div className="text-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-10 py-5 text-sm font-black uppercase tracking-widest text-[var(--color-carbon)] shadow-2xl shadow-[var(--color-oro)]/25 transition-all duration-200 hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
          >
            <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>{copy.footer.quoteButton}</span>
          </a>
          <p className="text-xs font-mono text-neutral-400 mt-4">
            Respuesta típica en menos de 2 horas en horario comercial · Arequipa, Perú
          </p>
        </div>
      </div>
    </section>
  );
};
