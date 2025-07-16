/// <reference types="chrome" />

// Background service worker (Manifest V3)
// Responsible for routing messages between content scripts, popup and Resume Hatch backend.

// Fired when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Resume Hatch Assistant installed");
  if (chrome.action.setBadgeTextColor) {
    chrome.action.setBadgeTextColor({ color: "#FFFFFF" });
  }
});

import { ExtensionMessage, JobPosting } from './messages';

// Cache latest detected job per tab
const jobCache = new Map<number, JobPosting>();

// Helper to set badge text
function setBadge(tabId: number, text: string) {
  if (chrome.action && chrome.action.setBadgeText) {
    chrome.action.setBadgeText({ tabId, text });
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#0B82F4' });
  }
}

// Generic message router (Manifest V3 requires return true for async)
chrome.runtime.onMessage.addListener((msg: ExtensionMessage, sender, sendResponse) => {
  const tabId = sender.tab?.id;

  switch (msg.type) {
    case 'JOB_POSTING_DETECTED':
      if (tabId != null) {
        const job = msg.payload as JobPosting;
        jobCache.set(tabId, job);
        setBadge(tabId, '1');
        console.log('[RH] Job detected cached for tab', tabId);
      }
      sendResponse({ ok: true });
      break;

    case 'GET_DETECTED_JOB':
      if (msg.tabId != null) {
        const job = jobCache.get(msg.tabId) || null;
        sendResponse({ job });
      } else {
        sendResponse({ job: null });
      }
      break;

    case 'OPEN_RESUME_HATCH': {
      let job: JobPosting | undefined;
      const sourceTabId = msg.tabId;
      if (sourceTabId != null) {
        job = jobCache.get(sourceTabId);
        // Clear badge once user initiates open
        setBadge(sourceTabId, '');
        jobCache.delete(sourceTabId);
      }
      // Fallback to provided payload if any
      if (!job && 'job' in msg && msg.job) job = msg.job;
      if (!job) {
        sendResponse({ ok: false, error: 'No job data' });
        return true;
      }

      try {
        const { title, company, description, url } = job;
        const query = new URLSearchParams({
          title: title || '',
          company: company || '',
          description: description || '',
          source: url || ''
        });
        const BASE_URL = (import.meta as any).env?.VITE_RH_BASE_URL || 'https://resumehatch.com';
        const targetUrl = `${BASE_URL}/dashboard/job-parser/zone?${query.toString()}`;
        chrome.tabs.create({ url: targetUrl });
        sendResponse({ ok: true });
      } catch (e) {
        console.error('[RH] Error opening Resume Hatch', e);
        sendResponse({ ok: false, error: String(e) });
      }
      break;
    }

    default:
      console.log('[RH] Unknown message', msg);
      sendResponse({ ok: false });
  }
  return true; // Keep message port open for async response
});

// Clear cache & badge when tab is removed
chrome.tabs.onRemoved.addListener((tabId) => {
  jobCache.delete(tabId);
});

// Clear cache & badge when the tab navigates to a new URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    jobCache.delete(tabId);
    setBadge(tabId, '');
  }
}); 