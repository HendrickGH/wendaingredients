"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Badge } from "../atoms/Badge";
import { NaturalColorSwatch } from "../molecules/NaturalColorSwatch";
import { useTranslation } from "react-i18next";
import { useSiteContent, LocalizedCategory } from "@/i18n/useSiteContent";
import {
  Beef,
  Wheat,
  Pill,
  Palette,
  Cpu,
  CheckCircle2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  X,
  SlidersHorizontal,
  FileText
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "meat-poultry": <Beef className="w-4 h-4" />,
  "bakery": <Wheat className="w-4 h-4" />,
  "supplements": <Pill className="w-4 h-4" />,
  "from-nature": <Palette className="w-4 h-4" />,
  "tecnologia": <Cpu className="w-4 h-4" />
};

export const CategoryShowcase: React.FC<{ onConsultSolution: (categoryId: string) => void }> = ({
  onConsultSolution
}) => {
  const { t } = useTranslation("categoryShowcase");
  const { categories: CATEGORIES, naturalColors: NATURAL_COLORS } = useSiteContent();
  const shortName = (c: LocalizedCategory) => c.shortName || c.title;
  const [activeCategoryId, setActiveCategoryId] = useState<string>("meat-poultry");
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];

  // Safe pillar index within bounds
  const safePillarIndex = Math.min(activePillarIndex, currentCategory.pillars.length - 1);
  const activePillar = currentCategory.pillars[safePillarIndex] || currentCategory.pillars[0];

  // Lock body scroll when modal is active (UX Heuristic: Control & Freedom / Modal Focus)
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isModalOpen]);

  // Handle ESC key to dismiss modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen, handleKeyDown]);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    setActivePillarIndex(0);
  };

  const handleOpenModal = (pillarIdx?: number) => {
    if (typeof pillarIdx === "number") {
      setActivePillarIndex(pillarIdx);
    }
    setIsModalOpen(true);
  };

  return (
    <section id="categorias" className="py-24 lg:py-32 bg-[#FFFFFF] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header - Editorial Clarity */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="wenda" size="md">
              {t("header.badge")}
            </Badge>
            <h2 className="heading-editorial-lg font-editorial">
              {t("header.title")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              {t("header.subtitle")}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onConsultSolution(currentCategory.id)}
              className="btn-pill-primary text-xs !py-3 !px-5 group cursor-pointer"
            >
              <span>{t("consultFor", { name: shortName(currentCategory) })}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Navigation - Segmented Control Bar */}
        <div className="w-full bg-[#F8FAF6] p-1.5 rounded-2xl border border-slate-200 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max sm:min-w-0 sm:grid sm:grid-cols-5">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? "bg-[#447D29] text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-[#447D29]"}>
                    {categoryIcons[cat.id]}
                  </span>
                  <span>{shortName(cat)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Category Stage: Visual-Dominant Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Dominant Image Card (7 Columns): Immersive, Hero-Grade Photography */}
          <div className="lg:col-span-7">
            <div className="relative h-[400px] sm:h-[480px] lg:h-[540px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-950">
              <Image
                src={currentCategory.image}
                alt={currentCategory.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
              />

              {/* Floating Pill Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-white/95 text-[#2F591B] backdrop-blur-md border border-white/40 shadow-sm">
                  {currentCategory.badge}
                </span>
              </div>

              {/* Visual Category Backdrop Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white space-y-2">
                <p className="text-xs sm:text-sm font-bold text-[#D9E8BE] uppercase tracking-wider">
                  {currentCategory.subtitle}
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-white">
                  {currentCategory.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-normal leading-relaxed">
                  {currentCategory.tagline}
                </p>

                {/* Quick teaser button inside image on mobile/tablet */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenModal()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md transition-colors border border-white/30 cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{t("seeChallenges", { count: currentCategory.pillars.length })}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Executive Briefing Card (5 Columns): Clean, Scannable & Action-Oriented */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider block">
                {t("briefing.eyebrow")}
              </span>
              <h4 className="text-2xl font-bold text-slate-900 font-editorial">
                {t("briefing.title")}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t("briefing.body")}
              </p>
            </div>

            {/* Applications List */}
            {currentCategory.applications && currentCategory.applications.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#447D29]" />
                  {t("applications")}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentCategory.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 bg-[#F8FAF6] text-slate-800 rounded-full font-medium border border-slate-200"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Proven Benefits Summary */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {t("benefits")}
              </h5>
              <div className="space-y-2">
                {currentCategory.highlights.slice(0, 3).map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Associated Brands (if available) */}
            {currentCategory.brandAssociations && currentCategory.brandAssociations.length > 0 && (
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#447D29]" />
                  {t("brands")}
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {currentCategory.brandAssociations.map((brand, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 bg-[#EBF4E5] text-[#2F591B] rounded-lg font-semibold border border-[#447D29]/20"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Buttons (Triggers Modal or Consultation) */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="flex-1 btn-pill-secondary text-xs !py-3.5 !px-5 group cursor-pointer flex items-center justify-center gap-2 border-slate-300 hover:border-[#447D29]"
              >
                <FileText className="w-4 h-4 text-[#447D29]" />
                <span className="font-bold">{t("challengeSheet", { count: currentCategory.pillars.length })}</span>
              </button>

              <button
                type="button"
                onClick={() => onConsultSolution(currentCategory.id)}
                className="btn-pill-primary text-xs !py-3.5 !px-5 group cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t("requestSample")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Technical Modal (Full-Screen Backdrop with Body Scroll Lock) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="category-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl border border-slate-200 shadow-2xl z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Header (Fixed) */}
            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-200 flex items-start justify-between gap-4 bg-white shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="wenda" size="sm">
                    {currentCategory.badge}
                  </Badge>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                    {t("modal.eyebrow")}
                  </span>
                </div>
                <h3 id="category-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial">
                  {t("modal.title", { title: currentCategory.title })}
                </h3>
                <p className="text-xs text-slate-500">
                  {t("modal.subtitle")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label={t("modal.closeAria")}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable with Custom Styling) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#F8FAF6]">
              {/* Pillar Selector Tabs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t("modal.selectPillar")}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {t("modal.progress", { current: safePillarIndex + 1, total: currentCategory.pillars.length })}
                  </span>
                </div>

                <div className={`grid gap-2 ${
                  currentCategory.pillars.length === 2
                    ? "grid-cols-2"
                    : currentCategory.pillars.length === 3
                      ? "grid-cols-1 sm:grid-cols-3"
                      : "grid-cols-2 sm:grid-cols-4"
                }`}>
                  {currentCategory.pillars.map((pillar, idx) => {
                    const isPillarActive = idx === safePillarIndex;
                    const shortTitle = (pillar as { title: string; shortTitle?: string }).shortTitle || pillar.title;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePillarIndex(idx)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          isPillarActive
                            ? "bg-[#447D29] border-[#447D29] text-white shadow-xs"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              isPillarActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            0{idx + 1}
                          </span>
                        </div>
                        <span className="text-xs font-bold leading-tight line-clamp-2">
                          {shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Pillar Focus Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xs">
                <div className="space-y-2 border-b border-slate-100 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                      {t("modal.focus", { n: safePillarIndex + 1 })}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {shortName(currentCategory)}
                    </span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial">
                    {activePillar.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {activePillar.description}
                  </p>
                </div>

                {/* Technical Points List */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#447D29]" />
                    {t("modal.params")}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.points.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F8FAF6] border border-slate-200 text-xs text-slate-800 leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                        <span className="font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botanical Color Spectrum Swatches (if From Nature) */}
              {currentCategory.id === "from-nature" && (
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#447D29]">
                        {t("modal.spectrumEyebrow")}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {t("modal.spectrumTitle")}
                      </h4>
                    </div>
                    <Badge variant="wenda" size="sm">
                      {t("modal.cleanLabel")}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {NATURAL_COLORS.map((color) => (
                      <NaturalColorSwatch key={color.name} color={color} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer (Fixed) */}
            <div className="px-6 py-4 sm:px-8 sm:py-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{t("modal.onsiteQuestion")} </span>
                {t("modal.onsiteBody")}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {t("modal.close")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onConsultSolution(currentCategory.id);
                  }}
                  className="btn-pill-primary text-xs !py-2.5 !px-5 group cursor-pointer flex items-center gap-2"
                >
                  <span>{t("modal.requestSampleTrial")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
