"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Badge } from "../atoms/Badge";
import { NaturalColorSwatch } from "../molecules/NaturalColorSwatch";
import { useTranslation } from "react-i18next";
import { useSiteContent, LocalizedCategory } from "@/i18n/useSiteContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  FileText,
  ChevronDown,
  FlaskConical
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
  const [activeTab, setActiveTab] = useState<"benefits" | "applications" | "systems">("benefits");
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [modalView, setModalView] = useState<"pillar" | "spectrum">("pillar");
  const [selectedColorFamily, setSelectedColorFamily] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const briefingCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Dominant Image & Briefing card dual reveal
      if (imageCardRef.current && briefingCardRef.current) {
        gsap.fromTo(
          [imageCardRef.current, briefingCardRef.current],
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageCardRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];

  const tabs: { id: "benefits" | "applications" | "systems"; label: string; icon: React.ReactNode }[] = [
    {
      id: "benefits",
      label: t("tabs.benefits", "Beneficios"),
      icon: <CheckCircle2 className="w-3.5 h-3.5" />
    },
    {
      id: "applications",
      label: t("tabs.applications", "Aplicaciones"),
      icon: <Layers className="w-3.5 h-3.5" />
    },
    {
      id: "systems",
      label: t("tabs.systems", "Sistemas"),
      icon: <Sparkles className="w-3.5 h-3.5" />
    }
  ];

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
    setModalView("pillar");
    setSelectedColorFamily("all");
  };

  const handleOpenModal = (pillarIdx?: number, view: "pillar" | "spectrum" = "pillar") => {
    if (typeof pillarIdx === "number") {
      setActivePillarIndex(pillarIdx);
    }
    setModalView(view);
    setIsModalOpen(true);
  };

  const filteredColors = selectedColorFamily === "all"
    ? NATURAL_COLORS
    : NATURAL_COLORS.filter((c) => {
        if (selectedColorFamily === "red") return c.family === "red" || c.family === "pink";
        if (selectedColorFamily === "pink") return c.family === "pink";
        if (selectedColorFamily === "purple") return c.family === "purple";
        if (selectedColorFamily === "blue") return c.family === "blue";
        if (selectedColorFamily === "yellow") return c.family === "yellow";
        if (selectedColorFamily === "orange") return c.family === "orange";
        return c.family === selectedColorFamily;
      });

  return (
    <section
      ref={sectionRef}
      id="categorias"
      className="py-24 lg:py-32 bg-[#FFFFFF] relative border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header - Editorial Clarity */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
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

          <div className="shrink-0 flex flex-col items-stretch gap-2.5 w-full sm:w-auto">
            {/* Consult Button */}
            <button
              onClick={() => onConsultSolution(currentCategory.id)}
              className="btn-pill-primary text-xs !py-3 !px-5 group cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap w-full"
            >
              <span>{t("consultFor", { name: shortName(currentCategory) })}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Category Select Dropdown */}
            <div className="relative inline-flex items-center w-full">
              <span className="absolute left-3.5 text-[#447D29] pointer-events-none z-10">
                {categoryIcons[activeCategoryId]}
              </span>
              <select
                id="category-selector"
                value={activeCategoryId}
                onChange={(e) => handleSelectCategory(e.target.value)}
                className="appearance-none w-full bg-[#F8FAF6] hover:bg-white text-slate-800 font-bold text-xs sm:text-sm pl-9.5 pr-9 py-2.5 rounded-full border border-slate-300 hover:border-[#447D29] focus:border-[#447D29] focus:outline-hidden focus:ring-2 focus:ring-[#447D29]/20 shadow-2xs cursor-pointer transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-slate-900 bg-white font-medium py-1">
                    {shortName(cat)}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Category Stage: Visual-Dominant Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Dominant Image Card (7 Columns): Immersive, Hero-Grade Photography */}
          <div ref={imageCardRef} className="lg:col-span-7">
            <div className="relative h-[400px] sm:h-[480px] lg:h-[540px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-950">
              <Image
                src={currentCategory.image}
                alt={currentCategory.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
              />

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
              </div>
            </div>
          </div>

          {/* Executive Briefing Card (5 Columns): Clean, Scannable & Action-Oriented */}
          <div ref={briefingCardRef} className="lg:col-span-5 space-y-6">
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

            {/* Segmented Menu Tabs for Beneficios, Aplicaciones, Sistemas */}
            <div className="w-full bg-[#F8FAF6] p-1.5 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-3 gap-1.5">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer select-none whitespace-nowrap ${
                        isActive
                          ? "bg-[#447D29] text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                      }`}
                    >
                      <span className={isActive ? "text-white" : "text-[#447D29]"}>
                        {tab.icon}
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content Display */}
            <div className="min-h-[175px]">
              {/* Beneficios Tab */}
              {activeTab === "benefits" && (
                <div className="space-y-2.5 animate-in fade-in duration-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#447D29]" />
                    {t("benefits")}
                  </h5>
                  <div className="space-y-2">
                    {currentCategory.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Aplicaciones Tab */}
              {activeTab === "applications" && (
                <div className="space-y-2.5 animate-in fade-in duration-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#447D29]" />
                    {t("applications")}
                  </h5>
                  <div className="space-y-2">
                    {currentCategory.applications && currentCategory.applications.length > 0 ? (
                      currentCategory.applications.map((app, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                          <span>{app}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">No applications available</span>
                    )}
                  </div>
                </div>
              )}

              {/* Sistemas Tab */}
              {activeTab === "systems" && (
                <div className="space-y-2.5 animate-in fade-in duration-200">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#447D29]" />
                    {t("brands")}
                  </h5>
                  <div className="space-y-2">
                    {(currentCategory.brandAssociations || []).map((brand, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                        <span>{brand}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
          <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl border border-slate-200 shadow-2xl z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Header (Fixed) */}
            <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-white shrink-0">
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

            {/* Split Master-Detail Dossier Container */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-white">
              {/* Left Column: Technical Challenge & Catalog Index */}
              <div className="w-full md:w-80 shrink-0 bg-white p-4 sm:p-5 flex flex-col gap-3 overflow-y-auto">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {t("modal.dossierIndex", "Índice de Retos Técnicos")}
                  </span>
                </div>

                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1 pb-2 md:pb-0 scrollbar-none">
                  {currentCategory.pillars.map((pillar, idx) => {
                    const isPillarActive = modalView === "pillar" && idx === safePillarIndex;
                    const shortTitle = (pillar as { title: string; shortTitle?: string }).shortTitle || pillar.title;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActivePillarIndex(idx);
                          setModalView("pillar");
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start gap-2.5 shrink-0 md:shrink ${
                          isPillarActive
                            ? "bg-emerald-50 text-emerald-950 font-bold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs leading-snug line-clamp-2">
                            {shortTitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Botanical Color Catalog Tab (If From Nature) */}
                  {currentCategory.id === "from-nature" && (
                    <div className="pt-2 mt-1 w-full shrink-0 md:shrink">
                      <button
                        type="button"
                        onClick={() => setModalView("spectrum")}
                        className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                          modalView === "spectrum"
                            ? "bg-[#447D29] text-white font-bold"
                            : "bg-emerald-50/60 hover:bg-emerald-100/70 text-[#1E3E14] font-semibold"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Palette className="w-4 h-4 shrink-0" />
                          <span className="text-xs leading-tight">
                            {t("modal.dossierTabSpectrum", "Catálogo Cromático Botánico")}
                          </span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Dossier Content Sheet */}
              <div className="flex-1 bg-white p-6 sm:p-8 overflow-y-auto space-y-6">
                {modalView === "pillar" ? (
                  /* Pillar Technical Dossier */
                  <div className="space-y-6 animate-in fade-in duration-200">
                    {/* Header of Dossier */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                          {t("modal.focus", { n: safePillarIndex + 1 })}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {shortName(currentCategory)}
                        </span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial tracking-tight">
                        {activePillar.title}
                      </h4>
                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal pt-1">
                        {activePillar.description}
                      </p>
                    </div>

                    {/* Technical Parameter Matrix (Clean Borderless List) */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-[#447D29]" />
                        {t("modal.params")}
                      </h5>

                      <div className="space-y-1.5">
                        {activePillar.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50/80 transition-colors"
                          >
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-[#EBF3E6] text-[#447D29] flex items-center justify-center shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1">
                              <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                                {pt}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Botanical Color Spectrum View (High-End Catalog) */
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#447D29]">
                            {t("modal.spectrumEyebrow")}
                          </span>
                          <span className="text-slate-300">·</span>
                          <Badge variant="wenda" size="sm">
                            {t("modal.cleanLabel")}
                          </Badge>
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 font-editorial mt-1">
                          {t("modal.spectrumTitle")}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          Pigmentos botánicos de alta pureza libres de números E y de colorantes sintéticos azoicos.
                        </p>
                      </div>
                    </div>

                    {/* Chromatic Family Filter Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[
                        { id: "all", label: t("modal.filterAll", "Todos los Tonos") },
                        { id: "red", label: t("modal.filterRed", "Rojos") },
                        { id: "pink", label: t("modal.filterPink", "Rosas") },
                        { id: "purple", label: t("modal.filterPurple", "Púrpuras") },
                        { id: "blue", label: t("modal.filterBlue", "Azules") },
                        { id: "yellow", label: t("modal.filterYellow", "Amarillos") },
                        { id: "orange", label: t("modal.filterOrange", "Naranjas") }
                      ].map((filter) => {
                        const isSelected = selectedColorFamily === filter.id;
                        return (
                          <button
                            key={filter.id}
                            type="button"
                            onClick={() => setSelectedColorFamily(filter.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#447D29] text-white shadow-2xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                          >
                            {filter.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Enriched Botanical Swatches Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {filteredColors.map((color) => (
                        <NaturalColorSwatch key={color.name} color={color} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Footer (Fixed) */}
            <div className="px-6 py-3.5 sm:px-8 sm:py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{t("modal.onsiteQuestion")} </span>
                {t("modal.onsiteBody")}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
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
