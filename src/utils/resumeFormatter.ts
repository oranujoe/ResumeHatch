
import { resumeTemplates, ResumeTemplate } from '@/components/job-parser/ResumeTemplates';

export const formatResumeWithTemplate = (htmlContent: string, templateId: string): string => {
  const template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];
  
  // Create a temporary DOM element to parse and modify the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Apply template styles to the resume content
  const formattedContent = applyTemplateStyles(tempDiv, template);
  
  return formattedContent.innerHTML;
};

const applyTemplateStyles = (element: HTMLElement, template: ResumeTemplate): HTMLElement => {
  // Create wrapper with template container styles
  const wrapper = document.createElement('div');
  wrapper.className = template.styles.container;
  
  // Process and style each element
  const processedContent = processResumeElements(element, template);
  wrapper.appendChild(processedContent);
  
  return wrapper;
};

const processResumeElements = (element: HTMLElement, template: ResumeTemplate): HTMLElement => {
  const processed = element.cloneNode(true) as HTMLElement;
  
  // Style name/header (h1)
  const h1Elements = processed.querySelectorAll('h1');
  h1Elements.forEach(h1 => {
    h1.className = `text-2xl md:text-3xl font-bold mb-2 ${template.id === 'creative' ? 'text-white' : 'text-gray-900'}`;
    
    // Create header section
    const headerDiv = document.createElement('div');
    headerDiv.className = template.styles.header;
    
    // Move h1 and contact info into header
    const nextElements: Node[] = [];
    let nextSibling = h1.nextSibling;
    while (nextSibling && nextSibling.nodeName !== 'H2') {
      nextElements.push(nextSibling);
      nextSibling = nextSibling.nextSibling;
    }
    
    h1.parentNode?.insertBefore(headerDiv, h1);
    headerDiv.appendChild(h1);
    
    // Add contact info to header
    nextElements.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())) {
        headerDiv.appendChild(node);
      }
    });
  });
  
  // Style section headers (h2)
  const h2Elements = processed.querySelectorAll('h2');
  h2Elements.forEach(h2 => {
    h2.className = template.styles.title;
    
    // Create section wrapper
    const sectionDiv = document.createElement('div');
    sectionDiv.className = template.styles.section;
    
    h2.parentNode?.insertBefore(sectionDiv, h2);
    sectionDiv.appendChild(h2);
    
    // Move following content into section
    let nextSibling = sectionDiv.nextSibling;
    while (nextSibling && nextSibling.nodeName !== 'H2') {
      const current = nextSibling;
      nextSibling = nextSibling.nextSibling;
      if (current.nodeType === Node.ELEMENT_NODE || (current.nodeType === Node.TEXT_NODE && current.textContent?.trim())) {
        sectionDiv.appendChild(current);
      }
    }
  });
  
  // Style paragraphs
  const paragraphs = processed.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.className = template.styles.content;
  });
  
  // Style job titles (h3)
  const h3Elements = processed.querySelectorAll('h3');
  h3Elements.forEach(h3 => {
    h3.className = 'font-semibold text-gray-900 mb-2';
  });
  
  // Style lists
  const lists = processed.querySelectorAll('ul, ol');
  lists.forEach(list => {
    list.className = template.styles.list;
    
    // Style list items
    const listItems = list.querySelectorAll('li');
    listItems.forEach(li => {
      li.className = 'text-gray-700 mb-1';
    });
  });
  
  return processed;
};

export const getTemplateCSS = (templateId: string): string => {
  return `
    .resume-container {
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      font-size: 14px;
      background: white;
      padding: 2rem;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      max-width: 210mm;
      margin: 0 auto;
    }
    
    .resume-container h1 {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }
    
    .resume-container h2 {
      font-size: 1.125rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .resume-container h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .resume-container p {
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }
    
    .resume-container ul, .resume-container ol {
      margin-bottom: 1rem;
      padding-left: 1rem;
    }
    
    .resume-container li {
      margin-bottom: 0.25rem;
      line-height: 1.4;
    }
    
    .resume-container ul li::marker {
      color: #3b82f6;
    }
    
    @media print {
      .resume-container {
        box-shadow: none;
        padding: 0;
        max-width: none;
      }
    }
    
    @media (max-width: 768px) {
      .resume-container {
        padding: 1rem;
        font-size: 13px;
      }
      
      .resume-container h1 {
        font-size: 1.5rem;
      }
      
      .resume-container h2 {
        font-size: 1rem;
      }
    }
  `;
};
