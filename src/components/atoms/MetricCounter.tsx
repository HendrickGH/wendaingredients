"use client";

import React, { useEffect, useState, useRef } from "react";

interface MetricCounterProps {
  value: string;
  className?: string;
  suffixClassName?: string;
  duration?: number;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  value,
  className = "",
  suffixClassName = "text-[#447D29]",
  duration = 1600
}) => {
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isNaN(numericPart)) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setCount(numericPart);
      setHasStarted(true);
      return;
    }

    // Viewport intersection observer to start counting on entrance
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "60px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Safety fallback: if after 600ms observer has not triggered (e.g. Safari mobile bar overlap), trigger it
    const timer = setTimeout(() => {
      setHasStarted(true);
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [numericPart]);

  useEffect(() => {
    if (!hasStarted || isNaN(numericPart)) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    // HyperFrames counting-dynamic-scale: power3.out deceleration ease
    const easeOutPower3 = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentVal = Math.round(numericPart * easeOutPower3(progress));

      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(numericPart);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, numericPart, duration]);

  if (isNaN(numericPart)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-baseline tabular-nums ${className}`}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      <span className="transition-transform duration-300">
        {count}
      </span>
      {suffix && (
        <span className={`ml-0.5 ${suffixClassName}`}>
          {suffix}
        </span>
      )}
    </span>
  );
};
