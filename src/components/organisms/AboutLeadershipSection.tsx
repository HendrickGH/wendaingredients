"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import {
  Quote,
  Clock,
  Globe2,
  FlaskConical,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const AboutLeadershipSection: React.FC = () => {
  const { t } = useTranslation("about");
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const leadershipPoints = [
    {
      title: "30+ Años de Trayectoria",
      description: "Innovación continua en ingredientes funcionales desde nuestra fundación en 1995.",
      icon: <Clock className="w-5 h-5 text-[#447D29]" />
    },
    {
      title: "Presencia en 10+ Países",
      description: "Equipos técnicos locales y soporte regulatorio directo en los principales centros industriales.",
      icon: <Globe2 className="w-5 h-5 text-emerald-700" />
    },
    {
      title: "Planta Piloto & 6 Labs",
      description: "Evaluación sensorial, textura y reología aplicada in-situ para validar antes de escalar.",
      icon: <FlaskConical className="w-5 h-5 text-sky-700" />
    },
    {
      title: "Inocuidad Certificada",
      description: "Estándares globales GFSI, BRCGS Grado A, Kosher y Halal con trazabilidad total.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-700" />
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Portrait entrance
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Editorial content waterfall
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Pillars staggered arrival
      if (pillarsRef.current) {
        gsap.fromTo(
          pillarsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 88%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className="py-20 lg:py-28 bg-[#F8FAF6] relative border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Clean Portrait Spread of Mr. Wei */}
          <div ref={portraitRef} className="lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-lg group">
              <Image
                src="/images/about/mr-wei-leadership.jpg"
                alt="Mr. Wei - Presidente & Fundador de Wenda Ingredients"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-103"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Watermark brand seal inside the photo */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <h3 className="text-lg font-bold font-editorial text-white">
                    {t("leader.name", "Mr. Wei")}
                  </h3>
                  <p className="text-xs text-slate-200">
                    {t("leader.role", "Fundador & Presidente de Wenda Ingredients")}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-serif italic font-medium">
                  Trust in Food®
                </div>
              </div>
            </div>

            {/* Minimal Editorial Caption below portrait */}
            <div className="mt-3.5 flex items-baseline justify-between border-t border-slate-200 pt-3 px-1 text-xs text-slate-500">
              <span>Liderazgo técnico e institucional desde 1995</span>
              <span className="font-semibold text-[#447D29]">Visión 2030</span>
            </div>
          </div>

          {/* Right: Editorial Voice, Quote & Four Pillars */}
          <div className="lg:col-span-7 space-y-8">
            <div ref={contentRef} className="space-y-4">
              <Badge variant="wenda" size="md">
                {t("leader.badge", "Mensaje Institucional & Visión Global")}
              </Badge>

              <h2 className="heading-editorial-lg font-editorial text-[#0F172A] leading-tight">
                {t("leader.headline", "Impulsando la evolución de los alimentos con ciencia, integridad y compromiso humano")}
              </h2>

              {/* Editorial Pullquote with Watermark */}
              <div className="relative pl-7 sm:pl-8 py-2">
                <Quote className="w-12 h-12 text-[#447D29]/20 absolute -top-3 left-0 pointer-events-none select-none" />
                <div className="space-y-3 text-base sm:text-lg text-slate-700 leading-relaxed font-serif italic">
                  <p>
                    {t("message.quote1", "“Nacimos en 1995 con la convicción de que los ingredientes alimentarios no son solo materias primas: son el núcleo de la nutrición, el rendimiento y la seguridad de las familias que los consumen en todo el planeta.”")}
                  </p>
                  <p className="not-italic font-sans text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    “Nuestra promesa de marca <strong className="font-bold text-slate-900">Trust in Food®</strong> resume tres décadas de rigor científico: cada lote validado en nuestros laboratorios debe entregar tranquilidad absoluta al fabricante y bienestar genuino al consumidor.”
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Pillars of Institutional Trust in a clean 2x2 grid */}
            <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-slate-200">
              {leadershipPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-300">
                  <div className="p-2 rounded-lg bg-[#F0F7ED] shrink-0 mt-0.5 group-hover:bg-[#E2F0DC] transition-colors">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 block mb-0.5 group-hover:text-[#447D29] transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-pill-primary text-xs !py-3 !px-6 shadow-sm hover:shadow-md transition-all active:scale-95">
                <span>Agendar Consulta Técnica</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-xs text-slate-500 font-medium">
                Atención directa con ingenieros de desarrollo
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
