
import React from 'react';
import TemplateSelection from './ResumeTemplates';
import ResumeDisplay from './ResumeDisplay';
import ResumeActions from './ResumeActions';
import GlassCard from '@/components/ui/glass-card';

interface ResumeWorkspaceProps {
  generatedResume: string;
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
  onResumeEdit: (content: string) => void;
  onDownloadPDF: () => void;
  onCopyToClipboard: () => void;
}

const ResumeWorkspace: React.FC<ResumeWorkspaceProps> = ({
  generatedResume,
  selectedTemplate,
  onTemplateChange,
  onResumeEdit,
  onDownloadPDF,
  onCopyToClipboard,
}) => {
  return (
    <>
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
      
      <ResumeDisplay
        generatedResume={generatedResume}
        selectedTemplate={selectedTemplate}
        onResumeEdit={onResumeEdit}
      />
      
      <ResumeActions
        onDownloadPDF={onDownloadPDF}
        onCopyToClipboard={onCopyToClipboard}
      />
    </>
  );
};

export default ResumeWorkspace;
