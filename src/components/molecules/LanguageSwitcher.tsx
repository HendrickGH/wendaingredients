"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages, CheckCircle2, ChevronDown } from "lucide-react";
import { CountryFlag } from "../atoms/CountryFlag";
import { LANGUAGES, LanguageCode } from "@/i18n/config";

interface LanguageSwitcherProps {
  theme?: "light" | "transparent";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ theme = "light" }) => {
  const { t, i18n } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const currentCode = (i18n.resolvedLanguage ?? i18n.language) as LanguageCode;
  const current = LANGUAGES.find((l) => l.code === currentCode) ?? LANGUAGES[0];

  const handleSelect = (code: LanguageCode) => {
    // Switches every translated string in place: no page reload
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border shadow-2xs transition-all text-xs font-semibold cursor-pointer ${
          theme === "transparent"
            ? "bg-white/10 hover:bg-white/20 border-white/25 text-white hover:border-white/50 backdrop-blur-sm"
            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-[#447D29]"
        }`}
        aria-label={t("language.select")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Languages
          className={`w-3.5 h-3.5 ${theme === "transparent" ? "text-[#D9E8BE]" : "text-[#447D29]"}`}
        />
        <span>{current.short}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            theme === "transparent" ? "text-white/80" : "text-slate-500"
          } ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            role="listbox"
            aria-label={t("language.select")}
            className="absolute right-0 mt-2 w-52 rounded-2xl bg-white p-2 shadow-2xl z-50 border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {t("language.title")}
            </div>
            <div className="space-y-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === current.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? "bg-[#EBF4E5] border border-[#447D29]"
                        : "hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <CountryFlag code={lang.flag} size="sm" />
                    <span className="flex-1 text-sm font-bold text-slate-900">{lang.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
