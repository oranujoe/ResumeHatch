/// <reference types="chrome" />

// Background service worker (Manifest V3)
// Responsible for routing messages between content scripts, popup and Resume Hatch backend.

// Fired when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Resume Hatch Assistant installed");
});

// Generic message router
type ExtensionMessage =
  | { type: "JOB_POSTING_CAPTURED"; payload: unknown }
  | { type: "AUTOFILL_COMPLETED"; payload: unknown };

chrome.runtime.onMessage.addListener(
  (msg: ExtensionMessage, sender, sendResponse) => {
    switch (msg.type) {
      case "JOB_POSTING_CAPTURED":
        console.log("Captured job posting", msg.payload);
        try {
          // Build URL with encoded description as query parameter
          const { title, company, description, url } = msg.payload as any;
          const query = new URLSearchParams({
            title: title || "",
            company: company || "",
            description: description || "",
            source: url || ""
          });
          // Determine base URL from build-time environment variable (falls back to prod domain)
          const BASE_URL = (import.meta as any).env?.VITE_RH_BASE_URL || 'https://resumehatch.com';
          const targetUrl = `${BASE_URL}/dashboard/job-parser/zone?${query.toString()}`;

          chrome.tabs.create({ url: targetUrl });
        } catch (e) {
          console.error("Error opening Resume Hatch with job data", e);
        }
        break;
      default:
        console.log("Unknown message", msg);
    }
    sendResponse({ ok: true });
  }
); 