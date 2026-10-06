"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Play,
  Pause,
  ChevronRight,
  X,
  Quote
} from "lucide-react";
import gsap from "gsap";
import { MetricCounter } from "../atoms/MetricCounter";

export const HeroSection: React.FC = () => {
  const { t } = useTranslation("hero");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState("/videos/hero-food-science.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);

  // GSAP Animation Refs
  const heroContainerRef = useRef<HTMLElement>(null);
  const swirlRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Ambient Motion Choreography
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Ambient Brand Swirl Float (HyperFrames sine-wave-loop rule)
      if (swirlRef.current) {
        gsap.to(swirlRef.current, {
          y: 22,
          x: -15,
          rotation: 3.5,
          duration: 7.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }

      // 2. Coordinated Waterfall Arrival (HyperFrames waterfall-entry & spring-pop-entrance rules)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 22, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          quoteRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4"
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

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={heroContainerRef}
      aria-labelledby="hero-title"
      className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center bg-[#0B140B] text-white overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* Background Video Loop (Stock video food science & formulation) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hero/food-lab-scientist.jpg"
          className="w-full h-full object-cover scale-105 motion-safe:transition-transform motion-safe:duration-1000"
        >
          <source src="/videos/hero-food-science.mp4" type="video/mp4" />
          <source src="/videos/hero-culinary.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Multi-Layer Vignettes for Contrast (WCAG AAA Compliance) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B140B] via-transparent to-black/40 z-10" />

        {/* Organic Luminous Brand Swirl / Wave (Clarity Signature Visual Wave in Wenda Mint/Green) */}
        <div
          ref={swirlRef}
          className="absolute right-0 top-1/4 w-[650px] h-[650px] pointer-events-none opacity-40 lg:opacity-60 z-10 hidden sm:block will-change-transform"
        >
          <svg
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
          >
            <path
              d="M120 400C220 250 350 480 480 300C540 220 560 120 460 80C340 30 260 220 180 320C100 420 50 480 120 400Z"
              fill="url(#wendaSwirlGradient)"
              filter="blur(40px)"
            />
            <defs>
              <linearGradient
                id="wendaSwirlGradient"
                x1="80"
                y1="80"
                x2="520"
                y2="480"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#D9E8BE" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#447D29" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#5E7D1F" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Main Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 w-full">
        {/* Hero Content Column (Clarity Style Headline & Actions) */}
        <div className="max-w-3xl space-y-8">
          <div className="space-y-5">
            <div
              ref={badgeRef}
              className="inline-flex items-center text-[#D9E8BE] text-xs font-bold uppercase tracking-wider"
            >
              {t("badge")}
            </div>

            <h1
              ref={titleRef}
              id="hero-title"
              className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-editorial max-w-2xl drop-shadow-md"
            >
              {t("title")}
            </h1>

            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl drop-shadow-sm"
            >
              {t("subtitle")}
            </p>
          </div>

          {/* Action Button Group (Clarity Style: Vibrant Pill with Play Triangle + Secondary Pill) */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Action Button: Reproducir Video (Clarity Yellow/Mint style) */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base font-bold rounded-full bg-[#D9E8BE] text-[#0F172A] hover:bg-white hover:shadow-lg transition-all duration-300 shadow-md active:scale-95 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label={t("playAria")}
            >
              <span className="w-6 h-6 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span>{t("play")}</span>
            </button>

            {/* Secondary Action Button: Explorar Fórmulas */}
            <a
              href="#categorias"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 transition-all duration-300 active:scale-95 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9E8BE]"
              aria-label={t("exploreAria")}
            >
              <span>{t("explore")}</span>
              <ChevronRight
                className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Corporate Motto Pullquote */}
          <blockquote ref={quoteRef} className="flex items-start gap-3 py-1 mt-6">
            <Quote className="w-5 h-5 text-[#D9E8BE] shrink-0 mt-1" />
            <div>
              <p className="text-base sm:text-lg font-bold text-white italic font-serif">
                {t("quote")}
              </p>
              <cite className="text-xs text-slate-300 not-italic block mt-0.5 font-medium">
                {t("quoteCite")}
              </cite>
            </div>
          </blockquote>

          {/* Minimalist Operational Stats Strip with Dynamic Counters */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/15 max-w-2xl"
            aria-label={t("statsAria")}
          >
            <div className="flex flex-col items-center text-center">
              <MetricCounter
                value="30+"
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight block"
                suffixClassName="text-[#D9E8BE]"
              />
              <span className="text-xs text-slate-300 font-medium">{t("stats.years")}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MetricCounter
                value="10+"
                className="text-3xl sm:text-4xl font-extrabold text-[#D9E8BE] tracking-tight block"
                suffixClassName="text-white"
              />
              <span className="text-xs text-slate-300 font-medium">{t("stats.countries")}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MetricCounter
                value="4"
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight block"
                suffixClassName="text-[#D9E8BE]"
              />
              <span className="text-xs text-slate-300 font-medium">{t("stats.rd")}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MetricCounter
                value="6"
                className="text-3xl sm:text-4xl font-extrabold text-[#D9E8BE] tracking-tight block"
                suffixClassName="text-white"
              />
              <span className="text-xs text-slate-300 font-medium">{t("stats.labs")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Video Controls in Bottom Right Corner (Accessibility & User Autonomy) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-white"
          title={isPlaying ? t("pauseBackground") : t("resumeBackground")}
          aria-label={isPlaying ? t("pauseBackground") : t("resumeBackground")}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
      </div>

      {/* Video Lightbox Modal (Clarity #videoLightbox pattern) */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("modal.aria")}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            aria-label={t("modal.close")}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15">
            <div className="relative aspect-video w-full">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
                poster="/images/hero/food-lab-scientist.jpg"
              >
                <source src={activeVideoSrc} type="video/mp4" />
                {t("modal.unsupported")}
              </video>
            </div>

            {/* Video Footer Info & Selector */}
            <div className="p-4 sm:p-6 bg-[#162214] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <span className="text-xs text-[#D9E8BE] font-bold uppercase tracking-wider block">
                  {t("modal.eyebrow")}
                </span>
                <h4 className="text-lg font-bold text-white font-editorial">
                  {t("modal.title")}
                </h4>
              </div>

              {/* Toggle clip */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveVideoSrc("/videos/hero-food-science.mp4")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeVideoSrc === "/videos/hero-food-science.mp4"
                      ? "bg-[#D9E8BE] text-[#0F172A]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {t("modal.clipLab")}
                </button>
                <button
                  onClick={() => setActiveVideoSrc("/videos/hero-culinary.mp4")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeVideoSrc === "/videos/hero-culinary.mp4"
                      ? "bg-[#D9E8BE] text-[#0F172A]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {t("modal.clipCulinary")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
