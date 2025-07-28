import { describe, it, expect } from 'vitest';

// Stub chrome before importing the module under test so that its top-level code can access it safely.
// @ts-ignore
(global as any).chrome = {
  storage: {
    sync: {
      get: (_keys: any, cb: any) => cb({ options: { enableLinkedIn: false } }),
      set: () => {},
    },
  },
};

// Mock hostname to appear as LinkedIn page so scraper would normally run
Object.defineProperty(window, 'location', {
  value: { hostname: 'www.linkedin.com' },
  writable: true,
});

// Import after stubbing globals so that initialization code sees the mocks
import { detectAndScrape } from './jobScraper';
import LinkedInScraper from '../scrapers/linkedin';

// Ensure the LinkedIn scraper is not used when the board is disabled
LinkedInScraper.scrape = () => ({ title: 'should-not-be-returned' } as any);

describe('detectAndScrape respects board toggle', () => {
  it('returns null when LinkedIn board is disabled in options', () => {
    const res = detectAndScrape();
    expect(res).toBeNull();
  });
}); 