
// Utility function to clean resume content on the frontend as a safety net
export const cleanResumeContent = (htmlContent: string): string => {
  let cleanContent = htmlContent.trim();
  
  // Remove any remaining DOCTYPE, html, head, body tags that might have slipped through
  cleanContent = cleanContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<\/?html[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  cleanContent = cleanContent.replace(/<\/?body[^>]*>/gi, '');
  
  // Remove markdown code block markers if present
  cleanContent = cleanContent.replace(/^```html\s*/i, '');
  cleanContent = cleanContent.replace(/\s*```$/i, '');
  
  // Convert plain text URLs to clickable links (safety net for AI-generated content)
  cleanContent = convertPlainTextUrlsToLinks(cleanContent);
  
  // Clean up excessive whitespace
  cleanContent = cleanContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  cleanContent = cleanContent.trim();
  
  // Validate that content starts with meaningful resume content
  if (!cleanContent || cleanContent.length < 50) {
    throw new Error('Generated resume content is too short or empty');
  }
  
  // Check if content starts with proper HTML tags (not wrapper tags)
  const startsWithValidContent = /^<(h[1-6]|div|section|p|ul|ol)/i.test(cleanContent);
  if (!startsWithValidContent) {
    console.warn('Resume content may not start with expected HTML structure');
  }
  
  return cleanContent;
};

// Convert plain text URLs to clickable links
const convertPlainTextUrlsToLinks = (content: string): string => {
  // Don't process URLs that are already in <a> tags
  let processedContent = content;
  
  // LinkedIn URL pattern (not already in <a> tags)
  processedContent = processedContent.replace(
    /(?<!href=["'])(https?:\/\/(?:www\.)?linkedin\.com\/in\/[^\s<>"']+)(?![^<]*<\/a>)/gi,
    '<a href="$1">LinkedIn</a>'
  );
  
  // Portfolio/website URL pattern (not already in <a> tags)  
  processedContent = processedContent.replace(
    /(?<!href=["'])(https?:\/\/(?:www\.)?(?!linkedin\.com)[^\s<>"']+\.[a-z]{2,})(?![^<]*<\/a>)/gi,
    '<a href="$1">Portfolio</a>'
  );
  
  // Email pattern (not already in <a> tags)
  processedContent = processedContent.replace(
    /(?<!href=["'])([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(?![^<]*<\/a>)/gi,
    '<a href="mailto:$1">$1</a>'
  );
  
  return processedContent;
};

// Validate resume content structure
export const validateResumeContent = (content: string): boolean => {
  // Check for essential resume sections
  const hasName = /<h1[^>]*>/i.test(content);
  const hasContent = content.length > 100;
  const noWrapperTags = !/<\/?html|<\/?body|<!DOCTYPE/i.test(content);
  
  return hasName && hasContent && noWrapperTags;
};
