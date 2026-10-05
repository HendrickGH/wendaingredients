"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import {
  Lightbulb,
  FlaskConical,
  Award,
  Globe2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Building2,
  Quote
} from "lucide-react";

export const AboutManifestoSection: React.FC = () => {
  const { t } = useTranslation("about");

  const differentiators = [
    {
      title: t("differentiators.0.title", "Innovación y Ciencia"),
      description: t(
        "differentiators.0.desc",
        "Desarrollamos soluciones con un propósito concreto: mejorar el desempeño del producto y generar valor real en su aplicación."
      ),
      image: "/images/supplements/clean-science-research.jpg",
      tag: "I+D Biomolecular",
      icon: <Lightbulb className="w-5 h-5 text-[#447D29]" />
    },
    {
      title: t("differentiators.1.title", "Soporte Técnico Cercano"),
      description: t(
        "differentiators.1.desc",
        "Nuestros especialistas comprenden el reto, prueban alternativas en planta piloto y acompañan la implementación hasta el resultado esperado."
      ),
      image: "/images/about/team-collaboration.jpg",
      tag: "Planta Piloto In-Situ",
      icon: <FlaskConical className="w-5 h-5 text-emerald-700" />
    },
    {
      title: t("differentiators.3.title", "Calidad sin Concesiones"),
      description: t(
        "differentiators.3.desc",
        "Trabajamos con sistemas rigurosos de evaluación, control y trazabilidad continua para brindar consistencia y confianza absoluta."
      ),
      image: "/images/tech/clean-processing-lines.jpg",
      tag: "GFSI & BRCGS Grado A",
      icon: <Award className="w-5 h-5 text-amber-700" />
    },
    {
      title: t("differentiators.2.title", "Alcance Internacional"),
      description: t(
        "differentiators.2.desc",
        "Nuestra presencia global y conocimiento local nos permiten responder con agilidad a mercados, regulaciones y procesos diversos."
      ),
      image: "/images/tech/industrial-facility.jpg",
      tag: "Presencia en 10+ Países",
      icon: <Globe2 className="w-5 h-5 text-sky-700" />
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] relative border-b border-slate-200 overflow-hidden">
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#447D29]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100/80 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Top 50/50 Split: Narrative & Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative, Quote & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <Badge variant="wenda" size="md">
                  {t("badge", "Acerca de Wenda Ingredients")}
                </Badge>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F591B]">
                  Desde 1995
                </span>
              </div>

              <h2 className="heading-editorial-lg font-editorial text-[#0F172A] leading-tight">
                {t("title", "Expertos en convertir oportunidades de formulación en ventajas competitivas")}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                {t(
                  "lead",
                  "Desde 1995, en Wenda Ingredients anticipamos la evolución de la industria alimentaria y desarrollamos ingredientes funcionales que responden a sus desafíos más complejos."
                )}
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t(
                  "body",
                  "Combinamos conocimiento científico, experiencia en aplicaciones y visión comercial para ayudar a nuestros clientes a mejorar sus productos, optimizar sus procesos y generar mayor valor en el mercado. No somos únicamente un proveedor de ingredientes: somos el aliado técnico que entiende la formulación, el proceso y el resultado que cada negocio necesita alcanzar."
                )}
              </p>

              {/* Editorial pullquote */}
              <div className="flex items-start gap-3 py-1">
                <Quote className="w-5 h-5 text-[#447D29] shrink-0 mt-1" />
                <div className="space-y-0.5">
                  <span className="text-base font-bold text-slate-900 italic font-serif block">
                    {t("quote", "“We listen, reach out and we deliver”")}
                  </span>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-sans font-semibold block">
                    Filosofía de Servicio Global
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions moved right below text */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact" className="btn-pill-primary text-xs !py-3 !px-6 shadow-sm">
                <span>Contactar a un Ingeniero</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#science"
                className="text-xs font-bold text-[#2F591B] hover:text-[#447D29] transition-colors flex items-center gap-1.5 px-3 py-2"
              >
                <span>Conoce WNDA Science</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Anchor with HQ Campus & Laboratory Floating Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary Corporate Campus Image */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl group">
                <Image
                  src="/images/about/wenda-corporate-campus.jpg"
                  alt="Wenda Ingredients Headquarters & R&D Campus"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

                {/* Campus Image Caption Banner */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-[#A8D88E]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D9E8BE]">
                      Campus Central & Planta Piloto
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium line-clamp-1">
                    Centro neurálgico de biotecnología, desarrollo de prototipos y pruebas de reología cárnica.
                  </p>
                </div>
              </div>

              {/* Overlapping Laboratory Inset Card */}
              <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-8 sm:max-w-xs bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src="/images/about/team-collaboration.jpg"
                      alt="Científicos de alimentos Wenda"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2F591B] uppercase tracking-wide">
                      <Sparkles className="w-3 h-3 text-[#447D29]" />
                      I+D en Acción
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      Soporte en Planta Piloto
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Formulaciones a la medida
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                  <span className="flex items-center gap-1 text-[#2F591B]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#447D29]" />
                    GFSI-BRCGS Grado A
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="font-bold text-slate-700">100% Trazable</span>
                </div>
              </div>

              {/* Floating Quality Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-full py-1.5 px-4 border border-[#447D29]/30 shadow-md items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#447D29] animate-pulse" />
                <span className="text-[11px] font-bold text-[#2F591B] uppercase tracking-wider">
                  30 Años de Rigor Científico
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Full-Width Differentiators: Prominent Cards with Photography and High Visual Weight */}
        <div className="pt-10 border-t border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2F591B] block mb-1">
                Capacidades Estratégicas
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-editorial text-slate-900">
                Pilares que Marcan la Diferencia en Cada Formulación
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Aportamos valor medible en rendimiento, estabilidad y etiqueta limpia en cada desarrollo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white hover:border-[#447D29] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Image Header Area */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={diff.image}
                    alt={diff.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Minimal unboxed tag over photo */}
                  <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white tracking-wide uppercase drop-shadow-sm">
                    {diff.tag}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-[#F0F7ED] shrink-0">
                        {diff.icon}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#2F591B] transition-colors font-editorial">
                        {diff.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#2F591B] font-semibold opacity-90 group-hover:opacity-100">
                    <span>Saber más</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
