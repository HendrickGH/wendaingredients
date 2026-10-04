import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "pill";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  fullWidth = false,
  className = "",
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs font-bold rounded-full gap-2 tracking-wide",
    md: "px-6 py-2.5 text-sm font-semibold rounded-full gap-2.5 tracking-tight",
    lg: "px-7 py-3.5 text-base font-semibold rounded-full gap-3 shadow-sm tracking-tight"
  };

  const variantClasses = {
    primary:
      "bg-[#447D29] hover:bg-[#2F591B] text-white border border-[#447D29] shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
    secondary:
      "bg-[#EBF4E5] hover:bg-[#D9E8BE] text-[#2F591B] border border-[#CDE2C3] hover:-translate-y-0.5 active:translate-y-0",
    outline:
      "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-[#447D29] hover:text-[#447D29] hover:-translate-y-0.5 active:translate-y-0",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-700 hover:text-[#447D29] border-transparent",
    dark:
      "bg-[#0F172A] hover:bg-[#1E293B] text-white border border-[#0F172A] hover:-translate-y-0.5 active:translate-y-0",
    pill:
      "bg-[#447D29] hover:bg-[#2F591B] text-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5"
  };

  return (
    <button
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${
        fullWidth ? "w-full" : ""
      } ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="shrink-0 transition-transform duration-200">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0 transition-transform duration-200">{icon}</span>}
    </button>
  );
};
