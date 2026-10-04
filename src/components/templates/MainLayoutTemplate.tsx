"use client";

import React, { useState } from "react";
import { COUNTRIES, CountryMirror, BrandItem, IndentIndustry } from "@/data/siteContent";
import { Navbar } from "../organisms/Navbar";
import { HeroSection } from "../organisms/HeroSection";
import { AboutUsSection } from "../organisms/AboutUsSection";
import { StickyServicesSection } from "../organisms/StickyServicesSection";
import { CategoryShowcase } from "../organisms/CategoryShowcase";
import { VisualGallerySection } from "../organisms/VisualGallerySection";
import { BrandsSection } from "../organisms/BrandsSection";
import { QualityCertifications } from "../organisms/QualityCertifications";
import { WndaScienceSection } from "../organisms/WndaScienceSection";
import { WendaIndentSection } from "../organisms/WendaIndentSection";
import { ContactQuoteSection } from "../organisms/ContactQuoteSection";
import { Footer } from "../organisms/Footer";
import { TechnicalDetailModal } from "../organisms/TechnicalDetailModal";

export const MainLayoutTemplate: React.FC = () => {
  const [currentCountry, setCurrentCountry] = useState<CountryMirror>(COUNTRIES[0]);
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<IndentIndustry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactTopic, setContactTopic] = useState<string>("Meat & Poultry");

  const handleOpenBrandModal = (brand: BrandItem) => {
    setSelectedBrand(brand);
    setSelectedIndustry(null);
    setIsModalOpen(true);
  };

  const handleOpenIndustryModal = (industry: IndentIndustry) => {
    setSelectedIndustry(industry);
    setSelectedBrand(null);
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#0F172A] relative selection:bg-[#447D29] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentCountry={currentCountry}
        onSelectCountry={setCurrentCountry}
      />

      {/* Main Content Sections */}
      <main className="relative overflow-x-clip max-w-full">
        <HeroSection />

        <AboutUsSection />

        <StickyServicesSection />

        <CategoryShowcase
          onConsultSolution={(cat) => handleRequestSample(cat)}
        />

        <VisualGallerySection />

        <BrandsSection
          onOpenBrandDetails={handleOpenBrandModal}
        />

        <QualityCertifications />

        <WndaScienceSection
          onConsultScience={() => handleRequestSample("WNDA Science")}
        />

        <WendaIndentSection
          onSelectIndustry={handleOpenIndustryModal}
          onRequestQuote={(ind) => handleRequestSample(ind || "Wenda Indent")}
        />

        <ContactQuoteSection
          currentCountry={currentCountry}
          defaultTopic={contactTopic}
        />
      </main>

      {/* Global Footer */}
      <Footer
        currentCountry={currentCountry}
        onSelectCountry={setCurrentCountry}
      />

      {/* Technical Detail Sheet Modal */}
      <TechnicalDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        brand={selectedBrand}
        industry={selectedIndustry}
        onRequestSample={handleRequestSample}
      />
    </div>
  );
};
