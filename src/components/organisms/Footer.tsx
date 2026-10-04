"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { useSiteContent } from "@/i18n/useSiteContent";
import { Logo } from "../atoms/Logo";
import { CountryFlag } from "../atoms/CountryFlag";
import { CountryMirror } from "@/data/siteContent";
import { Award } from "lucide-react";

export const Footer: React.FC<{
  currentCountry: CountryMirror;
  onSelectCountry: (c: CountryMirror) => void;
}> = ({ currentCountry, onSelectCountry }) => {
  const { t } = useTranslation("footer");
  const { countries } = useSiteContent();

  const activeCountry = countries.find((c) => c.code === currentCountry.code) || currentCountry;

  return (
    <footer className="bg-[#0B140B] text-gray-300 pt-16 pb-12 text-xs sm:text-sm border-t border-[#1C2E1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Top Accreditation & Certifications Banner */}
        <div className="pb-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="symbol" theme="dark" size="lg" />
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm font-normal">
              {t("about")}
            </p>
            <div className="pl-3.5 border-l-2 border-[#D9E8BE] text-xs max-w-sm space-y-1">
              <span className="font-bold text-[#D9E8BE] block uppercase tracking-wider text-[11px]">
                {t("activeHub", { name: activeCountry.name })}
              </span>
              <p className="text-gray-300 font-normal">{activeCountry.contactOffice.address}</p>
              <p className="text-gray-400 font-medium">
                {t("directLine", { phone: activeCountry.contactOffice.phone })}
              </p>
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

          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
