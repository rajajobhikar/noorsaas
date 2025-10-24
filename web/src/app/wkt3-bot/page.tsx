/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function Wkt3BotPage() {
  const [installable, setInstallable] = useState(false);
  const [promptFired, setPromptFired] = useState(false);

  useEffect(() => {
    // ✅ Check service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        console.log("✅ Service worker is ready:", reg);
      });
    } else {
      console.warn("❌ Service worker not supported");
    }

    // ✅ Check manifest fetch
    fetch("/manifest.json")
      .then((res) => {
        if (res.ok) {
          console.log("✅ Manifest loaded");
        } else {
          console.warn("❌ Manifest not found");
        }
      })
      .catch(() => console.warn("❌ Manifest fetch failed"));

    // ✅ Listen for install prompt
    let deferredPrompt: any;

    window.addEventListener("beforeinstallprompt", (e) => {
      console.log("✅ beforeinstallprompt fired");
      setPromptFired(true);
      setInstallable(true);
      e.preventDefault();
      deferredPrompt = e;

      const installBtn = document.getElementById("install-btn");
      if (installBtn) {
        installBtn.style.display = "block";
        installBtn.onclick = () => {
          console.log("📦 Showing install prompt");
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === "accepted") {
              console.log("✅ wkt3-bot installed");
            } else {
              console.log("❌ User dismissed install");
            }
          });
        };
      }
    });

    // ✅ Check installability via App Manifest tab
    if (window.matchMedia("(display-mode: standalone)").matches) {
      console.log("✅ App is running in standalone mode");
    } else {
      console.log("ℹ️ App is running in browser tab");
    }
  }, []);

  return (
    <>
      <Head>
        <title>wkt3-bot</title>
        <meta name="theme-color" content="#ff69b4" />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          🔍 wkt3-bot Diagnostic Mode
        </h1>

        <div className="max-w-md mx-auto bg-white rounded-xl shadow p-4">
          <p className="mb-2 text-sm text-gray-700">
            Service worker, manifest, and install prompt status will appear in
            your browser console.
          </p>

          <p className="text-sm mb-2">
            <strong>Installable:</strong> {installable ? "✅ Yes" : "❌ No"}
          </p>
          <p className="text-sm mb-2">
            <strong>Prompt Fired:</strong> {promptFired ? "✅ Yes" : "❌ No"}
          </p>

          <button
            id="install-btn"
            style={{ display: "none" }}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 w-full"
          >
            Install wkt3-bot
          </button>
        </div>
      </div>
    </>
  );
}
