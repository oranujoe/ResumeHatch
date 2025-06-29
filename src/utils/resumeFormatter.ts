
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
  
  // Style headers (h1 - name, h2 - sections)
  const h1Elements = processed.querySelectorAll('h1');
  h1Elements.forEach(h1 => {
    h1.className = `text-3xl md:text-4xl font-bold mb-2 ${template.id === 'creative' ? 'text-white' : 'text-gray-900'}`;
    
    // Wrap header content if it's the creative template
    if (template.id === 'creative') {
      const headerWrapper = document.createElement('div');
      headerWrapper.className = template.styles.header;
      h1.parentNode?.insertBefore(headerWrapper, h1);
      headerWrapper.appendChild(h1);
    } else {
      const headerDiv = document.createElement('div');
      headerDiv.className = template.styles.header;
      h1.parentNode?.insertBefore(headerDiv, h1);
      headerDiv.appendChild(h1);
    }
  });
  
  // Style section headers (h2, h3)
  const h2Elements = processed.querySelectorAll('h2');
  h2Elements.forEach(h2 => {
    h2.className = template.styles.title;
    
    const sectionWrapper = document.createElement('div');
    sectionWrapper.className = template.styles.section;
    h2.parentNode?.insertBefore(sectionWrapper, h2);
    sectionWrapper.appendChild(h2);
    
    // Move following content into section wrapper
    let nextSibling = sectionWrapper.nextSibling;
    while (nextSibling && nextSibling.nodeName !== 'H2') {
      const current = nextSibling;
      nextSibling = nextSibling.nextSibling;
      if (current.nodeType === Node.ELEMENT_NODE || current.nodeType === Node.TEXT_NODE) {
        sectionWrapper.appendChild(current);
      }
    }
  });
  
  // Style paragraphs
  const paragraphs = processed.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.className = template.styles.content;
  });
  
  // Style lists
  const lists = processed.querySelectorAll('ul, ol');
  lists.forEach(list => {
    list.className = template.styles.list;
    
    // Style list items
    const listItems = list.querySelectorAll('li');
    listItems.forEach(li => {
      li.className = 'text-gray-700 mb-2 relative pl-4';
      
      // Add bullet styling for unordered lists
      if (list.tagName === 'UL') {
        li.classList.add('before:content-["•"] before:absolute before:left-0 before:text-blue-600 before:font-bold');
      }
    });
  });
  
  // Style contact information
  const contactElements = processed.querySelectorAll('[class*="contact"], .email, .phone');
  contactElements.forEach(contact => {
    contact.className = `${contact.className} text-gray-600 mb-1`;
  });
  
  return processed;
};

export const getTemplateCSS = (templateId: string): string => {
  const template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];
  
  return `
    .resume-container {
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      font-size: 14px;
      background: white;
      padding: 2rem;
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
    }
    
    .resume-container h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }
    
    .resume-container h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-top: 2rem;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .resume-container p {
      margin-bottom: 0.75rem;
    }
    
    .resume-container ul, .resume-container ol {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    
    .resume-container li {
      margin-bottom: 0.5rem;
    }
    
    @media print {
      .resume-container {
        box-shadow: none;
        padding: 0;
      }
    }
  `;
};
