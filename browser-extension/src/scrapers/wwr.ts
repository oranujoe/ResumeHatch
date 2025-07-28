import { SiteScraper } from './types';
import { JobPosting } from '../messages';

const WWRScraper: SiteScraper = {
  id: 'wwr',
  hostMatch: (h) => h.includes('weworkremotely.com'),
  scrape(doc: Document): JobPosting | null {
    const header = doc.querySelector<HTMLElement>('div.listing-header-container');
    if (!header) return null;
    const title = header.querySelector<HTMLElement>('h1')?.innerText.trim();
    const company = header.querySelector<HTMLElement>('h2')?.innerText.trim();
    const location = header.querySelector<HTMLElement>('span.listing-header-company-location')?.innerText.trim();
    const desc = doc.querySelector<HTMLElement>('div.listing-container')?.innerText.trim();

    if (!title || !desc || desc.length < 50) return null;

    return {
      title,
      company,
      location,
      description: desc,
      url: window.location.href,
    };
  },
};

export default WWRScraper; 