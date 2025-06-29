
import { resumeTemplates, ResumeTemplate } from '@/components/job-parser/ResumeTemplates';

export const formatResumeWithTemplate = (htmlContent: string, templateId: string): string => {
  const template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];
  
  // Apply template wrapper class to the content without restructuring
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  // Add template-specific classes to existing elements without moving them
  const formattedContent = applyTemplateClasses(tempDiv, template);
  
  return formattedContent.innerHTML;
};

const applyTemplateClasses = (element: HTMLElement, template: ResumeTemplate): HTMLElement => {
  const processed = element.cloneNode(true) as HTMLElement;
  
  // Add template classes to existing elements without restructuring
  const h1Elements = processed.querySelectorAll('h1');
  h1Elements.forEach(h1 => {
    h1.className = `resume-name ${template.id}`;
  });
  
  const h2Elements = processed.querySelectorAll('h2');
  h2Elements.forEach(h2 => {
    h2.className = `resume-section-title ${template.id}`;
  });
  
  const h3Elements = processed.querySelectorAll('h3');
  h3Elements.forEach(h3 => {
    h3.className = `resume-job-title ${template.id}`;
  });
  
  const paragraphs = processed.querySelectorAll('p');
  paragraphs.forEach(p => {
    p.className = `resume-content ${template.id}`;
  });
  
  const lists = processed.querySelectorAll('ul, ol');
  lists.forEach(list => {
    list.className = `resume-list ${template.id}`;
  });
  
  const listItems = processed.querySelectorAll('li');
  listItems.forEach(li => {
    li.className = `resume-list-item ${template.id}`;
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
      max-width: 210mm;
      margin: 0 auto;
      min-height: 600px;
    }
    
    /* Template-specific styling */
    .resume-name.${templateId} {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
      ${templateId === 'creative' ? 'color: #8b5cf6;' : ''}
      ${templateId === 'modern' ? 'color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem;' : ''}
      ${templateId === 'classic' ? 'color: #1f2937; border-bottom: 2px solid #1f2937; padding-bottom: 0.5rem;' : ''}
    }
    
    .resume-section-title.${templateId} {
      font-size: 1.125rem;
      font-weight: 600;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      ${templateId === 'modern' ? 'color: #2563eb; border-bottom: 1px solid #93c5fd; padding-bottom: 0.25rem;' : ''}
      ${templateId === 'creative' ? 'color: #8b5cf6; border-bottom: 2px solid #c4b5fd; padding-bottom: 0.25rem;' : ''}
      ${templateId === 'classic' ? 'color: #1f2937; font-weight: 700;' : ''}
      ${templateId === 'minimal' ? 'color: #111827; font-weight: 600;' : ''}
    }
    
    .resume-job-title.${templateId} {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #374151;
    }
    
    .resume-content.${templateId} {
      margin-bottom: 0.75rem;
      line-height: 1.5;
      color: #374151;
    }
    
    .resume-list.${templateId} {
      margin-bottom: 1rem;
      padding-left: 1rem;
    }
    
    .resume-list-item.${templateId} {
      margin-bottom: 0.25rem;
      line-height: 1.4;
      color: #374151;
    }
    
    .resume-list.${templateId} li::marker {
      ${templateId === 'modern' ? 'color: #3b82f6;' : ''}
      ${templateId === 'creative' ? 'color: #8b5cf6;' : ''}
      ${templateId === 'classic' ? 'color: #1f2937;' : ''}
      ${templateId === 'minimal' ? 'color: #6b7280;' : ''}
    }
    
    /* Editing-specific styles for better UX */
    .resume-container:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    .resume-container * {
      cursor: text;
    }
    
    .resume-container h1:hover,
    .resume-container h2:hover,
    .resume-container h3:hover,
    .resume-container p:hover,
    .resume-container li:hover {
      background-color: rgba(59, 130, 246, 0.05);
      border-radius: 2px;
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
      
      .resume-name.${templateId} {
        font-size: 1.5rem;
      }
      
      .resume-section-title.${templateId} {
        font-size: 1rem;
      }
    }
  `;
};
