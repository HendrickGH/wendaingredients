import React from "react";
import { MetricCounter } from "../atoms/MetricCounter";
import { Globe, Calendar, Microscope, FlaskConical, Users, Award } from "lucide-react";
import { StatItem } from "@/data/siteContent";

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-5 h-5 text-[#447D29]" />,
  Globe: <Globe className="w-5 h-5 text-emerald-600" />,
  Microscope: <Microscope className="w-5 h-5 text-sky-600" />,
  FlaskConical: <FlaskConical className="w-5 h-5 text-amber-600" />,
  Users: <Users className="w-5 h-5 text-violet-600" />,
  Award: <Award className="w-5 h-5 text-[#447D29]" />
};

export const StatCard: React.FC<{ stat: StatItem; index: number }> = ({ stat }) => {
  return (
    <div className="group relative py-8 border-t border-slate-200 transition-all duration-300 hover:border-[#447D29]">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#EBF4E5] text-slate-500 group-hover:text-[#447D29] transition-all duration-300">
          {iconMap[stat.iconName] || <Award className="w-5 h-5 text-[#447D29]" />}
        </div>
      </div>

      <div className="text-4xl sm:text-5xl font-extrabold text-[#0F172A] group-hover:text-[#447D29] tracking-tight mb-2 font-editorial transition-colors">
        <MetricCounter value={stat.value} />
      </div>

      <h4 className="text-base font-bold text-slate-900 mb-1">{stat.label}</h4>
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{stat.sublabel}</p>
    </div>
  );
};
