import { describe, it, expect } from 'vitest';
import LinkedInScraper from '../scrapers/linkedin';

const sampleHtml = `
  <html>
    <body>
      <h1 class="jobs-unified-top-card__job-title">Software Engineer</h1>
      <a class="topcard__org-name-link">Acme Corp</a>
      <span class="topcard__flavor--bullet">Remote</span>
      <div class="show-more-less-html__markup">We are looking for talented developers who will build cutting-edge products and collaborate across teams to deliver world-class solutions.</div>
    </body>
  </html>
`;

describe('scrapeLinkedIn', () => {
  it('extracts job details from sample HTML', () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sampleHtml, 'text/html');
    // Polyfill innerText for jsdom environment
    // @ts-ignore
    if (typeof HTMLElement !== 'undefined' && !('innerText' in HTMLElement.prototype)) {
      Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get() {
          return this.textContent || '';
        },
        configurable: true,
      });
    }
    // Replace global document with our sample for the duration of the test
    const originalDocument = global.document;
    // @ts-ignore
    global.document = doc;
    const result = LinkedInScraper.scrape(doc);
    // Restore original document
    // @ts-ignore
    global.document = originalDocument;
    expect(result).not.toBeNull();
    if (result) {
      expect(result.title).toBe('Software Engineer');
      expect(result.company).toBe('Acme Corp');
      expect(result.location).toBe('Remote');
      expect(result.description.length).toBeGreaterThan(10);
    }
  });
}); 