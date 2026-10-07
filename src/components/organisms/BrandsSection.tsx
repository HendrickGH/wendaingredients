"use client";

import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { BrandCard } from "../molecules/BrandCard";
import { BrandItem } from "@/data/siteContent";
import { useSiteContent } from "@/i18n/useSiteContent";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEditorialCarousel } from "@/hooks/useEditorialCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BrandsSectionProps {
  onOpenBrandDetails: (brand: BrandItem) => void;
}

export const BrandsSection: React.FC<BrandsSectionProps> = ({ onOpenBrandDetails }) => {
  const { t } = useTranslation("brandsSection");
  const { brands: BRANDS } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const crossLinksRef = useRef<HTMLDivElement>(null);

  const {
    scrollRef,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    seekToRatio
  } = useEditorialCarousel();

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
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Carousel cards reveal
      if (scrollRef.current) {
        const cards = scrollRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scrollRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Cross links reveal
      if (crossLinksRef.current) {
        gsap.fromTo(
          crossLinksRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: crossLinksRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollRef]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    seekToRatio(clickRatio);
  };

  return (
    <section
      ref={sectionRef}
      id="marcas"
      className="py-24 bg-[#F8FAF6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Header without reserved note */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="wenda" size="md">
              {t("badge")}
            </Badge>
            <Heading level={2} color="slate">
              {t("title")}
            </Heading>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Editorial Carousel Track */}
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label={t("carouselAria")}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-4 focus:outline-hidden"
        >
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start flex"
            >
              <BrandCard
                brand={brand}
                onOpenDetails={onOpenBrandDetails}
              />
            </div>
          ))}
        </div>

        {/* Indicative Expanding Scroll Border and Navigation Arrows */}
        <div className="flex items-center justify-between gap-6 pt-4">
          {/* Scroll progress line */}
          <div
            onClick={handleTrackClick}
            className="relative flex-1 h-[3px] bg-slate-300/80 rounded-full cursor-pointer overflow-hidden py-1 -my-1 group"
            title={t("trackTitle")}
          >
            <div className="absolute inset-0 bg-slate-300/80 rounded-full" />
            <div
              className="absolute top-0 bottom-0 left-0 bg-slate-900 rounded-full transition-all duration-300 ease-out group-hover:bg-[#447D29]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              aria-label={t("prevAria")}
              className={`p-2 text-slate-800 transition-all duration-200 cursor-pointer ${
                canScrollLeft
                  ? "hover:text-[#447D29] hover:-translate-x-1 active:scale-95"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollRight}
              aria-label={t("nextAria")}
              className={`p-2 text-slate-800 transition-all duration-200 cursor-pointer ${
                canScrollRight
                  ? "hover:text-[#447D29] hover:translate-x-1 active:scale-95"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* Cross links to WNDA Science & Wenda Indent */}
        <div ref={crossLinksRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <a
            href="#science"
            className="group py-6 transition-colors flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-800 tracking-wide">
                {t("scienceTag")}
              </span>
              <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">
                {t("scienceTitle")}
              </h4>
              <p className="text-xs text-slate-600">
                {t("scienceDesc")}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#447D29] transition-transform group-hover:translate-x-2" />
          </a>

          <a
            href="#indent"
            className="group py-6 transition-colors flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-[#2F591B] tracking-wide">
                {t("indentTag")}
              </span>
              <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">
                {t("indentTitle")}
              </h4>
              <p className="text-xs text-slate-600">
                {t("indentDesc")}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#447D29] transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
};
