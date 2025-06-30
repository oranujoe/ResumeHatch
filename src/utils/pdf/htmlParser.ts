
import { PDFSection } from './types';

export const parseHTMLToPDFSections = (html: string): PDFSection[] => {
  // Create a temporary DOM element to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  const sections: PDFSection[] = [];
  
  // Function to determine if text looks like contact information
  const isContactInfo = (text: string): boolean => {
    const contactPatterns = [
      /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/, // Email
      /\(\d{3}\)\s*\d{3}-\d{4}/, // Phone (XXX) XXX-XXXX
      /\d{3}-\d{3}-\d{4}/, // Phone XXX-XXX-XXXX
      /\+\d{3}\s*\d{3}\s*\d{3}\s*\d{4}/, // International phone
      /linkedin\.com/, // LinkedIn
      /github\.com/, // GitHub
    ];
    return contactPatterns.some(pattern => pattern.test(text));
  };
  
  // Function to determine if element is styled as a section header
  const isSectionHeader = (element: Element): boolean => {
    const text = element.textContent?.trim().toUpperCase() || '';
    
    // Check for common section titles
    const sectionTitles = [
      'PROFESSIONAL SUMMARY', 'SUMMARY', 'PROFILE',
      'WORK EXPERIENCE', 'EXPERIENCE', 'EMPLOYMENT', 'PROFESSIONAL EXPERIENCE',
      'EDUCATION', 'SKILLS', 'TECHNICAL SKILLS', 'CORE SKILLS',
      'CERTIFICATIONS', 'PROJECTS', 'ACHIEVEMENTS'
    ];
    
    return sectionTitles.some(title => text.includes(title)) && text.length < 50;
  };
  
  // Function to process each element
  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.trim() || '';
    
    if (!textContent || textContent.length < 3) return;
    
    switch (tagName) {
      case 'h1':
        // Main resume header (name)
        sections.push({ type: 'header', content: textContent, level: 1 });
        break;
        
      case 'h2':
        // Section headers
        sections.push({ type: 'header', content: textContent, level: 2 });
        break;
        
      case 'h3':
        // Sub-section headers
        sections.push({ type: 'subheader', content: textContent, level: 3 });
        break;
        
      case 'h4':
      case 'h5':
      case 'h6':
        sections.push({ type: 'subheader', content: textContent, level: 4 });
        break;
        
      case 'p':
        if (textContent.length > 5) {
          if (isContactInfo(textContent)) {
            sections.push({ type: 'contact', content: textContent });
          } else if (isSectionHeader(element)) {
            sections.push({ type: 'header', content: textContent, level: 2 });
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
          if (itemText && itemText.length > 3) {
            sections.push({ type: 'list', content: itemText });
          }
        });
        break;
        
      case 'li':
        // Handle standalone list items
        if (!element.closest('ul, ol') && textContent.length > 3) {
          sections.push({ type: 'list', content: textContent });
        }
        break;
        
      case 'div':
      case 'section':
        // Check if this div is styled as a section header
        if (isSectionHeader(element) && textContent.length < 50) {
          sections.push({ type: 'header', content: textContent, level: 2 });
        } else {
          // Process children of div/section elements
          Array.from(element.children).forEach(child => processElement(child));
        }
        break;
        
      default:
        // For other elements, check if they might be section headers or text
        if (isSectionHeader(element) && textContent.length < 50) {
          sections.push({ type: 'header', content: textContent, level: 2 });
        } else if (textContent.length > 10) {
          sections.push({ type: 'text', content: textContent });
        }
    }
  };
  
  // Process all direct children
  Array.from(tempDiv.children).forEach(child => processElement(child));
  
  // If no sections found, try to extract all text as paragraphs
  if (sections.length === 0) {
    const allText = tempDiv.textContent?.trim() || '';
    if (allText) {
      // Split by double line breaks to create paragraphs
      const paragraphs = allText.split(/\n\s*\n/).filter(p => p.trim().length > 5);
      paragraphs.forEach(paragraph => {
        const trimmed = paragraph.trim();
        if (isContactInfo(trimmed)) {
          sections.push({ type: 'contact', content: trimmed });
        } else {
          sections.push({ type: 'text', content: trimmed });
        }
      });
    }
  }
  
  // Clean up and merge similar adjacent sections
  const processedSections: PDFSection[] = [];
  let lastSection: PDFSection | null = null;
  
  sections.forEach(section => {
    // Don't merge different types or headers
    if (lastSection && 
        lastSection.type === section.type && 
        section.type === 'text' && 
        lastSection.content.length + section.content.length < 400) {
      // Merge similar text sections if they're not too long
      lastSection.content += ' ' + section.content;
    } else {
      if (lastSection) {
        processedSections.push(lastSection);
      }
      lastSection = { ...section };
    }
  });
  
  if (lastSection) {
    processedSections.push(lastSection);
  }
  
  console.log('Parsed PDF sections:', processedSections.length, 'sections');
  return processedSections;
};
