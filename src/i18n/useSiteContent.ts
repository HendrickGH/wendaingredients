"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import i18n, { DEFAULT_LANGUAGE } from "./config";
import translations from "./translations.json";
import {
  BRANDS,
  CATEGORIES,
  COUNTRIES,
  INDENT_INDUSTRIES,
  INDENT_PROCESS_STEPS,
  NATURAL_COLORS,
  STATS,
  TIMELINE,
  BrandItem,
  CategoryItem,
  CountryMirror,
  IndentIndustry,
  NaturalColorItem,
  StatItem,
  TimelineEvent
} from "@/data/siteContent";

type Json = unknown;

const isPlainObject = (value: Json): value is Record<string, Json> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Overlays translated text on top of the structural data (images, ids, colors, icons).
 * Arrays of objects are merged by index; arrays of strings are replaced.
 */
const mergeLocalized = <T,>(base: T, text: Json): T => {
  if (text === undefined || text === null) return base;
  if (Array.isArray(text)) {
    const baseArray = Array.isArray(base) ? (base as Json[]) : [];
    return text.map((entry, i) =>
      isPlainObject(entry) ? mergeLocalized(baseArray[i], entry) : entry
    ) as unknown as T;
  }
  if (isPlainObject(text)) {
    const result: Record<string, Json> = isPlainObject(base) ? { ...base } : {};
    for (const [key, value] of Object.entries(text)) {
      result[key] = mergeLocalized(result[key], value);
    }
    return result as T;
  }
  return text as T;
};

type TranslationsDict = Record<string, Record<string, { items?: Json }>>;
const translationsData = translations as unknown as TranslationsDict;

const getItems = (lng: string, ns: string): Json =>
  translationsData[ns]?.[lng]?.items ??
  translationsData[ns]?.[DEFAULT_LANGUAGE]?.items ??
  i18n.getResource(lng, ns, "items") ??
  i18n.getResource(DEFAULT_LANGUAGE, ns, "items");

const localize = <T,>(base: T[], lng: string, ns: string): T[] =>
  mergeLocalized(base, getItems(lng, ns)) as T[];

export type LocalizedCategory = CategoryItem & {
  shortName?: string;
  pillars: (CategoryItem["pillars"][number] & { shortTitle?: string })[];
};

export interface IndentProcessStep {
  step: string;
  title: string;
  description: string;
  deliverable?: string;
}

/**
 * Structural site data (stats, timeline, categories, brands, ...) translated into the active language.
 * The text lives in translations.json; siteContent.ts only keeps language-neutral fields.
 */
export const useSiteContent = () => {
  const { i18n: instance } = useTranslation();
  const lng = instance.resolvedLanguage ?? instance.language ?? DEFAULT_LANGUAGE;

  return useMemo(
    () => ({
      countries: localize<CountryMirror>(COUNTRIES, lng, "countries"),
      stats: localize<StatItem>(STATS, lng, "stats"),
      timeline: localize<TimelineEvent>(TIMELINE, lng, "timeline"),
      categories: localize<LocalizedCategory>(CATEGORIES as LocalizedCategory[], lng, "categories"),
      naturalColors: localize<NaturalColorItem>(NATURAL_COLORS, lng, "naturalColors"),
      brands: localize<BrandItem>(BRANDS, lng, "brands"),
      industries: localize<IndentIndustry>(INDENT_INDUSTRIES, lng, "industries"),
      indentSteps: localize<IndentProcessStep>(INDENT_PROCESS_STEPS, lng, "indentSteps")
    }),
    [lng]
  );
};
