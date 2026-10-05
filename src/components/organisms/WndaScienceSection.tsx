"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  interpolate
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ChevronDown
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
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [, startTransition] = useTransition();

  const [activeCapIdx, setActiveCapIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive frame detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rawCaps = t("capabilities", { returnObjects: true }) as Capability[];
  const capabilities = Array.isArray(rawCaps) ? rawCaps : [];

  const rawMetrics = t("metrics", { returnObjects: true }) as Metric[];
  const metrics = Array.isArray(rawMetrics) ? rawMetrics : [];

  const totalCaps = capabilities.length > 0 ? capabilities.length : CAPABILITY_DETAILS.length;
  const activeCap = capabilities[activeCapIdx] || capabilities[0];
  const activeDetail = CAPABILITY_DETAILS[activeCapIdx] || CAPABILITY_DETAILS[0];

  // Scroll tracking across the 300vh wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Inertial spring for scrub: 1 feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001
  });

  // Pre-compiled interpolators for clip-path mask (0% to 35%: frame expands to 100% full screen)
  const desktopClipInterp = useRef(
    interpolate(
      [0, 0.35],
      ["inset(18% 36% 18% 36% round 28px)", "inset(0% 0% 0% 0% round 0px)"],
      { clamp: true }
    )
  ).current;

  const mobileClipInterp = useRef(
    interpolate(
      [0, 0.35],
      ["inset(20% 12% 20% 12% round 16px)", "inset(0% 0% 0% 0% round 0px)"],
      { clamp: true }
    )
  ).current;

  // Mask expansion (0% -> 35%)
  const clipPath = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "inset(0% 0% 0% 0% round 0px)";
    return isMobile ? mobileClipInterp(val) : desktopClipInterp(val);
  });

  // Subtle image zoom for depth
  const imageScale = useTransform(smoothProgress, [0, 0.35, 1], [1.08, 1.0, 1.04]);

  // Contrast overlay: 0 while expanding, darkens after full expansion for text readability
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.48, 0.65, 1],
    [0, 0, 0.45, 0.70, 0.80]
  );

  // Phase 1 -> 2: Hero Statement (Only enters AFTER full expansion: 0.35 -> 0.48, holds to 0.62, fades 0.62 -> 0.72)
  const heroOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.48, 0.62, 0.72],
    [0, 0, 1, 1, 0]
  );
  const heroTranslateY = useTransform(
    smoothProgress,
    [0, 0.35, 0.48, 0.62, 0.72],
    ["30px", "30px", "0px", "0px", "-30px"]
  );
  const heroPointerEvents = useTransform(smoothProgress, (val) =>
    val >= 0.35 && val < 0.70 ? "auto" : "none"
  );

  // Phase 3: Secondary Content Group (Enters 0.70 -> 0.82, holds through 1.0)
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 0.70, 0.82, 1],
    [0, 0, 1, 1]
  );
  const contentTranslateY = useTransform(
    smoothProgress,
    [0, 0.70, 0.82, 1],
    ["30px", "30px", "0px", "0px"]
  );
  const contentPointerEvents = useTransform(smoothProgress, (val) =>
    val >= 0.70 ? "auto" : "none"
  );

  // Scroll indicator hint (fades out as scroll starts)
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

  // Navigation handlers for Phase 3 capabilities
  const nextCapability = () => {
    startTransition(() => {
      setActiveCapIdx((prev) => (prev + 1) % totalCaps);
    });
  };

  const prevCapability = () => {
    startTransition(() => {
      setActiveCapIdx((prev) => (prev - 1 + totalCaps) % totalCaps);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevCapability();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextCapability();
    }
  };

  // If user requests reduced motion, deliver a static, fully expanded presentation
  if (shouldReduceMotion) {
    return (
      <section
        id="science"
        className="relative min-h-[700px] flex items-center py-20 lg:py-28 bg-black text-white border-y border-white/10"
        aria-label="WNDA Science Showcase"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <Image
            src={INTRO_IMAGE.image}
            alt={INTRO_IMAGE.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-[#D9E8BE]">
              <span>{t("badge")}</span>
              <span>·</span>
              <span className="text-white/80">{t("eyebrow")}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-editorial text-white leading-tight">
              {t("title")}
            </h2>
            <p className="text-base sm:text-lg text-slate-200">{t("subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-white/15">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-wider text-[#D9E8BE] font-bold">
                {activeCap?.tag || t("badge")}
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-editorial text-white">
                {activeCap?.title}
              </h3>
              <p className="text-base text-slate-200">{activeCap?.desc}</p>
              <div className="pl-4 border-l-2 border-[#D9E8BE] py-1">
                <p className="text-sm text-slate-300">{activeDetail.highlight}</p>
              </div>
              <button
                type="button"
                onClick={onConsultScience}
                className="btn-pill-primary text-xs !py-3 !px-6 inline-flex items-center gap-2"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="lg:col-span-5 bg-black/50 border border-white/20 rounded-3xl p-6 backdrop-blur-md">
              <span className="text-4xl font-bold font-editorial text-[#D9E8BE] block">
                {activeDetail.metricValue}
              </span>
              <span className="text-xs text-slate-300 block mb-4">
                {activeDetail.metricLabel}
              </span>
              <p className="text-xs text-slate-400">{t("supportDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="science"
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative h-[280vh] sm:h-[300vh] bg-white select-none focus:outline-none"
      aria-label="WNDA Science Interactive Showcase"
    >
      {/* Pinned Stage: Sticky 100vh / 100dvh viewport container */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center border-y border-slate-200 bg-white">
        {/* Central Vertical Expanding Frame (Mask / Clip-path Scrub) */}
        <motion.div
          style={{
            clipPath,
            willChange: "clip-path",
            filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.18))"
          }}
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        >
          {/* Main Background Image */}
          <motion.div
            style={{
              scale: imageScale,
              willChange: "transform"
            }}
            className="relative w-full h-full"
          >
            <Image
              src={INTRO_IMAGE.image}
              alt={INTRO_IMAGE.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Dynamic Contrast Overlay: 0 at start, progressively darkens in Phase 3 */}
          <motion.div
            style={{
              opacity: overlayOpacity,
              willChange: "opacity"
            }}
            className="absolute inset-0 bg-black pointer-events-none"
          />
        </motion.div>

        {/* LAYER 1: Hero Statement (0% to 45% visible, fades 45% -> 60%) */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroTranslateY,
            pointerEvents: heroPointerEvents,
            willChange: "transform, opacity"
          }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-12 text-center z-20 max-w-5xl mx-auto"
        >
          <div className="space-y-6 max-w-4xl mx-auto text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg">
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
              className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-[1.10] drop-shadow-2xl"
            >
              {t("title")}
            </h2>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal max-w-3xl mx-auto drop-shadow-md">
              {t("subtitle")}
            </p>

            <p className="text-xs sm:text-sm font-bold text-[#D9E8BE] tracking-wider uppercase drop-shadow-sm">
              {t("tagline")}
            </p>

            {/* Global Credibility Metrics Summary */}
            {metrics.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/15 max-w-3xl mx-auto">
                {metrics.map((metric, i) => (
                  <div key={i} className="space-y-1 text-center">
                    <span className="text-xl sm:text-3xl font-extrabold text-[#D9E8BE] font-editorial block tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-300 font-medium block">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Scroll Cue Indicator (Phase 1) */}
        <motion.div
          style={{
            opacity: scrollIndicatorOpacity,
            willChange: "opacity"
          }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="text-[11px] uppercase tracking-widest text-slate-800 font-mono font-bold">
            Desliza para explorar
          </span>
          <ChevronDown className="w-4 h-4 text-[#447D29] animate-bounce" />
        </motion.div>

        {/* LAYER 2: Secondary Content Group (Phase 3: 60% to 100%) */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentTranslateY,
            pointerEvents: contentPointerEvents,
            willChange: "transform, opacity"
          }}
          className="absolute inset-0 flex items-center justify-center z-20 w-full"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Narrative, CTA & Paginator */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#D9E8BE] text-xs font-bold backdrop-blur-md">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeDetail.spec}</span>
                  </div>

                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Capacidad 0{activeCapIdx + 1} de 0{totalCaps} · {activeCap?.tag || t("badge")}
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-white leading-tight drop-shadow-md">
                    {activeCap?.title}
                  </h3>

                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal">
                    {activeCap?.desc}
                  </p>
                </div>

                {/* Application Performance Callout */}
                <div className="pl-4 border-l-2 border-[#D9E8BE] py-1 max-w-2xl bg-white/[0.02] rounded-r-lg">
                  <span className="text-xs font-bold text-[#D9E8BE] uppercase tracking-wider block mb-1">
                    Desempeño en Aplicación
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeDetail.highlight}
                  </p>
                </div>

                {/* CTA Action Row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={onConsultScience}
                    className="btn-pill-primary text-xs !py-3 !px-6 group cursor-pointer inline-flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>{t("cta")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-xs text-slate-300">
                    {t("customDesc", "Formulaciones personalizadas para polvos, cápsulas y bebidas.")}
                  </span>
                </div>

                {/* Paginator / Tab Switcher (Interactive Scrubbing Complement) */}
                <div className="pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                  {/* Tab Pills */}
                  <div
                    role="tablist"
                    aria-label="Capacidades de WNDA Science"
                    className="flex flex-wrap items-center gap-2"
                  >
                    {Array.from({ length: totalCaps }).map((_, idx) => {
                      const isSelected = activeCapIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          onClick={() => {
                            startTransition(() => {
                              setActiveCapIdx(idx);
                            });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8BE] ${
                            isSelected
                              ? "bg-[#D9E8BE] text-black font-bold shadow-md"
                              : "bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10"
                          }`}
                        >
                          0{idx + 1} {capabilities[idx]?.title ? capabilities[idx].title.split(" ")[0] : `Pilar`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Previous / Next Arrow Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevCapability}
                      aria-label="Capacidad anterior"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8BE]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextCapability}
                      aria-label="Capacidad siguiente"
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9E8BE]"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Consolidated Glass Proof Card */}
              <div className="lg:col-span-5">
                <div className="bg-black/50 border border-white/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
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
                    {t(
                      "coaNotice",
                      "Documentación técnica y Certificado de Análisis (CoA) disponibles por lote."
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
