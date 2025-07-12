import { SiteScraper } from './types';
import { JobPosting } from '../messages';

const LinkedInScraper: SiteScraper = {
  id: 'linkedin',
  hostMatch: (hostname) => hostname.includes('linkedin.com'),
  scrape: (doc: Document): JobPosting | null => {
    // Title selectors
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
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 0) {
        title = el.innerText.trim();
        break;
      }
    }

    // Company selectors
    const companySelectors = [
      'a.topcard__org-name-link',
      'span.topcard__flavor',
      'a[href*="/company/"] span'
    ];
    let company: string | undefined;
    for (const sel of companySelectors) {
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 0) {
        company = el.innerText.trim();
        break;
      }
    }

    // Location selectors
    const locSelectors = [
      'span.topcard__flavor--bullet',
      'span.jobs-unified-top-card__bullet'
    ];
    let location: string | undefined;
    for (const sel of locSelectors) {
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 0) {
        location = el.innerText.trim();
        break;
      }
    }

    // Description selectors
    const descSelectors = [
      'div.show-more-less-html__markup',
      'div.jobs-description-content__text',
      'div.description__text',
      'div.jobs-description__content',
      'p[dir="ltr"]'
    ];
    let description: string | undefined;
    for (const sel of descSelectors) {
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 50) {
        description = el.innerText.trim();
        break;
      }
    }

    // Ensure we have sufficient description content (> 50 chars) to generate resume
    if (!title || !description || description.length < 50) return null;

    console.log('[ResumeHatch][LinkedIn] scraped', { title, company, location, hasDescription: !!description });

    return {
      title,
      company,
      location,
      description: description || '',
      url: window.location.href
    };
  }
};

export default LinkedInScraper; 