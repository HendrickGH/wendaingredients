"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useSiteContent } from "@/i18n/useSiteContent";
import { TimelineEvent } from "@/data/siteContent";

const INTRO_IMAGE = "/images/about/wenda-corporate-campus.jpg";

export const TimelineChronicle: React.FC = () => {
  const { t } = useTranslation(["timelineChronicle", "timelineIntro"]);
  const { timeline } = useSiteContent();

  // Slides = intro + milestones. activeIndex -1 means the intro slide.
  const totalSlides = timeline.length + 1;

  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll-driven slide switching and entrance detection
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;
      if (totalDistance <= 0) return;

      // Detect entrance into timeline section
      const inView = rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.15;
      setIsEntered(inView);

      // Scroll progress through the section (starts when rect.top <= 0)
      const scrolledDistance = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolledDistance / totalDistance));

      // Calculate corresponding slide across segments (slide 0 = intro)
      const segmentSize = 1 / totalSlides;
      const slide = Math.min(
        totalSlides - 1,
        Math.max(0, Math.floor(progress / segmentSize))
      );
      const newIndex = slide - 1;

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
  }, [totalSlides]);

  const scrollToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = scrollTop + rect.top;
    const totalDistance = rect.height - window.innerHeight;

    const targetProgress = (index + 1) / (totalSlides - 1);
    const targetScroll = containerTop + targetProgress * totalDistance;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const activeEvent: TimelineEvent = timeline[activeIndex] || timeline[0];

  return (
    <section
      id="trayectoria"
      ref={containerRef}
      className="relative w-full bg-[#0B140B]"
      style={{ height: `${totalSlides * 80}vh` }}
    >
      {/* Sticky Full Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center bg-[#0B140B] text-white">
        {/* Full-bleed background imagery with cinematic crossfade */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
          {/* Intro slide background */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              activeIndex === -1
                ? isEntered
                  ? "opacity-100 z-0 scale-100"
                  : "opacity-60 z-0 scale-105"
                : "opacity-0 -z-10 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={INTRO_IMAGE}
              alt="Wenda Ingredients corporate campus"
              fill
              priority
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
          {timeline.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={item.year}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  isActive
                    ? isEntered
                      ? "opacity-100 z-0 scale-100"
                      : "opacity-60 z-0 scale-105"
                    : "opacity-0 -z-10 scale-105 pointer-events-none"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={idx === 0 || idx === 1}
                  sizes="100vw"
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
              </div>
            );
          })}

          {/* Cinematic Multi-Layer Vignettes for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
        </div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 w-full pt-16 sm:pt-0">
          <div
            className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isEntered
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-10 scale-[0.98] pointer-events-none"
            }`}
          >
            {/* Stacked Milestone Content Cards for Seamless Crossfade */}
            <div className="relative max-w-3xl min-h-[460px] sm:min-h-[500px]">
              {/* Intro slide content */}
              <div
                aria-hidden={activeIndex !== -1}
                className={`space-y-5 sm:space-y-6 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  activeIndex === -1
                    ? "opacity-100 translate-y-0 pointer-events-auto relative z-10"
                    : "opacity-0 -translate-y-5 pointer-events-none absolute inset-x-0 top-0 z-0"
                }`}
              >
                <h2 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-editorial drop-shadow-md">
                  {t("timelineIntro:title")}
                </h2>
                <p className="text-lg sm:text-2xl text-[#D9E8BE] font-editorial italic leading-snug max-w-2xl">
                  {t("timelineIntro:subtitle")}
                </p>
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  {t("timelineIntro:body1", { defaultValue: "Desde 1995 en el puerto de Dalian hasta una red de laboratorios y centros de aplicación en más de 40 mercados, recorre los hitos que marcaron nuestra expansión." }).replace(/<[^>]*>/g, "")}
                </p>
              </div>

              {timeline.map((item, idx) => {
                const isActive = idx === activeIndex;
                const isPrevious = idx < activeIndex;

                return (
                  <div
                    key={item.year}
                    aria-hidden={!isActive}
                    className={`space-y-6 sm:space-y-8 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto relative z-10"
                        : isPrevious
                        ? "opacity-0 -translate-y-5 pointer-events-none absolute inset-x-0 top-0 z-0"
                        : "opacity-0 translate-y-5 pointer-events-none absolute inset-x-0 top-0 z-0"
                    }`}
                  >
                    {/* Headline Group: Hero-size Editorial Year & Title */}
                    <div className="space-y-3">
                      <div className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-[#D9E8BE] font-editorial leading-none drop-shadow-md">
                        {item.year}
                      </div>
                      <h2 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.08] font-editorial max-w-2xl drop-shadow-md">
                        {item.title}
                      </h2>
                    </div>

                    {/* Deep Narrative Description */}
                    <p className="text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm">
                      {item.description}
                    </p>

                    {/* Hero-Style Stats Strip for Metric & Location */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15 max-w-xl">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                          {t("timelineChronicle:impactLabel")}
                        </span>
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#D9E8BE] tracking-tight block">
                          {item.metric.value}
                        </span>
                        <span className="text-xs text-slate-300 font-medium block mt-0.5">
                          {item.metric.label}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
                          {t("timelineChronicle:locationLabel")}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-white block">
                          {item.location}
                        </span>
                        <span className="text-xs text-[#D9E8BE] font-medium block mt-0.5">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Minimal Floating Timeline Scrubber Rail (Right side, desktop) */}
        <div
          className={`hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-2.5 z-30 bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 delay-200 ${
            isEntered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"
          }`}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 pb-1">
            {t("timelineChronicle:railLabel")}
          </span>
          {timeline.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={item.year}
                onClick={() => scrollToMilestone(idx)}
                className={`group flex items-center gap-2.5 text-right transition-all cursor-pointer ${
                  isActive ? "text-[#D9E8BE]" : "text-white/40 hover:text-white"
                }`}
                aria-label={t("timelineChronicle:ariaMilestone", { year: item.year })}
              >
                <span
                  className={`text-xs font-mono font-bold transition-all ${
                    isActive
                      ? "text-white translate-x-0"
                      : "text-slate-400 group-hover:text-slate-200"
                  }`}
                >
                  {item.year}
                </span>
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-[#D9E8BE]"
                      : "w-2 bg-white/20 group-hover:bg-white/60"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom Floating Scrubber Pill (Mobile / Tablet) */}
        <div
          className={`lg:hidden absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 transition-all duration-700 delay-200 ${
            isEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#D9E8BE]">{activeEvent.year}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/70">
              {activeIndex + 1}/{timeline.length}
            </span>
          </div>
          <div className="w-24 sm:w-36 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D9E8BE] rounded-full transition-all duration-300"
              style={{
                width: `${((activeIndex + 1) / timeline.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

