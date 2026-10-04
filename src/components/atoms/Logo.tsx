import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "horizontal" | "symbol" | "full";
  theme?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "horizontal",
  theme = "light",
  size = "md",
  className = "",
  showTagline = true
}) => {
  const symbolDimensions = {
    sm: { h: 30, w: 35 },
    md: { h: 38, w: 45 },
    lg: { h: 48, w: 57 }
  };

  const textSizes = {
    sm: { title: "text-base", sub: "text-[9px]" },
    md: { title: "text-lg sm:text-xl", sub: "text-[10px]" },
    lg: { title: "text-xl sm:text-2xl", sub: "text-xs" }
  };

  // Header / Horizontal Lockup using wenda.svg icon only
  if (variant === "horizontal") {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div className="relative shrink-0 transition-transform duration-200 hover:scale-105">
          <Image
            src="/wenda.svg"
            alt="Wenda Ingredients"
            width={symbolDimensions[size].w * 1.15}
            height={symbolDimensions[size].h * 1.15}
            className="h-9 sm:h-10 w-auto object-contain drop-shadow-xs"
            priority
          />
        </div>
      </div>
    );
  }

  // Symbol / Vector logo (wenda.svg standalone)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative shrink-0 transition-transform duration-200 hover:scale-105">
        <Image
          src="/wenda.svg"
          alt="Wenda Ingredients Símbolo Oficial"
          width={symbolDimensions[size].w * 1.2}
          height={symbolDimensions[size].h * 1.2}
          className="h-10 sm:h-12 w-auto object-contain"
          priority
        />
      </div>
      {showTagline && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-xl font-black tracking-tight font-editorial uppercase ${
                theme === "dark" ? "text-white" : "text-[#0F172A]"
              }`}
            >
              Wenda
            </span>
            <span
              className={`text-xl font-bold tracking-wider font-editorial uppercase ${
                theme === "dark" ? "text-[#D9E8BE]" : "text-[#447D29]"
              }`}
            >
              Ingredients
            </span>
          </div>
          <span
            className={`text-[10px] font-bold tracking-widest uppercase mt-0.5 ${
              theme === "dark" ? "text-[#D9E8BE]" : "text-[#5E7D1F]"
            }`}
          >
            Trust in Food®
          </span>
        </div>
      )}
    </div>
  );
};
