"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteContent } from "@/i18n/useSiteContent";
import { Badge } from "../atoms/Badge";
import { IndentIndustry } from "@/data/siteContent";
import {
  Globe,
  Ship,
  Search,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Check,
  ArrowUpRight,
  Layers
} from "lucide-react";

interface WendaIndentSectionProps {
  onSelectIndustry: (ind: IndentIndustry) => void;
  onRequestQuote: (industryName?: string) => void;
}

const STEP_ICONS = [Search, Globe, ShieldCheck, Ship, TrendingUp];
const STEP_HEIGHTS = ["lg:h-10", "lg:h-20", "lg:h-30", "lg:h-40", "lg:h-52"];

export const WendaIndentSection: React.FC<WendaIndentSectionProps> = ({
  onSelectIndustry,
  onRequestQuote
}) => {
  const { t } = useTranslation("wendaIndent");
  const { industries, indentSteps } = useSiteContent();

  // GSAP Animation Refs
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const diagramHeaderRef = useRef<HTMLDivElement>(null);
  const staircaseDesktopRef = useRef<HTMLDivElement>(null);
  const staircaseMobileRef = useRef<HTMLDivElement>(null);
  const catalogHeaderRef = useRef<HTMLDivElement>(null);
  const industryCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastCardRef = useRef<HTMLDivElement>(null);

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

      // 2. Diagram Sub-Header entrance
      if (diagramHeaderRef.current) {
        gsap.fromTo(
          diagramHeaderRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: diagramHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Stepped Staircase Diagram (Desktop)
      if (staircaseDesktopRef.current) {
        const columns = staircaseDesktopRef.current.children;
        gsap.fromTo(
          columns,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: staircaseDesktopRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 4. Stepped Staircase Diagram (Mobile)
      if (staircaseMobileRef.current) {
        const mobileSteps = staircaseMobileRef.current.children;
        gsap.fromTo(
          mobileSteps,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: staircaseMobileRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 5. Catálogo Multidisciplinario Header
      if (catalogHeaderRef.current) {
        gsap.fromTo(
          catalogHeaderRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: catalogHeaderRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 6. Responsive Catálogo Multidisciplinario Animation Matrix
      const mm = gsap.matchMedia();

      // Mobile (< 768px): pure vertical motion without horizontal translation (prevents touch scroll jank)
      mm.add("(max-width: 767px)", () => {
        industryCardsRef.current.forEach((cardEl) => {
          if (!cardEl) return;
          gsap.fromTo(
            cardEl,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 88%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        if (lastCardRef.current) {
          gsap.fromTo(
            lastCardRef.current,
            { opacity: 0, y: 35 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: lastCardRef.current,
                start: "top 88%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      // Tablet (768px to 1023px): subtle lateral offset with smooth entrance for all cards
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        industryCardsRef.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const isEven = idx % 2 === 0;
          gsap.fromTo(
            cardEl,
            { opacity: 0, y: 40, x: isEven ? -16 : 16 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        if (lastCardRef.current) {
          gsap.fromTo(
            lastCardRef.current,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              scrollTrigger: {
                trigger: lastCardRef.current,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

      // Desktop (>= 1024px): staggered reveal with last card pinned until #faq
      mm.add("(min-width: 1024px)", () => {
        industryCardsRef.current.forEach((cardEl, idx) => {
          if (!cardEl || idx === industries.length - 1) return;
          const isEven = idx % 2 === 0;
          gsap.fromTo(
            cardEl,
            { opacity: 0, y: 45, x: isEven ? -25 : 25 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardEl,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        if (lastCardRef.current) {
          ScrollTrigger.create({
            trigger: lastCardRef.current,
            start: "top 10%",
            endTrigger: "#faq",
            end: "top top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [industries.length]);

  return (
    <section
      ref={sectionRef}
      id="indent"
      className="pt-24 lg:pt-32 pb-8 lg:pb-12 bg-[#FFFFFF] relative border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-24">
        {/* Header - Editorial Style */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="wenda" size="md">
                {t("badge")}
              </Badge>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-[#2F591B] uppercase tracking-wider">
                {t("subBadge")}
              </span>
            </div>
            <h2 className="heading-editorial-lg font-editorial text-slate-900">
              {t("title")}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t("subtitle")}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onRequestQuote("Wenda Indent General")}
              className="btn-pill-primary text-xs !py-3.5 !px-6 group cursor-pointer"
            >
              <span>{t("ctaQuote")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 5-Step Indent Methodology - Stepped Staircase Diagram */}
        <div className="space-y-10">
          <div ref={diagramHeaderRef} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#447D29]">
                <Layers className="w-4 h-4" />
                <span>{t("diagramBadge")}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial mt-1 flex items-center gap-2">
                <Ship className="w-5 h-5 text-[#447D29]" />
                {t("diagramTitle")}
              </h3>
            </div>
          </div>

          {/* Desktop Staircase Layout (lg and above) */}
          <div ref={staircaseDesktopRef} className="hidden lg:grid lg:grid-cols-5 gap-4 xl:gap-5 items-end pt-4">
            {indentSteps.map((stepItem, idx) => {
              const StepIcon = STEP_ICONS[idx % STEP_ICONS.length];
              const pedestalHeight = STEP_HEIGHTS[idx % STEP_HEIGHTS.length];
              const stepNum = String(idx + 1).padStart(2, "0");

              return (
                <div key={stepNum} className="group relative flex flex-col justify-end">
                  {/* Step Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-[#447D29]/60 hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between h-[360px] relative z-10">
                    <div className="space-y-3">
                      {/* Top Header of Card */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#EBF4E5] text-[#447D29] font-bold text-xs group-hover:scale-110 group-hover:bg-[#447D29] group-hover:text-white transition-all duration-300 shadow-2xs">
                          {stepNum}
                        </span>
                        <div className="p-2 rounded-xl bg-slate-50 text-[#447D29] group-hover:bg-[#447D29] group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                          <StepIcon className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#447D29]">
                          {stepItem.step}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#447D29] transition-colors leading-snug">
                          {stepItem.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {stepItem.description}
                      </p>
                    </div>

                    {/* Deliverable Resource & Meter */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <div className="bg-slate-50 group-hover:bg-[#F0F7ED] border border-slate-200/60 group-hover:border-[#447D29]/30 rounded-xl p-2.5 transition-colors">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                          {t("deliverableLabel")}
                        </span>
                        <p className="text-[11px] font-medium text-slate-700 leading-tight">
                          {stepItem.description}
                        </p>
                      </div>

                      {/* 5-bar step gauge */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                          <span>{stepItem.step}</span>
                          <span>{idx + 1}/5</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1">
                          {[0, 1, 2, 3, 4].map((barIdx) => (
                            <div
                              key={barIdx}
                              className={`h-1.5 rounded-full transition-all duration-500 ${
                                barIdx <= idx
                                  ? "bg-[#447D29] group-hover:bg-[#2F591B] group-hover:scale-y-125"
                                  : "bg-slate-100"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stepped Pedestal Block underneath */}
                  <div
                    className={`w-full ${pedestalHeight} rounded-b-2xl border-x border-b border-slate-200/80 bg-gradient-to-b from-slate-100 via-slate-100/80 to-slate-200/50 flex flex-col items-center justify-center p-2 text-center transition-all duration-400 group-hover:from-[#EBF4E5] group-hover:to-[#D9E8BE]/80 group-hover:border-[#447D29]/50 shadow-2xs group-hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#2F591B] transition-colors">
                      <span>Nivel {idx + 1}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-[#447D29] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Staircase Layout (< lg) */}
          <div ref={staircaseMobileRef} className="lg:hidden relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-[#447D29] before:via-slate-300 before:to-[#447D29]">
            {indentSteps.map((stepItem, idx) => {
              const StepIcon = STEP_ICONS[idx % STEP_ICONS.length];
              const stepNum = String(idx + 1).padStart(2, "0");

              return (
                <div key={stepNum} className="relative group">
                  {/* Step Node Marker */}
                  <div className="absolute -left-6 top-5 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-[#447D29] flex items-center justify-center text-[10px] font-bold text-[#447D29] shadow-xs">
                    {stepNum}
                  </div>

                  {/* Mobile Card */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[#EBF4E5] text-[#447D29]">
                          <StepIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                          {stepItem.step}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded-md text-slate-500">
                        Nivel {idx + 1}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {stepItem.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {stepItem.description}
                    </p>

                    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        {t("deliverableLabel")}
                      </span>
                      <p className="text-xs font-medium text-slate-700">
                        {stepItem.description}
                      </p>
                    </div>

                    {/* Progress bars */}
                    <div className="grid grid-cols-5 gap-1 pt-1">
                      {[0, 1, 2, 3, 4].map((barIdx) => (
                        <div
                          key={barIdx}
                          className={`h-1.5 rounded-full ${
                            barIdx <= idx ? "bg-[#447D29]" : "bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Catálogo Multidisciplinario / Soluciones por Industria */}
        <div className="space-y-16">
          <div ref={catalogHeaderRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6">
            <div>
              <span className="text-xs uppercase text-[#447D29] tracking-wider font-bold">
                {t("catalogEyebrow")}
              </span>
              <h3 className="heading-editorial-md font-editorial text-slate-900 mt-0.5">
                {t("catalogTitle")}
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-medium max-w-md sm:text-right">
              {t("catalogSubtitle")}
            </p>
          </div>

          <div className="space-y-20 lg:space-y-28">
            {industries.map((ind, index) => {
              const isEven = index % 2 === 0;
              const isLast = index === industries.length - 1;

              if (isLast) {
                return (
                  <div
                    key={ind.id}
                    ref={lastCardRef}
                    className="relative z-10 bg-white pt-2 pb-4 space-y-8"
                  >
                    <div
                      className={`group flex flex-col ${
                        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                      } items-stretch gap-8 lg:gap-12 xl:gap-16`}
                    >
                      <div className="w-full lg:w-[68%] xl:w-[70%] shrink-0">
                        <div
                          onClick={() => onSelectIndustry(ind)}
                          className="relative h-[320px] sm:h-[400px] lg:h-[420px] xl:h-[460px] w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 bg-slate-900 cursor-pointer"
                        >
                          <Image
                            src={ind.image}
                            alt={ind.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                            <div>
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                                {t("sectorLabel")}
                              </span>
                              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-editorial">
                                {ind.name}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full lg:w-[32%] xl:w-[30%] flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                              Catálogo Técnico 0{index + 1}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-500 font-medium">
                              {t("rawMaterialsCount", { count: ind.items.length })}
                            </span>
                          </div>

                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 font-editorial tracking-tight">
                            {ind.name}
                          </h3>

                          <p className="text-sm text-slate-600 leading-relaxed font-normal">
                            {ind.description}
                          </p>

                          <div className="pt-2 space-y-2.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                              {t("keySolutionsLabel")}
                            </span>
                            <div className="space-y-2">
                              {ind.items.slice(0, 4).map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EBF4E5] text-[#447D29]">
                                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                                  </span>
                                  <span className="font-medium text-slate-700 leading-snug">{item}</span>
                                </div>
                              ))}
                              {ind.items.length > 4 && (
                                <p className="text-[11px] text-[#447D29] font-bold pl-6 pt-0.5">
                                  {t("moreItems", { count: ind.items.length - 4 })}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                          <button
                            onClick={() => onSelectIndustry(ind)}
                            className="btn-pill-primary text-xs !py-3 !px-5 flex items-center justify-center gap-2 group/btn cursor-pointer w-full"
                          >
                            <span>{t("viewFullCatalog")}</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <button
                            onClick={() => onRequestQuote(ind.name)}
                            className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer text-center w-full"
                          >
                            {t("ctaQuote")}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Closing Call to Action Strip (Kept inside lastCardRef so it stays pinned together) */}
                    <div className="pt-2">
                      <div className="rounded-2xl bg-[#F8FAF6] border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
                        <div className="space-y-1 text-center sm:text-left">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#447D29]">
                            Atención Directa Wenda Indent
                          </span>
                          <p className="text-base sm:text-lg font-bold font-editorial text-slate-900">
                            {t("closingCall", "Cuéntanos qué ingrediente, materia prima o solución industrial estás buscando.")}
                          </p>
                        </div>
                        <button
                          onClick={() => onRequestQuote("Búsqueda Especializada de Materia Prima")}
                          className="btn-pill-primary text-xs !py-3 !px-6 whitespace-nowrap cursor-pointer shrink-0"
                        >
                          <span>{t("ctaQuote")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={ind.id}
                  ref={(el) => {
                    industryCardsRef.current[index] = el;
                  }}
                  className={`group flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-stretch gap-8 lg:gap-12 xl:gap-16`}
                >
                  <div className="w-full lg:w-[68%] xl:w-[70%] shrink-0">
                    <div
                      onClick={() => onSelectIndustry(ind)}
                      className="relative h-[320px] sm:h-[400px] lg:h-[460px] xl:h-[500px] w-full rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 bg-slate-900 cursor-pointer"
                    >
                      <Image
                        src={ind.image}
                        alt={ind.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                            {t("sectorLabel")}
                          </span>
                          <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-editorial">
                            {ind.name}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-[32%] xl:w-[30%] flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                          Catálogo Técnico 0{index + 1}
                        </span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-500 font-medium">
                          {t("rawMaterialsCount", { count: ind.items.length })}
                        </span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 font-editorial tracking-tight">
                        {ind.name}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {ind.description}
                      </p>

                      <div className="pt-2 space-y-2.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          {t("keySolutionsLabel")}
                        </span>
                        <div className="space-y-2">
                          {ind.items.slice(0, 4).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EBF4E5] text-[#447D29]">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </span>
                              <span className="font-medium text-slate-700 leading-snug">{item}</span>
                            </div>
                          ))}
                          {ind.items.length > 4 && (
                            <p className="text-[11px] text-[#447D29] font-bold pl-6 pt-0.5">
                              {t("moreItems", { count: ind.items.length - 4 })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
                      <button
                        onClick={() => onSelectIndustry(ind)}
                        className="btn-pill-primary text-xs !py-3 !px-5 flex items-center justify-center gap-2 group/btn cursor-pointer w-full"
                      >
                        <span>{t("viewFullCatalog")}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={() => onRequestQuote(ind.name)}
                        className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer text-center w-full"
                      >
                        {t("ctaQuote")}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
