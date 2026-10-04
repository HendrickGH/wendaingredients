import React from "react";
import { NaturalColorItem } from "@/data/siteContent";
import { Sparkles, Leaf } from "lucide-react";

export const NaturalColorSwatch: React.FC<{ color: NaturalColorItem }> = ({ color }) => {
  return (
    <div className="group rounded-xl bg-white p-4 border border-slate-200 hover:border-[#447D29] transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg shrink-0 border border-slate-200 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center relative overflow-hidden"
          style={{ backgroundColor: color.hex }}
        >
          <Sparkles className="w-3.5 h-3.5 opacity-90" style={{ color: color.textColor }} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-[#447D29] transition-colors">
            {color.name}
          </h4>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Leaf className="w-3 h-3 text-[#447D29] shrink-0" />
            <span className="truncate font-medium">{color.source}</span>
          </p>
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Tono obtenido:</span>
          <span className="font-semibold text-slate-800">
            {color.tone}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          <span className="font-semibold text-slate-900">Aplicación:</span> {color.application}
        </p>
      </div>
    </div>
  );
};
