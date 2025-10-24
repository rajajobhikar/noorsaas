"use client";
import { t, setLanguage } from "@/lib-wkt3/i18nEngine/i18n";
import { formatCurrency } from "@/lib-wkt3/currencyEngine/formatCurrency";
import { useState } from "react";

export default function LanguageCurrencyDemo() {
  const [lang, setLang] = useState("en");
  const [currency, setCurrency] = useState("INR");

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setLang(newLang);
    setLanguage(newLang);
  };

  return (
    <div className="space-y-4">
      <select
        value={lang}
        onChange={handleLangChange}
        className="border p-2 rounded mr-4"
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="fr">French</option>
      </select>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="border p-2 rounded ml-4"
      >
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
      <p>{t("welcome")}</p>
      <p>
        {t("balance")}:{" "}
        {formatCurrency(
          12345.67,
          currency,
          lang === "hi" ? "hi-IN" : lang === "fr" ? "fr-FR" : "en-US"
        )}
      </p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {t("play")}
      </button>
    </div>
  );
}
