"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { NaturalColorSwatch } from "../molecules/NaturalColorSwatch";
import { CATEGORIES, NATURAL_COLORS, CategoryItem } from "@/data/siteContent";
import {
  Beef,
  Wheat,
  Pill,
  Palette,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "meat-poultry": <Beef className="w-4 h-4" />,
  "bakery": <Wheat className="w-4 h-4" />,
  "supplements": <Pill className="w-4 h-4" />,
  "from-nature": <Palette className="w-4 h-4" />,
  "tecnologia": <Cpu className="w-4 h-4" />
};

export const CategoryShowcase: React.FC<{ onConsultSolution: (category: string) => void }> = ({
  onConsultSolution
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("meat-poultry");

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];

  return (
    <section id="categorias" className="py-24 lg:py-32 bg-[#FFFFFF] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Section Header - Clarity Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="wenda" size="md">
              Categorías de Formulación Especializada
            </Badge>
            <h2 className="heading-editorial-lg font-editorial">
              Una categoría, múltiples desafíos. Una solución desarrollada para ti.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Transformamos la ciencia de los ingredientes en soluciones industriales con resultados reproducibles en cada lote.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onConsultSolution(currentCategory.title)}
              className="btn-pill-secondary text-xs !py-3 !px-5 group cursor-pointer"
            >
              <span>Consultar formulación para {currentCategory.title}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Category Navigation Pill Tabs (Clarity Auto-Tabs style) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer select-none border ${
                  isActive
                    ? "bg-[#447D29] text-white border-[#447D29] shadow-sm"
                    : "bg-[#F8FAF6] text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200"
                }`}
              >
                <span className={isActive ? "text-white" : "text-[#447D29]"}>
                  {categoryIcons[cat.id]}
                </span>
                <span>{cat.title}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white font-bold" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {cat.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Display Hero - Clarity Bento Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Visual & Applications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-80 sm:h-96 w-full bg-slate-900 overflow-hidden rounded-2xl shadow-md border border-slate-200 group">
              <Image
                src={currentCategory.image}
                alt={currentCategory.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm border-t border-slate-100 p-5 space-y-1">
                <p className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                  {currentCategory.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial">
                  {currentCategory.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                  {currentCategory.tagline}
                </p>
              </div>
            </div>

            {/* Applications List */}
            {currentCategory.applications && (
              <div className="pt-2 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#447D29]" />
                  Aplicaciones Desarrolladas en Planta:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentCategory.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 bg-[#F8FAF6] text-slate-800 rounded-full font-medium border border-slate-200"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick highlight checklist */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Beneficios Clave Comprobados:
              </h4>
              {currentCategory.highlights.map((h, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Pillars & Detailed Technical Blocks */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentCategory.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="py-4 border-t border-slate-200 space-y-2.5 group hover:border-[#447D29] transition-all duration-300"
                >
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">{pillar.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {pillar.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#447D29] shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* If From Nature category: display Color Spectrum Swatches */}
            {currentCategory.id === "from-nature" && (
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#447D29]">
                      Espectro Cromático Botánico
                    </span>
                    <h4 className="text-base font-bold text-slate-900">
                      Gama de Pigmentos Naturales Microfinos
                    </h4>
                  </div>
                  <Badge variant="wenda" size="sm">
                    100% Clean Label
                  </Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {NATURAL_COLORS.map((color) => (
                    <NaturalColorSwatch key={color.name} color={color} />
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Callout Bar */}
            <div className="p-6 rounded-2xl bg-[#F8FAF6] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#447D29]">
                  Evaluación Técnica en Planta Piloto
                </span>
                <p className="text-xs text-slate-600">
                  ¿Deseas probar esta solución en tu línea de producción con acompañamiento de nuestros ingenieros?
                </p>
              </div>
              <button
                onClick={() => onConsultSolution(currentCategory.title)}
                className="btn-pill-primary text-xs !py-2.5 !px-5 shrink-0 group cursor-pointer"
              >
                <span>Solicitar Muestra / Prueba</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
