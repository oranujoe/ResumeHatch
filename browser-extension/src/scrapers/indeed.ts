import { SiteScraper } from './types';
import { JobPosting } from '../messages';

const IndeedScraper: SiteScraper = {
  id: 'indeed',
  hostMatch: (hostname) => hostname.includes('indeed.'),
  scrape: (doc: Document): JobPosting | null => {
    // Title
    const titleSelectors = [
      'h1.jobsearch-JobInfoHeader-title',
      'h1.jobsearch-JobInfoHeader-title span',
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

    // Company
    const companySelectors = [
      'div.jobsearch-CompanyInfoWithoutHeaderImage div.icl-u-lg-mr--sm',
      'div.jobsearch-CompanyInfoWithoutHeaderImage span',
      'div.jobsearch-InlineCompanyRating div',
      'div.topcard__flavor'
    ];
    let company: string | undefined;
    for (const sel of companySelectors) {
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 0) {
        company = el.innerText.trim();
        break;
      }
    }

    // Location
    const locSelectors = [
      'div.jobsearch-CompanyInfoWithoutHeaderImage div.icl-u-lg-mr--sm + div',
      'div.jobsearch-JobInfoHeader-subtitle div',
      'div.jobsearch-JobMetadataHeader-iconLabelContainer'
    ];
    let location: string | undefined;
    for (const sel of locSelectors) {
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 0) {
        location = el.innerText.trim();
        break;
      }
    }

    // Description
    const descSelectors = [
      '#jobDescriptionText',
      'div#jobDescriptionText',
      'div.jobsearch-JobComponent-description',
      'div.jobsearch-jobDescriptionText'
    ];
    let description: string | undefined;
    for (const sel of descSelectors) {
      const el = doc.querySelector<HTMLElement>(sel);
      if (el && el.innerText.trim().length > 50) {
        description = el.innerText.trim();
        break;
      }
    }

    // Ensure we are actually on a job view (side panel or dedicated page)
    const hasJobComponent = !!doc.querySelector('.jobsearch-JobComponent, #jobsearch-ViewJobPaneWrapper');

    // Avoid false positives like captcha or listing pages
    if (!hasJobComponent || !title) return null;

    // For stability, require some description text (≥ 50 chars) when available
    if (!description || description.length < 50) return null;

    console.log('[ResumeHatch][Indeed] scraped', { title, company, location, hasDescription: !!description });

    return {
      title,
      company,
      location,
      description,
      url: window.location.href
    };
  }
};

export default IndeedScraper; 