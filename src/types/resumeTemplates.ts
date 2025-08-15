
export interface ToneProfile {
  writingStyle: 'professional' | 'creative' | 'executive' | 'technical' | 'entrepreneurial' | 'academic' | 'consultative' | 'healthcare' | 'sales';
  toneKeywords: string[];
  industryFocus: string[];
  personalityTraits: string[];
  actionVerbStyle: 'quantitative' | 'collaborative' | 'strategic' | 'innovative' | 'entrepreneurial' | 'academic' | 'methodical' | 'empathetic' | 'persuasive';
  sectionNames?: {
    summary?: string;
    skills?: string;
    experience?: string;
    education?: string;
    additional?: string[];
  };
  contentStructure: string[];
}

export interface ResumeTemplateStyles {
  container: string;
  header: string;
  section: string;
  title: string;
  content: string;
  list: string;
}

export interface PDFStyles {
  primaryColor: [number, number, number];
  secondaryColor: [number, number, number];
  textColor: [number, number, number];
  headerFontSize: number;
  sectionTitleFontSize: number;
  bodyFontSize: number;
  headerStyle: 'plain' | 'underline' | 'background' | 'border';
  sectionTitleStyle: 'plain' | 'underline' | 'bold' | 'highlight';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'standard' | 'specialized' | 'industry';
  toneProfile: ToneProfile;
  styles: ResumeTemplateStyles;
  pdfStyles: PDFStyles;
}

export type TemplateCategory = 'all' | 'standard' | 'specialized' | 'industry';

// Validation utilities
export const validateTemplate = (template: ResumeTemplate): boolean => {
  return !!(
    template.id &&
    template.name &&
    template.description &&
    template.toneProfile &&
    template.styles &&
    template.pdfStyles &&
    template.toneProfile.contentStructure?.length > 0
  );
};

export const validateTemplateId = (templateId: string, templates: ResumeTemplate[]): boolean => {
  return templates.some(template => template.id === templateId);
};
