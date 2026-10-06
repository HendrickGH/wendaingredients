"use client";

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { ShieldCheck, Award, Sparkles, FileText, FlaskRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const QualityCertifications: React.FC = () => {
  const { t } = useTranslation("quality");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Certifications Cards Staggered Arrival (HyperFrames spring-pop-entrance rule)
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Quality Pillars Staggered Cascade
      if (pillarsRef.current) {
        const pillars = pillarsRef.current.children;
        gsap.fromTo(
          pillars,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 90%",
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
      className="py-20 bg-[#FFFFFF] border-y border-slate-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="gold" size="md" icon={<Award className="w-4 h-4 text-amber-700" />}>
            {t("badge")}
          </Badge>
          <Heading level={2} color="slate">
            {t("title")}
          </Heading>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {t("subtitle")}
          </p>
        </div>

        {/* Certifications badges grid - Open Layout with Spring Physics */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl font-black text-[#2F591B] tracking-tight block">
              BRCGS
            </span>
            <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">{t("brcgs.title")}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t("brcgs.desc")}
            </p>
            <span className="text-[10px] text-[#447D29] uppercase block font-bold tracking-wider">
              {t("brcgs.tag")}
            </span>
          </div>

          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl font-black text-[#2F591B] tracking-tight block">
              حلال
            </span>
            <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">{t("halal.title")}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t("halal.desc")}
            </p>
            <span className="text-[10px] text-[#447D29] uppercase block font-bold tracking-wider">
              {t("halal.tag")}
            </span>
          </div>

          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] hover:-translate-y-1 transition-all duration-300">
            <span className="text-2xl font-black text-amber-800 tracking-tight block">
              STAR-K
            </span>
            <h4 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors">{t("kosher.title")}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t("kosher.desc")}
            </p>
            <span className="text-[10px] text-amber-800 uppercase block font-bold tracking-wider">
              {t("kosher.tag")}
            </span>
          </div>
        </div>

        {/* Quality pillars - Open Grid */}
        <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200 text-xs text-slate-700">
          <div className="flex items-start gap-2.5 group">
            <ShieldCheck className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{t("pillars.0")}</span>
          </div>
          <div className="flex items-start gap-2.5 group">
            <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{t("pillars.1")}</span>
          </div>
          <div className="flex items-start gap-2.5 group">
            <FlaskRound className="w-4 h-4 text-sky-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{t("pillars.2")}</span>
          </div>
          <div className="flex items-start gap-2.5 group">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">{t("pillars.3")}</span>
          </div>
        </div>

        {/* Quality Closing Tagline (Wenda Core Claim) */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-sm sm:text-base font-bold font-editorial text-[#2F591B] tracking-wide">
            {t("tagline", "Ingredientes desarrollados para cumplir. Soluciones creadas para destacar.")}
          </p>
        </div>
      </div>
    </section>
  );
};
