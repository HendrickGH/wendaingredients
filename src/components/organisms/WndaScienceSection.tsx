"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  ShieldCheck
} from "lucide-react";

interface Capability {
  tag?: string;
  title: string;
  desc: string;
}

interface Metric {
  value: string;
  label: string;
}

const INTRO_IMAGE = {
  image: "/images/supplements/clean-science-research.jpg",
  alt: "WNDA Science Biomolecular Research & Advanced Formulation"
};

const CAPABILITY_DETAILS = [
  {
    image: "/images/supplements/supplement-scoop-pure.jpg",
    alt: "Instantized amino acids cold water dispersion test",
    spec: "Solubilidad Inmediata en Agua Fría",
    highlight: "Dispersión completa sin turbidez residual ni separación de fase en bebidas y polvos instantáneos.",
    metricValue: "< 15s",
    metricLabel: "Humectación en Frío"
  },
  {
    image: "/images/supplements/nutraceutical-capsules.jpg",
    alt: "Dispersible vitamins and nutraceutical capsules",
    spec: "Tratamiento de Superficie & Homogeneidad",
    highlight: "Protección térmica y fotostabilidad para mezclas secas, comprimidos y cápsulas duras.",
    metricValue: "0 Grumos",
    metricLabel: "Homogeneidad en Mezclas"
  },
  {
    image: "/images/supplements/biochemical-testing.jpg",
    alt: "Biochemical laboratory testing and analytical validation",
    spec: "Validación por Cromatografía HPLC",
    highlight: "Control estricto de pureza lote por lote, metales pesados y liberación microbiológica.",
    metricValue: "100%",
    metricLabel: "Trazabilidad CoA por Lote"
  },
  {
    image: "/images/supplements/botanical-extracts.jpg",
    alt: "Standardized active botanical extracts",
    spec: "Estandarización de Principios Activos",
    highlight: "Potencia fitoquímica constante y verificada para suplementación y nutracéutica de alta gama.",
    metricValue: "HPLC",
    metricLabel: "Estandarización de Activos"
  }
];

