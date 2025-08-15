/// <reference types="chrome" />

// Background service worker (Manifest V3)
// Responsible for routing messages between content scripts, popup and Resume Hatch backend.

// Fired when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log("Resume Hatch Assistant installed");
});

import { ExtensionMessage, JobPosting } from './messages';
import { DEFAULT_OPTIONS, Options } from './options/storage';

// Load behaviour options
let currentOptions: Options = DEFAULT_OPTIONS;

chrome.storage.sync.get(['options'], (data) => {
  currentOptions = { ...DEFAULT_OPTIONS, ...(data.options || {}) };
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options) {
    currentOptions = { ...DEFAULT_OPTIONS, ...changes.options.newValue };
  }
});

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
        if (currentOptions.showBadge) {
          setBadge(tabId, '1');
        }
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
        if (currentOptions.showBadge) {
          setBadge(sourceTabId, '');
        }
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
        if (currentOptions.closeTabOnSend && sourceTabId != null) {
          chrome.tabs.remove(sourceTabId);
        }
        sendResponse({ ok: true });
        } catch (e) {
        console.error('[RH] Error opening Resume Hatch', e);
        sendResponse({ ok: false, error: String(e) });
      }
      break;
    }

    case 'SHOW_NOTIFICATION': {
      const { title, message, iconUrl } = msg;
      const icon = iconUrl || chrome.runtime.getURL('icons/icon-128.png');
      if (!currentOptions.desktopNotifications) {
        sendResponse({ ok: true });
        break;
      }

      chrome.notifications?.create({
        type: 'basic',
        iconUrl: icon,
        title,
        message,
      });
      sendResponse({ ok: true });
      break;
    }

    case 'OPEN_POPUP': {
      chrome.action.openPopup(() => {
        if (chrome.runtime.lastError) {
          const popupUrl = chrome.runtime.getURL('src/popup/index.html');
          chrome.windows.create({ url: popupUrl, type: 'popup', width: 400, height: 600 });
        }
      });
      sendResponse({ ok: true });
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

const JOB_HOSTS = ['linkedin.com', 'indeed.com'];  // extend as we add boards

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (!changeInfo.url) return;

  try {
    const host = new URL(changeInfo.url).hostname;

    // Only clear badge + cache if user navigates to a NON-job host
    if (!JOB_HOSTS.some(h => host.includes(h))) {
      jobCache.delete(tabId);
      setBadge(tabId, '');
    }
  } catch {
    /* ignore malformed URLs */
  }
}); 