"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import { ArrowRight, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";

interface PillarImage {
  src: string;
  title: string;
  tag: string;
  caption: string;
}

interface StickyPillar {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  image: string;
  secondaryImages: PillarImage[];
  badge: string;
  specs: string[];
  ctaText: string;
  targetId: string;
}

// Language-neutral structure (ids, media, anchors). All copy lives in translations.json ("services" module).
const PILLAR_BASE = [
  {
    id: "meat",
    metric: "-35%",
    image: "/images/meat/roasted-meat.jpg",
    secondary: ["/images/meat/sausages-charcuterie.jpg", "/images/meat/fresh-cuts.jpg"],
    targetId: "#categorias"
  },
  {
    id: "bakery",
    metric: "+22%",
    image: "/images/bakery/artisan-bread-crumb.jpg",
    secondary: ["/images/bakery/dough-kneading.jpg", "/images/bakery/rustic-sourdough.jpg"],
    targetId: "#categorias"
  },
  {
    id: "nature",
    metric: "100%",
    image: "/images/nature/spices-vibrant-colors.jpg",
    secondary: ["/images/nature/natural-pigments-powder.jpg", "/images/nature/turmeric-curcumin.jpg"],
    targetId: "#categorias"
  },
  {
    id: "science",
    metric: "10+",
    image: "/images/hero/biotech-research.jpg",
    secondary: ["/images/supplements/supplement-scoop-pure.jpg", "/images/tech/clean-processing-lines.jpg"],
    targetId: "#science"
  }
];

interface PillarText {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  badge: string;
  specs: string[];
  ctaText: string;
  images: { title: string; tag: string; caption: string }[];
}


