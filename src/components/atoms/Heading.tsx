import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  color?: "slate" | "white" | "wenda" | "muted";
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  color = "slate",
  className = ""
}) => {
  const Tag = `h${level}` as const;

  const colorClasses = {
    slate: "text-[#0F172A]",
    white: "text-white",
    wenda: "text-[#447D29]",
    muted: "text-[#475569]"
  };

  const levelClasses = {
    1: "text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase",
    2: "text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight",
    3: "text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug",
    4: "text-lg sm:text-xl font-bold tracking-normal",
    5: "text-base sm:text-lg font-bold tracking-normal",
    6: "text-sm sm:text-base font-semibold tracking-normal"
  };

  return (
    <Tag className={`${levelClasses[level]} ${colorClasses[color]} ${className}`}>
      {children}
    </Tag>
  );
};
