"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { whatsappLink } from "@/lib/whatsapp";
import { copy } from "@/content/copy.es";

export const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/#productos", label: "Catálogo" },
    { href: "/#modalidades", label: "Venta & Alquiler" },
    { href: "/#soluciones", label: "Soluciones" },
    { href: "/#soporte", label: "Servicio Técnico" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#contacto", label: "Contacto" },
  ];

  const whatsappHref = whatsappLink(copy.contact.defaultMessage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#0b0c0e]/95 backdrop-blur-md border-b border-[#25282f] shadow-2xl shadow-black/60 py-3.5"
            : "bg-gradient-to-b from-black/80 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo oficial de Maqsyma */}
          <Link
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)] rounded"
            aria-label="Ir al inicio de Maqsyma"
          >
            <Logo showText />
          </Link>

          {/* Menú de navegación desktop */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-300 hover:text-[var(--color-oro)] transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-oro)] rounded px-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA WhatsApp & Acceso Admin */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="text-xs font-mono text-neutral-400 hover:text-white px-2.5 py-1.5 rounded border border-white/5 hover:border-white/20 transition-all"
            >
              Portal Admin
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-carbon)] transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-[var(--color-oro)]/10"
            >
              <span>Cotizar</span>
              <span>→</span>
            </a>
          </div>

          {/* Botón hamburguesa móvil */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)] rounded"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú principal"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Móvil Fullscreen / Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#07080a]/98 backdrop-blur-xl flex flex-col justify-between p-6 md:hidden animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#25282f] pb-4">
            <Logo showText />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)] rounded"
              aria-label="Cerrar menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-5 my-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-['Syne',sans-serif] text-2xl font-bold text-neutral-200 hover:text-[var(--color-oro)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-[#25282f]">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-md bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] text-center font-bold text-sm uppercase tracking-wider text-[var(--color-carbon)] block"
            >
              Contactar por WhatsApp
            </a>
            <div className="text-center">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-mono text-neutral-500 hover:text-neutral-300"
              >
                Acceso Administrador →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
