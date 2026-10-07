"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import {
  Lightbulb,
  FlaskConical,
  Award,
  Globe2,
  ArrowRight,
  Building2,
  Quote
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const AboutManifestoSection: React.FC = () => {
  const { t } = useTranslation("about");
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const campusRef = useRef<HTMLDivElement>(null);
  const differentiatorsHeaderRef = useRef<HTMLDivElement>(null);
  const differentiatorsGridRef = useRef<HTMLDivElement>(null);

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
      title: t("differentiators.2.title", "Alcance Internacional"),
      description: t(
        "differentiators.2.desc",
        "Nuestra presencia global y conocimiento local nos permiten responder con agilidad a mercados, regulaciones y procesos diversos."
      ),
      image: "/images/tech/industrial-facility.jpg",
      tag: "Presencia en 10+ Países",
      icon: <Globe2 className="w-5 h-5 text-sky-700" />
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
      title: t("differentiators.4.title", "Relaciones que Perduran"),
      description: t(
        "differentiators.4.desc",
        "Construimos alianzas basadas en la transparencia, la integridad y el beneficio mutuo a largo plazo con clientes y proveedores."
      ),
      image: "/images/about/team-collaboration.jpg",
      tag: "Alianzas Estratégicas",
      icon: <Building2 className="w-5 h-5 text-teal-700" />
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Narrative waterfall entrance
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Campus & Lab visual entrance
      if (campusRef.current) {
        gsap.fromTo(
          campusRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: campusRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }


      // 5. Differentiators Header & Grid Stagger
      if (differentiatorsHeaderRef.current) {
        gsap.fromTo(
          differentiatorsHeaderRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: differentiatorsHeaderRef.current,
              start: "top 88%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      if (differentiatorsGridRef.current) {
        gsap.fromTo(
          differentiatorsGridRef.current.children,
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: differentiatorsGridRef.current,
              start: "top 88%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-28 bg-[#FFFFFF] relative border-b border-slate-200 overflow-hidden"
    >
      {/* Subtle organic background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#447D29]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-100/80 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Top 50/50 Split: Narrative & Visual Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative */}
          <div ref={narrativeRef} className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2">
              <Badge variant="wenda" size="md">
                {t("badge", "Acerca de Wenda Ingredients")}
              </Badge>
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

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {t(
                "b2b",
                "Como aliado B2B para la industria alimentaria global, atendemos a fabricantes, procesadores y marcas de alimentos que buscan resolver desafíos de formulación, producción, calidad, inocuidad, vida útil y desempeño. Trabajamos tanto con empresas regionales como con organizaciones multinacionales, adaptando cada solución a su producto, proceso y objetivos de negocio."
              )}
            </p>
          </div>

          {/* Right Column: Visual Anchor with HQ Campus & Editorial Pullquote / CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative">
              {/* Primary Corporate Campus Image */}
              <div ref={campusRef} className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl group">
                <Image
                  src="/images/about/wenda-corporate-campus.jpg"
                  alt="Wenda Ingredients Headquarters & R&D Campus"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Editorial pullquote */}
            <div className="flex items-start gap-3 py-1">
              <Quote className="w-5 h-5 text-[#447D29] shrink-0 mt-1" />
              <div className="space-y-0.5">
                <span className="text-base font-bold text-slate-900 italic font-serif block">
                  {t("quote", "“We listen, reach out and we deliver”")}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact" className="btn-pill-primary text-xs !py-3 !px-6 shadow-sm hover:shadow-md transition-all active:scale-95">
                <span>{t("b2bCta", "Solicitar Asesoría B2B")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#science"
                className="text-xs font-bold text-[#2F591B] hover:text-[#447D29] transition-colors flex items-center gap-1.5 px-3 py-2 group"
              >
                <span>Conoce WNDA Science</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Full-Width Differentiators: Prominent Cards with Photography and High Visual Weight */}
        <div className="pt-10 space-y-6">
          <div ref={differentiatorsHeaderRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
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

          <div
            ref={differentiatorsGridRef}
            className="grid grid-cols-1 md:grid-cols-6 gap-6"
          >
            {differentiators.map((diff, idx) => {
              const isFirstRow = idx < 3;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border border-slate-200 bg-white hover:border-[#447D29] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group ${
                    isFirstRow ? "md:col-span-2" : "md:col-span-3"
                  }`}
                >
                  {/* Image Header Area */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={diff.image}
                      alt={diff.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={isFirstRow ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
                    />
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="p-2 rounded-lg bg-[#F0F7ED] shrink-0">
                          {diff.icon}
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#2F591B] transition-colors font-editorial">
                          {diff.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {diff.description}
                      </p>
                    </div>

                    <div className="pt-3 flex items-center justify-between text-xs text-[#2F591B] font-semibold opacity-90 group-hover:opacity-100">
                      <span>Saber más</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
