"use client";

import React, { useEffect, useState } from "react";

interface MetricCounterProps {
  value: string;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({ value, className = "" }) => {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isNaN(numericPart)) return;
    let start = 0;
    const duration = 1600;
    const stepTime = Math.abs(Math.floor(duration / (numericPart > 100 ? 50 : numericPart || 1)));
    const increment = Math.ceil(numericPart / (duration / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setCount(numericPart);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [numericPart]);

  if (isNaN(numericPart)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={`font-sans font-black text-[#0F172A] ${className}`}>
      {count}
      <span className="text-[#447D29]">{suffix}</span>
    </span>
  );
};