export const StickyServicesSection: React.FC = () => {
  const { t } = useTranslation("services");
  const pillarTexts = t("pillars", { returnObjects: true }) as PillarText[];
  const PILLARS: StickyPillar[] = PILLAR_BASE.map((base, i) => {
    const text = pillarTexts[i];
    return {
      id: base.id,
      metric: base.metric,
      image: base.image,
      targetId: base.targetId,
      category: text.category,
      title: text.title,
      subtitle: text.subtitle,
      description: text.description,
      metricLabel: text.metricLabel,
      badge: text.badge,
      specs: text.specs,
      ctaText: text.ctaText,
      secondaryImages: base.secondary.map((src, j) => ({ src, ...text.images[j] }))
    };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [overridePillar, setOverridePillar] = useState<{ index: number; src: string } | null>(null);
  const [mobileActiveImages, setMobileActiveImages] = useState<Record<string, string>>({});
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.innerHeight * 0.45;
      let closestIdx = 0;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(elementCenter - triggerLine);

        if (rect.top <= triggerLine + 250 && rect.bottom >= triggerLine - 250) {
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        }
      });
      setActiveIndex(closestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activePillar = PILLARS[activeIndex] || PILLARS[0];
  const currentHeroImage = (overridePillar?.index === activeIndex ? overridePillar.src : null) || activePillar.image;

  return (
    <section
      id="soluciones-especializadas"
      className="py-24 lg:py-32 bg-[#FFFFFF] relative border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <Badge variant="wenda" size="md">
            {t("header.badge")}
          </Badge>
          <h2 className="heading-editorial-lg font-editorial">
            {t("header.title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t("header.subtitle")}
          </p>
        </div>

        {/* 2-Column Experience: Left Scrolls with generous height, Right stays sticky throughout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Scrolling Feature Items with minimum height per pillar for smooth pacing */}
          <div className="lg:col-span-6 space-y-16 lg:space-y-28 pb-24">
            {PILLARS.map((pillar, idx) => {
              const isActive = idx === activeIndex;
              const mobileHeroImage = mobileActiveImages[pillar.id] || pillar.image;

              return (
                <div
                  key={pillar.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`min-h-0 lg:min-h-[480px] flex flex-col justify-center transition-all duration-500 pt-4 border-l-2 pl-4 sm:pl-8 cursor-pointer ${
                    isActive
                      ? "border-[#447D29] opacity-100 translate-x-0"
                      : "border-slate-200 opacity-100 lg:opacity-65 lg:hover:opacity-90 translate-x-0"
                  }`}
                  onClick={() => {
                    setActiveIndex(idx);
                    setOverridePillar(null);
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isActive
                          ? "bg-[#EBF4E5] text-[#2F591B]"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {pillar.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      0{idx + 1} / 0{PILLARS.length}
                    </span>
                  </div>

                  <h3 className="heading-editorial-md font-editorial mb-3 text-slate-900">
                    {pillar.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>

                  {/* Bullet Specs */}
                  <div className="space-y-2 mb-6">
                    {pillar.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pill CTA button */}
                  <div className="pt-2">
                    <a
                      href={pillar.targetId}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#447D29] hover:text-[#2F591B] transition-colors group cursor-pointer"
                    >
                      <span>{pillar.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Responsive Visual Media (Mobile / Tablet only - without sticky) */}
                  <div className="mt-8 lg:hidden clarity-card overflow-hidden shadow-lg bg-slate-900 border border-slate-200/80 rounded-2xl">
                    {/* Main Photo Display */}
                    <div className="relative h-[240px] sm:h-[280px] w-full bg-slate-900 overflow-hidden">
                      <Image
                        src={mobileHeroImage}
                        alt={pillar.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Bottom Overlay Info with Big Metric */}
                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 pointer-events-none">
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#D9E8BE] tracking-tight">
                            {pillar.metric}
                          </span>
                          <span className="text-[11px] sm:text-xs uppercase tracking-wider text-slate-300 font-semibold">
                            {pillar.metricLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 font-medium line-clamp-2">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Secondary Images Gallery */}
                    <div className="p-3.5 bg-slate-50 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#447D29]" />
                          <span>{t("evidence")}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {t("tapToInspect")}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {pillar.secondaryImages.map((secImg, sIdx) => {
                          const isSelected = mobileHeroImage === secImg.src;
                          return (
                            <button
                              key={sIdx}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMobileActiveImages((prev) => ({
                                  ...prev,
                                  [pillar.id]: secImg.src,
                                }));
                              }}
                              className={`relative h-20 sm:h-24 rounded-xl overflow-hidden text-left border-2 transition-all duration-300 group focus:outline-none ${
                                isSelected
                                  ? "border-[#447D29] ring-2 ring-[#447D29]/30"
                                  : "border-slate-200/90 hover:border-slate-400"
                              }`}
                            >
                              <Image
                                src={secImg.src}
                                alt={secImg.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                              <div className="absolute bottom-1.5 left-2 right-2">
                                <p className="text-[10px] sm:text-[11px] font-semibold text-white leading-tight line-clamp-1 drop-shadow-sm">
                                  {secImg.title}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Full-height container with sticky media stage */}
          <div className="lg:col-span-6 relative hidden lg:block">
            <div className="sticky top-28 space-y-3 pb-12">
              <div className="clarity-card overflow-hidden shadow-xl bg-slate-900 border border-slate-200/80 rounded-2xl">
                {/* Photo Display with Smooth Crossfade */}
                <div className="relative h-[360px] w-full bg-slate-900 overflow-hidden group">
                  <Image
                    key={currentHeroImage}
                    src={currentHeroImage}
                    alt={activePillar.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient vignette for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Bottom Overlay Info with Big Metric */}
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5 pointer-events-none">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl xl:text-5xl font-extrabold text-[#D9E8BE] tracking-tight">
                        {activePillar.metric}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                        {activePillar.metricLabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-2">
                      {activePillar.subtitle}
                    </p>
                  </div>
                </div>

                {/* Secondary Compensatory Images Gallery */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#447D29]" />
                      <span>{t("evidence")}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {t("clickToInspect")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {activePillar.secondaryImages.map((secImg, sIdx) => {
                      const isSelected = currentHeroImage === secImg.src;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setOverridePillar({ index: activeIndex, src: secImg.src })}
                          className={`relative h-24 rounded-xl overflow-hidden text-left border-2 transition-all duration-300 group cursor-pointer focus:outline-none ${
                            isSelected
                              ? "border-[#447D29] ring-2 ring-[#447D29]/30"
                              : "border-slate-200/90 hover:border-slate-400"
                          }`}
                        >
                          <Image
                            src={secImg.src}
                            alt={secImg.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                          <div className="absolute bottom-1.5 left-2 right-2">
                            <p className="text-[11px] font-semibold text-white leading-tight line-clamp-1 drop-shadow-sm">
                              {secImg.title}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Quick Action Strip */}
                <div className="px-5 py-3.5 bg-white flex items-center justify-between gap-4 border-t border-slate-200/70">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-700">
                      {t("directSupport")}
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="btn-pill-primary text-xs !py-1.5 !px-3.5"
                  >
                    <span>{t("requestSample")}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
