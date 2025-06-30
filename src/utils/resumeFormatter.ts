
import { resumeTemplates, ResumeTemplate } from '@/components/job-parser/ResumeTemplates';

export const getTemplateClassName = (templateId: string): string => {
  const template = resumeTemplates.find(t => t.id === templateId) || resumeTemplates[0];
  return `resume-template-${template.id}`;
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
    
    .resume-template-${templateId} h1 {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
      ${templateId === 'creative' ? 'color: #8b5cf6;' : ''}
      ${templateId === 'modern' ? 'color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 0.5rem;' : ''}
      ${templateId === 'classic' ? 'color: #1f2937; border-bottom: 2px solid #1f2937; padding-bottom: 0.5rem;' : ''}
    }
    
    .resume-template-${templateId} h2 {
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
    
    .resume-template-${templateId} h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #374151;
    }
    
    .resume-template-${templateId} p {
      margin-bottom: 0.75rem;
      line-height: 1.5;
      color: #374151;
    }
    
    .resume-template-${templateId} ul,
    .resume-template-${templateId} ol {
      margin-bottom: 1rem;
      padding-left: 1rem;
    }
    
    .resume-template-${templateId} li {
      margin-bottom: 0.25rem;
      line-height: 1.4;
      color: #374151;
    }
    
    .resume-template-${templateId} ul li::marker {
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
    
    .resume-container:hover h1,
    .resume-container:hover h2,
    .resume-container:hover h3,
    .resume-container:hover p,
    .resume-container:hover li {
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
      
      .resume-template-${templateId} h1 {
        font-size: 1.5rem;
      }
      
      .resume-template-${templateId} h2 {
        font-size: 1rem;
      }
    }
  `;
};

// Simple content preparation without DOM manipulation
export const prepareResumeContent = (htmlContent: string, templateId: string): string => {
  // Just clean the content without restructuring
  const cleaned = htmlContent.trim();
  return cleaned;
};
