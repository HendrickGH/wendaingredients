"use client";

import React, { useState } from "react";
import { Badge } from "../atoms/Badge";
import { IndustryCard } from "../molecules/IndustryCard";
import {
  INDENT_INDUSTRIES,
  INDENT_PROCESS_STEPS,
  IndentIndustry
} from "@/data/siteContent";
import {
  Globe,
  Ship,
  CheckCircle2,
  FileCheck,
  Search,
  ArrowRight,
  ChevronRight,
  Filter
} from "lucide-react";

interface WendaIndentSectionProps {
  onSelectIndustry: (ind: IndentIndustry) => void;
  onRequestQuote: (industryName?: string) => void;
}

export const WendaIndentSection: React.FC<WendaIndentSectionProps> = ({
  onSelectIndustry,
  onRequestQuote
}) => {
  const [filterQuery, setFilterQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredIndustries = INDENT_INDUSTRIES.filter((ind) => {
    const matchesSearch =
      ind.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      ind.items.some((i) => i.toLowerCase().includes(filterQuery.toLowerCase()));

    if (activeTab === "food") {
      return matchesSearch && ind.id !== "soluciones-industriales";
    }
    if (activeTab === "industrial") {
      return matchesSearch && ind.id === "soluciones-industriales";
    }
    return matchesSearch;
  });

  return (
    <section id="indent" className="py-24 lg:py-32 bg-[#FFFFFF] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Header - Editorial Style */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <Badge variant="wenda" size="md">
                Abastecimiento Wenda Indent
              </Badge>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-[#2F591B] uppercase tracking-wider">
                Suministro Global & Importación Segura
              </span>
            </div>
            <h2 className="heading-editorial-lg font-editorial text-slate-900">
              Conectamos las necesidades de cada industria con fabricantes internacionales certificados
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              En alianza con fabricantes mundiales que cumplen los más altos estándares de calidad y certificación internacional, ponemos a tu alcance materias primas, ingredientes y soluciones técnicas con suministro confiable y disponibilidad local.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => onRequestQuote("Wenda Indent General")}
              className="btn-pill-primary text-xs !py-3.5 !px-6 group cursor-pointer"
            >
              <span>Solicitar Cotización de Importación</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 5-Step Indent Methodology - Open Step Track */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xl font-bold text-slate-900 font-editorial flex items-center gap-2">
              <Ship className="w-5 h-5 text-[#447D29]" />
              El Modelo de Abastecimiento Wenda Indent
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Desde 1995 en EE. UU., Latam, Turquía y Asia-Pacífico
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {INDENT_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="py-4 border-t border-slate-200 space-y-2 group hover:border-[#447D29] transition-all duration-300"
              >
                <div className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                  Paso {step.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Soluciones por Industria */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs uppercase text-[#447D29] tracking-wider font-bold">
                Catálogo Multidisciplinario
              </span>
              <h3 className="heading-editorial-md font-editorial text-slate-900 mt-0.5">
                Soluciones por Industria
              </h3>
            </div>

            {/* Filter buttons & search bar (Pill Styling) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-[#F1F5F9] p-1 border border-slate-200 rounded-full">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full cursor-pointer transition-all ${
                    activeTab === "all" ? "bg-[#447D29] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Todas ({INDENT_INDUSTRIES.length})
                </button>
                <button
                  onClick={() => setActiveTab("food")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full cursor-pointer transition-all ${
                    activeTab === "food" ? "bg-[#447D29] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Alimentarias
                </button>
                <button
                  onClick={() => setActiveTab("industrial")}
                  className={`px-4 py-1.5 text-xs font-bold rounded-full cursor-pointer transition-all ${
                    activeTab === "industrial" ? "bg-[#447D29] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Industriales
                </button>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar reactivo o ingrediente..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#447D29] w-48 sm:w-64 shadow-2xs transition-all"
                />
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIndustries.map((ind) => (
              <IndustryCard
                key={ind.id}
                industry={ind}
                onSelect={onSelectIndustry}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
