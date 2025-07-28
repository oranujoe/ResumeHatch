import LinkedInScraper from './linkedin';
import IndeedScraper from './indeed';
import GlassdoorScraper from './glassdoor';
import WWRScraper from './wwr';
import { SiteScraper } from './types';

const scrapers: SiteScraper[] = [LinkedInScraper, IndeedScraper, GlassdoorScraper, WWRScraper];

export default scrapers; 