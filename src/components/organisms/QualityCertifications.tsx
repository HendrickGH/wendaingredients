"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import { Heading } from "../atoms/Heading";
import { ShieldCheck, Award, CheckCircle2, Sparkles, FileText, FlaskRound } from "lucide-react";

export const QualityCertifications: React.FC = () => {
  const { t } = useTranslation("quality");

  return (
    <section className="py-20 bg-[#FFFFFF] border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="gold" size="md" icon={<Award className="w-4 h-4 text-amber-700" />}>
            {t("badge")}
          </Badge>
          <Heading level={2} color="slate">
            {t("title")}
          </Heading>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {t("subtitle")}
          </p>
        </div>

        {/* Certifications badges grid - Open Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] transition-colors">
            <span className="text-2xl font-black text-[#2F591B] tracking-tight block">
              BRCGS
            </span>
            <h4 className="text-lg font-bold text-slate-900">{t("brcgs.title")}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t("brcgs.desc")}
            </p>
            <span className="text-[10px] text-[#447D29] uppercase block font-bold tracking-wider">
              {t("brcgs.tag")}
            </span>
          </div>

          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] transition-colors">
            <span className="text-2xl font-black text-[#2F591B] tracking-tight block">
              حلال
            </span>
            <h4 className="text-lg font-bold text-slate-900">{t("halal.title")}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t("halal.desc")}
            </p>
            <span className="text-[10px] text-[#447D29] uppercase block font-bold tracking-wider">
              {t("halal.tag")}
            </span>
          </div>

          <div className="py-6 border-t border-slate-200 space-y-3 group hover:border-[#447D29] transition-colors">
            <span className="text-2xl font-black text-amber-800 tracking-tight block">
              STAR-K
            </span>
            <h4 className="text-lg font-bold text-slate-900">{t("kosher.title")}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {t("kosher.desc")}
            </p>
            <span className="text-[10px] text-amber-800 uppercase block font-bold tracking-wider">
              {t("kosher.tag")}
            </span>
          </div>
        </div>

        {/* Quality pillars - Open Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-slate-200 text-xs text-slate-700">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
            <span className="font-medium">{t("pillars.0")}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <FileText className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span className="font-medium">{t("pillars.1")}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <FlaskRound className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
            <span className="font-medium">{t("pillars.2")}</span>
          </div>
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span className="font-medium">{t("pillars.3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
