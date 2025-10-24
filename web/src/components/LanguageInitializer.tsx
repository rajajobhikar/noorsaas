"use client";
import { useEffect } from "react";
import { detectAndApplyLanguage } from "@/lib-wkt3/i18nEngine/detectLanguage";
import {
  loadLanguage,
  saveLanguage,
} from "@/lib-wkt3/i18nEngine/persistLanguage";
import { setLanguage } from "@/lib-wkt3/i18nEngine/i18n";

export default function LanguageInitializer() {
  useEffect(() => {
    const saved = loadLanguage();
    const lang = saved || detectAndApplyLanguage();
    setLanguage(lang);
    saveLanguage(lang);
  }, []);

  return null; // No UI needed
}
