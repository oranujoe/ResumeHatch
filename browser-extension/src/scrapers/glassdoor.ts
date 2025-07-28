import { SiteScraper } from './types';
import { JobPosting } from '../messages';

const GlassdoorScraper: SiteScraper = {
  id: 'glassdoor',
  hostMatch: (h) => h.includes('glassdoor.'),
  scrape(doc: Document): JobPosting | null {
    // If search page uses iframe side panel, switch context to iframe document
    const iframe = doc.querySelector<HTMLIFrameElement>('iframe#JDIframe');
    if (iframe && iframe.contentDocument) {
      // eslint-disable-next-line no-param-reassign
      doc = iframe.contentDocument;
    }

    // Detect side-panel job details container or fallback to full page
    const container = doc.querySelector<HTMLElement>('div[data-test="jobDetails"], div[id="JobDetails"], div[data-test="job-preview"]')
      || doc.querySelector<HTMLElement>('div.jobDetails')
      || doc;

    let title = container.querySelector<HTMLElement>('h2[data-test="detailTitle"], div[data-test="jobViewHeader"] h2')?.innerText.trim();
    if (!title) {
      title = doc.querySelector<HTMLElement>('h1[id^="jd-job-title"]')?.innerText.trim();
    }
    const company = container.querySelector<HTMLElement>('[data-test="employerName"]')?.innerText.trim();
    const location = container.querySelector<HTMLElement>('[data-test="location"]')?.innerText.trim();
    let descEl = container.querySelector<HTMLElement>('div.jobDescriptionContent');
    if (!descEl) {
      descEl = doc.querySelector<HTMLElement>('div.jobDescriptionContent, div[data-test="jobDescriptionText"]');
    }
    let description = descEl?.innerText.trim() || '';

    const MIN_READY = 10;
    const NEED_EXPAND = 150;

    // If snippet is short, try clicking "Show more" once then retry on next mutation
    const showBtn = container.querySelector<HTMLButtonElement>('button[aria-label="Show more"], button[data-test="readMore"]');
    if (description.length < NEED_EXPAND && showBtn && !showBtn.dataset.rhClicked) {
      showBtn.dataset.rhClicked = 'true';
      showBtn.click();
      return null;
    }

    if (!title || description.length < MIN_READY) return null; // still not ready

    // Build unique pseudo-URL so duplicate guard works even on SPA
    const jobId = (container as HTMLElement).getAttribute?.('data-id') || title;
    const uniqueUrl = `${window.location.href}#${encodeURIComponent(jobId)}`;

    return {
      title,
      company,
      location,
      description,
      url: uniqueUrl,
    };
  },
};

export default GlassdoorScraper; 