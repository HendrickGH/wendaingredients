"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useEditorialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(30);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < maxScroll - 6);

    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }

    // Expanding progress: starts at visible fraction (e.g. 3 cards out of 8 = ~37.5%)
    // and smoothly expands to 100% as the remaining cards are revealed.
    const rawProgress = ((scrollLeft + clientWidth) / scrollWidth) * 100;
    const clampedProgress = Math.min(100, Math.max(15, rawProgress));
    setScrollProgress(clampedProgress);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Small delay to ensure children layout is computed
    const rafId = requestAnimationFrame(() => {
      updateProgress();
    });

    const handleScroll = () => {
      updateProgress();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : el.clientWidth * 0.75;
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }, []);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement;
    const scrollAmount = firstChild ? firstChild.offsetWidth + 24 : el.clientWidth * 0.75;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  const seekToRatio = useCallback((ratio: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.max(0, maxScroll * ratio), behavior: "smooth" });
  }, []);

  return {
    scrollRef,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    seekToRatio,
    updateProgress,
  };
}
