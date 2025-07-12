export interface JobPosting {
  title: string;
  company?: string;
  location?: string;
  description: string;
  url: string;
}

// Messages exchanged between content scripts, background, and extension pages
export type ExtensionMessage =
  | { type: 'JOB_POSTING_DETECTED'; payload: JobPosting }
  | { type: 'GET_DETECTED_JOB'; tabId?: number }
  | { type: 'OPEN_RESUME_HATCH'; tabId?: number; job?: JobPosting };

// Response when popup asks for detected job
export interface DetectedJobResponse {
  job: JobPosting | null;
} 