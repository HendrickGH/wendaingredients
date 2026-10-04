"use client";

import React, { useState, useEffect, useRef } from "react";
import { Logo } from "../atoms/Logo";
import { Button } from "../atoms/Button";
import { CountrySelector } from "../molecules/CountrySelector";
import { CountryFlag } from "../atoms/CountryFlag";
import { CountryMirror } from "@/data/siteContent";
import {
  Menu,
  X,
  ArrowUpRight,
  PhoneCall,
  ChevronDown,
  Layers,
  Sparkles,
  Building2,
  ShieldCheck,
  Search
} from "lucide-react";

interface NavbarProps {
  currentCountry: CountryMirror;
  onSelectCountry: (country: CountryMirror) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentCountry, onSelectCountry }) => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Transparent state only lives at the beginning of the hero
      if (currentScrollY <= 80) {
        setIsTransparent(true);
        setIsVisible(true);
      } else {
        setIsTransparent(false);

        // Headroom logic: hide when scrolling down, show when scrolling up
        const scrollDelta = currentScrollY - lastScrollY.current;

        if (scrollDelta > 8 && currentScrollY > 120) {
          // Scrolling down
          setIsVisible(false);
          setCategoriesDropdownOpen(false);
        } else if (scrollDelta < -8) {
          // Scrolling up
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navCategories = [
    { name: "Meat & Poultry", href: "#categorias", desc: "Textura, rendimiento y retención de jugos" },
    { name: "Bakery & Panificación", href: "#categorias", desc: "Volumen, suavidad y tolerancia de masa" },
    { name: "Suplementos & Bienestar", href: "#categorias", desc: "Aminoácidos instantizados y nutrición funcional" },
    { name: "From Nature (Colores)", href: "#categorias", desc: "Pigmentos botánicos puros termoestables" },
    { name: "Tripas VICEL & Maquinaria", href: "#categorias", desc: "Casings de celulosa y líneas continuas" }
  ];

  const showHeader = isVisible || mobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        showHeader ? "translate-y-0" : "-translate-y-full pointer-events-none"
      }`}
    >
      {/* Top corporate utility bar */}
      <div
        className={`transition-colors duration-300 py-1.5 px-4 text-[11px] border-b ${
          isTransparent
            ? "bg-black/20 backdrop-blur-xs border-white/10 text-white/80"
            : "bg-[#F8FAF6] border-slate-200/90 text-slate-700"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 min-w-0">
          <div className="flex items-center gap-2.5 min-w-0 shrink">
            <span
              className={`inline-flex items-center gap-1.5 font-bold shrink-0 ${
                isTransparent ? "text-[#D9E8BE]" : "text-[#2F591B]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isTransparent ? "bg-[#D9E8BE]" : "bg-[#447D29]"
                }`}
              />
              Red Global Wenda
            </span>
            <span
              className={`hidden lg:inline w-px h-3 shrink-0 ${
                isTransparent ? "bg-white/20" : "bg-slate-300"
              }`}
            />
            <span
              className={`hidden lg:inline font-medium truncate max-w-sm xl:max-w-lg ${
                isTransparent ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {currentCountry.tagline}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <a
              href={`tel:${currentCountry.contactOffice.phone}`}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                isTransparent
                  ? "text-white/90 hover:text-[#D9E8BE]"
                  : "text-slate-700 hover:text-[#447D29]"
              }`}
            >
              <PhoneCall
                className={`w-3.5 h-3.5 ${
                  isTransparent ? "text-[#D9E8BE]" : "text-[#447D29]"
                }`}
              />
              <span className="hidden sm:inline font-bold">
                {currentCountry.contactOffice.phone}
              </span>
            </a>
            <div
              className={`h-3.5 w-px hidden sm:block ${
                isTransparent ? "bg-white/20" : "bg-slate-200"
              }`}
            />
            <CountrySelector
              currentCountry={currentCountry}
              onSelectCountry={onSelectCountry}
              theme={isTransparent ? "transparent" : "light"}
            />
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`transition-all duration-300 ${
          isTransparent
            ? "bg-transparent py-4 border-b border-white/10"
            : "bg-white/95 backdrop-blur-md py-3.5 border-b border-slate-200/90 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo using provided horizontal lockup */}
          <a href="#" className="cursor-pointer block py-1">
            <Logo variant="horizontal" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <a
              href="#about"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-[#F8FAF6]"
              }`}
            >
              Acerca de
            </a>

            {/* Interactive Dropdown for Categories */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesDropdownOpen(true)}
              onMouseLeave={() => setCategoriesDropdownOpen(false)}
            >
              <a
                href="#categorias"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer ${
                  isTransparent
                    ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                    : "text-slate-700 hover:text-[#447D29] hover:bg-[#F8FAF6]"
                }`}
              >
                <span>Categorías</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoriesDropdownOpen
                      ? "rotate-180 text-[#447D29]"
                      : isTransparent
                      ? "text-white/60"
                      : "text-slate-400"
                  }`}
                />
              </a>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white p-3 shadow-xl border border-slate-200 animate-in fade-in duration-150 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                    Portafolio de Soluciones
                  </div>
                  <div className="space-y-1">
                    {navCategories.map((cat, idx) => (
                      <a
                        key={idx}
                        href={cat.href}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-[#F8FAF6] transition-colors group"
                      >
                        <div className="text-xs font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">
                          {cat.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                          {cat.desc}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a
              href="#marcas"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-[#F8FAF6]"
              }`}
            >
              Marcas
            </a>

            <a
              href="#science"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-[#F8FAF6]"
              }`}
            >
              WNDA Science
            </a>

            <a
              href="#indent"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-[#F8FAF6]"
              }`}
            >
              Wenda Indent
            </a>

            <a
              href="#contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-[#F8FAF6]"
              }`}
            >
              Contacto
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact">
              {isTransparent ? (
                <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D9E8BE] text-[#0F172A] hover:bg-white transition-all shadow-sm cursor-pointer active:scale-95">
                  <span>Conecta con Soporte</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Conecta con Soporte Técnico
                </Button>
              )}
            </a>
          </div>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-colors cursor-pointer ${
              isTransparent
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-slate-100 border-slate-200 text-slate-800"
            }`}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[96px] bottom-0 bg-white/98 backdrop-blur-xl border-t border-slate-200 p-6 flex flex-col justify-between overflow-y-auto z-40 animate-in fade-in duration-150">
          <div className="space-y-1">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-[#F8FAF6]"
            >
              Acerca de
            </a>
            <a
              href="#categorias"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-[#F8FAF6]"
            >
              Categorías
            </a>
            <a
              href="#marcas"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-[#F8FAF6]"
            >
              Marcas
            </a>
            <a
              href="#science"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-[#F8FAF6]"
            >
              WNDA Science
            </a>
            <a
              href="#indent"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-[#F8FAF6]"
            >
              Wenda Indent
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-[#F8FAF6]"
            >
              Contacto
            </a>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="p-3.5 rounded-xl bg-[#F8FAF6] border border-slate-200">
              <p className="text-xs text-slate-500 mb-1">Región Seleccionada:</p>
              <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CountryFlag code={currentCountry.code} size="md" />
                <span>{currentCountry.name}</span>
              </p>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <Button variant="primary" fullWidth size="lg">
                Conectar con Equipo Técnico
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
