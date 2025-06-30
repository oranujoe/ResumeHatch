
export function sanitizeResumeContent(htmlContent: string): string {
  let cleanContent = htmlContent.trim();
  
  cleanContent = cleanContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<\/?html[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  cleanContent = cleanContent.replace(/<\/?body[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<meta[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<\/?title[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  cleanContent = cleanContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  cleanContent = cleanContent.replace(/\n\s*\n/g, '\n');
  cleanContent = cleanContent.replace(/^\s+|\s+$/g, '');
  cleanContent = cleanContent.replace(/^```html\s*/i, '');
  cleanContent = cleanContent.replace(/\s*```$/i, '');
  
  return cleanContent;
}
