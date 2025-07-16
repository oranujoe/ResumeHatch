/// <reference types="chrome" />

import scrapers from '../scrapers';
import { JobPosting } from '../messages';

// Generic Job Page scraper via registry

function detectAndScrape(): JobPosting | null {
  const host = window.location.hostname;
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
  // Try scrape on each DOM change, but throttle
  if ((window as any).__rh_lastScrape && Date.now() - (window as any).__rh_lastScrape < 3000) {
    return;
  }
  (window as any).__rh_lastScrape = Date.now();
  sendIfJobFound();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial attempt soon after script load
setTimeout(sendIfJobFound, 1500);

// Export for potential unit tests
export { detectAndScrape }; 