"use client";

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSiteContent } from "@/i18n/useSiteContent";
import { Logo } from "../atoms/Logo";
import { CountryFlag } from "../atoms/CountryFlag";
import { CountryMirror } from "@/data/siteContent";
import { LinkedInIcon } from "../atoms/LinkedInIcon";
import { Award, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Footer: React.FC<{
  currentCountry: CountryMirror;
  onSelectCountry: (c: CountryMirror) => void;
}> = ({ currentCountry, onSelectCountry }) => {
  const { t } = useTranslation("footer");
  const { countries } = useSiteContent();

  const footerRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeCountry = countries.find((c) => c.code === currentCountry.code) || currentCountry;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Accreditation banner entrance
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 95%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Footer directory columns stagger
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-20 bg-[#0B140B] text-gray-300 pt-16 pb-12 text-xs sm:text-sm border-t border-[#1C2E1A]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Accreditation & Certifications Banner */}
        <div ref={bannerRef} className="pb-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {t("accreditations")}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Award className="w-4 h-4 text-[#D9E8BE]" />
              GFSI BRCGS Grado A
            </span>
            <span className="text-white/20">|</span>
            <span className="text-white font-semibold">Star-K Kosher</span>
            <span className="text-white/20">|</span>
            <span className="text-white font-semibold">Halal Certified</span>
            <span className="text-white/20">|</span>
            <span className="text-white font-semibold">HACCP Validated</span>
            <span className="text-white/20">|</span>
            <span className="text-white font-semibold">FDA Registered</span>
          </div>
        </div>

        {/* Main Footer Directory Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="symbol" theme="dark" size="lg" />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-normal">
              {t("about")}
            </p>
            <div className="flex items-start gap-2.5 text-xs max-w-sm">
              <MapPin className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-[#D9E8BE] block uppercase tracking-wider text-[11px]">
                  {t("activeHub", { name: activeCountry.name })}
                </span>
                <p className="text-gray-300 font-normal">{activeCountry.contactOffice.address}</p>
                <p className="text-gray-400 font-medium">
                  {t("directLine", { phone: activeCountry.contactOffice.phone })}
                </p>
              </div>
            </div>
          </div>

          {/* Links: Categorías */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t("cols.categories")}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="#categorias" className="hover:text-white transition-colors">
                  Meat & Poultry
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-white transition-colors">
                  Bakery & Panificación
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-white transition-colors">
                  Suplementos & Bienestar
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-white transition-colors">
                  From Nature (Colores Botánicos)
                </a>
              </li>
              <li>
                <a href="#categorias" className="hover:text-white transition-colors">
                  Tripas VICEL & Equipos RIBON
                </a>
              </li>
            </ul>
          </div>

          {/* Links: Marcas Propias */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t("cols.brands")}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a href="#marcas" className="hover:text-white transition-colors">
                  WBS® (Transglutaminasa)
                </a>
              </li>
              <li>
                <a href="#marcas" className="hover:text-white transition-colors">
                  Wenda Phos® (Sistemas Fosfatos)
                </a>
              </li>
              <li>
                <a href="#marcas" className="hover:text-white transition-colors">
                  SafePlate® (Bioprotección Clean Label)
                </a>
              </li>
              <li>
                <a href="#marcas" className="hover:text-white transition-colors">
                  NatureBinde® & Koolgel®
                </a>
              </li>
              <li>
                <a href="#marcas" className="hover:text-white transition-colors">
                  FreshGuard® Antioxidantes
                </a>
              </li>
            </ul>
          </div>

          {/* Red Internacional */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t("cols.network")}
            </h4>
            <div className="space-y-1 text-xs max-h-48 overflow-y-auto scrollbar-none pr-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => onSelectCountry(c)}
                  className={`flex items-center gap-2 w-full text-left py-1.5 px-2 rounded-lg transition-colors cursor-pointer ${
                    c.code === currentCountry.code
                      ? "bg-white/10 text-[#D9E8BE] font-bold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <CountryFlag code={c.code} size="sm" />
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications and copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#D9E8BE] font-bold">{t("tagline")}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{t("networkText")}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{t("ndaText")}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/wenda-ingredients/home/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn oficial de Wenda Ingredients"
              className="text-gray-400 hover:text-[#D9E8BE] transition-colors p-1 rounded hover:bg-white/5 inline-flex items-center gap-1.5 group"
            >
              <LinkedInIcon className="w-4 h-4 text-gray-400 group-hover:text-[#D9E8BE] transition-colors" />
              <span className="font-medium text-gray-400 group-hover:text-white transition-colors">LinkedIn</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <p>{t("copyright")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
