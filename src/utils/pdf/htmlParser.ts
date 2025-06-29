
import { PDFSection } from './types';

export const parseHTMLToPDFSections = (html: string): PDFSection[] => {
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  const sections: PDFSection[] = [];
  
  // Function to process each element
  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.trim() || '';
    
    if (!textContent) return;
    
    switch (tagName) {
      case 'h1':
        sections.push({ type: 'header', content: textContent, level: 1 });
        break;
      case 'h2':
        sections.push({ type: 'header', content: textContent, level: 2 });
        break;
      case 'h3':
        sections.push({ type: 'subheader', content: textContent, level: 3 });
        break;
      case 'h4':
      case 'h5':
      case 'h6':
        sections.push({ type: 'subheader', content: textContent, level: 4 });
        break;
      case 'p':
        if (textContent.length > 0) {
          // Check if it's contact information
          if (textContent.includes('@') || textContent.includes('|') || /\(\d{3}\)/.test(textContent)) {
            sections.push({ type: 'contact', content: textContent });
          } else {
            sections.push({ type: 'text', content: textContent });
          }
        }
        break;
      case 'ul':
      case 'ol':
        const listItems = element.querySelectorAll('li');
        listItems.forEach(li => {
          const itemText = li.textContent?.trim();
          if (itemText) {
            sections.push({ type: 'list', content: itemText });
          }
        });
        break;
      case 'li':
        // Handle standalone list items
        if (!element.closest('ul, ol')) {
          sections.push({ type: 'list', content: textContent });
        }
        break;
      case 'div':
      case 'section':
        // Process children of div/section elements
        Array.from(element.children).forEach(processElement);
        break;
      default:
        // For other elements, treat as regular text if they contain meaningful content
        if (textContent.length > 10) {
          sections.push({ type: 'text', content: textContent });
        }
    }
  };
  
  // Process all direct children
  Array.from(tempDiv.children).forEach(processElement);
  
  // If no sections found, try to extract all text as paragraphs
  if (sections.length === 0) {
    const allText = tempDiv.textContent?.trim() || '';
    if (allText) {
      // Split by double line breaks to create paragraphs
      const paragraphs = allText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      paragraphs.forEach(paragraph => {
        sections.push({ type: 'text', content: paragraph.trim() });
      });
    }
  }
  
  return sections;
};
