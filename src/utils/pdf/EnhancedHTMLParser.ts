
import { PDFSection } from './types';

export const parseHTMLToPDFSections = (htmlContent: string): PDFSection[] => {
  console.log('Starting HTML parsing for PDF generation');
  console.log('HTML content length:', htmlContent.length);
  
  try {
    // Validate input
    if (!htmlContent || htmlContent.trim() === '') {
      throw new Error('Empty HTML content provided for PDF parsing');
    }
    
    // Create a temporary container to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
  
  const sections: PDFSection[] = [];
  let currentContactItems: string[] = [];
  
  // Helper function to flush contact items
  const flushContactItems = () => {
    if (currentContactItems.length > 0) {
      // Combine all contact items into a single section
      const contactContent = currentContactItems.join(' | ');
      sections.push({
        type: 'contact',
        content: contactContent,
        level: 1
      });
      currentContactItems = [];
    }
  };
  
  // Helper function to extract text content and detect links
  const extractTextAndLinks = (element: Element): { text: string; hasLinks: boolean; url?: string } => {
    const links = element.querySelectorAll('a');
    if (links.length > 0) {
      const link = links[0];
      return {
        text: element.textContent?.trim() || '',
        hasLinks: true,
        url: link.getAttribute('href') || undefined
      };
    }
    return {
      text: element.textContent?.trim() || '',
      hasLinks: false
    };
  };
  
  // Helper function to determine if text is contact information
  const isContactInfo = (text: string): boolean => {
    const contactPatterns = [
      /@/,  // Email
      /^\+?\d[\d\s\-\(\)]+$/,  // Phone
      /linkedin\.com/i,  // LinkedIn
      /github\.com/i,  // GitHub
      /portfolio/i,  // Portfolio
      /^https?:\/\//,  // URLs
    ];
    
    return contactPatterns.some(pattern => pattern.test(text));
  };
  
  // Process all elements
  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.trim() || '';
    
    // Skip empty elements
    if (!textContent) return;
    
    // Handle headers
    if (tagName.match(/^h[1-6]$/)) {
      // Flush any pending contact items before processing header
      flushContactItems();
      
      const level = parseInt(tagName.charAt(1));
      const { text, hasLinks, url } = extractTextAndLinks(element);
      
      sections.push({
        type: 'header',
        content: text,
        level: level,
        url: hasLinks ? url : undefined
      });
      return;
    }
    
    // Handle paragraphs and divs
    if (tagName === 'p' || tagName === 'div') {
      const { text, hasLinks, url } = extractTextAndLinks(element);
      
      // Check if this is contact information
      if (isContactInfo(text)) {
        currentContactItems.push(text);
        return;
      }
      
      // If not contact info, flush any pending contact items first
      flushContactItems();
      
      if (hasLinks) {
        sections.push({
          type: 'link',
          content: text,
          level: 1,
          url: url
        });
      } else {
        sections.push({
          type: 'text',
          content: text,
          level: 1
        });
      }
      return;
    }
    
    // Handle lists
    if (tagName === 'ul' || tagName === 'ol') {
      flushContactItems();
      
      const listItems = element.querySelectorAll('li');
      listItems.forEach(li => {
        const { text, hasLinks, url } = extractTextAndLinks(li);
        if (text) {
          sections.push({
            type: 'list',
            content: text,
            level: 1,
            url: hasLinks ? url : undefined
          });
        }
      });
      return;
    }
    
    // Handle direct list items
    if (tagName === 'li') {
      const { text, hasLinks, url } = extractTextAndLinks(element);
      if (text) {
        sections.push({
          type: 'list',
          content: text,
          level: 1,
          url: hasLinks ? url : undefined
        });
      }
      return;
    }
    
    // Handle links
    if (tagName === 'a') {
      const text = textContent;
      const url = element.getAttribute('href') || '';
      
      if (text && url) {
        if (isContactInfo(text) || isContactInfo(url)) {
          currentContactItems.push(text);
        } else {
          flushContactItems();
          sections.push({
            type: 'link',
            content: text,
            level: 1,
            url: url
          });
        }
      }
      return;
    }
  };
  
  // Walk through all elements
  const walker = document.createTreeWalker(
    tempDiv,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function(node) {
        const element = node as Element;
        // Skip nested elements that are already processed by their parents
        if (element.closest('ul, ol') && element.tagName.toLowerCase() !== 'ul' && element.tagName.toLowerCase() !== 'ol') {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  let currentNode = walker.firstChild();
  while (currentNode) {
    processElement(currentNode as Element);
    currentNode = walker.nextSibling();
  }
  
  // Flush any remaining contact items
  flushContactItems();
  
  // Filter out empty sections and deduplicate
  const filteredSections = sections.filter(section => 
    section.content && 
    section.content.trim().length > 0
  );
  
  // Remove duplicates based on content
  const uniqueSections = filteredSections.filter((section, index, array) => 
    array.findIndex(s => s.content === section.content && s.type === section.type) === index
  );
  
  console.log('Parsed sections:', uniqueSections.length);
  uniqueSections.forEach((section, index) => {
    console.log(`Section ${index + 1}:`, section.type, section.content.substring(0, 50) + '...');
  });
  
  // Validate that we have at least one section
  if (uniqueSections.length === 0) {
    throw new Error('No content sections could be parsed from HTML for PDF generation');
  }
  
  return uniqueSections;
  
  } catch (error) {
    console.error('HTML parsing error:', error);
    throw new Error(`HTML parsing failed: ${error instanceof Error ? error.message : 'Unknown parsing error'}`);
  }
};
