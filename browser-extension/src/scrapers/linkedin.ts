import { SiteScraper } from './types';
import { JobPosting } from '../messages';

function queryText(container: Element | Document, selectors: string[]): string | undefined {
  for (const sel of selectors) {
    const el = container.querySelector<HTMLElement>(sel);
    if (el && el.innerText.trim().length > 0) {
      return el.innerText.trim();
    }
  }
  return undefined;
}

const LinkedInScraper: SiteScraper = {
  id: 'linkedin',
  hostMatch: (hostname) => hostname.includes('linkedin.com'),
  scrape: (doc: Document): JobPosting | null => {
    // If LinkedIn collapses long descriptions, click the "Show more" button once
    const moreBtn = doc.querySelector<HTMLButtonElement>('button.show-more-less-html__button--more, button[aria-label="Show more"]');
    if (moreBtn && !moreBtn.dataset.rhClicked) {
      moreBtn.dataset.rhClicked = 'true';
      moreBtn.click();
      // Wait for next mutation cycle to read full description
      return null;
    }
    // Title selectors
    const titleSelectors = [
      'h1.jobs-unified-top-card__job-title',
      'h1.top-card-layout__title',
      'h1.t-24',
      'h1.t-bold',
      'h1.inline',
      'h1'
    ];
    // determine job detail container (side panel or full page)
    const detailContainer =
      doc.querySelector('.jobs-search__job-details') ||
      doc.querySelector('.jobs-box') ||
      doc.querySelector('.jobs-details__main-content') ||
      doc;

    const title = queryText(detailContainer, titleSelectors);

    // Company selectors
    const companySelectors = [
      'a.topcard__org-name-link',
      'span.topcard__flavor',
      'a[href*="/company/"] span'
    ];
    const company = queryText(detailContainer, companySelectors);

    // Location selectors
    const locSelectors = [
      'span.topcard__flavor--bullet',
      'span.jobs-unified-top-card__bullet'
    ];
    const location = queryText(detailContainer, locSelectors);

    // Description selectors
    const descSelectors = [
      'div.show-more-less-html__markup',
      'div.jobs-description-content__text',
      'div.description__text',
      'div.jobs-description__content',
      'p[dir="ltr"]'
    ];
    let description: string | undefined = queryText(detailContainer, descSelectors);

    // Ensure we have sufficient description content (> 100 chars) to avoid truncated previews
    if (!title) return null;

    if (!description || description.length < 100) {
      // Description likely still collapsed or not fully loaded
      return null;
    }

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