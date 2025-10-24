import { translations } from "./translations";

type Language = keyof typeof translations;
type TranslationKey = keyof typeof translations.en;

let currentLang: Language = "en";

export function setLanguage(lang: string) {
  if (lang in translations) currentLang = lang as Language;
}

export function t(key: TranslationKey): string {
  return translations[currentLang]?.[key] || key;
}
