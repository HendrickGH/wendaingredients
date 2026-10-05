"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { BrandItem, IndentIndustry } from "@/data/siteContent";
import { X, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

interface TechnicalDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand?: BrandItem | null;
  industry?: IndentIndustry | null;
  onRequestSample: (title: string) => void;
}

export const TechnicalDetailModal: React.FC<TechnicalDetailModalProps> = ({
  isOpen,
  onClose,
  brand,
  industry,
  onRequestSample
}) => {
  const { t } = useTranslation("technicalModal");

  if (!isOpen || (!brand && !industry)) return null;

  const title = brand ? brand.name : industry?.name || "";
  const subtitle = brand ? brand.claim : industry?.description || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 sm:p-8 border border-slate-200 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="wenda" size="sm">
                {brand ? t("brandBadge") : t("industryBadge")}
              </Badge>
              {brand && (
                <>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs font-bold text-[#447D29]">
                    {brand.category}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 font-semibold">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Brand details */}
        {brand && (
          <div className="space-y-5">
            {brand.image && (
              <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#447D29]/90 text-white backdrop-blur-xs font-semibold text-xs px-3 py-1 rounded-full shadow-xs">
                  {brand.tag}
                </div>
              </div>
            )}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                {t("descTitle")}
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {brand.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                {t("claimsTitle")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {brand.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-800 font-medium py-1"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#447D29] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-700 py-1">
              <ShieldCheck className="w-4 h-4 text-[#447D29] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1B3810] block mb-0.5">
                  {t("ndaTitle")}
                </span>
                <p className="font-normal leading-relaxed">
                  {t("ndaBody")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Industry details */}
        {industry && (
          <div className="space-y-5">
            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <Image
                src={industry.image}
                alt={industry.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-white/95 p-3 border-t border-slate-100">
                <span className="text-xs text-[#2F591B] font-bold">
                  {t("validatedTitle")}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#447D29] uppercase tracking-wider">
                {t("availableTitle")}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {industry.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-800 font-medium py-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#447D29] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            {t("close")}
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            onClick={() => {
              onClose();
              onRequestSample(title);
            }}
          >
            {t("request", { title })}
          </Button>
        </div>
      </div>
    </div>
  );
};
