
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
      /\+\d{1,4}\s*\d{3,4}\s*\d{3,4}\s*\d{3,4}/, // More flexible international phone
      /linkedin\.com/, // LinkedIn
      /github\.com/, // GitHub
      /^Phone:/i, // Phone label
      /^Email:/i, // Email label
      /^LinkedIn:/i, // LinkedIn label
      /^Portfolio:/i, // Portfolio label
      /^Professional Title:/i, // Professional title
      /^Location:/i, // Location
      /^Website:/i, // Website
      /^Github:/i, // Github
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
  
  // Function to extract links from element
  const extractLinks = (element: Element): PDFSection[] => {
    const linkSections: PDFSection[] = [];
    const links = element.querySelectorAll('a[href]');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      const text = link.textContent?.trim();
      
      if (href && text) {
        // Normalize URLs
        let normalizedUrl = href;
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
          if (href.includes('linkedin.com') || href.includes('github.com') || href.includes('.com')) {
            normalizedUrl = 'https://' + href;
          }
        }
        
        linkSections.push({
          type: 'link',
          content: text,
          url: normalizedUrl
        });
      }
    });
    
    return linkSections;
  };
  
  // Function to process each element
  const processElement = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.trim() || '';
    
    if (!textContent || textContent.length < 3) return;
    
    // First extract any links from this element
    const linkSections = extractLinks(element);
    sections.push(...linkSections);
    
    switch (tagName) {
      case 'header':
        // Process header elements by looking for nested h1 tags first
        const h1InHeader = element.querySelector('h1');
        if (h1InHeader && h1InHeader.textContent?.trim()) {
          // Found h1 inside header - treat as main resume header
          sections.push({ type: 'header', content: h1InHeader.textContent.trim(), level: 1 });
        }
        
        // Process other children of header (like contact info)
        Array.from(element.children).forEach(child => {
          if (child.tagName.toLowerCase() !== 'h1') {
            processElement(child);
          }
        });
        break;
        
      case 'h1':
        // Only process h1 if it's not already handled by a parent header element
        if (!element.closest('header')) {
          sections.push({ type: 'header', content: textContent, level: 1 });
        }
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
        
      case 'a':
        // Skip anchor tags as they're handled by extractLinks
        break;
        
      case 'p':
        if (textContent.length > 5) {
          // Remove link text from paragraph content since links are handled separately
          let cleanText = textContent;
          const links = element.querySelectorAll('a');
          links.forEach(link => {
            const linkText = link.textContent?.trim();
            if (linkText) {
              cleanText = cleanText.replace(linkText, '').trim();
            }
          });
          
          if (cleanText.length > 3) {
            if (isContactInfo(cleanText)) {
              sections.push({ type: 'contact', content: cleanText });
            } else if (isSectionHeader(element)) {
              sections.push({ type: 'header', content: cleanText, level: 2 });
            } else {
              sections.push({ type: 'text', content: cleanText });
            }
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
    // Don't merge link sections
    if (section.type === 'link') {
      if (lastSection) {
        processedSections.push(lastSection);
      }
      processedSections.push(section);
      lastSection = null;
      return;
    }
    
    // Merge consecutive contact sections into one
    if (lastSection && 
        lastSection.type === 'contact' && 
        section.type === 'contact') {
      // Combine contact info with line breaks
      lastSection.content += '\n' + section.content;
    } else if (lastSection && 
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
  console.log('Link sections found:', processedSections.filter(s => s.type === 'link').length);
  return processedSections;
};
