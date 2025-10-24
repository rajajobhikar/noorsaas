export function saveLanguage(lang: string) {
  localStorage.setItem("wkt3-lang", lang);
}

export function loadLanguage(): string | null {
  return localStorage.getItem("wkt3-lang");
}
