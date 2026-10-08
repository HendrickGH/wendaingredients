"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../atoms/Badge";
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Send
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  onAskQuestion?: (customQuestion: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onAskQuestion }) => {
  const { t } = useTranslation("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const askBoxRef = useRef<HTMLDivElement>(null);

  const rawItems = t("items", { returnObjects: true });
  const items: FaqItem[] = Array.isArray(rawItems) ? (rawItems as FaqItem[]) : [];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 2. Accordion list items
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }

      // 3. Ask Box entrance
      if (askBoxRef.current) {
        gsap.fromTo(
          askBoxRef.current,
          { opacity: 0, y: 24, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: askBoxRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  };

  const handleSendQuery = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (onAskQuestion) {
      onAskQuestion("");
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-section-title"
      className="py-24 bg-[#FFFFFF] text-slate-900 relative z-10 scroll-mt-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <Badge variant="wenda" size="md" icon={<HelpCircle className="w-3.5 h-3.5" />}>
              {t("badge")}
            </Badge>
          </div>
          <h2
            id="faq-section-title"
            className="heading-editorial-xl font-editorial text-slate-900 tracking-tight leading-[1.12]"
          >
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t("subtitle")}
          </p>
        </div>

        {/* Accordion List */}
        <div ref={listRef} className="space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                  isOpen
                    ? "bg-[#F8FAF6] border-[#447D29]/50 shadow-md ring-1 ring-[#447D29]/20"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full text-left py-5 px-6 sm:px-7 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#447D29] focus-visible:outline-offset-2"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#447D29] text-white rotate-180"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`px-6 sm:px-7 transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-96 pb-6 pt-1 opacity-100" : "max-h-0 pb-0 pt-0 opacity-0"
                  }`}
                >
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-t border-slate-200/60 pt-3">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ask Question / Direct Formulation Inquiry Card */}
        <div
          ref={askBoxRef}
          className="rounded-3xl bg-[#EBF4E5] border border-[#447D29]/25 p-6 sm:p-8 md:p-10 shadow-sm relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col items-start gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2F591B]">
                <MessageSquare className="w-4 h-4 text-[#2F591B]" />
                <span>Canal Técnico Directo</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-editorial">
                {t("askBox.title")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {t("askBox.desc")}
              </p>
            </div>

            <div className="shrink-0">
              <button
                type="button"
                onClick={handleSendQuery}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2F591B] hover:bg-[#1E3A11] text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <span>{t("askBox.button")}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
