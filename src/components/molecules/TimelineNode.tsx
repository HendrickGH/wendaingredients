import React from "react";
import Image from "next/image";
import { TimelineEvent } from "@/data/siteContent";
import { MapPin, ArrowUpRight } from "lucide-react";

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
  layout?: "grid" | "strip";
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  event,
  index,
  isSelected = false,
  onClick,
  layout = "grid"
}) => {
  const isStrip = layout === "strip";

  return (
    <article
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border transition-all duration-300 text-left ${
        isSelected
          ? "border-[#2F591B] ring-2 ring-[#2F591B] shadow-md"
          : event.highlight
          ? "border-[#447D29]/40 hover:border-[#2F591B] hover:shadow-md"
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
      } ${onClick ? "cursor-pointer" : ""} ${isStrip ? "w-[300px] sm:w-[340px] shrink-0" : "w-full"}`}
    >
      <div>
        {/* Photographic Stage */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Solid Year Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-3 py-1 text-xs font-black tracking-wider text-white bg-[#2F591B] rounded-md shadow-xs">
              {event.year}
            </span>
          </div>

          {/* Geographic Location Pill */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-slate-100 bg-[#0F172A]/90 rounded-md">
              <MapPin className="w-3 h-3 text-[#447D29]" />
              <span>{event.location}</span>
            </span>
          </div>

          {/* Interactive Arrow Cue if Clickable */}
          {onClick && (
            <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
              <ArrowUpRight className="w-4 h-4 text-[#2F591B]" />
            </div>
          )}
        </div>

        {/* Narrative & Content */}
        <div className="p-5 space-y-3">
          {/* Era Header */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2F591B]">
              {event.era}
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              {event.tag}
            </span>
          </div>

          {/* Title */}
          <h4 className="text-base font-bold text-slate-900 group-hover:text-[#2F591B] transition-colors leading-snug">
            {event.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Technical Metric Footer */}
      <div className="p-5 pt-0">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 min-w-0">
            <span className="text-xs font-extrabold text-[#2F591B] shrink-0">
              {event.metric.value}
            </span>
            <span className="text-[11px] text-slate-500 truncate">
              {event.metric.label}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 shrink-0 font-mono">
            #{index + 1}
          </span>
        </div>
      </div>
    </article>
  );
};
