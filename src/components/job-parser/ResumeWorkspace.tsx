
import React from 'react';
import TemplateSelection from './ResumeTemplates';
import ResumeDisplay from './ResumeDisplay';
import ResumeActions from './ResumeActions';
import ATSOptimizationMeter from './ATSOptimizationMeter';
import GlassCard from '@/components/ui/glass-card';
import { useATSOptimization } from '@/hooks/useATSOptimization';

interface ResumeWorkspaceProps {
  generatedResume: string;
  selectedTemplate: string;
  jobDescription: string;
  onTemplateChange: (templateId: string) => void;
  onResumeEdit: (content: string) => void;
  onDownloadPDF: () => void;
  onCopyToClipboard: () => void;
}

const ResumeWorkspace: React.FC<ResumeWorkspaceProps> = ({
  generatedResume,
  selectedTemplate,
  jobDescription,
  onTemplateChange,
  onResumeEdit,
  onDownloadPDF,
  onCopyToClipboard,
}) => {
  // Get ATS optimization analysis
  const atsAnalysis = useATSOptimization({
    resumeContent: generatedResume,
    jobDescription: jobDescription
  });

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <GlassCard className="p-6">
        <TemplateSelection
          selectedTemplate={selectedTemplate}
          onTemplateChange={onTemplateChange}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>✅ Template selection loaded successfully</p>
          <p>Current template: <strong>{selectedTemplate}</strong></p>
        </div>
      </GlassCard>
      
      {/* Two-column layout: Resume + ATS Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Resume Display - 70% width on desktop */}
        <div className="lg:col-span-7">
          <ResumeDisplay
            generatedResume={generatedResume}
            selectedTemplate={selectedTemplate}
            onResumeEdit={onResumeEdit}
          />
        </div>
        
        {/* ATS Optimization Meter - 30% width on desktop */}
        <div className="lg:col-span-3">
          <ATSOptimizationMeter
            score={atsAnalysis.score}
            suggestions={atsAnalysis.suggestions}
            keywordMatches={atsAnalysis.keywordMatches}
            totalKeywords={atsAnalysis.totalKeywords}
            issues={atsAnalysis.issues}
            isAnalyzing={!generatedResume.trim()}
          />
        </div>
      </div>
      
      {/* Resume Actions */}
      <ResumeActions
        onDownloadPDF={onDownloadPDF}
        onCopyToClipboard={onCopyToClipboard}
      />
    </div>
  );
};

export default ResumeWorkspace;
