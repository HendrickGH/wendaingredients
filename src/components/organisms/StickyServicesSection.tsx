"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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

const PILLARS: StickyPillar[] = [
  {
    id: "meat",
    category: "Cárnicos & Embutidos",
    title: "Sistemas ligantes, transglutaminasa WBS y bioprotección SafePlate®",
    subtitle: "Rendimiento, textura y retención de jugos sin sinéresis.",
    description:
      "Optimizamos la retención de agua, firmeza al corte y estabilidad durante tratamientos térmicos severos. Reducimos mermas de cocción hasta en un 35% mientras garantizamos rebanabilidad impecable en jamones y embutidos emulsionados.",
    metric: "-35%",
    metricLabel: "Reducción de Mermas de Cocción",
    image: "/images/meat/roasted-meat.jpg",
    secondaryImages: [
      {
        src: "/images/meat/sausages-charcuterie.jpg",
        title: "Emulsión & Rebanabilidad al Frío",
        tag: "SafePlate® Bio",
        caption: "Estabilidad de emulsiones finas sin sinéresis ni separación grasa."
      },
      {
        src: "/images/meat/fresh-cuts.jpg",
        title: "Retención de Humedad en Cortes",
        tag: "WBS Ligantes",
        caption: "Mejora de rendimiento y mordida en piezas enteras y marinados."
      }
    ],
    badge: "Solución Cárnica Avanzada",
    specs: ["WBS Transglutaminasa libre de alérgenos", "SafePlate® antimicrobiano natural", "Wenda Phos retención de humedad"],
    ctaText: "Explorar soluciones cárnicas",
    targetId: "#categorias"
  },
  {
    id: "bakery",
    category: "Panificación & Miga",
    title: "Acondicionadores enzimáticos y bio-conservadores para panificación",
    subtitle: "Volumen superior, miga elástica y frescura prolongada.",
    description:
      "Formulaciones diseñadas para soportar procesos de alta velocidad y congelación de masas sin perder volumen ni esponjosidad. Extiende la vida útil en anaquel hasta 21 días manteniendo suavidad y resiliencia organoléptica.",
    metric: "+22%",
    metricLabel: "Salto de Horno & Volumen",
    image: "/images/bakery/artisan-bread-crumb.jpg",
    secondaryImages: [
      {
        src: "/images/bakery/dough-kneading.jpg",
        title: "Tolerancia Mecánica al Amasado",
        tag: "Bio-acondicionador",
        caption: "Refuerzo del gluten para masas de alta hidratación y líneas continuas."
      },
      {
        src: "/images/bakery/rustic-sourdough.jpg",
        title: "Alveolado & Estructura de Miga",
        tag: "Enzimas de Miga",
        caption: "Conservación de frescura y miga esponjosa hasta por 21 días."
      }
    ],
    badge: "Bio-ingeniería Panadera",
    specs: ["Complejos enzimáticos de volumen", "Sistemas antiextrusión y congelado", "Clean label sin bromato ni emulsificantes sintéticos"],
    ctaText: "Ver portafolio panificación",
    targetId: "#categorias"
  },
  {
    id: "nature",
    category: "Colores de la Naturaleza",
    title: "Pigmentos botánicos puros termoestables y resistentes a la luz",
    subtitle: "Coloraciones vibrantes sin aditivos artificiales ni sabor residual.",
    description:
      "Extraídos de cúrcuma, betabel, clorofila y páprika mediante tecnología de microencapsulación que protege el tono cromático durante pasteurización y extrusión continua, logrando etiquetas 100% limpias.",
    metric: "100%",
    metricLabel: "Origen Botánico Certificado",
    image: "/images/nature/spices-vibrant-colors.jpg",
    secondaryImages: [
      {
        src: "/images/nature/natural-pigments-powder.jpg",
        title: "Microencapsulado Grado Alimentario",
        tag: "Clean Label",
        caption: "Protección contra oxidación térmica y degradación por luz UV."
      },
      {
        src: "/images/nature/turmeric-curcumin.jpg",
        title: "Extractos Espectrales de Cúrcuma",
        tag: "100% Botánico",
        caption: "Tonos amarillos y dorados estables con solubilidad instantánea."
      }
    ],
    badge: "Clean Label Pigments",
    specs: ["Resistencia a procesos térmicos > 120°C", "7 familias espectrales estables", "Certificación Kosher y Halal por lote"],
    ctaText: "Descubrir tonos botánicos",
    targetId: "#categorias"
  },
  {
    id: "science",
    category: "WNDA Science & Indent",
    title: "Nutracéuticos, aminoácidos certificados y cadena de suministro global",
    subtitle: "Trazabilidad documental lote a lote con entrega directa garantizada.",
    description:
      "Acceso directo a más de 100 principios activos y excipientes de grado farmacéutico y alimentario con soporte técnico in situ y logística puerta a puerta desde nuestras 10 filiales internacionales.",
    metric: "10+",
    metricLabel: "Países con Red Logística Directa",
    image: "/images/hero/biotech-research.jpg",
    secondaryImages: [
      {
        src: "/images/supplements/supplement-scoop-pure.jpg",
        title: "Pureza Química & Ensayos HPLC",
        tag: "Grado Farma",
        caption: "Espectrometría de masas y certificados analíticos (CoA) por lote."
      },
      {
        src: "/images/tech/clean-processing-lines.jpg",
        title: "Líneas de Grado Aséptico ISO",
        tag: "Cadena Global",
        caption: "Auditorías de calidad internacionales y distribución refrigerada."
      }
    ],
    badge: "Infraestructura Global",
    specs: ["CoA y espectrometría por lote", "4 centros R&D y 6 laboratorios cárnicos", "Suministro continuo con stock local"],
    ctaText: "Consultar WNDA Science",
    targetId: "#science"
  }
];

export const StickyServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [overridePillar, setOverridePillar] = useState<{ index: number; src: string } | null>(null);
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
    <section className="py-24 lg:py-32 bg-[#FFFFFF] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16 lg:mb-20">
          <Badge variant="wenda" size="md">
            Soluciones Especializadas de Alto Desempeño
          </Badge>
          <h2 className="heading-editorial-lg font-editorial">
            Desde sistemas ligantes cárnicos hasta biotecnología clean label, hacemos que suceda.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Inspirados en la precisión científica y el acompañamiento técnico continuo, transformamos retos de textura, rendimiento y vida útil en resultados medibles en cada lote.
          </p>
        </div>

        {/* 2-Column Experience: Left Scrolls with generous height, Right stays sticky throughout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Scrolling Feature Items with minimum height per pillar for smooth pacing */}
          <div className="lg:col-span-6 space-y-20 lg:space-y-28 pb-24">
            {PILLARS.map((pillar, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={pillar.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className={`min-h-[480px] flex flex-col justify-center transition-all duration-500 pt-4 border-l-2 pl-6 sm:pl-8 cursor-pointer ${
                    isActive
                      ? "border-[#447D29] opacity-100 translate-x-0"
                      : "border-slate-200 opacity-65 hover:opacity-90 translate-x-0"
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

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
                      {activePillar.badge}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-300 border border-white/10">
                      {activePillar.category}
                    </span>
                  </div>

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
                      <span>Evidencia & Ensayos Técnicos</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Click para inspeccionar
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
                          <div className="absolute top-1.5 left-2">
                            <span className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-emerald-300 border border-white/10">
                              {secImg.tag}
                            </span>
                          </div>
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
                      Soporte Técnico Directo Disponible
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="btn-pill-primary text-xs !py-1.5 !px-3.5"
                  >
                    <span>Solicitar Muestra</span>
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
