import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "wenda" | "outline" | "gold" | "glass" | "subtle" | "red" | "cyan" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "wenda",
  size = "md",
  className = "",
  icon
}) => {
  const sizeClasses = {
    sm: "text-xs font-semibold tracking-wide",
    md: "text-xs sm:text-sm font-bold tracking-wide",
    lg: "text-sm sm:text-base font-bold tracking-wider"
  };

  const variantClasses = {
    wenda: "text-[#2F591B]",
    outline: "text-slate-700",
    gold: "text-amber-800",
    glass: "text-slate-800",
    subtle: "text-slate-600",
    red: "text-red-700",
    cyan: "text-sky-700",
    purple: "text-purple-700"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
