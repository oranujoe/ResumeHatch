import { PDFSection } from './types';

export interface ParsedElement {
  type: 'header' | 'subheader' | 'text' | 'list' | 'contact' | 'link';
  content: string;
  level?: number;
  url?: string;
  htmlContent?: string;
  cssClasses?: string[];
  visualCues?: {
    hasBackground: boolean;
    hasBorder: boolean;
    isHighlighted: boolean;
    colorScheme?: string;
  };
}

export class EnhancedHTMLParser {
  private templateId: string;
  
  constructor(templateId: string = 'modern') {
    this.templateId = templateId;
  }
  
  public parseHTMLToSections(htmlString: string): PDFSection[] {
    // Clean and prepare HTML
    const cleanedHTML = this.cleanHTML(htmlString);
    
    // Create temporary DOM element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cleanedHTML;
    
    const sections: PDFSection[] = [];
    const elements = this.getAllTextElements(tempDiv);
    
    elements.forEach((element, index) => {
      const parsedElement = this.parseElement(element);
      if (parsedElement) {
        sections.push(this.convertToSection(parsedElement));
      }
    });
    
    return sections.filter(section => section.content.trim().length > 0);
  }
  
  private cleanHTML(html: string): string {
    return html
      .replace(/\s+/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/<br\s*\/?>/gi, '\n')
      .trim();
  }
  
  private getAllTextElements(container: Element): Element[] {
    const elements: Element[] = [];
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          const element = node as Element;
          const tagName = element.tagName.toLowerCase();
          
          // Include headers, paragraphs, lists, and links
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'div', 'span', 'a'].includes(tagName)) {
            // Check if element has meaningful text content
            const textContent = element.textContent?.trim();
            if (textContent && textContent.length > 0) {
              return NodeFilter.FILTER_ACCEPT;
            }
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );
    
    let node;
    while (node = walker.nextNode()) {
      elements.push(node as Element);
    }
    
    return elements;
  }
  
  private parseElement(element: Element): ParsedElement | null {
    const tagName = element.tagName.toLowerCase();
    const textContent = element.textContent?.trim() || '';
    const classList = Array.from(element.classList);
    const visualCues = this.extractVisualCues(element, classList);
    
    if (!textContent) return null;
    
    // Parse headers
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      const level = parseInt(tagName.charAt(1));
      return {
        type: level <= 2 ? 'header' : 'subheader',
        content: textContent,
        level: level,
        cssClasses: classList,
        visualCues
      };
    }
    
    // Parse lists
    if (tagName === 'li') {
      return {
        type: 'list',
        content: textContent,
        cssClasses: classList,
        visualCues
      };
    }
    
    // Parse links - check if element contains links or is a link itself
    if (tagName === 'a' || element.querySelector('a')) {
      const links = element.tagName.toLowerCase() === 'a' ? [element] : Array.from(element.querySelectorAll('a'));
      if (links.length > 0) {
        return {
          type: 'contact',
          content: textContent,
          htmlContent: element.innerHTML,
          cssClasses: classList,
          visualCues
        };
      }
    }
    
    // Check if this looks like contact information
    if (this.isContactInfo(textContent, element)) {
      return {
        type: 'contact',
        content: textContent,
        htmlContent: element.innerHTML,
        cssClasses: classList,
        visualCues
      };
    }
    
    // Default to text
    return {
      type: 'text',
      content: textContent,
      cssClasses: classList,
      visualCues
    };
  }
  
  private extractVisualCues(element: Element, classList: string[]): ParsedElement['visualCues'] {
    const computedStyle = window.getComputedStyle(element);
    const parent = element.parentElement;
    const parentStyle = parent ? window.getComputedStyle(parent) : null;
    
    // Check for background colors/images
    const hasBackground = 
      computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
      computedStyle.backgroundColor !== 'transparent' ||
      computedStyle.backgroundImage !== 'none' ||
      (parentStyle && parentStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && 
       parentStyle.backgroundColor !== 'transparent');
    
    // Check for borders
    const hasBorder = 
      parseFloat(computedStyle.borderTopWidth || '0') > 0 ||
      parseFloat(computedStyle.borderBottomWidth || '0') > 0 ||
      parseFloat(computedStyle.borderLeftWidth || '0') > 0 ||
      parseFloat(computedStyle.borderRightWidth || '0') > 0;
    
    // Check for highlighting based on class names and styles
    const isHighlighted = 
      classList.some(cls => cls.includes('highlight') || cls.includes('accent') || cls.includes('featured')) ||
      hasBackground ||
      hasBorder;
    
    // Determine color scheme based on template and classes
    let colorScheme = 'default';
    if (classList.some(cls => cls.includes('primary'))) colorScheme = 'primary';
    else if (classList.some(cls => cls.includes('secondary'))) colorScheme = 'secondary';
    else if (classList.some(cls => cls.includes('success'))) colorScheme = 'success';
    else if (classList.some(cls => cls.includes('warning'))) colorScheme = 'warning';
    
    return {
      hasBackground,
      hasBorder,
      isHighlighted,
      colorScheme
    };
  }
  
  private isContactInfo(text: string, element: Element): boolean {
    // Check for email patterns
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    
    // Check for phone patterns
    const phonePattern = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    
    // Check for URL patterns
    const urlPattern = /(https?:\/\/|www\.)[^\s]+/;
    
    // Check for location patterns
    const locationKeywords = ['Street', 'St.', 'Avenue', 'Ave.', 'Road', 'Rd.', 'City', 'State', 'Country'];
    
    // Check if element contains links
    const hasLinks = element.querySelector('a') !== null;
    
    return emailPattern.test(text) || 
           phonePattern.test(text) || 
           urlPattern.test(text) || 
           locationKeywords.some(keyword => text.includes(keyword)) ||
           hasLinks;
  }
  
  private convertToSection(parsedElement: ParsedElement): PDFSection {
    const section: PDFSection = {
      type: parsedElement.type,
      content: parsedElement.content,
      level: parsedElement.level,
      url: parsedElement.url,
      htmlContent: parsedElement.htmlContent
    };
    
    return section;
  }
}

// Enhanced parsing function that replaces the existing one
export const parseHTMLToPDFSections = (htmlString: string, templateId: string = 'modern'): PDFSection[] => {
  console.log('Enhanced HTML parsing started for template:', templateId);
  
  const parser = new EnhancedHTMLParser(templateId);
  const sections = parser.parseHTMLToSections(htmlString);
  
  console.log('Enhanced parsing complete. Sections found:', sections.length);
  console.log('Section types:', sections.map(s => s.type));
  
  return sections;
};