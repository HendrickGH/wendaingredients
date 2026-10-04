"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { STATS } from "@/data/siteContent";
import { MetricCounter } from "../atoms/MetricCounter";
import {
  Globe,
  Calendar,
  Microscope,
  FlaskConical,
  Users,
  Award,
  Truck,
  CheckCircle2,
  Anchor,
  ShieldCheck
} from "lucide-react";

const statIconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-5 h-5 text-[#447D29]" />,
  Globe: <Globe className="w-5 h-5 text-emerald-700" />,
  Microscope: <Microscope className="w-5 h-5 text-teal-700" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-[#447D29]" />,
  Users: <Users className="w-5 h-5 text-emerald-800" />,
  Award: <Award className="w-5 h-5 text-[#447D29]" />
};

export const AboutInfrastructureSection: React.FC = () => {
  const { t } = useTranslation("about");

  return (
    <section
      id="infrastructure"
      className="py-20 lg:py-28 bg-[#EFF6EC] text-slate-900 relative border-b border-[#D8E8D3] overflow-hidden"
    >
      {/* Subtle organic light gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-[#DFF0D8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        
        {/* Section Header: Clean typography without boxed badges */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-[#1E4311] block">
            {t("infra.badge", "Infraestructura & Capacidad Global")}
          </span>

          <h2 className="heading-editorial-lg font-editorial text-[#0F172A] leading-tight">
            {t("infra.title", "Experiencia Global. Conocimiento Aplicado Localmente.")}
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Una red internacional coordinada de centros de investigación, plantas piloto y una cadena logística certificada para asegurar formulaciones precisas y abastecimiento ininterrumpido en cada mercado.
          </p>
        </div>

        {/* Featured Global Logistics Visual Showcase (High Visual Weight) */}
        <div className="relative rounded-3xl overflow-hidden border border-[#D5E5CF] shadow-xl group bg-slate-900">
          <div className="relative h-[380px] sm:h-[440px] lg:h-[500px] w-full overflow-hidden">
            <Image
              src="/images/about/global-logistics.jpg"
              alt="Wenda Ingredients Global Logistics & Supply Chain"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-103"
              sizes="100vw"
              priority
            />
            {/* Smooth gradient scrim for text contrast at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

            {/* Top clean text indicator (no box/border) */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 drop-shadow-md flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-300" />
                Red de Abastecimiento Intercontinental
              </span>
            </div>

            {/* Bottom Content Banner with High Contrast */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white space-y-4">
              <div className="max-w-3xl">
                <h3 className="text-2xl sm:text-3xl font-bold font-editorial text-white leading-tight drop-shadow-sm mb-2">
                  Cadena de Suministro Segura & Trazabilidad Continua de Origen a Destino
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl drop-shadow-xs">
                  Gestionamos hubs logísticos estratégicos para garantizar entregas Just-in-Time, cumplimiento normativo aduanal y soporte técnico en destino sin fricción operativa.
                </p>
              </div>

              {/* Logistics Value Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/20 text-xs sm:text-sm text-slate-100">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Certificados de Análisis (CoA) validados lote por lote</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Cadena de frío y control de humedad en tránsito</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Homologación aduanera y regulatoria internacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Key Stats Grid: Clean, accessible white cards with Big Numbers */}
        <div className="space-y-6">
          <div className="border-b border-[#D8E8D3] pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1E4311]">
              Capacidad Operativa & Cobertura
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.id}
                className="group p-7 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#D5E5CF] hover:border-[#447D29] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#F0F7ED] group-hover:bg-[#E4F2DF] transition-colors">
                    {statIconMap[stat.iconName] || <Award className="w-5 h-5 text-[#447D29]" />}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                    Estándar Wenda
                  </span>
                </div>

                <div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#1B3811] group-hover:text-[#447D29] tracking-tight mb-2 font-editorial transition-colors">
                    <MetricCounter value={stat.value} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {stat.sublabel}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
