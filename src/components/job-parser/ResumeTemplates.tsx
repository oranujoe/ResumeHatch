
import React from 'react';
import { ResumeTemplate, TemplateCategory } from '@/types/resumeTemplates';
import { resumeTemplateData, getTemplateById } from '@/data/templateRegistry';

// Re-export types for backward compatibility
export type { ToneProfile, ResumeTemplate } from '@/types/resumeTemplates';

// Main templates export for backward compatibility
export const resumeTemplates = resumeTemplateData;

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'standard': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'specialized': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'industry': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
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
        <div className={`inline-block px-2 py-1 rounded-full text-xs mb-2 border ${getCategoryColor(template.category)}`}>
          {template.category}
        </div>
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
  const [selectedCategory, setSelectedCategory] = React.useState<TemplateCategory>('all');

  React.useEffect(() => {
    console.log('TemplateSelection rendered with:', { selectedTemplate });
  }, [selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    console.log('Template change requested:', templateId);
    onTemplateChange(templateId);
  };

  const categories: TemplateCategory[] = ['all', 'standard', 'specialized', 'industry'];
  const filteredTemplates = selectedCategory === 'all' 
    ? resumeTemplateData 
    : resumeTemplateData.filter(t => t.category === selectedCategory);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-title-large font-medium mb-1">Choose Resume Template & Tone</h3>
          <p className="text-sm text-muted-foreground">
            Each template applies a unique writing style, structure, and tone to match different industries and career stages
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Click any template to apply it instantly
        </div>
      </div>
      
      {/* Category Filter */}
      <div className="flex gap-2 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredTemplates.map((template) => (
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
