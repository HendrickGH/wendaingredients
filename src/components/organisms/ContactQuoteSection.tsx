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
  ArrowRight
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
        // ignore if not supported
      }
    }, 800);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#2F591B] text-white relative overflow-hidden">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#447D29] rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5E7D1F] rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct office contacts & reassurance (Clarity "Let's Talk" pattern) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#D9E8BE] text-xs font-bold uppercase tracking-wider border border-white/10">
                {t("eyebrow")}
              </div>

              <h2 className="heading-editorial-lg font-editorial text-white">
                {t("title")}
              </h2>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                {t("intro")}
              </p>
            </div>

            {/* Direct Country Office Card */}
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-white/15">
                <CountryFlag code={currentCountry.code} size="lg" />
                <div>
                  <h4 className="text-base font-bold text-white">
                    {t("office.title", { name: currentCountry.name })}
                  </h4>
                  <p className="text-xs text-[#D9E8BE] font-semibold">
                    {currentCountry.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-emerald-50">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-emerald-200/80 uppercase font-semibold block">{t("office.address")}</span>
                    <span>{currentCountry.contactOffice.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-emerald-200/80 uppercase font-semibold block">{t("office.phone")}</span>
                    <a href={`tel:${currentCountry.contactOffice.phone}`} className="hover:text-white font-bold underline">
                      {currentCountry.contactOffice.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] text-emerald-200/80 uppercase font-semibold block">{t("office.email")}</span>
                    <a href={`mailto:${currentCountry.contactOffice.email}`} className="hover:text-white font-bold underline">
                      {currentCountry.contactOffice.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3 text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D9E8BE]" />
                  <span>{t("response")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-[#D9E8BE]" />
                  <span>{t("samples")}</span>
                </div>
              </div>
            </div>

            {/* Confidentiality Notice */}
            <div className="flex items-start gap-3 text-xs text-emerald-200/80">
              <ShieldCheck className="w-4 h-4 text-[#D9E8BE] shrink-0 mt-0.5" />
              <p>
                {t("nda")}
              </p>
            </div>
          </div>

          {/* Right Column: Clean Pill Form (Clarity Form Pattern) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white p-8 sm:p-12 text-slate-900 shadow-2xl border border-slate-100">
              {submitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#EBF4E5] text-[#447D29] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="heading-editorial-md font-editorial text-slate-900">
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
                    onClick={() => setSubmitted(false)}
                    className="btn-pill-secondary text-xs !py-2.5 !px-6 cursor-pointer"
                  >
                    {t("success.again")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial mb-1">
                      {t("form.title")}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-normal">
                      {t("form.subtitle")}
                    </p>
                  </div>

                  {/* Form fields in clean 2-column layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t("form.name")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t("form.namePh")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t("form.company")}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t("form.companyPh")}
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t("form.email")}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={t("form.emailPh")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {t("form.phone")}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder={t("form.phonePh")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t("form.category")}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TOPIC_IDS.map((topicId) => (
                        <button
                          key={topicId}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: topicId })}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                            formData.category === topicId
                              ? "bg-[#447D29] text-white border-[#447D29] shadow-xs"
                              : "bg-[#F8FAF6] text-slate-700 hover:bg-slate-100 border-slate-200"
                          }`}
                        >
                          {t(`topics.${topicId}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t("form.message")}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t("form.messagePh")}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8FAF6] border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-pill-primary !py-4 text-base font-bold shadow-md cursor-pointer group"
                  >
                    {loading ? (
                      <span>{t("form.loading")}</span>
                    ) : (
                      <>
                        <span>{t("form.submit")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
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
