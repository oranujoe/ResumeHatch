import LinkedInScraper from './linkedin';
import IndeedScraper from './indeed';
import { SiteScraper } from './types';

const scrapers: SiteScraper[] = [LinkedInScraper, IndeedScraper];

export default scrapers; 