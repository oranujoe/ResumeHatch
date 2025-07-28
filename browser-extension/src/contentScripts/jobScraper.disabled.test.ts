import { describe, it, expect } from 'vitest';
import { detectAndScrape } from './jobScraper';
import LinkedInScraper from '../scrapers/linkedin';

// Mock chrome.storage
// @ts-ignore
(global as any).chrome = {
  storage: {
    sync: {
      get: (keys: any, cb: any) => cb({ options: { enableLinkedIn: false } }),
      set: () => {},
    },
  },
};

// Mock linkedIn scraper to return dummy when called (should NOT be called)
LinkedInScraper.scrape = () => ({ title: 'x', description: 'y', url: 'z' } as any);

// Mock hostname includes linkedin.com
Object.defineProperty(window, 'location', {
  value: { hostname: 'www.linkedin.com' },
  writable: true,
});

describe('detectAndScrape respects board toggle', () => {
  it('returns null when LinkedIn disabled', () => {
    const res = detectAndScrape();
    expect(res).toBeNull();
  });
}); 