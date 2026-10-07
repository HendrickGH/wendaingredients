"use client";

import React from "react";
import Image from "next/image";
import { BrandItem } from "@/data/siteContent";
import { ShieldCheck, ChevronRight, ArrowUpRight } from "lucide-react";

interface BrandCardProps {
  brand: BrandItem;
  onOpenDetails: (brand: BrandItem) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, onOpenDetails }) => {
  return (
    <div className="group relative p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#447D29] hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
      onClick={() => onOpenDetails(brand)}
    >
      <div>
        {/* Top Image Container */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Pill Tag bottom-left */}
          <div className="absolute bottom-3 left-3 bg-[#447D29]/90 text-white backdrop-blur-xs font-semibold text-xs px-3.5 py-1.5 rounded-full shadow-xs">
            {brand.tag}
          </div>

          {/* Circular Arrow Button top-right */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(brand);
            }}
            aria-label={`Ver detalles de ${brand.name}`}
            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#447D29] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 hover:bg-[#2F591B] cursor-pointer"
          >
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

        {/* Brand Information */}
        <span className="text-xs font-bold uppercase tracking-wider text-[#447D29] block mb-1">
          {brand.category}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-[#447D29] transition-colors font-editorial">
          {brand.name}
        </h3>

        <p className="text-xs sm:text-sm font-semibold text-[#2F591B] mt-1 mb-2 leading-snug line-clamp-2">
          {brand.claim}
        </p>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2 font-normal">
          {brand.description}
        </p>

        {/* Feature Highlights */}
        <div className="space-y-1.5 mb-4">
          {brand.features.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#447D29] shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 flex items-center justify-between text-xs font-bold text-[#447D29] group-hover:text-[#2F591B] transition-colors">
        <span>Consultar Ficha Técnica</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

