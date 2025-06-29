
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
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with accent colors',
    preview: '📄',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-b-4 border-blue-600 pb-6 mb-8',
      section: 'mb-8',
      title: 'text-2xl font-bold text-blue-600 mb-4 uppercase tracking-wide border-l-4 border-blue-600 pl-4',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-6'
    }
  },
  {
    id: 'classic',
    name: 'Classic Executive',
    description: 'Traditional, professional format',
    preview: '📋',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-b-2 border-gray-800 pb-6 mb-8',
      section: 'mb-8',
      title: 'text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    }
  },
  {
    id: 'creative',
    name: 'Creative Edge',
    description: 'Bold design for creative professionals',
    preview: '🎨',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 mb-8 rounded-lg',
      section: 'mb-8',
      title: 'text-2xl font-bold text-purple-600 mb-4 uppercase tracking-wide relative before:content-[""] before:absolute before:left-0 before:-bottom-2 before:w-12 before:h-1 before:bg-purple-600',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-6'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, ATS-friendly design',
    preview: '⚪',
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'pb-6 mb-8',
      section: 'mb-8',
      title: 'text-xl font-semibold text-gray-900 mb-4 uppercase tracking-wide',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2'
    }
  }
];

interface TemplatePreviewProps {
  template: ResumeTemplate;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ template, isSelected, onSelect }) => {
  return (
    <div
      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 ${
        isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
      }`}
      onClick={() => onSelect(template.id)}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">{template.preview}</div>
        <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
        <p className="text-xs text-muted-foreground">{template.description}</p>
      </div>
    </div>
  );
};

interface TemplateSelectionProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ selectedTemplate, onTemplateChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-title-large font-medium mb-4">Choose Resume Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {resumeTemplates.map((template) => (
          <TemplatePreview
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={onTemplateChange}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
