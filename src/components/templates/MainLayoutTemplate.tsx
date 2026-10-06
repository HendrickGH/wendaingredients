"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CountryMirror, BrandItem, IndentIndustry } from "@/data/siteContent";
import { useSiteContent } from "@/i18n/useSiteContent";
import { Navbar } from "../organisms/Navbar";
import { HeroSection } from "../organisms/HeroSection";
import { AboutManifestoSection } from "../organisms/AboutManifestoSection";
import { AboutInfrastructureSection } from "../organisms/AboutInfrastructureSection";
import { AboutLeadershipSection } from "../organisms/AboutLeadershipSection";
import { TimelineChronicle } from "../organisms/TimelineChronicle";
import { StickyServicesSection } from "../organisms/StickyServicesSection";
import { CategoryShowcase } from "../organisms/CategoryShowcase";
import { VisualGallerySection } from "../organisms/VisualGallerySection";
import { BrandsSection } from "../organisms/BrandsSection";
import { QualityCertifications } from "../organisms/QualityCertifications";
import { WndaScienceSection } from "../organisms/WndaScienceSection";
import { WendaIndentSection } from "../organisms/WendaIndentSection";
import { FaqSection } from "../organisms/FaqSection";
import { ContactQuoteSection } from "../organisms/ContactQuoteSection";
import { Footer } from "../organisms/Footer";
import { TechnicalDetailModal } from "../organisms/TechnicalDetailModal";
import { DiaMuertosPromoModal } from "../organisms/DiaMuertosPromoModal";

// Maps a category id to the language-neutral topic id used by the contact form
const CATEGORY_TOPICS: Record<string, string> = {
  "meat-poultry": "meat",
  bakery: "bakery",
  supplements: "science",
  "from-nature": "nature",
  tecnologia: "vicel"
};

const COUNTRY_TO_LANG: Record<string, string> = {
  MX: "es",
  LATAM: "es",
  US: "en",
  EU: "en",
  APAC: "zh"
};

const LANG_TO_DEFAULT_COUNTRY: Record<string, string> = {
  es: "MX",
  en: "US",
  zh: "APAC"
};

export const MainLayoutTemplate: React.FC = () => {
  const { i18n } = useTranslation();
  const { countries, brands, industries } = useSiteContent();

  // Only stable identifiers live in state; localized objects are derived on every render
  const [countryCode, setCountryCode] = useState<string>(() => {
    const activeLang = i18n.resolvedLanguage ?? i18n.language ?? "es";
    return LANG_TO_DEFAULT_COUNTRY[activeLang] ?? "MX";
  });
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(null);
  const [selectedIndustryId, setSelectedIndustryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<string>("meat");

  const currentCountry = countries.find((c) => c.code === countryCode) ?? countries[0];
  const selectedBrand = brands.find((b) => b.name === selectedBrandName) ?? null;
  const selectedIndustry = industries.find((i) => i.id === selectedIndustryId) ?? null;

  const handleSelectCountry = (country: CountryMirror) => {
    setCountryCode(country.code);
    const targetLang = COUNTRY_TO_LANG[country.code] ?? "es";
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  };

  const handleOpenBrandModal = (brand: BrandItem) => {
    setSelectedBrandName(brand.name);
    setSelectedIndustryId(null);
    setIsModalOpen(true);
  };

  const handleOpenIndustryModal = (industry: IndentIndustry) => {
    setSelectedIndustryId(industry.id);
    setSelectedBrandName(null);
    setIsModalOpen(true);
  };

  const handleRequestSample = (topic: string) => {
    setContactTopic(topic);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] relative selection:bg-[#447D29] selection:text-white overflow-x-clip">
      {/* Top Navigation */}
      <Navbar
        currentCountry={currentCountry}
        onSelectCountry={handleSelectCountry}
      />

      {/* Main Content Sections */}
      <main className="relative max-w-full overflow-x-clip">
        <HeroSection />

        <AboutManifestoSection />

        <CategoryShowcase
          onConsultSolution={(categoryId) =>
            handleRequestSample(CATEGORY_TOPICS[categoryId] ?? categoryId)
          }
        />

        <StickyServicesSection />

        <BrandsSection
          onOpenBrandDetails={handleOpenBrandModal}
        />

        <WndaScienceSection
          onConsultScience={() => handleRequestSample("science")}
        />

        <QualityCertifications />

        <VisualGallerySection />

        <AboutInfrastructureSection />
        <AboutLeadershipSection />

        <TimelineChronicle />

        <WendaIndentSection
          onSelectIndustry={handleOpenIndustryModal}
          onRequestQuote={() => handleRequestSample("indent")}
        />

        <FaqSection
          onAskQuestion={(customQuestion) => {
            handleRequestSample("meat");
            setTimeout(() => {
              const messageInput = document.getElementById("contact-form-message") as HTMLTextAreaElement | null;
              if (messageInput && customQuestion) {
                messageInput.value = customQuestion;
                messageInput.dispatchEvent(new Event("input", { bubbles: true }));
                messageInput.focus();
              }
            }, 300);
          }}
        />

        <ContactQuoteSection
          currentCountry={currentCountry}
          defaultTopic={contactTopic}
        />
      </main>

      {/* Global Footer */}
      <Footer
        currentCountry={currentCountry}
        onSelectCountry={handleSelectCountry}
      />

      {/* Día de Muertos Seasonal Promo Modal */}
      <DiaMuertosPromoModal
        onClaimPromo={(category, message) => {
          handleRequestSample(category);
          setTimeout(() => {
            const messageInput = document.getElementById("contact-form-message") as HTMLTextAreaElement | null;
            if (messageInput) {
              messageInput.value = message;
              messageInput.dispatchEvent(new Event("input", { bubbles: true }));
              messageInput.focus();
            }
          }, 350);
        }}
      />

      {/* Technical Detail Sheet Modal */}
      <TechnicalDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={selectedBrand}
        industry={selectedIndustry}
        onRequestSample={(title) =>
          handleRequestSample(selectedIndustry ? "indent" : selectedBrand?.name ?? title)
        }
      />
    </div>
  );
};
