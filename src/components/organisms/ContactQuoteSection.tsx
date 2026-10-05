"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useTranslation, Trans } from "react-i18next";
import { CountryFlag } from "../atoms/CountryFlag";
import { CountryMirror } from "@/data/siteContent";
import {
  Send,
  CheckCircle2,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  FileCheck2,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface ContactQuoteSectionProps {
  currentCountry: CountryMirror;
  defaultTopic?: string;
}

// Language-neutral topic ids; their labels live in translations.json ("contact.topics")
const TOPIC_IDS = ["meat", "bakery", "nature", "science", "vicel", "indent"];

export const ContactQuoteSection: React.FC<ContactQuoteSectionProps> = ({
  currentCountry,
  defaultTopic = ""
}) => {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: defaultTopic || "meat",
    volume: "1 a 5 Toneladas / mes",
    message: ""
  });

  // Keep the form in sync when a CTA elsewhere on the page preselects a topic
  useEffect(() => {
    if (defaultTopic) {
      setFormData((prev) => ({ ...prev, category: defaultTopic }));
    }
  }, [defaultTopic]);

  // Unknown topics (e.g. a brand name) are shown as-is
  const categoryLabel = TOPIC_IDS.includes(formData.category)
    ? t(`topics.${formData.category}`)
    : formData.category;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Compute form completion progress for accessible visual indicator
  const filledFieldsCount = [
    formData.name.trim(),
    formData.company.trim(),
    formData.email.trim(),
    formData.phone.trim(),
    formData.message.trim()
  ].filter(Boolean).length;
  const completionProgress = Math.min(100, Math.round((filledFieldsCount / 5) * 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if confetti unavailable
      }
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-section-title"
      className="sticky top-0 min-h-screen py-24 lg:py-32 bg-[#2F591B] text-white z-20 shadow-[0_-25px_60px_rgba(0,0,0,0.5)] rounded-t-[2.5rem] lg:rounded-t-[4rem] border-t border-white/15 scroll-mt-0 transition-all duration-700"
    >
      {/* Subtle organic background glow (clipped inside dedicated container) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#447D29] rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5E7D1F] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct office contacts & reassurance */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D9E8BE] text-xs font-bold uppercase tracking-wider border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-[#D9E8BE]" />
                <span>{t("eyebrow")}</span>
              </div>

              <h2 id="contact-section-title" className="heading-editorial-lg font-editorial text-white">
                {t("title")}
              </h2>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                {t("intro")}
              </p>
            </div>

            {/* Direct Country Office Card */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-5 shadow-lg">
              <div className="flex items-center gap-3 pb-4 border-b border-white/15">
                <CountryFlag code={currentCountry.code} size="lg" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    {t("office.title", { name: currentCountry.name })}
                  </h3>
                  <p className="text-xs text-[#D9E8BE] font-semibold">
                    {currentCountry.tagline}
                  </p>
                </div>
              </div>

              <address className="not-italic space-y-3.5 text-xs sm:text-sm text-emerald-50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[11px] text-emerald-200/80 uppercase font-semibold block">{t("office.address")}</span>
                    <span>{currentCountry.contactOffice.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[11px] text-emerald-200/80 uppercase font-semibold block">{t("office.phone")}</span>
                    <a
                      href={`tel:${currentCountry.contactOffice.phone}`}
                      className="hover:text-white font-bold underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-xs"
                      aria-label={`${t("office.phone")} ${currentCountry.contactOffice.phone}`}
                    >
                      {currentCountry.contactOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="text-[11px] text-emerald-200/80 uppercase font-semibold block">{t("office.email")}</span>
                    <a
                      href={`mailto:${currentCountry.contactOffice.email}`}
                      className="hover:text-white font-bold underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-xs"
                      aria-label={`${t("office.email")} ${currentCountry.contactOffice.email}`}
                    >
                      {currentCountry.contactOffice.email}
                    </a>
                  </div>
                </div>
              </address>

              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3 text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D9E8BE]" aria-hidden="true" />
                  <span>{t("response")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#D9E8BE]" aria-hidden="true" />
                  <span>{t("samples")}</span>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="flex items-start gap-3 text-xs text-emerald-200/80">
              <ShieldCheck className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" aria-hidden="true" />
              <p>{t("nda")}</p>
            </div>
          </div>

          {/* Right Column: Interactive Accessibility-First Sticky Form Card */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 z-20">
            <div className="rounded-3xl bg-white p-8 sm:p-12 text-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border border-slate-100/90 relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_-12px_rgba(68,125,41,0.3)]">
              {/* Dynamic Accessible Form Fill Progress Bar */}
              <div
                role="progressbar"
                aria-valuenow={completionProgress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progreso de llenado del formulario"
                className="absolute top-0 left-0 right-0 h-2 bg-slate-100 overflow-hidden"
              >
                <div
                  className="h-full bg-gradient-to-r from-[#2F591B] via-[#447D29] to-[#80B263] transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(completionProgress, 8)}%` }}
                />
              </div>

              {/* Accessible ARIA Live region for screen readers */}
              <div aria-live="polite" aria-atomic="true" className="sr-only">
                {submitted
                  ? t("success.title")
                  : loading
                  ? t("form.loading")
                  : `Formulario de contacto: ${completionProgress}% completado`}
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#EBF4E5] text-[#447D29] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 id="submitted-heading" className="heading-editorial-md font-editorial text-slate-900">
                    {t("success.title")}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    <Trans
                      t={t}
                      i18nKey="success.body"
                      values={{ country: currentCountry.name, category: categoryLabel }}
                      components={{ strong: <strong /> }}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-pill-secondary text-xs !py-2.5 !px-6 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2"
                  >
                    {t("success.again")}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  aria-labelledby="form-title-heading"
                  className="space-y-6 pt-2"
                  noValidate={false}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 id="form-title-heading" className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial mb-1">
                        {t("form.title")}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 font-normal">
                        {t("form.subtitle")}
                      </p>
                    </div>

                    {/* Completion progress pill */}
                    <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4E5] text-[#2F591B] text-[11px] font-bold shrink-0 border border-[#D0E4C3]">
                      <span className="w-2 h-2 rounded-full bg-[#447D29] animate-pulse" aria-hidden="true" />
                      <span>{completionProgress}% Completado</span>
                    </div>
                  </div>

                  {/* Form fields in clean 2-column layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-form-name"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                      >
                        {t("form.name")}
                      </label>
                      <input
                        id="contact-form-name"
                        name="name"
                        type="text"
                        required
                        aria-required="true"
                        autoComplete="name"
                        placeholder={t("form.namePh")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white focus:ring-2 focus:ring-[#2F591B]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-form-company"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                      >
                        {t("form.company")}
                      </label>
                      <input
                        id="contact-form-company"
                        name="company"
                        type="text"
                        required
                        aria-required="true"
                        autoComplete="organization"
                        placeholder={t("form.companyPh")}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white focus:ring-2 focus:ring-[#2F591B]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-form-email"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                      >
                        {t("form.email")}
                      </label>
                      <input
                        id="contact-form-email"
                        name="email"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        placeholder={t("form.emailPh")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white focus:ring-2 focus:ring-[#2F591B]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-form-phone"
                        className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                      >
                        {t("form.phone")}
                      </label>
                      <input
                        id="contact-form-phone"
                        name="phone"
                        type="tel"
                        required
                        aria-required="true"
                        autoComplete="tel"
                        placeholder={t("form.phonePh")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white focus:ring-2 focus:ring-[#2F591B]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Accessible Category Selection Fieldset */}
                  <fieldset className="space-y-2 border-0 p-0 m-0">
                    <legend className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {t("form.category")}
                    </legend>
                    <div
                      role="radiogroup"
                      aria-label={t("form.category")}
                      className="flex flex-wrap gap-2"
                    >
                      {TOPIC_IDS.map((topicId) => {
                        const isSelected = formData.category === topicId;
                        return (
                          <button
                            key={topicId}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, category: topicId })}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2 ${
                              isSelected
                                ? "bg-[#447D29] text-white border-[#447D29] shadow-sm scale-[1.02]"
                                : "bg-[#F8FAF6] text-slate-700 hover:bg-slate-100 border-slate-200"
                            }`}
                          >
                            {t(`topics.${topicId}`)}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-form-message"
                      className="text-xs font-bold text-slate-700 uppercase tracking-wider block"
                    >
                      {t("form.message")}
                    </label>
                    <textarea
                      id="contact-form-message"
                      name="message"
                      rows={3}
                      placeholder={t("form.messagePh")}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white focus:ring-2 focus:ring-[#2F591B]/20 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-pill-primary !py-4 text-base font-bold shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2 cursor-pointer group transition-all"
                  >
                    {loading ? (
                      <span>{t("form.loading")}</span>
                    ) : (
                      <>
                        <span>{t("form.submit")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
