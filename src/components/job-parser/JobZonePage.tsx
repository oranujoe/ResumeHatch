
import React, { useState } from 'react';
import JobZoneHeader from './JobZoneHeader';
import JobDescriptionInput from './JobDescriptionInput';
import GenerationProgress from './GenerationProgress';
import ResumeWorkspace from './ResumeWorkspace';
import DebugPanel from './DebugPanel';
import { useResumeGeneration } from './ResumeGenerationHandler';
import { useResumeExport } from './ResumeExportHandler';

const JobZonePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerationStart = () => {
    setIsGenerating(true);
    setShowResume(false);
  };

  const handleGenerationComplete = (resume: string) => {
    setGeneratedResume(resume);
    setShowResume(true);
    setIsGenerating(false);
  };

  const handleGenerationError = () => {
    setIsGenerating(false);
  };

  const { generateResume } = useResumeGeneration({
    jobDescription,
    selectedTemplate,
    onGenerationStart: handleGenerationStart,
    onGenerationComplete: handleGenerationComplete,
    onGenerationError: handleGenerationError,
    setProgress,
  });

  const { downloadPDF, copyToClipboard } = useResumeExport(selectedTemplate);

  const handleResumeEdit = (content: string) => {
    setGeneratedResume(content);
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // If we have a generated resume, regenerate it with the new template tone
    if (generatedResume && jobDescription) {
      console.log(`Template changed to ${templateId}, regenerating resume...`);
      generateResume();
    }
  };

  React.useEffect(() => {
    console.log('JobZonePage state:', { 
      showResume, 
      hasGeneratedResume: !!generatedResume, 
      selectedTemplate 
    });
  }, [showResume, generatedResume, selectedTemplate]);

  return (
    <div className="space-y-8 animate-fade-in-up">
      <JobZoneHeader />
      
      <JobDescriptionInput
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        isGenerating={isGenerating}
        onGenerate={generateResume}
      />
      
      <GenerationProgress
        isVisible={isGenerating}
        progress={progress}
      />

      {showResume && generatedResume && (
        <ResumeWorkspace
          generatedResume={generatedResume}
          selectedTemplate={selectedTemplate}
          onTemplateChange={handleTemplateChange}
          onResumeEdit={handleResumeEdit}
          onDownloadPDF={downloadPDF}
          onCopyToClipboard={copyToClipboard}
        />
      )}

      <DebugPanel
        showResume={showResume}
        generatedResume={generatedResume}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
};

export default JobZonePage;
