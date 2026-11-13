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
    { href: "/#escenas", label: "PROCESOS Y EQUIPOS" },
    { href: "/#categorias", label: "LÍNEAS" },
    { href: "/#modalidades", label: "VENTA Y ALQUILER" },
    { href: "/#marcas", label: "ESAB" },
    { href: "/#productos", label: "CATÁLOGO COMPLETO" },
    { href: "/#contacto", label: "CONTACTO" },
  ];

  const whatsappHref = whatsappLink(copy.contact.defaultMessage);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#090A0D]/95 backdrop-blur-md border-b border-[#1D212B] shadow-2xl py-3"
            : "bg-gradient-to-b from-[#090A0D]/90 via-[#090A0D]/50 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="focus:outline-none focus:ring-1 focus:ring-[var(--color-oro)] rounded flex items-center"
            aria-label="MAQSYMA — Inicio"
          >
            <Logo showText={false} />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-mono tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-neutral-400 hover:text-[var(--color-oro-claro)] uppercase transition-colors duration-200 relative group py-1"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-oro)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-amber-500/40 bg-white/5 hover:bg-white/10 transition-all uppercase tracking-wider"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>INICIAR SESIÓN / REGISTRARSE</span>
            </Link>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#090A0D] transition-all duration-200 hover:brightness-110 active:scale-95 shadow-md shadow-[var(--color-oro)]/20"
            >
              <span>HABLAR CON MAQSYMA</span>
              <span className="text-sm">→</span>
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-oro)] rounded"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090A0D]/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-28 pb-10 px-8 animate-fadeIn">
          <nav className="flex flex-col gap-6">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-oro)] border-b border-white/10 pb-2">
              ÍNDICE DE NAVEGACIÓN
            </span>
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold font-['Syne',sans-serif] text-neutral-200 hover:text-[var(--color-oro)] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-neutral-400">0{idx + 1}</span>
              </a>
            ))}
          </nav>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded bg-gradient-to-r from-[var(--color-oro-claro)] via-[var(--color-oro)] to-[var(--color-oro-oscuro)] py-3 text-xs font-bold uppercase tracking-wider text-[#090A0D]"
            >
              <span>HABLAR CON MAQSYMA</span>
              <span>→</span>
            </a>
            <div className="flex justify-between items-center text-xs font-mono text-neutral-300 pt-2">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 hover:text-amber-400 py-1"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>INICIAR SESIÓN / REGISTRARSE</span>
              </Link>
              <span className="text-neutral-500">AREQUIPA · PERÚ</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
