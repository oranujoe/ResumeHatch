import { SiteScraper } from './types';
import { JobPosting } from '../messages';

const GlassdoorScraper: SiteScraper = {
  id: 'glassdoor',
  hostMatch: (h) => h.includes('glassdoor.'),
  scrape(doc: Document): JobPosting | null {
    // If search page uses iframe side panel, switch context to iframe document (same-origin)
    const iframe = doc.querySelector<HTMLIFrameElement>('iframe#JDIframe');
    if (iframe && iframe.contentDocument) {
      // eslint-disable-next-line no-param-reassign
      doc = iframe.contentDocument;
    }

    // 1) Find title element (new and old layouts)
    let titleEl = doc.querySelector<HTMLElement>('h1[id^="jd-job-title"]')
      || doc.querySelector<HTMLElement>('h2[data-test="detailTitle"]')
      || null;

    if (!titleEl) {
      (window as any).__RH_DEBUG && console.log('[RH][GD] null reason: no title element');
      return null;
    }

    const title = titleEl.innerText?.trim();
    if (!title) {
      (window as any).__RH_DEBUG && console.log('[RH][GD] null reason: empty title text');
      return null;
    }

    // 2) Choose a reasonable ancestor container to scope queries
    // Walk up until we find a container that likely includes the description (has keywords)
    const KEY_RE = /(overview|responsibilities|summary|qualifications|requirements|description)/i;
    let ancestor: Element | Document = titleEl.closest('main, article, section, div') || doc.body || doc;
    let probe: Element | null = titleEl as Element;
    let steps = 0;
    while (probe && steps < 8) {
      const txt = (probe.textContent || '').toLowerCase();
      if (KEY_RE.test(txt) && txt.length > 100) { ancestor = probe; break; }
      probe = probe.parentElement; steps++;
    }

    // 3) Company / location (best-effort)
    const company = (ancestor.querySelector<HTMLElement>('[data-test="employerName"], [data-test="companyName"], a[data-test="employer-name"]')
      || doc.querySelector<HTMLElement>('[data-test="employerName"], [data-test="companyName"], a[data-test="employer-name"]'))?.innerText?.trim();

    const location = (ancestor.querySelector<HTMLElement>('[data-test="location"], [data-test="job-location"]')
      || doc.querySelector<HTMLElement>('[data-test="location"], [data-test="job-location"]'))?.innerText?.trim();

    // 4) Description lookup (strict candidates first)
    const strictSelector = [
      'div[data-test="jobDescriptionText"]',
      'div[data-test="jobDescription"]',
      'div[data-test="JobDescription"]',
      'div[data-test="job-description-text"]',
      '#JobDescriptionText',
      '#JobDescriptionContainer',
      'article[data-test="jobDescriptionText"]',
      'section[data-test="jobDescriptionText"]',
      'div[class*="jobDescription"], section[class*="jobDescription"]'
    ].join(', ');

    const strictCandidates = Array.from((ancestor as Element | Document).querySelectorAll?.<HTMLElement>(strictSelector) || []);
    let descEl = strictCandidates.sort((a, b) => (b.innerText?.length || 0) - (a.innerText?.length || 0))[0] || null;

    // Fallback: scan ancestor, but ignore header-like blocks (company/rating snippets)
    if (!descEl) {
      const blocks = Array.from((ancestor as Element | Document).querySelectorAll?.<HTMLElement>('section, article, div') || [])
        .filter((el) => {
          const txt = (el.innerText || '').trim();
          if (txt.length < 10) return false;
          const hasHeaderBits =
            el.querySelector('[data-test="employerName"], [data-test="rating"], [data-test="companyName"]') ||
            /★/.test(txt) || /\b\d(?:\.\d)?\s*★?\b/.test(txt);
          return !hasHeaderBits;
        });
      descEl = blocks.sort((a, b) => (b.innerText?.length || 0) - (a.innerText?.length || 0))[0] || null;
    }

    let description = descEl?.innerText?.trim() || '';

    // Clean leading header noise (company name, rating line) if it slipped in
    if (description) {
      const lines = description.split('\n').map((l) => l.trim());
      while (lines.length && (
        (company && lines[0] === company) ||
        /★/.test(lines[0]) ||
        /^\d(?:\.\d)?\s*★?$/.test(lines[0])
      )) {
        lines.shift();
      }
      description = lines.join('\n').trim();
    }

    const MIN_READY = 80; // require a more substantial body to avoid sending header-only snippets
    if (!title || description.length < MIN_READY || description === company || description === title) {
      (window as any).__RH_DEBUG && console.log('[RH][GD] null reason: desc too short', description.length);
      return null;
    }

    // 5) Stable unique key for duplicate guard
    const stableId = (titleEl.id && titleEl.id.startsWith('jd-job-title')) ? titleEl.id : (
      (ancestor as HTMLElement).getAttribute?.('data-id')
      || (ancestor as HTMLElement).getAttribute?.('data-job-id')
      || `${title}${company ? ' @ ' + company : ''}`
    );
    const uniqueUrl = `${window.location.href}#${encodeURIComponent(stableId)}`;

    return { title, company, location, description, url: uniqueUrl };
  },
};

export default GlassdoorScraper; 