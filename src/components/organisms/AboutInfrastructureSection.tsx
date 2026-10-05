"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { MetricCounter } from "../atoms/MetricCounter";


export const AboutInfrastructureSection: React.FC = () => {
  const { t } = useTranslation("about");

  // Select the 4 core institutional stats for a clean, spacious 2x2 presentation
  const coreStats = [
    {
      value: "6",
      label: "Laboratorios Cárnicos",
      desc: "Pruebas de reología, emulsión y corte en planta piloto."
    },
    {
      value: "4",
      label: "Centros de R&D",
      desc: "Desarrollo biomolecular, enzimas y bioprotección."
    },
    {
      value: "10+",
      label: "Países con Red Directa",
      desc: "Soporte técnico, normativo y comercial local."
    },
    {
      value: "30+",
      label: "Años de Innovación",
      desc: "Trayectoria continua en ingredientes funcionales desde 1995."
    }
  ];

  return (
    <section
      id="infrastructure"
      className="py-20 lg:py-28 bg-[#EFF6EC] text-slate-900 relative border-b border-[#D8E8D3] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Balanced 2-Column Split: Editorial Stats on Left, High-Impact Clean Photography on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative & Clean Editorial Metrics */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Header info */}
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-widest uppercase text-[#244C16] block">
                {t("infra.badge", "Infraestructura & Capacidad Global")}
              </span>

              <h2 className="heading-editorial-lg font-editorial text-[#0F172A] leading-tight">
                {t("infra.title", "Experiencia Global. Rigor Técnico en Cada Mercado.")}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                Una red internacional coordinada de laboratorios de aplicación, centros de investigación y hubs logísticos estratégicos que conectan el desarrollo científico con el abastecimiento confiable a gran escala.
              </p>
            </div>

            {/* Clean Editorial Stats: 2x2 Grid with generous breathing room and zero boxed clutter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-2">
              {coreStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="pt-4 border-t border-[#D0E2CA] space-y-1.5 group"
                >
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#1B3811] font-editorial tracking-tight group-hover:text-[#447D29] transition-colors">
                    <MetricCounter value={stat.value} />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A]">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>



          </div>

          {/* Right Column: Clean, Unencumbered Photography with Maximum Visual Weight */}
          <div className="lg:col-span-6">
            <div className="relative">
              
              {/* Clean Framed Photograph: No suffocating text or massive bullet dashboards stamped on it */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-[#D5E5CF] group">
                <Image
                  src="/images/about/global-logistics.jpg"
                  alt="Wenda Ingredients Red Logística y Abastecimiento Global"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                
                {/* Minimal subtle gradient only at bottom edge for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />



                {/* Clean, short caption at the bottom of the photo */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <h4 className="text-sm font-bold text-white font-editorial">
                    Abastecimiento Internacional & Hubs Estratégicos
                  </h4>
                  <p className="text-[11px] text-slate-200 mt-0.5 line-clamp-1">
                    Conectando origen, puertos y plantas industriales con trazabilidad continua.
                  </p>
                </div>
              </div>



            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
