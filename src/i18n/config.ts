import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translations.json";

export type LanguageCode = "es" | "en" | "zh";

export interface LanguageOption {
  code: LanguageCode;
  /** Native name shown in the language menu */
  label: string;
  /** Short badge shown in the navbar */
  short: string;
  /** Country flag code used by CountryFlag */
  flag: string;
  /** BCP-47 tag applied to <html lang> */
  htmlLang: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: "es", label: "Español", short: "ES", flag: "MX", htmlLang: "es" },
  { code: "en", label: "English", short: "EN", flag: "US", htmlLang: "en" },
  { code: "zh", label: "中文", short: "中文", flag: "CN", htmlLang: "zh-CN" }
];

export const DEFAULT_LANGUAGE: LanguageCode = "es";
export const LANGUAGE_STORAGE_KEY = "wenda-language";

export const isSupportedLanguage = (value: unknown): value is LanguageCode =>
  LANGUAGES.some((l) => l.code === value);

/**
 * translations.json is organised by module -> language -> content.
 * i18next expects language -> namespace -> content, so each module becomes a namespace.
 */
type TranslationsFile = Record<string, Record<string, Record<string, unknown>>>;

const buildResources = () => {
  const resources: Record<string, Record<string, Record<string, unknown>>> = {};
  for (const [moduleName, byLanguage] of Object.entries(translations as TranslationsFile)) {
    for (const [lang, content] of Object.entries(byLanguage)) {
      resources[lang] ??= {};
      resources[lang][moduleName] = content;
    }
  }
  return resources;
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: buildResources(),
    // Always start in the default language so server and first client render match.
    // The saved/browser language is applied right after hydration by I18nProvider.
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: LANGUAGES.map((l) => l.code),
    ns: Object.keys(translations),
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    initAsync: false
  });
}

export default i18n;
