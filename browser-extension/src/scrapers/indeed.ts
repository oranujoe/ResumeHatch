import { SiteScraper } from './types';
import { JobPosting } from '../messages';

const IndeedScraper: SiteScraper = {
  id: 'indeed',
  hostMatch: (hostname) => hostname.includes('indeed.'),
  scrape: (doc: Document): JobPosting | null => {
    const titleSelectors = [
      'h1.jobsearch-JobInfoHeader-title',
      'h1.jobsearch-JobInfoHeader-title span',
      'h2.jobTitle',
      'h2[data-testid="jobdetail-title"]',
      '#jobsearch-ViewJobPaneWrapper h1',
      '#jobsearch-ViewJobPaneWrapper h2',
      'h1',
      'h2'
    ];
    const companySelectors = [
      'div.jobsearch-CompanyInfoWithoutHeaderImage div.icl-u-lg-mr--sm',
      'div.jobsearch-CompanyInfoWithoutHeaderImage span',
      'div.jobsearch-InlineCompanyRating div',
      'div.topcard__flavor'
    ];
    const locSelectors = [
      'div.jobsearch-CompanyInfoWithoutHeaderImage div.icl-u-lg-mr--sm + div',
      'div.jobsearch-JobInfoHeader-subtitle div',
      'div.jobsearch-JobMetadataHeader-iconLabelContainer'
    ];
    const descSelectors = [
      '#jobDescriptionText',
      'div#jobDescriptionText',
      'div.jobsearch-JobComponent-description',
      'div.jobsearch-jobDescriptionText',
      '[data-testid="job-detail-description"]'
    ];

    // determine container first
    const jobContainer =
      doc.querySelector('#jobsearch-ViewJobPaneWrapper') || // side panel container
      doc.querySelector('.jobsearch-JobComponent') || // dedicated page container
      doc;

    if (!jobContainer) {
      console.log('[ResumeHatch][Indeed] No job container found in current DOM');
      return null;
    }

    function query(selArr: string[]): string | undefined {
      for (const sel of selArr) {
        const el = jobContainer.querySelector<HTMLElement>(sel);
        if (el && el.innerText.trim()) return el.innerText.trim();
      }
      return undefined;
    }

    const title = query(titleSelectors);
    const company = query(companySelectors);
    const location = query(locSelectors);
    let description = query(descSelectors);

    const urlObj = new URL(window.location.href);
    const isSearchPage = urlObj.pathname.includes('/jobs');

    const q = urlObj.searchParams.get('q') || '';
    const l = urlObj.searchParams.get('l') || '';

    if (!title) {
      console.log('[ResumeHatch][Indeed] No title found in current DOM');
      return null;
    }

    if (!description || description.length < 50) {
      console.log('[ResumeHatch][Indeed] description not ready yet');
      return null;
    }

    let finalTitle = title;
    if (isSearchPage) {
      const cap = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
      finalTitle = `${cap(q)} jobs${l ? ' – ' + l : ''}`.trim();
    }

    console.log('[ResumeHatch][Indeed] scraped', { title, company, location, hasDescription: !!description });

    // Attempt to create a stable per-job URL/key so duplicate suppression works when switching listings
    let jobUrl = window.location.href;
    const jkEl = jobContainer.querySelector('[data-jk]');
    const jk = jkEl ? jkEl.getAttribute('data-jk') : null;
    if (jk) {
      jobUrl = `https://indeed.com/viewjob?jk=${jk}`;
    } else {
      // Fallback: include title hash so it changes when user clicks different listing
      jobUrl = `${window.location.href}#${encodeURIComponent(title)}`;
    }

    return {
      title: finalTitle,
      company,
      location,
      description: description || '',
      url: jobUrl
    };
  }
};

export default IndeedScraper; 