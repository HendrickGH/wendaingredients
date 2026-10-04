import React from "react";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { ShieldCheck, Award, CheckCircle2, Sparkles, FileText, FlaskRound } from "lucide-react";

export const QualityCertifications: React.FC = () => {
  return (
    <section className="py-20 bg-[#FFFFFF] border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="gold" size="md" icon={<Award className="w-4 h-4 text-amber-700" />}>
            ESTÁNDARES INTERNACIONALES GFSI
          </Badge>
          <Heading level={2} color="slate">
            Calidad Comprobable en Cada Ingrediente. Confianza en Cada Aplicación.
          </Heading>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            La calidad no es únicamente una característica del producto: es un sistema integral que acompaña desde la validación de materias primas hasta el desempeño en tu línea continua de producción.
          </p>
        </div>

        {/* Certifications badges grid - Open Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] transition-colors">
            <span className="text-2xl font-black text-[#2F591B] tracking-tight block">
              BRCGS
            </span>
            <h4 className="text-lg font-bold text-slate-900">BRCGS Food Safety Grado A</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Todas las plantas de producción e instalaciones internacionales cuentan con certificación GFSI-BRC Grado A para exportación y consumo seguro.
            </p>
            <span className="text-[10px] text-[#447D29] uppercase block font-bold tracking-wider">
              Global Standard for Food Safety
            </span>
          </div>

          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] transition-colors">
            <span className="text-2xl font-black text-[#2F591B] tracking-tight block">
              حلال
            </span>
            <h4 className="text-lg font-bold text-slate-900">Certificación Halal Internacional</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Ingredientes evaluados y conformes con las leyes dietéticas islámicas para el mercado de Oriente Medio, Asia y consumo multicultural.
            </p>
            <span className="text-[10px] text-[#447D29] uppercase block font-bold tracking-wider">
              Conformidad Halal Verificada
            </span>
          </div>

          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] transition-colors">
            <span className="text-2xl font-black text-amber-800 tracking-tight block">
              STAR-K
            </span>
            <h4 className="text-lg font-bold text-slate-900">Certificación Star-K Kosher</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Auditorías rabínicas permanentes de pureza, procesos limpios y trazabilidad estricta sin contacto con materias incompatibles.
            </p>
            <span className="text-[10px] text-amber-800 uppercase block font-bold tracking-wider">
              Star-K Kosher Certified
            </span>
          </div>
        </div>

        {/* Quality pillars - Open Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
            <span className="font-medium">Controles internos de lote y retención de contramuestras</span>
          </div>
          <div className="flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span className="font-medium">Certificados de Análisis (CoA) detallados y expeditos</span>
          </div>
          <div className="flex items-start gap-2.5">
            <FlaskRound className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <span className="font-medium">Laboratorios cárnicos con planta piloto a escala</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span className="font-medium">Respaldo de marca registrada Trust in Food®</span>
          </div>
        </div>
      </div>
    </section>
  );
};
