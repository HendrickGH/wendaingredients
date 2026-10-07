"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { Camera, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEditorialCarousel } from "@/hooks/useEditorialCarousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import translations from "@/i18n/translations.json";

const GALLERY_IMAGES = [
  "/images/meat/charcuterie-board.jpg",
  "/images/bakery/rustic-sourdough.jpg",
  "/images/nature/turmeric-curcumin.jpg",
  "/images/supplements/lab-glassware-pipette.jpg",
  "/images/tech/clean-processing-lines.jpg",
  "/images/meat/fresh-cuts.jpg",
  "/images/bakery/fresh-baguettes.jpg",
  "/images/supplements/supplement-scoop-pure.jpg"
];

interface GalleryItemData {
  title: string;
  category: string;
  tag: string;
  claim: string;
}

export const VisualGallerySection: React.FC = () => {
  const { t, i18n } = useTranslation("visualGallery");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const {
    scrollRef,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    seekToRatio
  } = useEditorialCarousel();

  const rawItems = t("items", { returnObjects: true });
  const activeLang = ((i18n.resolvedLanguage || i18n.language || "es") as "es" | "en" | "zh") in translations.visualGallery
    ? ((i18n.resolvedLanguage || i18n.language || "es") as "es" | "en" | "zh")
    : "es";

  const fallbackItems = translations.visualGallery[activeLang]?.items || translations.visualGallery.es.items;
  const itemsData = Array.isArray(rawItems) && rawItems.length > 0
    ? (rawItems as GalleryItemData[])
    : (fallbackItems as GalleryItemData[]);

  const items = itemsData.map((item, idx) => ({
    ...item,
    image: GALLERY_IMAGES[idx] || GALLERY_IMAGES[0]
  }));

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
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Carousel items reveal
      if (scrollRef.current) {
        const cards = scrollRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
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
      id="galeria-aplicaciones"
      className="py-24 bg-[#FFFFFF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="wenda" size="md" icon={<Camera className="w-3.5 h-3.5" />}>
              {t("badge")}
            </Badge>
            <Heading level={2} color="slate">
              {t("title")}
            </Heading>
            <p className="text-base text-slate-600 font-normal">
              {t("subtitle")}
            </p>
          </div>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:text-[#447D29] hover:border-[#447D29] transition-all text-xs font-bold tracking-wide w-fit self-start md:self-end hover:bg-[#F8FAF6]"
          >
            <span>{t("cta")}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Editorial Carousel Track */}
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label={t("ariaCarousel")}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-4 focus:outline-hidden"
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start flex"
            >
              <div className="group relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#447D29] hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full w-full">
                <div>
                  {/* Image Container with pill badge and ↗ button */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Pill Tag bottom-left */}
                    <div className="absolute bottom-3 left-3 bg-[#447D29]/90 text-white backdrop-blur-xs font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
                      {item.tag}
                    </div>

                    {/* Circular Arrow Button top-right */}
                    <a
                      href="#contacto"
                      aria-label={t("consultAria", { title: item.title })}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#447D29] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#2F591B] cursor-pointer"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>

                  {/* Content Details */}
                  <span className="text-xs font-bold uppercase tracking-wider text-[#447D29] block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#447D29] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-1.5 font-normal leading-relaxed">
                    {item.claim}
                  </p>
                </div>

                {/* Action Note */}
                <div className="pt-3 mt-2 text-xs font-bold text-[#447D29] flex items-center gap-1.5 group-hover:text-[#2F591B] transition-colors">
                  <span>{t("viewFormulation")}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicative Expanding Scroll Border and Navigation Arrows */}
        <div className="flex items-center justify-between gap-6 pt-4">
          {/* Scroll progress line */}
          <div
            onClick={handleTrackClick}
            className="relative flex-1 h-[3px] bg-slate-200 rounded-full cursor-pointer overflow-hidden py-1 -my-1 group"
            title={t("trackTitle")}
          >
            <div className="absolute inset-0 bg-slate-200 rounded-full" />
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
      </div>
    </section>
  );
};
