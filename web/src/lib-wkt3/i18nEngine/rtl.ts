const rtlLanguages = ["ar", "he", "fa", "ur", "hi"];

export function isRTL(lang: string): boolean {
  return rtlLanguages.includes(lang);
}
