"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Play,
  Pause,
  ChevronRight
} from "lucide-react";
import gsap from "gsap";

export const HeroSection: React.FC = () => {
  const { t } = useTranslation("hero");
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // GSAP Animation Refs
  const heroContainerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance Choreography
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      [titleRef, ctaRef].forEach((ref) => {
        if (ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = "none";
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Coordinated Waterfall Arrival
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.3"
        );
    }, heroContainerRef);

    return () => ctx.revert();
  }, []);

  // Toggle background video playback
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section
      ref={heroContainerRef}
      aria-labelledby="hero-title"
      className="relative h-[90dvh] min-h-[90dvh] sm:h-auto sm:min-h-screen lg:min-h-[96vh] flex flex-col justify-end bg-black text-white overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-16 lg:pb-20"
    >
      {/* Mobile Hero Image (Stock biotech & industrial processing plant - visible only on <md) */}
      <div className="block md:hidden absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src="/images/hero/industrial-biotech-plant.jpg"
          alt="Instalaciones industriales y biotecnología Wenda Ingredients"
          className="w-full h-full object-cover scale-105"
          loading="eager"
        />
        {/* Contrast Gradients for Mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 z-10" />
      </div>

      {/* Desktop Background Video Loop (Drone footage of giant industrial manufacturing plant - visible only on >=md) */}
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/factory-drone-poster.jpg"
          className="w-full h-full object-cover scale-105 motion-safe:transition-transform motion-safe:duration-1000"
        >
          <source src="/videos/hero-factory-drone.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Multi-Layer Vignettes for Contrast (WCAG AAA Compliance) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
      </div>

      {/* Main Hero Content Container - Pegado hacia abajo en todas las dimensiones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 w-full">
        <div className="max-w-3xl space-y-6">
          <h1
            ref={titleRef}
            id="hero-title"
            className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-editorial max-w-[80%] sm:max-w-2xl drop-shadow-md"
          >
            {t("title")}
          </h1>

          {/* Action Button: Conoce Wenda */}
          <div ref={ctaRef} className="pt-2">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold rounded-full bg-[#D9E8BE] text-[#0F172A] hover:bg-white hover:shadow-lg transition-all duration-300 shadow-md active:scale-95 cursor-pointer select-none touch-manipulation group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-full sm:w-auto"
              aria-label={t("exploreAria")}
            >
              <span>{t("explore")}</span>
              <ChevronRight
                className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Floating Video Controls in Bottom Right Corner (Offset to avoid collision with seasonal floating widgets) */}
      <div className="hidden md:flex absolute bottom-6 right-20 z-20 items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-white select-none touch-manipulation active:scale-95"
          title={isPlaying ? t("pauseBackground") : t("resumeBackground")}
          aria-label={isPlaying ? t("pauseBackground") : t("resumeBackground")}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
      </div>
    </section>
  );
};
