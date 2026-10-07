"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../atoms/Logo";
import { Button } from "../atoms/Button";
import { CountrySelector } from "../molecules/CountrySelector";
import { CountryFlag } from "../atoms/CountryFlag";
import { CountryMirror } from "@/data/siteContent";
import { LinkedInIcon } from "../atoms/LinkedInIcon";
import {
  Menu,
  X,
  ArrowUpRight,
  PhoneCall,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface NavbarProps {
  currentCountry: CountryMirror;
  onSelectCountry: (country: CountryMirror) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentCountry, onSelectCountry }) => {
  const { t } = useTranslation("navbar");
  const [isTransparent, setIsTransparent] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  // Automatically hide navbar visually like scroll headroom whenever ANY modal is opened
  useEffect(() => {
    const checkModalActive = () => {
      if (typeof document === "undefined") return;
      const activeModal = document.querySelector(
        '[role="dialog"]:not(#mobile-drawer), [aria-modal="true"]:not(#mobile-drawer), [data-modal="true"], body[data-modal-open="true"]'
      );
      const isBodyModalOpen = document.body.getAttribute("data-modal-open") === "true";
      const hasModal = !!activeModal || isBodyModalOpen;
      setIsModalActive(hasModal);
      if (hasModal) {
        setMobileMenuOpen(false);
        setCategoriesDropdownOpen(false);
      }
    };

    checkModalActive();

    const observer = new MutationObserver(() => {
      checkModalActive();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-modal-open", "class", "style"]
    });

    const handleModalOpen = () => {
      setIsModalActive(true);
      setMobileMenuOpen(false);
      setCategoriesDropdownOpen(false);
    };

    const handleModalClose = () => {
      setTimeout(checkModalActive, 30);
    };

    window.addEventListener("wenda:modal-open", handleModalOpen);
    window.addEventListener("wenda:modal-close", handleModalClose);

    return () => {
      observer.disconnect();
      window.removeEventListener("wenda:modal-open", handleModalOpen);
      window.removeEventListener("wenda:modal-close", handleModalClose);
    };
  }, []);

  // Measure dynamic header height so drawer aligns pixel-perfect without gap or overlap
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open on iOS
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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

        // Check if inside full-viewport timeline module (#trayectoria)
        const timelineEl = document.getElementById("trayectoria");
        let isTimelineActive = false;
        if (timelineEl) {
          const rect = timelineEl.getBoundingClientRect();
          // Active while timeline stage is pinned or covering the viewport
          isTimelineActive = rect.top <= 80 && rect.bottom >= window.innerHeight - 80;
        }

        // Check if inside specialized solutions module (#soluciones-especializadas)
        const solucionesEl = document.getElementById("soluciones-especializadas");
        let isSolucionesActive = false;
        if (solucionesEl) {
          const rect = solucionesEl.getBoundingClientRect();
          // Active while specialized solutions section is visible in the viewport
          isSolucionesActive = rect.top < window.innerHeight && rect.bottom > 80;
        }

        // Check if inside full-viewport science module (#science)
        const scienceEl = document.getElementById("science");
        let isScienceActive = false;
        if (scienceEl) {
          const rect = scienceEl.getBoundingClientRect();
          // Active while science stage is pinned or covering the viewport
          isScienceActive = rect.top <= 80 && rect.bottom >= 80;
        }

        const isDesktop = window.innerWidth >= 1024;

        if (isDesktop && (isTimelineActive || isSolucionesActive || isScienceActive)) {
          // Block navbar on desktop while full-viewport pinned stages are active
          setIsVisible(false);
          setCategoriesDropdownOpen(false);
        } else if (scrollDelta > 8 && currentScrollY > 120) {
          // Scrolling down
          setIsVisible(false);
          setCategoriesDropdownOpen(false);
        } else if (scrollDelta < -8) {
          // Scrolling up: always re-enable navbar
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navCategories = (
    t("portfolio.items", { returnObjects: true }) as { name: string; desc: string }[]
  ).map((cat) => ({ ...cat, href: "#categorias" }));

  const showHeader = !isModalActive && (isVisible || mobileMenuOpen);

  // When mobile menu is open, navbar MUST always have solid white background.
  // When mobile menu closes, it returns to transparent if scroll <= 80, otherwise stays white.
  const isHeaderTransparent = isTransparent && !mobileMenuOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[70] transition-transform duration-300 ease-in-out ${
          showHeader
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        }`}
      >
      {/* Top corporate utility bar */}
      <div
        className={`transition-colors duration-300 py-1.5 px-4 text-[11px] ${
          isHeaderTransparent
            ? "bg-transparent text-white/80"
            : "bg-white text-slate-700 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end gap-4 min-w-0">
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <a
              href={`tel:${currentCountry.contactOffice.phone}`}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE]"
                  : "text-slate-700 hover:text-[#447D29]"
              }`}
            >
              <PhoneCall
                className={`w-3.5 h-3.5 ${
                  isHeaderTransparent ? "text-[#D9E8BE]" : "text-[#447D29]"
                }`}
              />
              <span className="hidden sm:inline font-bold">
                {currentCountry.contactOffice.phone}
              </span>
            </a>
            <a
              href="https://www.linkedin.com/company/wenda-ingredients/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Wenda Ingredients"
              className={`flex items-center justify-center p-1 rounded-md transition-colors ${
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-slate-200/50"
              }`}
            >
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>
            <div
              className={`h-3.5 w-px hidden sm:block ${
                isHeaderTransparent ? "bg-white/20" : "bg-slate-200"
              }`}
            />
            <CountrySelector
              currentCountry={currentCountry}
              onSelectCountry={onSelectCountry}
              theme={isHeaderTransparent ? "transparent" : "light"}
            />
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div
        className={`transition-all duration-300 ${
          isHeaderTransparent
            ? "bg-transparent py-3.5 lg:py-4 border-b border-white/10"
            : "bg-white py-3.5 border-b border-slate-200/90 shadow-sm"
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
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-slate-50"
              }`}
            >
              {t("links.about")}
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
                  isHeaderTransparent
                    ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                    : "text-slate-700 hover:text-[#447D29] hover:bg-slate-50"
                }`}
              >
                <span>{t("links.categories")}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    categoriesDropdownOpen
                      ? "rotate-180 text-[#447D29]"
                      : isHeaderTransparent
                      ? "text-white/60"
                      : "text-slate-400"
                  }`}
                />
              </a>

              {categoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-80 rounded-2xl bg-white p-3 shadow-xl border border-slate-200 animate-in fade-in duration-150 z-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 mb-1">
                    {t("portfolio.title")}
                  </div>
                  <div className="space-y-1">
                    {navCategories.map((cat, idx) => (
                      <a
                        key={idx}
                        href={cat.href}
                        onClick={() => setCategoriesDropdownOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
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
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-slate-50"
              }`}
            >
              {t("links.brands")}
            </a>

            <a
              href="#science"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-slate-50"
              }`}
            >
              {t("links.science")}
            </a>

            <a
              href="#indent"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-slate-50"
              }`}
            >
              {t("links.indent")}
            </a>

            <a
              href="#contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-bold transition-colors ${
                isHeaderTransparent
                  ? "text-white/90 hover:text-[#D9E8BE] hover:bg-white/10"
                  : "text-slate-700 hover:text-[#447D29] hover:bg-slate-50"
              }`}
            >
              {t("links.contact")}
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact">
              {isHeaderTransparent ? (
                <span className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#D9E8BE] text-[#0F172A] hover:bg-white transition-all shadow-sm cursor-pointer active:scale-95">
                  <span>{t("cta.short")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  {t("cta.full")}
                </Button>
              )}
            </a>
          </div>

          {/* Mobile menu hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border transition-colors cursor-pointer select-none touch-manipulation active:scale-95 ${
              isHeaderTransparent
                ? "bg-white/10 border-white/20 text-white hover:bg-white/20"
                : "bg-slate-100 border-slate-200 text-slate-800"
            }`}
            aria-label={t("openMenu")}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Drawer (Decoupled from transformed header for 100% reliable Safari iOS touch delivery) */}
    {mobileMenuOpen && (
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t("openMenu")}
        className="lg:hidden fixed inset-x-0 bottom-0 z-[69] bg-white border-t border-slate-200 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-150"
        style={{
          top: headerHeight > 0 ? `${headerHeight}px` : "112px",
          height: headerHeight > 0 ? `calc(100dvh - ${headerHeight}px)` : "calc(100dvh - 112px)"
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col justify-between flex-1 gap-8">
          <div className="space-y-1">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-slate-50 active:bg-slate-100 touch-manipulation transition-colors cursor-pointer group"
            >
              <span>{t("links.about")}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#447D29] transition-all" />
            </a>
            <a
              href="#categorias"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-slate-50 active:bg-slate-100 touch-manipulation transition-colors cursor-pointer group"
            >
              <span>{t("links.categories")}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#447D29] transition-all" />
            </a>
            <a
              href="#marcas"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-slate-50 active:bg-slate-100 touch-manipulation transition-colors cursor-pointer group"
            >
              <span>{t("links.brands")}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#447D29] transition-all" />
            </a>
            <a
              href="#science"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-slate-50 active:bg-slate-100 touch-manipulation transition-colors cursor-pointer group"
            >
              <span>{t("links.science")}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#447D29] transition-all" />
            </a>
            <a
              href="#indent"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-slate-50 active:bg-slate-100 touch-manipulation transition-colors cursor-pointer group"
            >
              <span>{t("links.indent")}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#447D29] transition-all" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl text-base font-bold text-slate-800 hover:text-[#447D29] hover:bg-slate-50 active:bg-slate-100 touch-manipulation transition-colors cursor-pointer group"
            >
              <span>{t("links.contact")}</span>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#447D29] transition-all" />
            </a>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">{t("selectedRegion")}</p>
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CountryFlag code={currentCountry.code} size="md" />
                  <span>{currentCountry.name}</span>
                </p>
              </div>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full touch-manipulation cursor-pointer"
            >
              <Button variant="primary" fullWidth size="lg">
                {t("cta.mobile")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    )}
  </>
);
};
