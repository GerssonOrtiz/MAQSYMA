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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al presionar tecla Escape
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
    { href: "#taller", label: "Taller" },
    { href: "#mas-vendidos", label: "Más vendidos" },
    { href: "#mejor-valorados", label: "Mejor valorados" },
    { href: "#nuevos", label: "Nuevos" },
    { href: "#contacto", label: "Contacto" },
  ];

  const whatsappHref = whatsappLink(copy.contact.defaultMessage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-carbon)]/90 backdrop-blur-md border-b border-[var(--color-grafito-2)] shadow-lg shadow-black/20 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo oficial */}
          <Link
            href="/"
            className="focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)] rounded"
            aria-label="Ir al inicio de Maqsyma"
          >
            <Logo showText />
          </Link>

          {/* Menú de navegación desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--color-gris)] hover:text-[var(--color-plata)] transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-[var(--color-oro)] rounded px-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Botón WhatsApp a la derecha */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-oro)] px-4 py-2 text-xs font-bold text-[var(--color-carbon)] transition-all duration-200 hover:bg-[var(--color-oro-claro)] hover:shadow-[0_0_15px_rgba(201,162,74,0.3)] active:scale-95"
            >
              <span>Cotizar por WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Botón hamburguesa móvil */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
              className="p-2 rounded-md bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal de navegación"
          className="fixed inset-0 z-50 bg-[var(--color-carbon)]/98 backdrop-blur-xl flex flex-col justify-between p-6 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between">
            <Logo showText />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Cerrar menú de navegación"
              className="p-2 rounded-md bg-[var(--color-grafito)] border border-[var(--color-grafito-2)] text-[var(--color-plata)] focus:outline-none focus:ring-2 focus:ring-[var(--color-oro)]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-6 text-xl font-bold font-['Montserrat',sans-serif]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--color-plata)] hover:text-[var(--color-oro)] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[var(--color-grafito-2)] space-y-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-oro)] px-5 py-3 text-sm font-bold text-[var(--color-carbon)] shadow-lg active:scale-95"
            >
              <span>Cotizar por WhatsApp</span>
              <span>→</span>
            </a>
            <p className="text-center text-xs text-[var(--color-gris)]">
              Maquinaria, Sistemas y Materiales Avanzados · Arequipa
            </p>
          </div>
        </div>
      )}
    </>
  );
};
