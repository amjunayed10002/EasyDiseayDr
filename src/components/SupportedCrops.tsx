import React from "react";
import { Language } from "../types";
import { translations } from "../translations";

interface SupportedCropsProps {
  language: Language;
  onSelectCrop: (cropName: string) => void;
}

export const SupportedCrops: React.FC<SupportedCropsProps> = ({
  language,
  onSelectCrop,
}) => {
  const t = translations[language];

  const crops = [
    { key: "Cucumber", label: t.supportedCrops.cucumber },
    { key: "Garlic", label: t.supportedCrops.garlic },
    { key: "Chili", label: t.supportedCrops.chili },
    { key: "Potato", label: t.supportedCrops.potato },
    { key: "Corn", label: t.supportedCrops.corn },
    { key: "Tomato", label: t.supportedCrops.tomato },
    { key: "Brinjal", label: t.supportedCrops.brinjal },
    { key: "Jute", label: t.supportedCrops.jute },
    { key: "Wheat", label: t.supportedCrops.wheat },
    { key: "Rice", label: t.supportedCrops.rice },
    { key: "Many More", label: t.supportedCrops.manyMore },
  ];

  return (
    <section
      id="supported-crops-section"
      className="py-12 sm:py-16 bg-[#F9FBF9] border-t border-gray-200/60 text-[#1B3022]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Headings */}
        <h2
          id="supported-crops-title"
          className="text-2xl sm:text-3xl font-black text-[#1B5E20] uppercase tracking-wider"
        >
          {t.supportedCrops.title}
        </h2>
        <p
          id="supported-crops-subtitle"
          className="text-sm sm:text-base font-bold text-gray-400 mt-1 mb-8"
        >
          {t.supportedCrops.subtitle}
        </p>

        {/* Rounded Pill Buttons Grid matching Vibrant Palette */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl mx-auto">
          {crops.map((crop, idx) => (
            <button
              key={idx}
              id={`crop-pill-${crop.key.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onSelectCrop(crop.key === "Many More" ? "" : crop.key)}
              className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-[#1B5E20] hover:text-[#1B5E20] active:scale-95 transition-all text-sm font-bold text-[#1B3022] cursor-pointer"
            >
              <span>{crop.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
