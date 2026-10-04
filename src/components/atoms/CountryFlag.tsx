import React from "react";

interface CountryFlagProps {
  code: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  className = "",
  size = "md"
}) => {
  const sizeClasses = {
    sm: "w-4 h-3",
    md: "w-5 h-3.5",
    lg: "w-7 h-5"
  };

  const normalized = code.toUpperCase();

  // Clean vector SVG representations for country flags
  switch (normalized) {
    case "MX":
      return (
        <svg
          viewBox="0 0 30 20"
          className={`${sizeClasses[size]} rounded-xs inline-block shrink-0 shadow-2xs border border-slate-300/60 ${className}`}
          aria-hidden="true"
        >
          <rect width="10" height="20" fill="#006847" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#CE1126" />
          <circle cx="15" cy="10" r="2.2" fill="#8B5A2B" />
        </svg>
      );
    case "US":
      return (
        <svg
          viewBox="0 0 30 20"
          className={`${sizeClasses[size]} rounded-xs inline-block shrink-0 shadow-2xs border border-slate-300/60 ${className}`}
          aria-hidden="true"
        >
          <rect width="30" height="20" fill="#B22234" />
          <path d="M0,2.3h30M0,5.4h30M0,8.5h30M0,11.5h30M0,14.6h30M0,17.7h30" stroke="#FFFFFF" strokeWidth="1.54" />
          <rect width="12" height="10.8" fill="#3C3B6E" />
          <circle cx="3" cy="3" r="0.8" fill="#FFFFFF" />
          <circle cx="6" cy="3" r="0.8" fill="#FFFFFF" />
          <circle cx="9" cy="3" r="0.8" fill="#FFFFFF" />
          <circle cx="4.5" cy="5.5" r="0.8" fill="#FFFFFF" />
          <circle cx="7.5" cy="5.5" r="0.8" fill="#FFFFFF" />
          <circle cx="3" cy="8" r="0.8" fill="#FFFFFF" />
          <circle cx="6" cy="8" r="0.8" fill="#FFFFFF" />
          <circle cx="9" cy="8" r="0.8" fill="#FFFFFF" />
        </svg>
      );
    case "CO":
    case "LATAM":
      return (
        <svg
          viewBox="0 0 30 20"
          className={`${sizeClasses[size]} rounded-xs inline-block shrink-0 shadow-2xs border border-slate-300/60 ${className}`}
          aria-hidden="true"
        >
          <rect width="30" height="10" fill="#FCD116" />
          <rect y="10" width="30" height="5" fill="#003893" />
          <rect y="15" width="30" height="5" fill="#CE1126" />
        </svg>
      );
    case "DE":
    case "EU":
      return (
        <svg
          viewBox="0 0 30 20"
          className={`${sizeClasses[size]} rounded-xs inline-block shrink-0 shadow-2xs border border-slate-300/60 ${className}`}
          aria-hidden="true"
        >
          <rect width="30" height="6.66" fill="#000000" />
          <rect y="6.66" width="30" height="6.66" fill="#DD0000" />
          <rect y="13.33" width="30" height="6.66" fill="#FFCC00" />
        </svg>
      );
    case "CN":
    case "APAC":
      return (
        <svg
          viewBox="0 0 30 20"
          className={`${sizeClasses[size]} rounded-xs inline-block shrink-0 shadow-2xs border border-slate-300/60 ${className}`}
          aria-hidden="true"
        >
          <rect width="30" height="20" fill="#DE2910" />
          <polygon points="5,2 6.2,5.6 3.1,3.4 6.9,3.4 3.8,5.6" fill="#FFDE00" />
          <circle cx="9" cy="2.5" r="0.6" fill="#FFDE00" />
          <circle cx="11" cy="4.5" r="0.6" fill="#FFDE00" />
          <circle cx="11" cy="7" r="0.6" fill="#FFDE00" />
          <circle cx="9" cy="9" r="0.6" fill="#FFDE00" />
        </svg>
      );
    default:
      return (
        <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold text-slate-700 bg-slate-100 rounded border border-slate-200">
          {code}
        </span>
      );
  }
};
