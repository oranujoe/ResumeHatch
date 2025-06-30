
import React from 'react';

export interface ToneProfile {
  writingStyle: 'professional' | 'creative' | 'executive' | 'technical';
  toneKeywords: string[];
  industryFocus: string[];
  personalityTraits: string[];
  actionVerbStyle: 'quantitative' | 'collaborative' | 'strategic' | 'innovative';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  toneProfile: ToneProfile;
  styles: {
    container: string;
    header: string;
    section: string;
    title: string;
    content: string;
    list: string;
  };
  pdfStyles: {
    primaryColor: [number, number, number];
    secondaryColor: [number, number, number];
    textColor: [number, number, number];
    headerFontSize: number;
    sectionTitleFontSize: number;
    bodyFontSize: number;
    headerStyle: 'plain' | 'underline' | 'background';
    sectionTitleStyle: 'plain' | 'underline' | 'bold';
  };
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with confident, results-driven tone',
    preview: '📄',
    toneProfile: {
      writingStyle: 'professional',
      toneKeywords: ['optimized', 'streamlined', 'enhanced', 'delivered', 'achieved'],
      industryFocus: ['technology', 'consulting', 'finance', 'marketing'],
      personalityTraits: ['results-driven', 'analytical', 'tech-savvy', 'efficient'],
      actionVerbStyle: 'quantitative'
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-b-2 border-blue-600 pb-4 mb-6',
      section: 'mb-6',
      title: 'text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [37, 99, 235],
      secondaryColor: [147, 197, 253],
      textColor: [55, 65, 81],
      headerFontSize: 20,
      sectionTitleFontSize: 14,
      bodyFontSize: 10,
      headerStyle: 'underline',
      sectionTitleStyle: 'underline'
    }
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional format with authoritative, strategic tone',
    preview: '📋',
    toneProfile: {
      writingStyle: 'executive',
      toneKeywords: ['spearheaded', 'orchestrated', 'championed', 'executed', 'directed'],
      industryFocus: ['executive', 'management', 'corporate', 'operations'],
      personalityTraits: ['strategic', 'authoritative', 'experienced', 'decisive'],
      actionVerbStyle: 'strategic'
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-b-2 border-gray-800 pb-4 mb-6',
      section: 'mb-6',
      title: 'text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [31, 41, 55],
      secondaryColor: [107, 114, 128],
      textColor: [55, 65, 81],
      headerFontSize: 18,
      sectionTitleFontSize: 13,
      bodyFontSize: 10,
      headerStyle: 'underline',
      sectionTitleStyle: 'bold'
    }
  },
  {
    id: 'creative',
    name: 'Creative Edge',
    description: 'Bold design with innovative, collaborative tone',
    preview: '🎨',
    toneProfile: {
      writingStyle: 'creative',
      toneKeywords: ['innovated', 'collaborated', 'conceptualized', 'designed', 'transformed'],
      industryFocus: ['design', 'marketing', 'media', 'startups', 'agencies'],
      personalityTraits: ['innovative', 'collaborative', 'dynamic', 'creative'],
      actionVerbStyle: 'innovative'
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 mb-6 rounded-lg',
      section: 'mb-6',
      title: 'text-xl font-bold text-purple-600 mb-3 uppercase tracking-wide border-b-2 border-purple-300 pb-1',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [147, 51, 234],
      secondaryColor: [37, 99, 235],
      textColor: [55, 65, 81],
      headerFontSize: 20,
      sectionTitleFontSize: 14,
      bodyFontSize: 10,
      headerStyle: 'background',
      sectionTitleStyle: 'underline'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, ATS-friendly with straightforward, skill-focused tone',
    preview: '⚪',
    toneProfile: {
      writingStyle: 'technical',
      toneKeywords: ['implemented', 'developed', 'maintained', 'configured', 'automated'],
      industryFocus: ['engineering', 'IT', 'technical', 'healthcare', 'research'],
      personalityTraits: ['precise', 'methodical', 'skilled', 'reliable'],
      actionVerbStyle: 'quantitative'
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'pb-4 mb-6',
      section: 'mb-6',
      title: 'text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2'
    },
    pdfStyles: {
      primaryColor: [17, 24, 39],
      secondaryColor: [75, 85, 99],
      textColor: [55, 65, 81],
      headerFontSize: 18,
      sectionTitleFontSize: 12,
      bodyFontSize: 10,
      headerStyle: 'plain',
      sectionTitleStyle: 'plain'
    }
  }
];

interface TemplatePreviewProps {
  template: ResumeTemplate;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, isSelected, onSelect }) => {
  const handleClick = () => {
    console.log('Template selected:', template.id);
    onSelect(template.id);
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
        isSelected ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
      }`}
      onClick={handleClick}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">{template.preview}</div>
        <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
        <div className="text-xs text-muted-foreground">
          <div className="font-medium">Style: {template.toneProfile.writingStyle}</div>
          <div className="mt-1">
            {template.toneProfile.personalityTraits.slice(0, 2).join(', ')}
          </div>
        </div>
        {isSelected && (
          <div className="mt-2 text-xs text-primary font-medium">✓ Selected</div>
        )}
      </div>
    </div>
  );
};

interface TemplateSelectionProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ selectedTemplate, onTemplateChange }) => {
  React.useEffect(() => {
    console.log('TemplateSelection rendered with:', { selectedTemplate });
  }, [selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    console.log('Template change requested:', templateId);
    onTemplateChange(templateId);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-title-large font-medium mb-1">Choose Resume Template & Tone</h3>
          <p className="text-sm text-muted-foreground">
            Each template applies a unique writing style and tone to match different industries and roles
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Click any template to apply it instantly
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resumeTemplates.map((template) => (
          <TemplatePreview
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={handleTemplateChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
