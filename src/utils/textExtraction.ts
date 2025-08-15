
/**
 * Utility functions for extracting and normalizing text content from HTML
 */

/**
 * Extracts plain text from HTML content while preserving structure
 */
export const extractPlainTextFromHTML = (htmlContent: string): string => {
  if (!htmlContent || typeof htmlContent !== 'string') {
    return '';
  }

  // Create a temporary element to parse HTML safely
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Get text content and normalize whitespace
  let plainText = tempDiv.textContent || tempDiv.innerText || '';
  
  // Clean up excessive whitespace while preserving line breaks
  plainText = plainText
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Clean up multiple line breaks
    .trim();
  
  return plainText;
};

/**
 * Normalizes text content for keyword analysis
 */
export const normalizeTextForAnalysis = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

/**
 * Extracts keywords from text with better filtering
 */
export const extractKeywordsFromText = (text: string): string[] => {
  const commonWords = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might',
    'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
    'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their'
  ]);
  
  const normalizedText = normalizeTextForAnalysis(text);
  
  return normalizedText
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates
    .slice(0, 30); // Focus on top 30 keywords
};

/**
 * Calculates keyword match percentage between two texts
 */
export const calculateKeywordMatch = (resumeText: string, jobText: string): { matches: number; total: number; score: number } => {
  const jobKeywords = extractKeywordsFromText(jobText);
  const resumeNormalized = normalizeTextForAnalysis(resumeText);
  
  const matches = jobKeywords.filter(keyword => 
    resumeNormalized.includes(keyword)
  );
  
  return {
    matches: matches.length,
    total: jobKeywords.length,
    score: jobKeywords.length > 0 ? (matches.length / jobKeywords.length) * 100 : 0
  };
};
