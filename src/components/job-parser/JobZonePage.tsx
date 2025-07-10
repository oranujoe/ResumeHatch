
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { User, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  
  const { user } = useAuth();
  const { profile, completeness, needsSetup } = useProfile();
  const navigate = useNavigate();

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
      
      {needsSetup && (
        <Alert className="border-amber-200 bg-amber-50">
          <User className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>
              Complete your profile ({completeness}% done) to generate personalized resumes with your actual information instead of placeholder data.
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="ml-4"
            >
              Complete Profile
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
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
          jobDescription={jobDescription}
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
