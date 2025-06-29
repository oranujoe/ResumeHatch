
import React from 'react';
import { CheckCircle, Edit3 } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import { cleanResumeContent, validateResumeContent } from '@/utils/resumeContentCleaner';
import { formatResumeWithTemplate, getTemplateCSS } from '@/utils/resumeFormatter';
import { useResumeEditing } from '@/hooks/useResumeEditing';

interface ResumeDisplayProps {
  generatedResume: string;
  selectedTemplate: string;
  onResumeEdit: (content: string) => void;
}

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ 
  generatedResume, 
  selectedTemplate, 
  onResumeEdit 
}) => {
  // Clean, validate, and format the resume content with template
  const processedResume = React.useMemo(() => {
    try {
      const cleaned = cleanResumeContent(generatedResume);
      if (!validateResumeContent(cleaned)) {
        console.warn('Resume content validation failed, but proceeding with display');
      }
      
      // Apply template formatting
      const formatted = formatResumeWithTemplate(cleaned, selectedTemplate);
      return formatted;
    } catch (error) {
      console.error('Error processing resume content:', error);
      return generatedResume; // Fallback to original content
    }
  }, [generatedResume, selectedTemplate]);

  // Generate template-specific CSS
  const templateCSS = React.useMemo(() => {
    return getTemplateCSS(selectedTemplate);
  }, [selectedTemplate]);

  // Use the custom editing hook
  const { handleInput, handleFocus, handleKeyDown, isProcessing } = useResumeEditing({
    onContentChange: onResumeEdit,
    debounceDelay: 300
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Resume Header Card */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success-primary" />
              <h2 className="text-headline-medium font-semibold">Generated Resume</h2>
            </div>
            <p className="text-body-medium text-muted-foreground">
              Click anywhere in the resume below to edit content directly
            </p>
          </div>
          <div className="flex items-center space-x-2 text-label-small text-muted-foreground">
            <Edit3 className="h-3 w-3" />
            <span>Live editing enabled</span>
            {isProcessing && <span className="text-blue-500">• Processing...</span>}
          </div>
        </div>
      </GlassCard>
      
      {/* Resume Content */}
      <GlassCard className="p-8">
        <style dangerouslySetInnerHTML={{ __html: templateCSS }} />
        <div
          id="resumeOutput"
          className="resume-container w-full max-w-4xl mx-auto min-h-[600px] focus:outline-none transition-all duration-200"
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: processedResume }}
          onInput={handleInput}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          style={{ userSelect: 'text' }}
        />
      </GlassCard>
    </div>
  );
};

export default ResumeDisplay;
