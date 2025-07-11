/// <reference types="chrome" />

// LinkedIn Job Page scraper

interface JobPosting {
  title: string;
  company?: string;
  location?: string;
  description: string;
  url: string;
}

function scrapeLinkedIn(): JobPosting | null {
  // Title (try multiple known selectors then fallback to first h1)
  const titleSelectors = [
    'h1.jobs-unified-top-card__job-title',
    'h1.top-card-layout__title',
    'h1.t-24',
    'h1.t-bold',
    'h1.inline',
    'h1'
  ];
  let title: string | undefined;
  for (const sel of titleSelectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el && el.innerText.trim().length > 0) {
      title = el.innerText.trim();
      break;
    }
  }

  // Company
  const companySelectors = [
    'a.topcard__org-name-link',
    'span.topcard__flavor',
    'a[href*="/company/"] span'
  ];
  let company: string | undefined;
  for (const sel of companySelectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el && el.innerText.trim().length > 0) {
      company = el.innerText.trim();
      break;
    }
  }

  // Location
  const locSelectors = [
    'span.topcard__flavor--bullet',
    'span.jobs-unified-top-card__bullet'
  ];
  let location: string | undefined;
  for (const sel of locSelectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el && el.innerText.trim().length > 0) {
      location = el.innerText.trim();
      break;
    }
  }

  // Description
  const descSelectors = [
    'div.show-more-less-html__markup',
    'div.jobs-description-content__text',
    'div.description__text',
    'div.jobs-description__content',
    'p[dir="ltr"]'
  ];
  let description: string | undefined;
  for (const sel of descSelectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el && el.innerText.trim().length > 50) { // ensure some content
      description = el.innerText.trim();
      break;
    }
  }

  if (!title) return null;

  // Log extracted values for debugging
  console.log('[ResumeHatch] scraped', { title, company, location, hasDescription: !!description });

  return { title, company, location, description: description || '', url: window.location.href };
}

function detectAndScrape(): JobPosting | null {
  const host = window.location.hostname;
  if (host.includes('linkedin.com')) {
    return scrapeLinkedIn();
  }
  // Future: add Indeed, Greenhouse, etc.
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

// Export functions for unit testing (tree-shaken away in production)
export { scrapeLinkedIn, detectAndScrape }; 