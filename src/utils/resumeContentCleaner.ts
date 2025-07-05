
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

// Validate resume content structure
export const validateResumeContent = (content: string): boolean => {
  // Check for essential resume sections
  const hasName = /<h1[^>]*>/i.test(content);
  const hasContent = content.length > 100;
  const noWrapperTags = !/<\/?html|<\/?body|<!DOCTYPE/i.test(content);
  
  return hasName && hasContent && noWrapperTags;
};
