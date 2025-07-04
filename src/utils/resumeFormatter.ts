
import { getTemplateById, getDefaultTemplate } from '@/data/templateRegistry';
import { generateUnifiedCSS } from './pdf/unifiedStyling';

export const getTemplateClassName = (templateId: string): string => {
  const template = getTemplateById(templateId) || getDefaultTemplate();
  return `resume-template-${template.id}`;
};

export const getTemplateCSS = (templateId: string): string => {
  // Use the unified styling system for consistency with PDF
  return generateUnifiedCSS(templateId);
};

// Simple content preparation without DOM manipulation
export const prepareResumeContent = (htmlContent: string, templateId: string): string => {
  // Just clean the content without restructuring
  const cleaned = htmlContent.trim();
  return cleaned;
};
