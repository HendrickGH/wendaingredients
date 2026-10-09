"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { useTranslation, Trans } from "react-i18next";
import { CountryMirror } from "@/data/siteContent";
import {
  CheckCircle2,
  PhoneCall,
  Mail,
  MapPin,
  ArrowRight,
  Check
} from "lucide-react";

interface ContactQuoteSectionProps {
  currentCountry: CountryMirror;
  defaultTopic?: string;
}

// Language-neutral topic ids; their labels live in translations.json ("contact.topics")
const TOPIC_IDS = ["meat", "bakery", "nature", "science", "vicel", "indent"];

const getMapEmbedUrl = (address: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

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
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync category state when defaultTopic prop changes from outside (e.g. topic cards)
  const [prevDefaultTopic, setPrevDefaultTopic] = useState(defaultTopic);
  if (defaultTopic && defaultTopic !== prevDefaultTopic) {
    setPrevDefaultTopic(defaultTopic);
    setFormData((prev) => ({ ...prev, category: defaultTopic }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2F591B", "#447D29", "#80B263", "#D9E8BE"]
      });
    }, 850);
  };

  const categoryLabel = t(`topics.${formData.category}`, { defaultValue: formData.category });

  return (
    <section
      id="contact"
      aria-labelledby="contact-section-title"
      className="relative z-20 min-h-screen py-20 lg:py-28 bg-[#F8FAF6] text-slate-900 border-t border-slate-200/80 shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.12)] scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <h2
            id="contact-section-title"
            className="heading-editorial-xl font-editorial text-slate-900 tracking-tight leading-[1.08]"
          >
            {t("title")}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            {t("intro")}
          </p>

          {/* Contact Details in 3 separate lines with icons only */}
          <ul className="flex flex-col gap-2.5 pt-2 text-sm text-slate-700">
            <li className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#447D29] shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-slate-900">{t("office.address")}</strong>{" "}
                {currentCountry.contactOffice.address}
              </span>
            </li>

            <li className="flex items-center gap-2.5">
              <PhoneCall className="w-4 h-4 text-[#447D29] shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-slate-900">{t("office.phone")}</strong>{" "}
                <a
                  href={`tel:${currentCountry.contactOffice.phone}`}
                  className="hover:text-[#447D29] font-bold text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2 rounded-xs"
                >
                  {currentCountry.contactOffice.phone}
                </a>
              </span>
            </li>

            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#447D29] shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-slate-900">{t("office.email")}</strong>{" "}
                <a
                  href={`mailto:${currentCountry.contactOffice.email}`}
                  className="hover:text-[#447D29] font-bold text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2 rounded-xs"
                >
                  {currentCountry.contactOffice.email}
                </a>
              </span>
            </li>
          </ul>
        </div>

        {/* Side by Side: Form First, then Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Side 1: Form First */}
          <div className="flex flex-col justify-center">
            {submitted ? (
              <div className="py-8 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF4E5] text-[#447D29] flex items-center justify-center border border-[#D0E4C3]">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 id="submitted-heading" className="heading-editorial-md font-editorial text-slate-900">
                  {t("success.title")}
                </h3>
                <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                  <Trans
                    t={t}
                    i18nKey="success.body"
                    values={{ country: currentCountry.name, category: categoryLabel }}
                    components={{ strong: <strong className="text-slate-900 font-semibold" /> }}
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
                className="space-y-5"
                noValidate={false}
              >
                <div className="pb-3 border-b border-slate-200">
                  <h3
                    id="form-title-heading"
                    className="text-xl sm:text-2xl font-bold text-slate-900 font-editorial tracking-tight"
                  >
                    {t("form.title")}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    {t("form.subtitle")}
                  </p>
                </div>

                {/* 2-Column Responsive Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-form-name"
                      className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:ring-2 focus:ring-[#447D29]/15 transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-form-company"
                      className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:ring-2 focus:ring-[#447D29]/15 transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-form-email"
                      className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:ring-2 focus:ring-[#447D29]/15 transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-form-phone"
                      className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:ring-2 focus:ring-[#447D29]/15 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Category / Topic Selection */}
                <fieldset className="space-y-2 border-0 p-0 m-0">
                  <legend className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    {t("form.category")}
                  </legend>
                  <div
                    role="radiogroup"
                    aria-label={t("form.category")}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2"
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
                          className={`px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer border flex items-center justify-between gap-2 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2 ${
                            isSelected
                              ? "bg-[#2F591B] text-white border-[#2F591B] shadow-sm font-semibold scale-[1.02]"
                              : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200 font-medium hover:border-slate-300"
                          }`}
                        >
                          <span className="truncate">{t(`topics.${topicId}`)}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#D9E8BE] shrink-0 animate-in zoom-in-50 duration-200" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-form-message"
                    className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5"
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
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300/80 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#447D29] focus:ring-2 focus:ring-[#447D29]/15 transition-all resize-none shadow-xs"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-xl bg-[#2F591B] hover:bg-[#254615] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[#2F591B] focus-visible:outline-offset-2 cursor-pointer group transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t("form.loading")}
                    </span>
                  ) : (
                    <>
                      <span>{t("form.submit")}</span>
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1.5 transition-transform"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Side 2: Google Maps of selected regional office */}
          <div className="w-full min-h-[440px] lg:min-h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex flex-col">
            <iframe
              src={getMapEmbedUrl(currentCountry.contactOffice.address)}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Ubicación de sede Wenda Ingredients - ${currentCountry.name}`}
              className="w-full h-full min-h-[440px] flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
