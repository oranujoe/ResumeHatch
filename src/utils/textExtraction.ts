
/**
 * Utility functions for extracting and processing text content
 */

export const extractTextFromHTML = (html: string): string => {
  if (!html || typeof html !== 'string') {
    console.log('extractTextFromHTML: Invalid input', { html: typeof html, length: html?.length });
    return '';
  }

  try {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get text content and clean it up
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clean up whitespace and normalize
    const cleanText = textContent
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
    
    console.log('extractTextFromHTML: Extracted text', { 
      originalLength: html.length, 
      extractedLength: cleanText.length,
      preview: cleanText.substring(0, 100) + '...'
    });
    
    return cleanText;
  } catch (error) {
    console.error('extractTextFromHTML: Error processing HTML', error);
    return html; // Fallback to original content
  }
};

export const normalizeContent = (content: string): string => {
  if (!content) return '';
  
  return content
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
};

export const getWordCount = (text: string): number => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};
