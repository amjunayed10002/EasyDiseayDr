import React, { useEffect, useState } from "react";
import { Language, SupportedCrop } from "../types";
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
  const [managedCrops, setManagedCrops] = useState<SupportedCrop[] | null>(null);

  useEffect(() => {
    fetch("/api/supported-crops")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (Array.isArray(data)) setManagedCrops(data); })
      .catch(() => {});
  }, []);

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

  const visibleCrops = managedCrops || crops.map((crop, index) => ({ id: String(index), name: crop.key, nameBn: crop.label, imageUrl: "", label: crop.label }));

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
          {visibleCrops.map((crop, idx) => (
            <button
              key={crop.id || idx}
              id={`crop-pill-${crop.name.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => onSelectCrop(crop.name)}
              className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white border border-gray-200 shadow-xs hover:shadow-md hover:border-[#1B5E20] hover:text-[#1B5E20] active:scale-95 transition-all text-sm font-bold text-[#1B3022] cursor-pointer"
            >
              {crop.imageUrl ? <img src={crop.imageUrl} alt="" className="mr-2 h-6 w-6 rounded-full object-cover" /> : null}
              <span>{language === "bn" ? crop.nameBn : crop.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
