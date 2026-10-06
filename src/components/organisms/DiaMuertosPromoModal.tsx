"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  X,
  Sparkles,
  ArrowRight,
  Clock,
  Wheat
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DiaMuertosPromoModalProps {
  onClaimPromo: (category: string, message: string) => void;
}

export const DiaMuertosPromoModal: React.FC<DiaMuertosPromoModalProps> = ({
  onClaimPromo
}) => {
  const { t } = useTranslation("diaMuertosPromo");
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenDismissed, setHasBeenDismissed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("wenda_dia_muertos_dismissed") === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined" || hasBeenDismissed) return;

    gsap.registerPlugin(ScrollTrigger);

    // Trigger when user scrolls past the visual gallery
    const trigger = ScrollTrigger.create({
      trigger: "#galeria-aplicaciones",
      start: "bottom 75%",
      onEnter: () => {
        const alreadyDismissed = sessionStorage.getItem("wenda_dia_muertos_dismissed");
        if (!alreadyDismissed) {
          setIsOpen(true);
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, [hasBeenDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("wenda_dia_muertos_dismissed", "true");
    }
  };

  const handleClaim = () => {
    handleClose();
    const prefilledMessage = t("prefilledMessage", {
      defaultValue:
        "Hola, me interesa solicitar el Kit de Formulación de Temporada Día de Muertos (Pan de Muerto y colorantes naturales Cempasúchil) para pruebas en planta piloto."
    });
    onClaimPromo("bakery", prefilledMessage);
  };

  const rawBenefits = t("benefits", { returnObjects: true });
  const benefits = Array.isArray(rawBenefits)
    ? (rawBenefits as { title: string; desc: string }[])
    : [];

  return (
    <>
      {/* Floating Corporate Seasonal Action Button if dismissed */}
      {hasBeenDismissed && !isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-[#447D29]/60 rounded-full w-12 h-12 shadow-lg shadow-slate-900/10 flex items-center justify-center transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
          aria-label={t("title", { defaultValue: "Ver promoción Día de Muertos" })}
          title={t("title", { defaultValue: "Ver promoción Día de Muertos" })}
        >
          <Wheat className="w-5 h-5 text-[#447D29] group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Main Promo Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          {/* Backdrop click dismiss */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] text-slate-900 animate-in zoom-in-95 duration-200">
            {/* Close Button Top Right */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-slate-950 flex items-center justify-center border border-slate-200/80 shadow-xs backdrop-blur-xs transition-all cursor-pointer"
              aria-label={t("close")}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visual Image (Clean presentation without floating overlays) */}
            <div className="relative w-full md:w-5/12 h-56 md:h-auto min-h-[220px] bg-slate-100 shrink-0">
              <Image
                src="/images/promotions/dia-de-muertos.jpg"
                alt="Pan de Muerto y pigmentos botánicos Cempasúchil Wenda Ingredients"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Right Column: Promotional Details & CTA */}
            <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3
                    id="promo-dialog-title"
                    className="text-2xl sm:text-3xl font-bold font-editorial text-slate-900 tracking-tight leading-tight"
                  >
                    {t("title")}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {t("subtitle")}
                </p>

                {/* Benefits Bullet points */}
                <div className="space-y-3 pt-1">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className="w-6 h-6 rounded-full bg-[#EBF4E5] text-[#447D29] flex items-center justify-center shrink-0 mt-0.5 border border-[#447D29]/20">
                        {idx === 0 ? (
                          <Wheat className="w-3.5 h-3.5" />
                        ) : idx === 1 ? (
                          <Sparkles className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                      </div>
                      <div>
                        <strong className="text-slate-900 font-semibold block text-xs">
                          {benefit.title}
                        </strong>
                        <span className="text-slate-500 font-normal leading-relaxed text-[11px] sm:text-xs">
                          {benefit.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleClaim}
                  className="w-full py-3.5 px-6 rounded-full bg-[#447D29] hover:bg-[#2F591B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-[#447D29]/20 transition-all duration-200 cursor-pointer active:scale-98"
                >
                  <span>{t("cta")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-800 py-1 transition-colors cursor-pointer font-medium"
                >
                  {t("dismiss")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
