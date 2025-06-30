
import React from 'react';

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

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'standard' | 'specialized' | 'industry';
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
    headerStyle: 'plain' | 'underline' | 'background' | 'border';
    sectionTitleStyle: 'plain' | 'underline' | 'bold' | 'highlight';
  };
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with confident, results-driven tone',
    preview: '📄',
    category: 'standard',
    toneProfile: {
      writingStyle: 'professional',
      toneKeywords: ['optimized', 'streamlined', 'enhanced', 'delivered', 'achieved'],
      industryFocus: ['technology', 'consulting', 'finance', 'marketing'],
      personalityTraits: ['results-driven', 'analytical', 'tech-savvy', 'efficient'],
      actionVerbStyle: 'quantitative',
      contentStructure: ['contact', 'summary', 'skills', 'experience', 'education']
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
    category: 'standard',
    toneProfile: {
      writingStyle: 'executive',
      toneKeywords: ['spearheaded', 'orchestrated', 'championed', 'executed', 'directed'],
      industryFocus: ['executive', 'management', 'corporate', 'operations'],
      personalityTraits: ['strategic', 'authoritative', 'experienced', 'decisive'],
      actionVerbStyle: 'strategic',
      contentStructure: ['contact', 'summary', 'experience', 'skills', 'education']
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
    category: 'specialized',
    toneProfile: {
      writingStyle: 'creative',
      toneKeywords: ['innovated', 'collaborated', 'conceptualized', 'designed', 'transformed'],
      industryFocus: ['design', 'marketing', 'media', 'startups', 'agencies'],
      personalityTraits: ['innovative', 'collaborative', 'dynamic', 'creative'],
      actionVerbStyle: 'innovative',
      contentStructure: ['contact', 'summary', 'skills', 'experience', 'projects', 'education']
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
    category: 'standard',
    toneProfile: {
      writingStyle: 'technical',
      toneKeywords: ['implemented', 'developed', 'maintained', 'configured', 'automated'],
      industryFocus: ['engineering', 'IT', 'technical', 'healthcare', 'research'],
      personalityTraits: ['precise', 'methodical', 'skilled', 'reliable'],
      actionVerbStyle: 'quantitative',
      contentStructure: ['contact', 'skills', 'experience', 'education', 'certifications']
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
  },
  {
    id: 'veteran',
    name: 'Industry Veteran',
    description: 'Leadership-focused with extensive experience emphasis',
    preview: '👑',
    category: 'specialized',
    toneProfile: {
      writingStyle: 'executive',
      toneKeywords: ['pioneered', 'established', 'mentored', 'transformed', 'scaled'],
      industryFocus: ['senior management', 'C-suite', 'board positions', 'advisory roles'],
      personalityTraits: ['visionary', 'mentor', 'industry expert', 'transformational'],
      actionVerbStyle: 'strategic',
      sectionNames: {
        summary: 'Executive Profile',
        experience: 'Leadership Experience',
        additional: ['Board Positions', 'Speaking Engagements', 'Publications']
      },
      contentStructure: ['contact', 'executive-profile', 'leadership-experience', 'achievements', 'board-positions', 'education']
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-l-4 border-amber-600 pl-4 mb-6',
      section: 'mb-8',
      title: 'text-xl font-bold text-amber-700 mb-4 flex items-center gap-2',
      content: 'text-gray-700 mb-4',
      list: 'space-y-3 ml-6'
    },
    pdfStyles: {
      primaryColor: [180, 83, 9],
      secondaryColor: [251, 191, 36],
      textColor: [55, 65, 81],
      headerFontSize: 22,
      sectionTitleFontSize: 15,
      bodyFontSize: 11,
      headerStyle: 'border',
      sectionTitleStyle: 'highlight'
    }
  },
  {
    id: 'graduate',
    name: 'Fresh Graduate',
    description: 'Entry-level focused with academic achievements and potential',
    preview: '🎓',
    category: 'specialized',
    toneProfile: {
      writingStyle: 'academic',
      toneKeywords: ['achieved', 'participated', 'contributed', 'learned', 'demonstrated'],
      industryFocus: ['entry-level', 'internships', 'graduate programs', 'trainee positions'],
      personalityTraits: ['eager', 'quick-learner', 'dedicated', 'ambitious'],
      actionVerbStyle: 'academic',
      sectionNames: {
        summary: 'Career Objective',
        experience: 'Relevant Experience',
        additional: ['Academic Projects', 'Extracurricular Activities', 'Honors & Awards']
      },
      contentStructure: ['contact', 'objective', 'education', 'projects', 'experience', 'skills', 'activities']
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'bg-green-50 border border-green-200 p-4 mb-6 rounded-lg',
      section: 'mb-6',
      title: 'text-lg font-semibold text-green-700 mb-3 border-b border-green-300 pb-2',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [21, 128, 61],
      secondaryColor: [134, 239, 172],
      textColor: [55, 65, 81],
      headerFontSize: 19,
      sectionTitleFontSize: 13,
      bodyFontSize: 10,
      headerStyle: 'background',
      sectionTitleStyle: 'underline'
    }
  },
  {
    id: 'consultant',
    name: 'Consultant Pro',
    description: 'Problem-solving focused with methodology and client impact',
    preview: '💼',
    category: 'industry',
    toneProfile: {
      writingStyle: 'consultative',
      toneKeywords: ['analyzed', 'recommended', 'facilitated', 'optimized', 'strategized'],
      industryFocus: ['consulting', 'advisory', 'strategy', 'business analysis'],
      personalityTraits: ['analytical', 'client-focused', 'strategic', 'problem-solver'],
      actionVerbStyle: 'methodical',
      sectionNames: {
        summary: 'Professional Profile',
        experience: 'Client Engagements',
        additional: ['Methodologies', 'Industry Expertise', 'Client Testimonials']
      },
      contentStructure: ['contact', 'profile', 'methodologies', 'client-engagements', 'expertise', 'education']
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-t-4 border-indigo-600 pt-4 mb-6',
      section: 'mb-7',
      title: 'text-lg font-bold text-indigo-700 mb-3 bg-indigo-50 px-3 py-1 rounded',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-5'
    },
    pdfStyles: {
      primaryColor: [67, 56, 202],
      secondaryColor: [165, 180, 252],
      textColor: [55, 65, 81],
      headerFontSize: 19,
      sectionTitleFontSize: 13,
      bodyFontSize: 10,
      headerStyle: 'border',
      sectionTitleStyle: 'highlight'
    }
  },
  {
    id: 'nomad',
    name: 'Digital Nomad',
    description: 'Remote-first with flexibility and global experience emphasis',
    preview: '🌍',
    category: 'specialized',
    toneProfile: {
      writingStyle: 'entrepreneurial',
      toneKeywords: ['adapted', 'collaborated remotely', 'managed globally', 'innovated', 'balanced'],
      industryFocus: ['remote work', 'digital', 'freelance', 'startups', 'tech'],
      personalityTraits: ['adaptable', 'self-motivated', 'culturally aware', 'independent'],
      actionVerbStyle: 'entrepreneurial',
      sectionNames: {
        summary: 'Remote Professional Profile',
        experience: 'Global Experience',
        additional: ['Remote Tools & Skills', 'Cultural Adaptability', 'Time Zone Management']
      },
      contentStructure: ['contact', 'remote-profile', 'global-experience', 'remote-skills', 'cultural-experience', 'education']
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 mb-6 rounded-xl',
      section: 'mb-6',
      title: 'text-lg font-semibold text-teal-600 mb-3 flex items-center gap-2',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [20, 184, 166],
      secondaryColor: [153, 246, 228],
      textColor: [55, 65, 81],
      headerFontSize: 19,
      sectionTitleFontSize: 13,
      bodyFontSize: 10,
      headerStyle: 'background',
      sectionTitleStyle: 'plain'
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare Professional',
    description: 'Patient-care focused with certifications and clinical experience',
    preview: '🏥',
    category: 'industry',
    toneProfile: {
      writingStyle: 'healthcare',
      toneKeywords: ['diagnosed', 'treated', 'cared for', 'improved outcomes', 'collaborated'],
      industryFocus: ['healthcare', 'medical', 'nursing', 'clinical', 'patient care'],
      personalityTraits: ['compassionate', 'detail-oriented', 'collaborative', 'patient-focused'],
      actionVerbStyle: 'empathetic',
      sectionNames: {
        summary: 'Clinical Profile',
        experience: 'Clinical Experience',
        additional: ['Certifications & Licenses', 'Specializations', 'Continuing Education']
      },
      contentStructure: ['contact', 'clinical-profile', 'certifications', 'clinical-experience', 'specializations', 'education']
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'border-l-4 border-red-500 bg-red-50 pl-4 py-2 mb-6',
      section: 'mb-6',
      title: 'text-lg font-semibold text-red-700 mb-3 border-b-2 border-red-200 pb-2',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-4'
    },
    pdfStyles: {
      primaryColor: [239, 68, 68],
      secondaryColor: [252, 165, 165],
      textColor: [55, 65, 81],
      headerFontSize: 19,
      sectionTitleFontSize: 13,
      bodyFontSize: 10,
      headerStyle: 'border',
      sectionTitleStyle: 'underline'
    }
  },
  {
    id: 'sales',
    name: 'Sales Champion',
    description: 'Results-driven with quota achievements and relationship building',
    preview: '📈',
    category: 'industry',
    toneProfile: {
      writingStyle: 'sales',
      toneKeywords: ['exceeded', 'generated', 'closed', 'built relationships', 'negotiated'],
      industryFocus: ['sales', 'business development', 'account management', 'revenue generation'],
      personalityTraits: ['persuasive', 'relationship-builder', 'goal-oriented', 'competitive'],
      actionVerbStyle: 'persuasive',
      sectionNames: {
        summary: 'Sales Profile',
        experience: 'Sales Achievement Record',
        additional: ['Key Accounts', 'Sales Methodologies', 'Industry Recognition']
      },
      contentStructure: ['contact', 'sales-profile', 'achievements', 'sales-experience', 'methodologies', 'education']
    },
    styles: {
      container: 'max-w-4xl mx-auto bg-white text-gray-900 leading-relaxed',
      header: 'bg-orange-100 border-2 border-orange-400 p-4 mb-6 rounded-lg',
      section: 'mb-6',
      title: 'text-lg font-bold text-orange-700 mb-3 bg-orange-50 px-2 py-1 border-l-4 border-orange-500',
      content: 'text-gray-700 mb-3',
      list: 'space-y-2 ml-6'
    },
    pdfStyles: {
      primaryColor: [234, 88, 12],
      secondaryColor: [251, 146, 60],
      textColor: [55, 65, 81],
      headerFontSize: 20,
      sectionTitleFontSize: 14,
      bodyFontSize: 10,
      headerStyle: 'background',
      sectionTitleStyle: 'highlight'
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
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  React.useEffect(() => {
    console.log('TemplateSelection rendered with:', { selectedTemplate });
  }, [selectedTemplate]);

  const handleTemplateChange = (templateId: string) => {
    console.log('Template change requested:', templateId);
    onTemplateChange(templateId);
  };

  const categories = ['all', 'standard', 'specialized', 'industry'];
  const filteredTemplates = selectedCategory === 'all' 
    ? resumeTemplates 
    : resumeTemplates.filter(t => t.category === selectedCategory);

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
