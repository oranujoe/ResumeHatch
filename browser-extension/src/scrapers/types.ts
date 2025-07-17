import { JobPosting } from '../messages';
 
export interface SiteScraper {
  id: string;
  hostMatch: (hostname: string) => boolean;
  scrape: (doc: Document) => JobPosting | null;
} 