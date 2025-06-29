
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cleanResumeContent } from '@/utils/resumeContentCleaner';

interface ResumeGenerationHandlerProps {
  jobDescription: string;
  onGenerationStart: () => void;
  onGenerationComplete: (resume: string) => void;
  onGenerationError: () => void;
  setProgress: (progress: number) => void;
}

export const useResumeGeneration = ({
  jobDescription,
  onGenerationStart,
  onGenerationComplete,
  onGenerationError,
  setProgress,
}: ResumeGenerationHandlerProps) => {
  const generateResume = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a job description first.',
        variant: 'destructive',
      });
      return;
    }

    onGenerationStart();
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
      
      // Process resume content with error handling
      let processedResume = data.resume;
      try {
        processedResume = cleanResumeContent(data.resume);
        console.log('Resume content cleaned successfully');
      } catch (cleanupError) {
        console.warn('Frontend cleanup failed, using original content:', cleanupError);
        processedResume = data.resume;
      }
      
      // Complete generation and show template selection
      setTimeout(() => {
        onGenerationComplete(processedResume);
        console.log('Resume generation completed successfully');
        
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
      onGenerationError();
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setProgress(0);
      }, 500);
    }
  };

  return { generateResume };
};
