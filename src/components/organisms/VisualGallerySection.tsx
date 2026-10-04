"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { Camera, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEditorialCarousel } from "@/hooks/useEditorialCarousel";

interface GalleryItem {
  title: string;
  category: string;
  image: string;
  tag: string;
  claim: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Embutidos & Charcutería Fina",
    category: "Cárnicos",
    image: "/images/meat/charcuterie-board.jpg",
    tag: "Transglutaminasa WBS",
    claim: "Cohesión estructural perfecta y rebanabilidad sin rotura"
  },
  {
    title: "Panadería Rústica & Fermentación",
    category: "Panificación",
    image: "/images/bakery/rustic-sourdough.jpg",
    tag: "Volumen & Miga",
    claim: "Alvéolos homogéneos y conservación prolongada de humedad"
  },
  {
    title: "Pigmentos Puros de Cúrcuma & Remolacha",
    category: "From Nature",
    image: "/images/nature/turmeric-curcumin.jpg",
    tag: "100% Botánico",
    claim: "Termorresistencia en horneado y pasteurización"
  },
  {
    title: "Análisis Molecular & Control de Pureza",
    category: "WNDA Science",
    image: "/images/supplements/lab-glassware-pipette.jpg",
    tag: "Validación CoA",
    claim: "Confirmación de concentración activa y microbiología cero"
  },
  {
    title: "Líneas Automatizadas de Acero Inoxidable",
    category: "Tecnología",
    image: "/images/tech/clean-processing-lines.jpg",
    tag: "Maquinaria RIBON",
    claim: "Hornos de cocción y tumblers de alto rendimiento"
  },
  {
    title: "Cortes Magros & Inyección de Salmuera",
    category: "Cárnicos",
    image: "/images/meat/fresh-cuts.jpg",
    tag: "Fosfatos WendaPhos",
    claim: "Menor sinéresis en anaquel y reducción directa de mermas"
  },
  {
    title: "Bollería Dorada & Baguettes",
    category: "Panificación",
    image: "/images/bakery/fresh-baguettes.jpg",
    tag: "Tolerancia Bake-off",
    claim: "Excelente estabilidad en masas congeladas industriales"
  },
  {
    title: "Nutrición Deportiva & Polvos Instantáneos",
    category: "Suplementos",
    image: "/images/supplements/supplement-scoop-pure.jpg",
    tag: "Instantización",
    claim: "Dispersión instantánea en agua fría sin grumos"
  }
];

export const VisualGallerySection: React.FC = () => {
  const {
    scrollRef,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    seekToRatio
  } = useEditorialCarousel();

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    seekToRatio(clickRatio);
  };

  return (
    <section className="py-24 bg-[#FFFFFF] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="wenda" size="md" icon={<Camera className="w-3.5 h-3.5" />}>
              GALERÍA VISUAL DE APLICACIONES
            </Badge>
            <Heading level={2} color="slate">
              La Ciencia de los Alimentos en Acción Real
            </Heading>
            <p className="text-base text-slate-600 font-normal">
              Resultados tangibles desarrollados en colaboración con nuestros clientes en más de 10 países: desde embutidos de alta velocidad hasta panadería artesanal y bio-suplementos.
            </p>
          </div>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:text-[#447D29] hover:border-[#447D29] transition-all text-xs font-bold tracking-wide w-fit self-start md:self-end hover:bg-[#F8FAF6]"
          >
            <span>Ver todas las aplicaciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Editorial Carousel Track */}
        <div
          ref={scrollRef}
          tabIndex={0}
          aria-label="Carrusel de aplicaciones alimentarias"
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pt-2 pb-4 focus:outline-hidden"
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start group flex flex-col justify-between"
            >
              <div>
                {/* Image Container with pill badge and ↗ button */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-200/80 group-hover:border-[#447D29]/40 transition-colors">
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
                    aria-label={`Consultar formulación para ${item.title}`}
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
                <span>Ver formulación</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Indicative Expanding Scroll Border and Navigation Arrows */}
        <div className="flex items-center justify-between gap-6 pt-4 border-t border-slate-100">
          {/* Scroll progress line */}
          <div
            onClick={handleTrackClick}
            className="relative flex-1 h-[3px] bg-slate-200 rounded-full cursor-pointer overflow-hidden py-1 -my-1 group"
            title="Progreso de visualización"
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
              aria-label="Aplicación anterior"
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
              aria-label="Siguiente aplicación"
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