export const WndaScienceSection: React.FC<{ onConsultScience: () => void }> = ({
  onConsultScience
}) => {
  const { t } = useTranslation("wndaScience");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const rawCaps = t("capabilities", { returnObjects: true }) as Capability[];
  const capabilities = Array.isArray(rawCaps) ? rawCaps : [];

  const rawMetrics = t("metrics", { returnObjects: true }) as Metric[];
  const metrics = Array.isArray(rawMetrics) ? rawMetrics : [];

  // Total slides = 1 (Intro) + 4 (Capabilities) = 5 slides
  const totalSlides = 1 + (capabilities.length > 0 ? capabilities.length : CAPABILITY_DETAILS.length);

  // Background slides array
  const ALL_SLIDES = [
    INTRO_IMAGE,
    ...CAPABILITY_DETAILS
  ];

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-advance every 5 seconds; pause on hover or keyboard focus
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalSlides, nextSlide]);

  // Keyboard navigation (Arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  // Active capability data when activeSlide >= 1
  const isIntroSlide = activeSlide === 0;
  const activeCapIdx = Math.max(0, activeSlide - 1);
  const activeCap = capabilities[activeCapIdx] || capabilities[0];
  const activeDetail = CAPABILITY_DETAILS[activeCapIdx] || CAPABILITY_DETAILS[0];

  return (
    <section
      id="science"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative min-h-[640px] lg:min-h-[720px] flex items-center py-20 lg:py-28 overflow-hidden bg-[#0B140B] text-white border-y border-white/10 select-none focus:outline-none"
      aria-roledescription="carousel"
      aria-label="WNDA Science Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      {/* Full-bleed background imagery with cinematic crossfade (TimelineChronicle style) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        {ALL_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlide;
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 z-0 scale-100"
                  : "opacity-0 -z-10 scale-105 pointer-events-none"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="w-full h-full object-cover transition-transform duration-1000"
              />
            </div>
          );
        })}

        {/* Cinematic Multi-Layer Vignettes for Contrast (WCAG AAA Compliance) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B140B] via-transparent to-black/60 z-10" />
      </div>

      {/* Navigation Arrow: Left (Vertically Centered at Far Left) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Slide anterior"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8BE]"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Navigation Arrow: Right (Vertically Centered at Far Right) */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Slide siguiente"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8BE]"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Main Slide Stage Container with Visual Breathing Room */}
      <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-24 relative z-20 w-full">
        {/* SLIDE 0: Overview / Vision Presentation */}
        {isIntroSlide && (
          <div className="space-y-8 animate-fadeIn max-w-4xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9E8BE]">
                  {t("badge")}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-xs font-semibold tracking-wide text-slate-200">
                  {t("eyebrow")}
                </span>
              </div>

              <h2
                id="science-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-[1.10] drop-shadow-md"
              >
                {t("title")}
              </h2>

              <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl drop-shadow-sm">
                {t("subtitle")}
              </p>

              <p className="text-xs sm:text-sm font-bold text-[#D9E8BE] tracking-wider uppercase">
                {t("tagline")}
              </p>
            </div>

            {/* Global Credibility Metrics on Intro Slide */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/15 max-w-3xl">
                {metrics.map((metric, i) => (
                  <div key={i} className="space-y-1 text-left">
                    <span className="text-2xl sm:text-4xl font-extrabold text-[#D9E8BE] font-editorial block tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-xs text-slate-300 font-medium block">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onConsultScience}
                className="btn-pill-primary text-xs !py-3 !px-6 group cursor-pointer inline-flex items-center gap-2 shadow-xl"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="btn-pill-secondary !text-white !border-white/30 hover:!border-white hover:!bg-white/10 text-xs !py-3 !px-6 cursor-pointer"
              >
                Explorar Capacidades
              </button>
            </div>
          </div>
        )}

        {/* SLIDES 1 - 4: Individual Scientific Capabilities */}
        {!isIntroSlide && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fadeIn">
            {/* Left Column: Narrative & Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D9E8BE] text-xs font-bold backdrop-blur-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeDetail.spec}</span>
                </div>

                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                  Capacidad 0{activeCapIdx + 1} de 04 · {activeCap?.tag || t("badge")}
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white leading-tight drop-shadow-md">
                  {activeCap?.title}
                </h3>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                  {activeCap?.desc}
                </p>
              </div>

              {/* Application Performance Callout */}
              <div className="pl-4 border-l-2 border-[#D9E8BE] py-1 max-w-2xl">
                <span className="text-xs font-bold text-[#D9E8BE] uppercase tracking-wider block mb-1">
                  Desempeño en Aplicación
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {activeDetail.highlight}
                </p>
              </div>

              {/* Action Trigger */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onConsultScience}
                  className="btn-pill-primary text-xs !py-3 !px-6 group cursor-pointer inline-flex items-center gap-2 shadow-xl"
                >
                  <span>{t("cta")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="text-xs text-slate-300">
                  {t("customDesc", "Formulaciones personalizadas para polvos, cápsulas y bebidas.")}
                </span>
              </div>
            </div>

            {/* Right Column: Consolidated Glass Proof Card */}
            <div className="lg:col-span-5">
              <div className="bg-black/40 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {activeCap?.tag || t("badge")}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#D9E8BE] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#D9E8BE]" />
                    <span>Grado Validado</span>
                  </div>
                </div>

                {/* Pillar Key Metric */}
                <div className="space-y-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#D9E8BE] font-editorial tracking-tight block">
                    {activeDetail.metricValue}
                  </span>
                  <span className="text-xs text-slate-300 font-medium block">
                    {activeDetail.metricLabel}
                  </span>
                </div>

                {/* Analytical Support Context */}
                <div className="pt-4 border-t border-white/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5 text-[#D9E8BE] shrink-0" />
                    <span>{t("supportTitle", "Validación Analítica Lote por Lote")}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {t("supportDesc")}
                  </p>
                </div>

                {/* CoA Notice */}
                <div className="pt-2 text-[11px] text-slate-400">
                  {t("coaNotice", "Documentación técnica y Certificado de Análisis (CoA) disponibles por lote.")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Centered Carousel Indicator (Position & Interactive Dots) */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        <span className="text-xs font-mono font-medium text-slate-300">
          0{activeSlide + 1} / 0{totalSlides}
        </span>

        <div
          role="tablist"
          aria-label="Selector de slides"
          className="flex items-center gap-2 p-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-md"
        >
          {Array.from({ length: totalSlides }).map((_, i) => {
            const isSelected = activeSlide === i;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={
                  i === 0
                    ? "Slide 1: Visión General WNDA Science"
                    : `Slide ${i + 1}: ${capabilities[i - 1]?.title || "Capacidad"}`
                }
                onClick={() => setActiveSlide(i)}
                className={`transition-all duration-300 cursor-pointer rounded-full relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8BE] ${
                  isSelected
                    ? "w-8 sm:w-10 h-2 bg-white/20"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              >
                {/* 5-second progress indicator inside active dot */}
                {isSelected && (
                  <div
                    key={`dot-progress-${activeSlide}-${isPaused}`}
                    className="h-full bg-[#D9E8BE] rounded-full"
                    style={{
                      width: isPaused ? "100%" : undefined,
                      animation: isPaused ? "none" : "progressBar 5s linear forwards"
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS Keyframes for Progress Bar & Fade Transitions */}
      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.45s ease-out forwards;
        }
      `}</style>
    </section>
  );
};
