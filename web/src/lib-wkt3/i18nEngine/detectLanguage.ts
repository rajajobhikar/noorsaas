import { setLanguage } from "./i18n";
import { isRTL } from "./rtl";

export function detectAndApplyLanguage(): string {
  const browserLang = navigator.language.slice(0, 2); // e.g., 'en', 'hi'
  setLanguage(browserLang);
  const dir = isRTL(browserLang) ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  return browserLang;
}
