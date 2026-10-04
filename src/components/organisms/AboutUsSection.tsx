import React from "react";
import Image from "next/image";
import { Badge } from "../atoms/Badge";
import { StatCard } from "../molecules/StatCard";
import { TimelineChronicle } from "./TimelineChronicle";
import { STATS } from "@/data/siteContent";
import {
  CheckCircle2,
  Building2,
  Users2,
  FlaskConical,
  Award,
  Globe2,
  HeartHandshake,
  Lightbulb,
  ArrowRight,
  ShieldCheck,
  Quote,
  Clock
} from "lucide-react";

export const AboutUsSection: React.FC = () => {
  const differentiators = [
    {
      title: "Innovación y Ciencia",
      description: "Desarrollamos soluciones con un propósito concreto: mejorar el desempeño del producto y generar valor real en su aplicación.",
      icon: <Lightbulb className="w-5 h-5 text-[#447D29]" />
    },
    {
      title: "Soporte Técnico Cercano",
      description: "Nuestros especialistas comprenden el reto, prueban alternativas en planta piloto y acompañan la implementación hasta el resultado esperado.",
      icon: <FlaskConical className="w-5 h-5 text-emerald-700" />
    },
    {
      title: "Alcance Internacional",
      description: "Nuestra presencia global y conocimiento local nos permiten responder con agilidad a mercados, regulaciones y procesos diversos.",
      icon: <Globe2 className="w-5 h-5 text-sky-700" />
    },
    {
      title: "Calidad sin Concesiones",
      description: "Trabajamos con sistemas rigurosos de evaluación, control y trazabilidad continua para brindar consistencia y confianza absoluta.",
      icon: <Award className="w-5 h-5 text-amber-700" />
    },
    {
      title: "Relaciones que Perduran",
      description: "Construimos alianzas basadas en la transparencia, la integridad y el beneficio mutuo a largo plazo con clientes y proveedores.",
      icon: <HeartHandshake className="w-5 h-5 text-violet-700" />
    }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-[#F8FAF6] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-24">
        {/* Section Header: Editorial Cadence */}
        <div className="space-y-4 max-w-3xl">
          <Badge variant="wenda" size="md">
            Acerca de Wenda Ingredients
          </Badge>
          <h2 className="heading-editorial-lg font-editorial">
            Expertos en convertir oportunidades de formulación en ventajas competitivas
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            Desde 1995, en Wenda Ingredients anticipamos la evolución de la industria alimentaria y desarrollamos ingredientes funcionales que responden a sus desafíos más complejos.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Combinamos conocimiento científico, experiencia en aplicaciones y visión comercial para ayudar a nuestros clientes a mejorar sus productos, optimizar sus procesos y generar mayor valor en el mercado. No somos únicamente un proveedor de ingredientes: somos el aliado técnico que entiende la formulación, el proceso y el resultado que cada negocio necesita alcanzar.
          </p>

          {/* Open pullquote */}
          <div className="pl-4 border-l-2 border-[#447D29] py-1 mt-4">
            <span className="text-base font-bold text-slate-900 italic font-serif">
              “We listen, reach out and we deliver”
            </span>
          </div>
        </div>

        {/* Clarity Style Dual-Card Intro Stack (intro-cards_layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Signature Accent Card */}
          <div className="lg:col-span-6 rounded-2xl bg-[#EBF4E5] border border-[#447D29]/20 p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-[#2F591B] text-xs font-bold uppercase tracking-wider">
                Propósito & Filosofía Wenda
              </div>
              <h3 className="heading-editorial-md font-editorial text-[#0F172A]">
                Tecnología de ingredientes que pone la calidad y a las personas primero
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Nuestros desarrollos no se limitan a suministrar una materia prima. Analizamos la reología de su emulsión, la cinética de deshidratación en horno o la estabilidad lumínica del pigmento para entregar formulaciones que optimizan costos sin sacrificar la etiqueta limpia.
              </p>
            </div>

            <div className="pt-6 border-t border-[#447D29]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#447D29]" />
                <span className="text-xs font-bold text-[#2F591B] uppercase tracking-wider">
                  Certificaciones GFSI-BRCGS Grado A
                </span>
              </div>
              <a href="#contact" className="btn-pill-primary text-xs !py-2.5 !px-5">
                <span>Contactar a un Ingeniero</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Clean Neutral Card */}
          <div className="lg:col-span-6 rounded-2xl bg-[#FFFFFF] border border-slate-200 p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
                Cinco Pilares Diferenciadores
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial">
                ¿Por qué confiar en Wenda como socio estratégico?
              </h3>
              <div className="space-y-3 pt-2">
                {differentiators.slice(0, 4).map((diff, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3">
                    <div className="p-1 rounded-md bg-[#F0F7ED] shrink-0 mt-0.5">
                      {diff.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{diff.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-1">{diff.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Soporte integral en formulación y planta piloto</span>
              <a href="#science" className="text-[#447D29] font-bold hover:underline">
                Conoce WNDA Science &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Global Key Stats Grid (Clarity no-bg_stats-cards_wrap) */}
        <div>
          <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-semibold text-[#2F591B] tracking-wide uppercase">
                Infraestructura global
              </span>
              <h3 className="heading-editorial-md font-editorial text-slate-900 mt-1">
                Experiencia Global. Conocimiento Aplicado Localmente.
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATS.map((stat, idx) => (
              <StatCard key={stat.id} stat={stat} index={idx} />
            ))}
          </div>
        </div>

        {/* Mr. Wei Leadership Spotlight - Clean Editorial Spread */}
        <div className="py-14 border-y border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Clean Portrait Spread */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <Image
                  src="/images/about/mr-wei-leadership.jpg"
                  alt="Mr. Wei - Presidente & Fundador de Wenda Ingredients"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Minimal Editorial Caption */}
              <div className="mt-3.5 flex items-baseline justify-between border-t border-slate-200 pt-3 px-1">
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-editorial">Mr. Wei</h4>
                  <p className="text-xs text-slate-500">Fundador & Presidente de Wenda Ingredients</p>
                </div>
                <span className="text-xs font-serif italic text-[#447D29] font-medium">
                  Trust in Food®
                </span>
              </div>
            </div>

            {/* Right: Editorial Voice & Direct Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="wenda" size="sm">
                Mensaje Institucional & Visión Global
              </Badge>

              <h3 className="heading-editorial-md font-editorial text-slate-900 leading-snug">
                Impulsando la evolución de los alimentos con ciencia, integridad y compromiso humano
              </h3>

              {/* Editorial Pullquote with Watermark */}
              <div className="relative pl-7 sm:pl-8 py-1">
                <Quote className="w-10 h-10 text-[#447D29]/20 absolute -top-2.5 left-0 pointer-events-none select-none" />
                <div className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed font-serif italic">
                  <p>
                    “Nacimos en 1995 con la convicción de que los ingredientes alimentarios no son solo materias primas: son el núcleo de la nutrición, el rendimiento y la seguridad de las familias que los consumen en todo el planeta.”
                  </p>
                  <p className="not-italic font-sans text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                    “Nuestra promesa de marca <strong className="font-semibold text-slate-900">Trust in Food®</strong> resume tres décadas de rigor científico: cada lote validado en nuestros 6 laboratorios cárnicos y 4 centros de R&D debe entregar tranquilidad al procesador y bienestar al consumidor.”
                  </p>
                </div>
              </div>

              {/* Clean Typographic Key Points (No Box Soup) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">30+ Años de Trayectoria</span>
                    <span className="text-xs text-slate-600">Innovación continua en ingredientes funcionales desde 1995.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe2 className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Presencia en 10+ Países</span>
                    <span className="text-xs text-slate-600">Equipos técnicos locales y soporte regulatorio directo.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FlaskConical className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Planta Piloto & 6 Labs</span>
                    <span className="text-xs text-slate-600">Evaluación sensorial, textura y reología aplicada in-situ.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Inocuidad Certificada</span>
                    <span className="text-xs text-slate-600">Estándares globales GFSI, BRCGS, Kosher y Halal.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Timeline Chronicle */}
        <TimelineChronicle />
      </div>
    </section>
  );
};
