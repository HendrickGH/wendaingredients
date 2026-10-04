"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  Award
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState("/videos/hero-food-science.mp4");
  const videoRef = useRef<HTMLVideoElement>(null);

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
        <div className="absolute right-0 top-1/4 w-[650px] h-[650px] pointer-events-none opacity-40 lg:opacity-60 z-10 hidden sm:block">
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
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D9E8BE] text-xs font-bold uppercase tracking-wider">
              Innovación & Ciencia Aplicada a Alimentos
            </div>

            <h1
              id="hero-title"
              className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] font-editorial max-w-2xl drop-shadow-md"
            >
              Ingredientes funcionales especializados que hacen más
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-xl drop-shadow-sm">
              Creamos formulaciones e ingredientes que optimizan textura, rendimiento, vida de anaquel y perfil clean label para la industria alimentaria mundial.
            </p>
          </div>

          {/* Action Button Group (Clarity Style: Vibrant Pill with Play Triangle + Secondary Pill) */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Primary Action Button: Reproducir Video (Clarity Yellow/Mint style) */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-base font-bold rounded-full bg-[#D9E8BE] text-[#0F172A] hover:bg-white hover:shadow-lg transition-all duration-300 shadow-md active:scale-95 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Reproducir video de presentación de Wenda Ingredients"
            >
              <span className="w-6 h-6 rounded-full bg-[#0F172A] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Play className="w-3 h-3 fill-current ml-0.5" aria-hidden="true" />
              </span>
              <span>Reproducir vídeo</span>
            </button>

            {/* Secondary Action Button: Explorar Fórmulas */}
            <a
              href="#categorias"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 transition-all duration-300 active:scale-95 cursor-pointer group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9E8BE]"
              aria-label="Explorar categorías y fórmulas técnicas"
            >
              <span>Explorar Categorías</span>
              <ChevronRight
                className="w-4 h-4 motion-safe:group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Corporate Motto Pullquote */}
          <blockquote className="pl-4 border-l-2 border-[#D9E8BE] py-1 mt-6">
            <p className="text-base sm:text-lg font-bold text-white italic font-serif">
              “We listen, reach out and we deliver”
            </p>
            <cite className="text-xs text-slate-300 not-italic block mt-0.5 font-medium">
              Lema institucional de Wenda Ingredients
            </cite>
          </blockquote>

          {/* Minimalist Operational Stats Strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/15 max-w-2xl"
            aria-label="Indicadores globales clave de Wenda Ingredients"
          >
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight block">
                30+
              </span>
              <span className="text-xs text-slate-300 font-medium">Años Trayectoria</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D9E8BE] tracking-tight block">
                10+
              </span>
              <span className="text-xs text-slate-300 font-medium">Países Red Directa</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight block">
                4
              </span>
              <span className="text-xs text-slate-300 font-medium">Centros R&D</span>
            </div>
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D9E8BE] tracking-tight block">
                6
              </span>
              <span className="text-xs text-slate-300 font-medium">Labs Cárnicos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Video Controls in Bottom Right Corner (Accessibility & User Autonomy) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-white"
          title={isPlaying ? "Pausar video de fondo" : "Reanudar video de fondo"}
          aria-label={isPlaying ? "Pausar video de fondo" : "Reanudar video de fondo"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>
      </div>

      {/* Video Lightbox Modal (Clarity #videoLightbox pattern) */}
      {isVideoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video institucional de Wenda Ingredients"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close button */}
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Cerrar reproductor de video"
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
                Tu navegador no soporta reproducción de video HTML5.
              </video>
            </div>

            {/* Video Footer Info & Selector */}
            <div className="p-4 sm:p-6 bg-[#162214] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <span className="text-xs text-[#D9E8BE] font-bold uppercase tracking-wider block">
                  Planta Piloto & Centro de Innovación
                </span>
                <h4 className="text-lg font-bold text-white font-editorial">
                  Wenda Ingredients: Ciencia, Proceso & Formulación Industrial
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
                  Laboratorio R&D
                </button>
                <button
                  onClick={() => setActiveVideoSrc("/videos/hero-culinary.mp4")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeVideoSrc === "/videos/hero-culinary.mp4"
                      ? "bg-[#D9E8BE] text-[#0F172A]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Formulación Culinaria
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
