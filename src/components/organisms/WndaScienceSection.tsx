"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import {
  Sparkles,
  FlaskConical,
  Microscope,
  Dna,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export const WndaScienceSection: React.FC<{ onConsultScience: () => void }> = ({
  onConsultScience
}) => {
  const { t } = useTranslation("wndaScience");

  const icons = [
    <Dna key="dna" className="w-5 h-5 text-emerald-700" />,
    <FlaskConical key="flask" className="w-5 h-5 text-sky-700" />,
    <ShieldCheck key="shield" className="w-5 h-5 text-[#447D29]" />,
    <Microscope key="micro" className="w-5 h-5 text-amber-700" />
  ];

  type Capability = { title: string; desc: string };
  const rawCaps = t("capabilities", { returnObjects: true }) as Capability[];
  const capabilities = Array.isArray(rawCaps) ? rawCaps : [];

  return (
    <section id="science" className="py-24 lg:py-32 bg-[#F8FAF6] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="wenda" size="md">
              {t("badge")}
            </Badge>
            <span className="text-slate-300">·</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t("eyebrow")}
            </span>
          </div>

          <h2 className="heading-editorial-lg font-editorial text-slate-900">
            {t("title")}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t("subtitle")}
          </p>

          <p className="text-sm font-bold text-[#2F591B] tracking-wide uppercase">
            {t("tagline")}
          </p>
        </div>

        {/* Feature Grid & Laboratory imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="clarity-card overflow-hidden shadow-md bg-slate-900 border border-slate-200 group">
              <div className="relative h-[440px] w-full">
                <Image
                  src="/images/supplements/biochemical-testing.jpg"
                  alt={t("alt")}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm p-6 border-t border-slate-100 space-y-2">
                  <span className="text-xs text-[#447D29] uppercase tracking-widest font-bold">
                    {t("supportEyebrow")}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 font-editorial">
                    {t("supportTitle")}
                  </h4>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {t("supportDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="py-5 border-t border-slate-200 space-y-2 group hover:border-[#447D29] transition-all duration-300"
                >
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#EBF4E5] w-fit transition-colors mb-3">
                    {icons[idx % icons.length]}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#447D29] transition-colors">
                    {cap.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {t("customEyebrow")}
                </span>
                <p className="text-xs text-slate-500">
                  {t("customDesc")}
                </p>
              </div>

              <button
                onClick={onConsultScience}
                className="btn-pill-primary text-xs !py-3 !px-6 group cursor-pointer"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
