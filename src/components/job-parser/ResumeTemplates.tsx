
import React from 'react';

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
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
    description: 'Clean, modern design with accent colors',
    preview: '📄',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-b-2 border-blue-600 pb-4 mb-6',
      section: 'mb-6',
      title: 'text-xl font-bold text-blue-600 mb-3 uppercase tracking-wide border-b border-blue-200 pb-1',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [37, 99, 235], // Blue-600
      secondaryColor: [147, 197, 253], // Blue-300
      textColor: [55, 65, 81], // Gray-700
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
    description: 'Traditional, professional format',
    preview: '📋',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-b-2 border-gray-800 pb-4 mb-6',
      section: 'mb-6',
      title: 'text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [31, 41, 55], // Gray-800
      secondaryColor: [107, 114, 128], // Gray-500
      textColor: [55, 65, 81], // Gray-700
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
    description: 'Bold design for creative professionals',
    preview: '🎨',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 mb-6 rounded-lg',
      section: 'mb-6',
      title: 'text-xl font-bold text-purple-600 mb-3 uppercase tracking-wide border-b-2 border-purple-300 pb-1',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [147, 51, 234], // Purple-600
      secondaryColor: [37, 99, 235], // Blue-600
      textColor: [55, 65, 81], // Gray-700
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
    description: 'Simple, ATS-friendly design',
    preview: '⚪',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'pb-4 mb-6',
      section: 'mb-6',
      title: 'text-lg font-semibold text-gray-900 mb-3 uppercase tracking-wide',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2'
    },
    pdfStyles: {
      primaryColor: [17, 24, 39], // Gray-900
      secondaryColor: [75, 85, 99], // Gray-600
      textColor: [55, 65, 81], // Gray-700
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
        <p className="text-xs text-muted-foreground">{template.description}</p>
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
  // Debug logging
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
        <h3 className="text-title-large font-medium">Choose Resume Template</h3>
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
