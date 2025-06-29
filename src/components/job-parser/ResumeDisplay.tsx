
import React, { useState, useEffect } from 'react';
import { CheckCircle, Edit3 } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import { cleanResumeContent, validateResumeContent } from '@/utils/resumeContentCleaner';
import { getTemplateCSS, getTemplateClassName, prepareResumeContent } from '@/utils/resumeFormatter';
import { useStableEditing } from '@/hooks/useStableEditing';

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
  const [localContent, setLocalContent] = useState('');
  
  // Process and clean the resume content
  const processedResume = React.useMemo(() => {
    try {
      const cleaned = cleanResumeContent(generatedResume);
      if (!validateResumeContent(cleaned)) {
        console.warn('Resume content validation failed, but proceeding with display');
      }
      
      return prepareResumeContent(cleaned, selectedTemplate);
    } catch (error) {
      console.error('Error processing resume content:', error);
      return generatedResume;
    }
  }, [generatedResume, selectedTemplate]);

  // Update local content when processed resume changes
  useEffect(() => {
    setLocalContent(processedResume);
  }, [processedResume]);

  // Generate template-specific CSS
  const templateCSS = React.useMemo(() => {
    return getTemplateCSS(selectedTemplate);
  }, [selectedTemplate]);

  // Use the stable editing hook
  const { 
    elementRef, 
    handleBeforeInput, 
    handleInput, 
    handleKeyDown, 
    updateContent,
    isUpdating 
  } = useStableEditing({
    onContentChange: onResumeEdit,
    debounceDelay: 300
  });

  // Update the editor content when template changes
  useEffect(() => {
    if (elementRef.current && elementRef.current.innerHTML !== localContent) {
      updateContent(localContent);
    }
  }, [localContent, updateContent]);

  const templateClassName = getTemplateClassName(selectedTemplate);

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
            {isUpdating && <span className="text-blue-500">• Processing...</span>}
          </div>
        </div>
      </GlassCard>
      
      {/* Resume Content */}
      <GlassCard className="p-8">
        <style dangerouslySetInnerHTML={{ __html: templateCSS }} />
        <div
          ref={elementRef}
          id="resumeOutput"
          className={`resume-container ${templateClassName} w-full max-w-4xl mx-auto min-h-[600px] focus:outline-none transition-all duration-200`}
          contentEditable
          suppressContentEditableWarning
          onBeforeInput={handleBeforeInput}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          style={{ userSelect: 'text' }}
          dangerouslySetInnerHTML={{ __html: localContent }}
        />
      </GlassCard>
    </div>
  );
};

export default ResumeDisplay;
