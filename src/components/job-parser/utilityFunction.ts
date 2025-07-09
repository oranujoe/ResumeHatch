
// Utility functions for job parser components
/**
 * Validates if a LinkedIn URL is properly formatted
 */
export const isValidLinkedInUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/;
  return linkedinRegex.test(url);
};

/**
 * Normalizes a LinkedIn URL to a standard format
 */
export const normalizeLinkedInUrl = (url: string): string => {
  if (!url) return '';
  
  // Remove trailing slashes
  url = url.replace(/\/$/, '');
  
  // Ensure it starts with https://
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }
  
  // Ensure it uses www.linkedin.com
  url = url.replace(/^https?:\/\/linkedin\.com/, 'https://www.linkedin.com');
  
  return url;
};

/**
 * Extracts LinkedIn username from URL
 */
export const getLinkedInUsernameFromUrl = (url: string): string | null => {
  if (!url) return null;
  
  const match = url.match(/linkedin\.com\/in\/([a-zA-Z0-9\-_]+)/);
  return match ? match[1] : null;
};

/**
 * Creates a display-friendly LinkedIn URL
 */
export const getLinkedInDisplayUrl = (url: string): string => {
  const normalized = normalizeLinkedInUrl(url);
  
  // For display purposes, we might want to show just the relevant part
  const username = getLinkedInUsernameFromUrl(normalized);
  return username ? `linkedin.com/in/${username}` : normalized;
};

/**
 * Generates HTML for LinkedIn URL in resume
 */
export const generateLinkedInHTML = (url: string, displayFormat: 'full' | 'short' = 'full'): string => {
  const normalized = normalizeLinkedInUrl(url);
  const display = displayFormat === 'full' ? normalized : getLinkedInDisplayUrl(normalized);
  
  return `<a href="${normalized}" target="_blank" rel="noopener noreferrer">${display}</a>`;
};

/**
 * Adds LinkedIn URL to resume content in various formats
 */
export const addLinkedInToResumeContent = (content: string, linkedinUrl: string): string => {
  if (!linkedinUrl || !isValidLinkedInUrl(linkedinUrl)) {
    console.warn('Invalid LinkedIn URL provided:', linkedinUrl);
    return content;
  }

  const normalizedUrl = normalizeLinkedInUrl(linkedinUrl);
  
  // If LinkedIn URL is already in the content, don't add it again
  if (content.includes(normalizedUrl) || content.includes(linkedinUrl)) {
    return content;
  }

  // Strategy 1: Add to contact section
  const contactSectionRegex = /<div[^>]*class[^>]*contact[^>]*>[\s\S]*?<\/div>/i;
  if (contactSectionRegex.test(content)) {
    return content.replace(contactSectionRegex, (match) => {
      const linkedinHTML = generateLinkedInHTML(normalizedUrl, 'short');
      return match.replace('</div>', `<p>${linkedinHTML}</p></div>`);
    });
  }

  // Strategy 2: Add to header section
  const headerRegex = /<header[\s\S]*?<\/header>/i;
  if (headerRegex.test(content)) {
    return content.replace(headerRegex, (match) => {
      const linkedinHTML = generateLinkedInHTML(normalizedUrl, 'short');
      return match.replace('</header>', `<p>${linkedinHTML}</p></header>`);
    });
  }

  // Strategy 3: Add after email
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
  if (emailRegex.test(content)) {
    return content.replace(emailRegex, (match) => {
      const linkedinHTML = generateLinkedInHTML(normalizedUrl, 'short');
      return `${match} • ${linkedinHTML}`;
    });
  }

  // Strategy 4: Add after the first heading (name)
  const nameRegex = /(<h1[^>]*>.*?<\/h1>)/i;
  if (nameRegex.test(content)) {
    return content.replace(nameRegex, (match) => {
      const linkedinHTML = generateLinkedInHTML(normalizedUrl, 'short');
      return `${match}\n<p style="margin-top: 5px; font-size: 14px;">${linkedinHTML}</p>`;
    });
  }

  // Strategy 5: Add at the beginning if nothing else works
  const linkedinHTML = generateLinkedInHTML(normalizedUrl, 'short');
  return `<p style="margin-bottom: 10px; font-size: 14px;">${linkedinHTML}</p>\n${content}`;
};

/**
 * Ensures LinkedIn URLs are properly formatted for PDF export
 */
export const formatLinkedInForPDF = (html: string): string => {
  const linkedinRegex = /<a[^>]*href=["']([^"']*linkedin\.com[^"']*)["'][^>]*>([^<]*)<\/a>/gi;
  
  return html.replace(linkedinRegex, (match, url, text) => {
    const normalizedUrl = normalizeLinkedInUrl(url);
    const displayText = text || getLinkedInDisplayUrl(normalizedUrl);
    
    // For PDF, ensure the link is properly formatted
    return `<a href="${normalizedUrl}" target="_blank" rel="noopener noreferrer">${displayText}</a>`;
  });
};

/**
 * Extracts all LinkedIn URLs from HTML content
 */
export const extractLinkedInUrls = (html: string): string[] => {
  const linkedinRegex = /<a[^>]*href=["']([^"']*linkedin\.com[^"']*)["'][^>]*>/gi;
  const urls: string[] = [];
  
  let match;
  while ((match = linkedinRegex.exec(html)) !== null) {
    const url = normalizeLinkedInUrl(match[1]);
    if (isValidLinkedInUrl(url) && !urls.includes(url)) {
      urls.push(url);
    }
  }
  
  return urls;
};
