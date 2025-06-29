
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { parseHTMLToPDFSections, generatePDFFromSections } from '@/utils/pdfGenerator';
import { cleanResumeContent } from '@/utils/resumeContentCleaner';
import JobZoneHeader from './JobZoneHeader';
import JobDescriptionInput from './JobDescriptionInput';
import GenerationProgress from './GenerationProgress';
import ResumeDisplay from './ResumeDisplay';
import ResumeActions from './ResumeActions';
import TemplateSelection from './ResumeTemplates';
import GlassCard from '@/components/ui/glass-card';

const JobZonePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateResume = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a job description first.',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setShowResume(false); // Reset resume display state
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      console.log('Generating resume...');
      
      const { data, error } = await supabase.functions.invoke('generate-resume', {
        body: { jobDescription: jobDescription.trim() }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate resume');
      }

      if (!data || !data.resume) {
        throw new Error('No resume content received');
      }

      setProgress(100);
      
      // Process resume content with error handling
      let processedResume = data.resume;
      try {
        processedResume = cleanResumeContent(data.resume);
        console.log('Resume content cleaned successfully');
      } catch (cleanupError) {
        console.warn('Frontend cleanup failed, using original content:', cleanupError);
        processedResume = data.resume;
      }
      
      // Set resume content and show template selection
      setGeneratedResume(processedResume);
      
      // Force template selection to appear after a short delay
      setTimeout(() => {
        setShowResume(true);
        console.log('Resume display state set to true');
        
        toast({
          title: 'Success',
          description: 'Resume generated successfully! Choose a template and edit as needed.',
        });
      }, 300);

    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 500);
    }
  };

  const downloadPDF = async () => {
    const resumeElement = document.getElementById('resumeOutput');
    
    if (!resumeElement) {
      toast({
        title: 'Error',
        description: 'Resume content not found. Please generate a resume first.',
        variant: 'destructive',
      });
      return;
    }

    if (!resumeElement.innerHTML.trim() || resumeElement.innerHTML.trim() === '') {
      toast({
        title: 'Error',
        description: 'No resume content to generate PDF. Please generate a resume first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      toast({
        title: 'Generating PDF',
        description: 'Please wait while we create your PDF...',
      });

      const sections = parseHTMLToPDFSections(resumeElement.innerHTML);
      
      if (sections.length === 0) {
        throw new Error('No content could be extracted from the resume');
      }

      generatePDFFromSections(sections, 'resume.pdf');
      
      toast({
        title: 'Success',
        description: 'PDF downloaded successfully!',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try the copy option instead.',
        variant: 'destructive',
      });
    }
  };

  const copyToClipboard = async () => {
    const resumeElement = document.getElementById('resumeOutput');
    
    if (!resumeElement) {
      toast({
        title: 'Error',
        description: 'Resume content not found.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const plainText = resumeElement.innerText || resumeElement.textContent || '';
      
      if (!plainText.trim()) {
        throw new Error('No text content found');
      }

      await navigator.clipboard.writeText(plainText);
      
      toast({
        title: 'Success',
        description: 'Resume content copied to clipboard!',
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: 'Error',
        description: 'Failed to copy content to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const handleResumeEdit = (event: React.FormEvent<HTMLDivElement>) => {
    setGeneratedResume(event.currentTarget.innerHTML);
  };

  // Debug logging
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
        <>
          <GlassCard className="p-6">
            <TemplateSelection
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
            <div className="mt-4 text-sm text-muted-foreground">
              <p>✅ Template selection loaded successfully</p>
              <p>Current template: <strong>{selectedTemplate}</strong></p>
            </div>
          </GlassCard>
          
          <ResumeDisplay
            generatedResume={generatedResume}
            selectedTemplate={selectedTemplate}
            onResumeEdit={handleResumeEdit}
          />
          
          <ResumeActions
            onDownloadPDF={downloadPDF}
            onCopyToClipboard={copyToClipboard}
          />
        </>
      )}

      {/* Debug info for troubleshooting */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
          <div>Show Resume: {showResume ? 'Yes' : 'No'}</div>
          <div>Has Content: {generatedResume ? 'Yes' : 'No'}</div>
          <div>Template: {selectedTemplate}</div>
        </div>
      )}
    </div>
  );
};

export default JobZonePage;
