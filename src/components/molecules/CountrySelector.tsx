"use client";

import React, { useState } from "react";
import { CountryMirror } from "@/data/siteContent";
import { useSiteContent } from "@/i18n/useSiteContent";
import { CountryFlag } from "../atoms/CountryFlag";
import { useTranslation } from "react-i18next";
import { Globe, MapPin, Phone, Mail, CheckCircle2, ChevronDown } from "lucide-react";

interface CountrySelectorProps {
  currentCountry: CountryMirror;
  onSelectCountry: (country: CountryMirror) => void;
  theme?: "light" | "transparent";
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  currentCountry,
  onSelectCountry,
  theme = "light"
}) => {
  const { t } = useTranslation("countrySelector");
  const { countries } = useSiteContent();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-2xs transition-all text-xs font-semibold cursor-pointer select-none touch-manipulation active:scale-95 ${
          theme === "transparent"
            ? "bg-white/10 hover:bg-white/20 border-white/25 text-white hover:border-white/50 backdrop-blur-sm"
            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-[#447D29]"
        }`}
        aria-label={t("ariaLabel")}
      >
        <CountryFlag code={currentCountry.code} size="sm" />
        <span className={`font-semibold ${theme === "transparent" ? "text-white" : "text-slate-900"}`}>
          {currentCountry.name.split(" & ")[0]}
        </span>
        <span
          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
            theme === "transparent"
              ? "bg-[#D9E8BE] text-[#0F172A]"
              : "text-[#2F591B] bg-[#EBF4E5] border border-[#CDE2C3]"
          }`}
        >
          {currentCountry.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            theme === "transparent" ? "text-white/80" : "text-slate-500"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-sm rounded-2xl bg-white p-3 shadow-2xl z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-slate-100 mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2F591B] uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-[#447D29]" />
                {t("title")}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {t("subtitle")}
              </p>
            </div>

            <div className="space-y-1">
              {countries.map((country) => {
                const isSelected = country.code === currentCountry.code;
                return (
                  <button
                    key={country.code}
                    onClick={() => {
                      onSelectCountry(country);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#EBF4E5] border border-[#447D29]"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <CountryFlag code={country.code} size="md" className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 truncate">
                          {country.name}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                        {country.contactOffice.focus}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Local hub badge */}
            <div className="mt-3 p-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-[11px] text-slate-700">
              <div className="flex items-center gap-1.5 text-[#2F591B] font-bold mb-1">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#447D29]" />
                <span>{t("activeHub", { name: currentCountry.name })}</span>
              </div>
              <div className="space-y-0.5 text-slate-600 pl-5">
                <p className="truncate font-medium">{currentCountry.contactOffice.address}</p>
                <div className="flex items-center gap-3 pt-1 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-800 font-semibold">
                    <Phone className="w-3 h-3 text-[#447D29]" /> {currentCountry.contactOffice.phone}
                  </span>
                  <span className="flex items-center gap-1 text-slate-800 font-semibold truncate">
                    <Mail className="w-3 h-3 text-[#447D29]" /> {currentCountry.contactOffice.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
