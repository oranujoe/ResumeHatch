
import { getTemplateById, getDefaultTemplate } from '@/data/templateRegistry';

export const getTemplateClassName = (templateId: string): string => {
  const template = getTemplateById(templateId) || getDefaultTemplate();
  return `resume-template-${template.id}`;
};

export const getTemplateCSS = (templateId: string): string => {
  const template = getTemplateById(templateId) || getDefaultTemplate();
  
  // Extract header styles from the template
  const headerStyles = template.styles.header;
  const containerStyles = template.styles.container;
  const sectionStyles = template.styles.section;
  const titleStyles = template.styles.title;
  const contentStyles = template.styles.content;
  const listStyles = template.styles.list;
  
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
    
    /* Apply template-specific container styles */
    .resume-template-${templateId} {
      ${containerStyles ? `class-override: ${containerStyles};` : ''}
    }
    
    /* Template-specific header styling */
    .resume-template-${templateId} .resume-header,
    .resume-template-${templateId} header {
      ${headerStyles.includes('bg-gradient') ? `
        background: linear-gradient(to right, rgb(20 184 166), rgb(6 182 212));
        color: white;
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 0.75rem;
      ` : headerStyles.includes('border-') ? `
        border-left: 4px solid;
        ${headerStyles.includes('border-amber') ? 'border-color: rgb(245 158 11);' : ''}
        ${headerStyles.includes('border-red') ? 'border-color: rgb(239 68 68); background: rgb(254 242 242);' : ''}
        ${headerStyles.includes('border-indigo') ? 'border-color: rgb(99 102 241);' : ''}
        padding: 1rem;
        margin-bottom: 1.5rem;
      ` : headerStyles.includes('bg-') && !headerStyles.includes('bg-white') && !headerStyles.includes('bg-gradient') ? `
        ${headerStyles.includes('bg-green') ? 'background: rgb(240 253 244); border: 1px solid rgb(34 197 94);' : ''}
        ${headerStyles.includes('bg-orange') ? 'background: rgb(255 237 213); border: 2px solid rgb(251 146 60);' : ''}
        padding: 1rem;
        margin-bottom: 1.5rem;
        border-radius: 0.5rem;
      ` : `
        padding-bottom: 1rem;
        margin-bottom: 1.5rem;
        ${headerStyles.includes('border-b') ? 'border-bottom: 2px solid;' : ''}
        ${headerStyles.includes('border-blue') ? 'border-color: rgb(37 99 235);' : ''}
        ${headerStyles.includes('border-gray') ? 'border-color: rgb(31 41 55);' : ''}
      `}
    }
    
    .resume-template-${templateId} h1 {
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      line-height: 1.2;
      ${templateId === 'creative' ? 'color: #8b5cf6;' : ''}
      ${templateId === 'modern' ? 'color: #2563eb;' : ''}
      ${templateId === 'classic' ? 'color: #1f2937;' : ''}
      ${templateId === 'nomad' ? 'color: white;' : ''}
      ${templateId === 'veteran' ? 'color: #b45309;' : ''}
      ${templateId === 'graduate' ? 'color: #059669;' : ''}
      ${templateId === 'consultant' ? 'color: #4338ca;' : ''}
      ${templateId === 'healthcare' ? 'color: #dc2626;' : ''}
      ${templateId === 'sales' ? 'color: #ea580c;' : ''}
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
      ${templateId === 'nomad' ? 'color: #0d9488; display: flex; align-items: center; gap: 0.5rem;' : ''}
      ${templateId === 'veteran' ? 'color: #b45309; display: flex; align-items: center; gap: 0.5rem;' : ''}
      ${templateId === 'graduate' ? 'color: #059669; border-bottom: 1px solid #6ee7b7; padding-bottom: 0.5rem;' : ''}
      ${templateId === 'consultant' ? 'color: #4338ca; background: #eef2ff; padding: 0.25rem 0.75rem; border-radius: 0.25rem;' : ''}
      ${templateId === 'healthcare' ? 'color: #dc2626; border-bottom: 2px solid #fca5a5; padding-bottom: 0.5rem;' : ''}
      ${templateId === 'sales' ? 'color: #ea580c; background: #fff7ed; padding: 0.25rem 0.5rem; border-left: 4px solid #f97316;' : ''}
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
      ${templateId === 'nomad' ? 'color: #0d9488;' : ''}
      ${templateId === 'veteran' ? 'color: #b45309;' : ''}
      ${templateId === 'graduate' ? 'color: #059669;' : ''}
      ${templateId === 'consultant' ? 'color: #4338ca;' : ''}
      ${templateId === 'healthcare' ? 'color: #dc2626;' : ''}
      ${templateId === 'sales' ? 'color: #ea580c;' : ''}
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
