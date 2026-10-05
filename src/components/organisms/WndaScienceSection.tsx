"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  interpolate,
  MotionValue
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Droplets,
  Layers,
  Microscope,
  Leaf
} from "lucide-react";

interface Capability {
  tag?: string;
  title: string;
  desc: string;
}

interface CapabilityDetail {
  image: string;
  alt: string;
  spec: string;
  highlight: string;
  metricValue: string;
  metricLabel: string;
  shortLabel: string;
}

// Intro cover image: Scientists research team
const INTRO_IMAGE = {
  image: "/images/supplements/biochemical-testing.jpg",
  alt: "WNDA Science Biomolecular Research & Advanced Formulation Team"
};

// Capabilities details mapped to N slide panels
const DEFAULT_CAPABILITY_DETAILS: CapabilityDetail[] = [
  {
    image: "/images/supplements/supplement-scoop-pure.jpg",
    alt: "Instantized amino acids cold water dispersion test",
    spec: "Solubilidad Inmediata en Agua Fría",
    highlight: "Dispersión completa sin turbidez residual ni separación de fase en bebidas y polvos instantáneos.",
    metricValue: "< 15s",
    metricLabel: "Humectación en Frío",
    shortLabel: "Aminoácidos"
  },
  {
    image: "/images/supplements/nutraceutical-capsules.jpg",
    alt: "Dispersible vitamins and nutraceutical capsules",
    spec: "Tratamiento de Superficie & Homogeneidad",
    highlight: "Protección térmica y fotostabilidad para mezclas secas, comprimidos y cápsulas duras.",
    metricValue: "0 Grumos",
    metricLabel: "Homogeneidad en Mezclas",
    shortLabel: "Vitaminas"
  },
  {
    image: "/images/supplements/molecular-biology-dna.jpg",
    alt: "Biochemical laboratory testing and analytical validation",
    spec: "Validación por Cromatografía HPLC",
    highlight: "Control estricto de pureza lote por lote, metales pesados y liberación microbiológica.",
    metricValue: "100%",
    metricLabel: "Trazabilidad CoA por Lote",
    shortLabel: "Control"
  },
  {
    image: "/images/supplements/botanical-extracts.jpg",
    alt: "Standardized active botanical extracts",
    spec: "Estandarización de Principios Activos",
    highlight: "Potencia fitoquímica constante y verificada para suplementación y nutracéutica de alta gama.",
    metricValue: "HPLC",
    metricLabel: "Estandarización de Activos",
    shortLabel: "Extractos"
  }
];

const CAPABILITY_ICONS = [
  <Droplets key="0" className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />,
  <Layers key="1" className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />,
  <Microscope key="2" className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />,
  <Leaf key="3" className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />
];

interface SlidePanelProps {
  index: number;
  totalPanels: number;
  tCapStart: number;
  smoothProgress: MotionValue<number>;
  cap: Capability;
  detail: CapabilityDetail;
  onConsultScience: () => void;
  ctaText: string;
}

