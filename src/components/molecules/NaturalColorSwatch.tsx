"use client";

import React from "react";
import { NaturalColorItem } from "@/data/siteContent";
import { Leaf, Droplets, FlaskConical } from "lucide-react";

export const NaturalColorSwatch: React.FC<{ color: NaturalColorItem }> = ({ color }) => {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${color.hex} 0%, ${color.secondaryHex || color.hex} 60%, ${color.hex} 100%)`
  };

  return (
    <div
      className="group relative rounded-2xl bg-white p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md"
      style={{
        ["--swatch-accent" as string]: color.hex
      }}
    >
      {/* Chromatic Top Glow Accent on Hover */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color.hex }}
      />

      <div className="space-y-3.5">
        {/* Visual Extraction & Dispersion Bar */}
        <div className="relative h-14 w-full rounded-xl overflow-hidden p-2.5 flex items-end justify-between shadow-inner" style={gradientStyle}>
          {/* Glass Sheen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/25 pointer-events-none" />

          {/* Clean Label Micro-Stamp */}
          <span className="relative z-10 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white/90">
            Clean Label
          </span>
        </div>

        {/* Botanical Identity & Tone */}
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-slate-950 transition-colors leading-tight">
              {color.name}
            </h4>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <Leaf className="w-3.5 h-3.5 text-[#447D29] shrink-0" />
            <span className="truncate italic text-[11px] text-slate-600">{color.source}</span>
          </p>
        </div>

        {/* Technical Plant Formulation Specs */}
        <div className="pt-2.5 border-t border-slate-100 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between gap-2 text-slate-600">
            <span className="flex items-center gap-1 text-slate-500 font-medium shrink-0">
              <Droplets className="w-3 h-3 text-sky-600 shrink-0" />
              Dispersión:
            </span>
            <span className="font-semibold text-slate-800 truncate text-right">
              {color.solubility || "Hidrosoluble"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-slate-600">
            <span className="flex items-center gap-1 text-slate-500 font-medium shrink-0">
              <FlaskConical className="w-3 h-3 text-amber-600 shrink-0" />
              Estabilidad:
            </span>
            <span className="font-semibold text-slate-800 truncate text-right">
              {color.optimalPH ? `${color.optimalPH}` : (color.stability || "Alta estabilidad")}
            </span>
          </div>

          <div className="pt-1 text-[11px] text-slate-500 leading-snug">
            <span className="font-semibold text-slate-700">Matriz:</span> {color.application}
          </div>
        </div>
      </div>
    </div>
  );
};

