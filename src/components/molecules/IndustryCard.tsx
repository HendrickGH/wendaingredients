import React from "react";
import Image from "next/image";
import { IndentIndustry } from "@/data/siteContent";
import { Check, ChevronRight } from "lucide-react";

interface IndustryCardProps {
  industry: IndentIndustry;
  onSelect: (ind: IndentIndustry) => void;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({ industry, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(industry)}
      className="clarity-card group relative overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
        <Image
          src={industry.image}
          alt={industry.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-base font-bold text-white tracking-tight font-editorial">
            {industry.name}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
            {industry.description}
          </p>

          <div className="space-y-1.5 mb-5">
            {industry.items.slice(0, 4).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-[#447D29] shrink-0" />
                <span className="truncate font-medium">{item}</span>
              </div>
            ))}
            {industry.items.length > 4 && (
              <p className="text-[11px] text-[#447D29] font-bold pl-5 pt-0.5">
                +{industry.items.length - 4} soluciones más catalogadas...
              </p>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#447D29] group-hover:text-[#2F591B] transition-colors">
          <span>Ver catálogo completo & especificaciones</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
