"use client";

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  isSupportedLanguage
} from "./config";

const applyDocumentLanguage = (lng: string) => {
  const option = LANGUAGES.find((l) => l.code === lng);
  document.documentElement.lang = option?.htmlLang ?? lng;

  const title = i18n.t("title", { ns: "meta" });
  if (title) document.title = title;

  const description = i18n.t("description", { ns: "meta" });
  const metaDescription = document.querySelector('meta[name="description"]');
  if (description && metaDescription) metaDescription.setAttribute("content", description);
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const onLanguageChanged = (lng: string) => {
      applyDocumentLanguage(lng);
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
      } catch {
        // storage can be unavailable (private mode); the language still switches
      }
    };

    i18n.on("languageChanged", onLanguageChanged);

    // Restore the user's choice (or the browser language) without reloading the page
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      saved = null;
    }
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    const initial = [saved, browser].find(isSupportedLanguage) ?? DEFAULT_LANGUAGE;
    if (initial !== i18n.language) {
      i18n.changeLanguage(initial);
    }

    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
