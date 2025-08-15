import { describe, it, expect } from 'vitest';
import IndeedScraper from './indeed';

const sampleHtml = `
<html>
  <body>
    <div class="jobsearch-JobComponent">
    <h1 class="jobsearch-JobInfoHeader-title">Frontend Developer</h1>
    <div class="jobsearch-CompanyInfoWithoutHeaderImage">
      <div class="icl-u-lg-mr--sm">TechStars</div>
      <div class="icl-u-lg-mr--sm">San Francisco, CA</div>
    </div>
    <div id="jobDescriptionText">
      We are seeking a skilled frontend developer to build intuitive user interfaces and collaborate closely with designers and backend engineers to deliver high-quality products.
    </div>
    </div>
  </body>
</html>`;

describe('IndeedScraper', () => {
  it('extracts job details from sample HTML', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sampleHtml, 'text/html');

    // Polyfill innerText for jsdom if needed
    // @ts-ignore
    if (typeof HTMLElement !== 'undefined' && !('innerText' in HTMLElement.prototype)) {
      Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get() {
          return this.textContent || '';
        },
        configurable: true,
      });
    }

    // Identify side-panel or full-page container
    const jobContainer =
      doc.querySelector('#jobsearch-ViewJobPaneWrapper') ||
      doc.querySelector('#viewJobSSRRoot') ||          // new Indeed markup
      doc.querySelector('.jobsearch-JobComponent') ||  // full page
      null;

    // If side-panel not yet present, bail; we’ll re-scrape on next MutationObserver tick
    if (!jobContainer) {
      console.log('[ResumeHatch][Indeed] job container not ready yet');
      return null;
    }

    const result = IndeedScraper.scrape(doc);
    expect(result).not.toBeNull();
    if (result) {
      expect(result.title).toBe('Frontend Developer');
      expect(result.company).toBe('TechStars');
      expect(result.location).toBe('San Francisco, CA');
      expect(result.description.length).toBeGreaterThan(50);
    }
  });
}); 