const SlidePanel: React.FC<SlidePanelProps> = ({
  index,
  totalPanels,
  tCapStart,
  smoothProgress,
  cap,
  detail,
  onConsultScience,
  ctaText
}) => {
  const shouldReduceMotion = useReducedMotion();

  // All N panels have the exact same entry and exit lifecycle
  const capRange = 1.0 - tCapStart;
  const segmentDuration = totalPanels > 0 ? capRange / totalPanels : 1;
  const transitionRatio = 0.75; // 75% active scrub transition, 25% stationary reading plateau
  const transitionDuration = segmentDuration * transitionRatio;

  // Entry timing for this panel
  const tStart = tCapStart + index * segmentDuration;
  const tEntryDone = tStart + transitionDuration;

  // Exit timing when the next panel arrives
  const tExitStart = tCapStart + (index + 1) * segmentDuration;
  const tExitDone = Math.min(1.0, tExitStart + transitionDuration);

  // Content choreography:
  // Fade in incoming text/cards only after the panel canvas has covered the screen (>40% of transition)
  const tTextEntryStart = tStart + 0.38 * transitionDuration;
  const tCardEntryStart = tStart + 0.48 * transitionDuration;

  // Fade out outgoing content smoothly when the next panel arrives so cards never collide
  const tContentExitDone = tExitStart + 0.40 * transitionDuration;

  // 1. Container Slide-in & subtle retreat physics (identical for all panels)
  const panelTranslateX = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "0%";
    // Before entry: positioned outside viewport to the right
    if (val <= tStart) return "100%";
    // Entering
    if (val < tEntryDone) {
      const p = (val - tStart) / (tEntryDone - tStart);
      return `${100 * (1 - p)}%`;
    }
    // Stationary reading plateau or final panel
    if (val < tExitStart || index === totalPanels - 1) {
      return "0%";
    }
    // Subtle retreat on exit
    if (val < tExitDone) {
      const p = (val - tExitStart) / (tExitDone - tExitStart);
      return `${-15 * p}%`;
    }
    return "-15%";
  });

  // Brightness dimming during retreat
  const panelFilter = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion || index === totalPanels - 1) return "brightness(1)";
    if (val <= tExitStart) return "brightness(1)";
    if (val >= tExitDone) return "brightness(0.6)";
    const p = (val - tExitStart) / (tExitDone - tExitStart);
    return `brightness(${1 - 0.4 * p})`;
  });

  // 2. Parallax Background: slightly oversized (116%) so shifting by 5% never leaves empty gaps
  const bgTranslateX = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "0%";
    if (val <= tStart) return "5%";
    if (val >= tEntryDone) return "0%";
    const p = (val - tStart) / (tEntryDone - tStart);
    return `${5 * (1 - p)}%`;
  });

  // 3. Editorial Column Reveal (floats in with translateY and opacity once panel canvas has entered)
  const textTranslateY = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "0px";
    if (val <= tTextEntryStart) return "24px";
    if (val >= tEntryDone) return "0px";
    const p = (val - tTextEntryStart) / (tEntryDone - tTextEntryStart);
    return `${Math.round(24 * (1 - p))}px`;
  });

  const textOpacity = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return 1;
    // Before text entrance (prevents text from being clipped by panel leading edge)
    if (val <= tTextEntryStart) return 0;
    // Text entering
    if (val < tEntryDone) {
      return (val - tTextEntryStart) / (tEntryDone - tTextEntryStart);
    }
    // Reading plateau
    if (val <= tExitStart || index === totalPanels - 1) return 1;
    // Exiting when next panel arrives (smooth fade out avoids visual collision)
    if (val < tContentExitDone) {
      return 1 - (val - tExitStart) / (tContentExitDone - tExitStart);
    }
    return 0;
  });

  // 4. Floating Metrics Card Reveal (staggered float in and graceful exit fade)
  const cardTranslateY = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "0px";
    if (val <= tCardEntryStart) return "30px";
    if (val >= tEntryDone) return "0px";
    const p = (val - tCardEntryStart) / (tEntryDone - tCardEntryStart);
    return `${Math.round(30 * (1 - p))}px`;
  });

  const cardOpacity = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return 1;
    // Before card entrance
    if (val <= tCardEntryStart) return 0;
    // Card entering
    if (val < tEntryDone) {
      return (val - tCardEntryStart) / (tEntryDone - tCardEntryStart);
    }
    // Reading plateau
    if (val <= tExitStart || index === totalPanels - 1) return 1;
    // Exiting when next panel arrives
    if (val < tContentExitDone) {
      return 1 - (val - tExitStart) / (tContentExitDone - tExitStart);
    }
    return 0;
  });

  return (
    <motion.div
      style={{
        x: panelTranslateX,
        filter: panelFilter,
        zIndex: 20 + index * 10,
        willChange: "transform"
      }}
      className="absolute inset-0 w-full h-full overflow-hidden select-none bg-black"
    >
      {/* Background Imagery with Subtle Depth */}
      <motion.div
        style={{
          x: bgTranslateX,
          willChange: "transform"
        }}
        className="absolute -inset-x-[8%] inset-y-0 w-[116%] h-full pointer-events-none"
      >
        <Image
          src={detail.image}
          alt={detail.alt}
          fill
          priority={index === 0}
          sizes="120vw"
          className="object-cover"
        />
        {/* Refined Contrast Overlays (bright, vivid photography with crisp text contrast) */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
      </motion.div>

      {/* Grid Layout (Fluid 12 Columns, padding: 4vh 5vw) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5vw] py-[4vh]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2vw] items-center w-full max-w-7xl mx-auto">
          {/* Left Editorial Block (Columns 1 to 7) */}
          <motion.div
            style={{
              y: textTranslateY,
              opacity: textOpacity,
              willChange: "transform, opacity"
            }}
            className="lg:col-span-7 space-y-5 text-white"
          >
            {/* Spec Validation Header (clean, without pills/badges) */}
            <div className="flex items-center gap-2 text-[#D9E8BE] text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{detail.spec}</span>
            </div>

            {/* Main Capability Title */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-editorial text-white tracking-tight leading-[1.10] drop-shadow-2xl">
              {cap?.title}
            </h2>

            {/* Description Copy */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-md">
              {cap?.desc}
            </p>

            {/* Application Performance Callout */}
            <div className="flex items-start gap-3 max-w-2xl py-1">
              {CAPABILITY_ICONS[index % CAPABILITY_ICONS.length]}
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#D9E8BE] uppercase tracking-wider block">
                  Desempeño en Aplicación
                </span>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {detail.highlight}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onConsultScience}
                className="btn-pill-primary text-xs !py-3 !px-7 group cursor-pointer inline-flex items-center gap-2.5 shadow-2xl hover:scale-105 active:scale-95 transition-all"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Analytical Floating Card (Columns 8 to 12) */}
          <motion.div
            style={{
              y: cardTranslateY,
              opacity: cardOpacity,
              willChange: "transform, opacity"
            }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-950/70 border border-white/20 backdrop-blur-2xl shadow-2xl space-y-6 text-white overflow-hidden">
              <div
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full pointer-events-none opacity-30"
                style={{
                  background: "radial-gradient(circle, rgba(217,232,190,0.3) 0%, transparent 70%)"
                }}
              />

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D9E8BE]">
                  Métrica de Desempeño
                </span>
                <h3 className="text-lg font-bold font-editorial text-white">
                  Ficha Técnica & Validación
                </h3>
              </div>

              {/* Big KPI Metric Display */}
              <div className="py-4 px-5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-3xl sm:text-5xl font-extrabold text-[#D9E8BE] font-editorial block tracking-tight">
                  {detail.metricValue}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-300 block">
                  {detail.metricLabel}
                </span>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#D9E8BE] shrink-0 animate-pulse" />
                  <span>Certificación y Trazabilidad CoA garantizada por lote</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#D9E8BE] shrink-0" />
                  <span>Control de impurezas y pureza analítica conforme a USP / FCC</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const WndaScienceSection: React.FC<{ onConsultScience: () => void }> = ({
  onConsultScience
}) => {
  const { t } = useTranslation("wndaScience");
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rawCaps = t("capabilities", { returnObjects: true }) as Capability[];
  const capabilities = Array.isArray(rawCaps) && rawCaps.length > 0
    ? rawCaps
    : DEFAULT_CAPABILITY_DETAILS.map(d => ({
        title: d.shortLabel,
        desc: d.highlight,
        tag: "WNDA Science"
      }));

  const totalPanels = capabilities.length || 4;

  // Continuous Scroll Progress across Master Container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Timeline allocation:
  // [0.0, 0.20]: Intro frame expansion to full screen + Slogan title display
  // [0.20, 1.0]: N slide panel transitions (Slide 01 -> Slide 02 -> Slide 03 -> Slide 04)
  const tCapStart = 0.20;
  const capRange = 1.0 - tCapStart;
  const segmentDuration = totalPanels > 0 ? capRange / totalPanels : 1;
  const transitionRatio = 0.75;
  const introRetreatDuration = segmentDuration * transitionRatio;

  // Interpolators for Phase 1: Expanding Frame
  const desktopClipInterp = useRef(
    interpolate(
      [0, 0.15],
      ["inset(18% 36% 18% 36% round 28px)", "inset(0% 0% 0% 0% round 0px)"],
      { clamp: true }
    )
  ).current;

  const mobileClipInterp = useRef(
    interpolate(
      [0, 0.15],
      ["inset(20% 10% 20% 10% round 16px)", "inset(0% 0% 0% 0% round 0px)"],
      { clamp: true }
    )
  ).current;

  const introClipPath = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "inset(0% 0% 0% 0% round 0px)";
    return isMobile ? mobileClipInterp(val) : desktopClipInterp(val);
  });

  const introImageScale = useTransform(smoothProgress, [0, 0.15, 0.35], [1.08, 1.0, 1.03]);

  // Frame drop shadow fades as it reaches full screen
  const introFrameShadow = useTransform(smoothProgress, (val) => {
    if (val >= 0.15) return "drop-shadow(0 0 0 rgba(0,0,0,0))";
    const p = Math.max(0, 1 - val / 0.15);
    return `drop-shadow(0 ${25 * p}px ${50 * p}px rgba(0,0,0,${0.2 * p}))`;
  });

  // Intro retreat when Panel 01 slides in (identical retreat physics to sibling panels)
  const introTranslateX = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "0%";
    if (val <= tCapStart) return "0%";
    if (val >= tCapStart + introRetreatDuration) return "-15%";
    const p = (val - tCapStart) / introRetreatDuration;
    return `${-15 * p}%`;
  });

  const introFilter = useTransform(smoothProgress, (val) => {
    if (shouldReduceMotion) return "brightness(1)";
    if (val <= tCapStart) return "brightness(1)";
    if (val >= tCapStart + introRetreatDuration) return "brightness(0.6)";
    const p = (val - tCapStart) / introRetreatDuration;
    return `brightness(${1 - 0.4 * p})`;
  });

  // Only the H2 slogan title appears on the intro screen (no container box, no badges, no extra copy)
  // And it dissolves cleanly before Panel 01's content enters
  const introTitleOpacity = useTransform(smoothProgress, (val) => {
    if (val <= 0.04) return 0;
    if (val < 0.14) return (val - 0.04) / 0.10;
    if (val <= tCapStart) return 1;
    if (val < tCapStart + 0.40 * introRetreatDuration) {
      return 1 - (val - tCapStart) / (0.40 * introRetreatDuration);
    }
    return 0;
  });

  const introTitleTranslateY = useTransform(smoothProgress, [0.04, 0.14, tCapStart, tCapStart + 0.40 * introRetreatDuration], ["20px", "0px", "0px", "-20px"]);

  const ctaText = t("cta", "Consultar con Especialista WNDA");

  // Reduced motion: standard accessible static layout
  if (shouldReduceMotion) {
    return (
      <section
        id="science"
        className="relative py-20 bg-black text-white border-y border-white/10"
        aria-label="WNDA Science Showcase"
      >
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl sm:text-6xl font-bold font-editorial text-white">
              Conectamos Conocimiento Científico
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, i) => {
              const detail = DEFAULT_CAPABILITY_DETAILS[i] || DEFAULT_CAPABILITY_DETAILS[0];
              return (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="text-[#D9E8BE] font-bold text-xs uppercase">{detail.spec}</span>
                  <h3 className="text-2xl font-editorial font-bold text-white">{cap.title}</h3>
                  <p className="text-slate-300 text-sm">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Master container height: 1 intro stage + N panels (e.g. 500vh for N = 4)
  const masterContainerHeight = `${(1 + totalPanels) * 100}vh`;

  return (
    <section
      id="science"
      ref={containerRef}
      style={{ height: masterContainerHeight }}
      className="relative w-full bg-white select-none focus:outline-none"
      aria-label="WNDA Science Interactive Showcase"
    >
      {/* Sticky Stage: 100vw x 100vh pinned stage */}
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-black">
        {/* Intro Cover Stage (Scientists Image + H2 only, with subtle retreat) */}
        <motion.div
          style={{
            x: introTranslateX,
            filter: introFilter,
            zIndex: 10,
            willChange: "transform"
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-white"
        >
          {/* Expanding Clip-Path Frame */}
          <motion.div
            style={{
              clipPath: introClipPath,
              filter: introFrameShadow,
              willChange: "clip-path"
            }}
            className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          >
            {/* Background Imagery with Subtle Zoom */}
            <motion.div
              style={{
                scale: introImageScale,
                willChange: "transform"
              }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={INTRO_IMAGE.image}
                alt={INTRO_IMAGE.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              {/* Refined Contrast Overlays for Text Legibility */}
              <div className="absolute inset-0 bg-black/35 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />
            </motion.div>
          </motion.div>

          {/* Slogan H2 Only: no container box, no badges, no extra copy */}
          <motion.div
            style={{
              opacity: introTitleOpacity,
              y: introTitleTranslateY,
              willChange: "transform, opacity"
            }}
            className="relative z-20 flex flex-col items-center justify-center px-6 sm:px-12 text-center max-w-5xl mx-auto pointer-events-none"
          >
            <h2
              id="science-heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-bold font-editorial text-white tracking-tight leading-[1.10] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              Conectamos Conocimiento Científico
            </h2>
          </motion.div>
        </motion.div>

        {/* Render stacked capability slide panels (Slide 01 -> Slide 04 all enter with identical physics) */}
        {Array.from({ length: totalPanels }).map((_, idx) => {
          const detail = DEFAULT_CAPABILITY_DETAILS[idx] || DEFAULT_CAPABILITY_DETAILS[0];
          const cap = capabilities[idx] || {
            title: detail.shortLabel,
            desc: detail.highlight,
            tag: "WNDA Science"
          };
          return (
            <SlidePanel
              key={idx}
              index={idx}
              totalPanels={totalPanels}
              tCapStart={tCapStart}
              smoothProgress={smoothProgress}
              cap={cap}
              detail={detail}
              onConsultScience={onConsultScience}
              ctaText={ctaText}
            />
          );
        })}
      </div>
    </section>
  );
};
