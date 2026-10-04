"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TIMELINE, TimelineEvent } from "@/data/siteContent";
import { Calendar } from "lucide-react";

export const TimelineChronicle: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Smooth scroll-driven slide switching
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;
      if (totalDistance <= 0) return;

      // Top sticky clearance offset (~70px to account for header/breathing room)
      const stickyOffset = 70;
      const scrolledDistance = -(rect.top - stickyOffset);
      const progress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));

      // Calculate corresponding index across timeline segments
      const segmentSize = 1 / TIMELINE.length;
      const newIndex = Math.min(
        TIMELINE.length - 1,
        Math.max(0, Math.floor(progress / segmentSize))
      );

      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Auto-scroll active year pill into horizontal view
  useEffect(() => {
    const activePill = pillRefs.current[activeIndex];
    if (activePill && railRef.current) {
      activePill.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [activeIndex]);

  // Click on milestone pill scrolls naturally to that slide's segment
  const scrollToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top;
    const totalDistance = rect.height - window.innerHeight;
    const stickyOffset = 70;

    const targetProgress = (index + 0.5) / TIMELINE.length;
    const targetScroll = containerTop - stickyOffset + targetProgress * totalDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const activeEvent: TimelineEvent = TIMELINE[activeIndex] || TIMELINE[0];

  return (
    <div className="space-y-6">
      {/* Section Header (Clean: no border, no background on badge, no view mode switcher) */}
      <div className="space-y-2 max-w-2xl text-left">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2F591B] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5 text-[#2F591B]" />
          <span>1995 — 2026 · Tres Décadas de Trayectoria</span>
        </div>
        <h3 className="heading-editorial-md font-editorial text-slate-900">
          Evolución Biotecnológica & Expansión Global
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Desde el génesis portuario en Dalian hasta la consolidación de plantas piloto en México y plataformas directas de suministro internacional.
        </p>
      </div>

      {/* Scroll-Driven Pinned Stage */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${TIMELINE.length * 65}vh` }}
      >
        {/* Sticky Stage Container pinned during scroll */}
        <div className="sticky top-20 sm:top-24 z-10 w-full space-y-6">
          {/* Chronological Era Rail */}
          <div className="relative">
            {/* Background connecting rail line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            {/* Year Milestones Bar */}
            <div
              ref={railRef}
              className="flex items-center justify-between gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar relative z-10"
            >
              {TIMELINE.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.year}
                    ref={(el) => {
                      pillRefs.current[idx] = el;
                    }}
                    onClick={() => scrollToMilestone(idx)}
                    className={`flex flex-col items-center gap-1 px-3.5 py-2 rounded-xl transition-all duration-300 shrink-0 text-center ${
                      isActive
                        ? "bg-[#2F591B] text-white shadow-md ring-2 ring-[#2F591B] ring-offset-2 scale-[1.03]"
                        : "bg-white text-slate-700 border border-slate-200 hover:border-[#2F591B] hover:text-[#2F591B]"
                    }`}
                    aria-label={`Ver hito ${item.year}`}
                  >
                    <span className="text-xs font-extrabold tracking-tight">
                      {item.year}
                    </span>
                    <span
                      className={`text-[10px] font-medium hidden sm:inline-block max-w-[95px] truncate ${
                        isActive ? "text-slate-100" : "text-slate-500"
                      }`}
                    >
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Milestone Spotlight Panel (Split Editorial Showcase) */}
          <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left Column: Pure Photographic Stage (Without badges or bottom caption bars) */}
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[440px] bg-slate-900 overflow-hidden">
                {TIMELINE.map((item, idx) => (
                  <div
                    key={item.year}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === activeIndex
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      priority={idx === 0 || idx === 1}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* Right Column: Historical Narrative & Technical Impact */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white text-left space-y-5">
                <div className="space-y-4">
                  {/* Step & Era Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F591B]">
                      {activeEvent.era}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                      Hito {activeIndex + 1} / {TIMELINE.length}
                    </span>
                  </div>

                  {/* Big Year Editorial Heading */}
                  <div className="space-y-1">
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-editorial">
                      {activeEvent.year}
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {activeEvent.title}
                    </h4>
                  </div>

                  {/* Deep Narrative */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {activeEvent.description}
                  </p>

                  {/* Technical Impact Metric (Clean: NO background, NO border) */}
                  <div className="pt-3 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F591B] block">
                      Impacto Técnico Comprobado
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-[#1E3A14] tracking-tight">
                      {activeEvent.metric.value}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">
                      {activeEvent.metric.label}
                    </p>
                  </div>
                </div>

                {/* Minimal Scroll Progress Cue (No previous/next buttons) */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Desplázate para continuar el recorrido
                  </span>
                  <div className="flex items-center gap-1.5">
                    {TIMELINE.map((_, idx) => (
                      <span
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === activeIndex
                            ? "w-5 bg-[#2F591B]"
                            : idx < activeIndex
                            ? "w-2 bg-[#447D29]/40"
                            : "w-1.5 bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

