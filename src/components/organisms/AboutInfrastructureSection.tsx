"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { MetricCounter } from "../atoms/MetricCounter";
import {
  Users,
  Microscope,
  FlaskConical,
  Award,
  Globe2,
  Calendar
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const AboutInfrastructureSection: React.FC = () => {
  const { t } = useTranslation("about");
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  // Wenda 6 core institutional metrics from brief
  const coreStats = [
    {
      value: "30+",
      label: "Años de Trayectoria",
      icon: <Calendar className="w-4 h-4 text-[#447D29]" />
    },
    {
      value: "10+",
      label: "Países con Red Directa",
      icon: <Globe2 className="w-4 h-4 text-emerald-700" />
    },
    {
      value: "400+",
      label: "Profesionales Globales",
      icon: <Users className="w-4 h-4 text-[#2F591B]" />
    },
    {
      value: "4",
      label: "Centros de R&D",
      icon: <Microscope className="w-4 h-4 text-teal-700" />
    },
    {
      value: "6",
      label: "Laboratorios Cárnicos",
      icon: <FlaskConical className="w-4 h-4 text-sky-700" />
    },
    {
      value: "75+",
      label: "Especialistas en I+D",
      icon: <Award className="w-4 h-4 text-amber-700" />
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Narrative & Header reveal
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Stats Grid Stagger
      if (statsGridRef.current) {
        gsap.fromTo(
          statsGridRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsGridRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Logistics photography frame entrance
      if (imageFrameRef.current) {
        gsap.fromTo(
          imageFrameRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageFrameRef.current,
              start: "top 85%",
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
      id="infrastructure"
      className="py-20 lg:py-28 bg-[#EFF6EC] text-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Split: Narrative & Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Clean Editorial Metrics */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Header info */}
            <div ref={narrativeRef} className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F591B] block">
                {t("infra.eyebrow", "Infraestructura Global")}
              </span>

              <h2 className="heading-editorial-lg font-editorial text-[#0F172A] leading-tight">
                {t("infra.title", "La infraestructura para investigar, comprobar y escalar soluciones")}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {t(
                  "infra.lead",
                  "Nuestra red internacional integra centros de investigación de vanguardia, plantas avanzadas y laboratorios cárnicos especializados."
                )}
              </p>
            </div>

            {/* Clean Editorial Stats: 6 Key Metrics without any borders */}
            <div ref={statsGridRef} className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 pt-2">
              {coreStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="space-y-1 group"
                >
                  <div className="text-xs text-[#2F591B] font-semibold mb-0.5">
                    <span>{stat.label}</span>
                  </div>
                  <div className="flex items-center gap-2 text-3xl sm:text-4xl font-extrabold text-[#1B3811] font-editorial tracking-tight group-hover:text-[#447D29] transition-colors">
                    {stat.icon}
                    <MetricCounter value={stat.value} suffixClassName="text-[#447D29]" />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Clean, Unencumbered Photography without borders */}
          <div className="lg:col-span-6">
            <div ref={imageFrameRef} className="relative">
              
              {/* Clean Framed Photograph without outer border */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-xl group">
                <Image
                  src="/images/about/global-logistics.jpg"
                  alt="Wenda Ingredients Red Logística y Abastecimiento Global"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
