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
      setTimeout(() => {
        // Additional frontend cleanup as safety net
        try {
          const cleanedResume = cleanResumeContent(data.resume);
          setGeneratedResume(cleanedResume);
        } catch (cleanupError) {
          console.warn('Frontend cleanup failed, using original content:', cleanupError);
          setGeneratedResume(data.resume);
        }
        
        setShowResume(true);
        
        toast({
          title: 'Success',
          description: 'Resume generated successfully! You can now edit it and download as PDF.',
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

      {showResume && (
        <>
          <GlassCard className="p-6">
            <TemplateSelection
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
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
    </div>
  );
};

export default JobZonePage;
