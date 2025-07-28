/// <reference types="chrome" />

import scrapers from '../scrapers';
import { JobPosting } from '../messages';

// Load board toggle options
let boardOptions = {
  enableLinkedIn: true,
  enableIndeed: true,
  enableGlassdoor: false,
  enableWWR: false,
  showOverlay: false,
};

chrome.storage.sync.get(['options'], (data) => {
  if (data.options) {
    boardOptions = { ...boardOptions, ...data.options };
    syncOverlay();
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options) {
    boardOptions = { ...boardOptions, ...changes.options.newValue };
    syncOverlay();
  }
});

// Overlay helpers
function createChip() {
  const el = document.createElement('div');
  el.id = 'rh-chip';
  const iconUrl = chrome.runtime.getURL('icons/overlay-32.png');
  el.innerHTML = `<img src="${iconUrl}" style="width:28px;height:28px;" />`;
  el.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 32px;
    z-index: 2147483647;
    background:transparent;
    border-radius:50%;
    padding:6px;cursor:pointer;
    box-shadow:0 2px 6px rgba(0,0,0,.2);
    opacity:0.8;transition:opacity .2s;
  `;
  el.onmouseenter = () => (el.style.opacity = '1');
  el.onmouseleave = () => (el.style.opacity = '0.7');
  el.onclick = () => chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
  return el;
}

function syncOverlay() {
  const existing = document.getElementById('rh-chip');
  if (boardOptions.showOverlay) {
    if (!existing) document.body.appendChild(createChip());
  } else {
    existing?.remove();
  }
}

// Generic Job Page scraper via registry

function detectAndScrape(): JobPosting | null {
  const host = window.location.hostname;

  // skip if board disabled
  if (host.includes('linkedin.com') && !boardOptions.enableLinkedIn) return null;
  if (host.includes('indeed.') && !boardOptions.enableIndeed) return null;
  if (host.includes('glassdoor.') && !boardOptions.enableGlassdoor) return null;
  if (host.includes('weworkremotely.com') && !boardOptions.enableWWR) return null;

  for (const scraper of scrapers) {
    if (scraper.hostMatch(host)) {
      return scraper.scrape(document);
    }
  }
  return null;
}

function sendIfJobFound() {
  const job = detectAndScrape();
  if (!job) return;

  // Prevent duplicate sends for the same URL
  if ((window as any).__rh_lastSentUrl === job.url) return;
  (window as any).__rh_lastSentUrl = job.url;

  chrome.runtime.sendMessage({ type: 'JOB_POSTING_DETECTED', payload: job });
}

console.log('[ResumeHatch] jobScraper injected');

// Observe changes to main content for SPA navigations on LinkedIn
const observer = new MutationObserver(() => {
  // Throttle scraping to every 500ms to stay responsive but avoid excessive work
  if ((window as any).__rh_lastScrape && Date.now() - (window as any).__rh_lastScrape < 500) {
    return;
  }
  (window as any).__rh_lastScrape = Date.now();
  sendIfJobFound();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial attempt shortly after script load
setTimeout(sendIfJobFound, 300);

// Export for potential unit tests
export { detectAndScrape }; 