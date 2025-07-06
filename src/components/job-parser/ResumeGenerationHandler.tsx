
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cleanResumeContent } from '@/utils/resumeContentCleaner';

interface ResumeGenerationHandlerProps {
  jobDescription: string;
  selectedTemplate: string;
  onGenerationStart: () => void;
  onGenerationComplete: (resume: string) => void;
  onGenerationError: () => void;
  setProgress: (progress: number) => void;
}

export const useResumeGeneration = ({
  jobDescription,
  selectedTemplate,
  onGenerationStart,
  onGenerationComplete,
  onGenerationError,
  setProgress,
}: ResumeGenerationHandlerProps) => {
  const { user } = useAuth();

  const generateResume = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a job description first.',
        variant: 'destructive',
      });
      return;
    }

    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to generate a resume.',
        variant: 'destructive',
      });
      return;
    }

    onGenerationStart();
    setProgress(0);
    
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 10;
      if (currentProgress >= 90) {
        setProgress(90);
        clearInterval(progressInterval);
      } else {
        setProgress(currentProgress);
      }
    }, 200);
    
    try {
      console.log(`Generating resume with template: ${selectedTemplate} for user: ${user.id}`);
      console.log('User from auth context:', {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata
      });
      
      const { data, error } = await supabase.functions.invoke('generate-resume', {
        body: { 
          jobDescription: jobDescription.trim(),
          templateId: selectedTemplate,
          userId: user.id
        }
      });

      console.log('Resume generation response:', {
        error: error,
        hasData: !!data,
        resumeLength: data?.resume?.length,
        resumePreview: data?.resume?.substring(0, 500)
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to generate resume');
      }

      if (!data || !data.resume) {
        throw new Error('No resume content received');
      }

      setProgress(100);
      
      let processedResume = data.resume;
      try {
        processedResume = cleanResumeContent(data.resume);
        console.log('Resume content cleaned successfully');
        
        // CLIENT-SIDE WORKAROUND: Add email to resume if missing
        if (user.email && !processedResume.includes(user.email)) {
          console.log('Adding missing email to resume:', user.email);
          
          // Try to find and enhance the contact section
          const contactRegex = /<div[^>]*class[^>]*contact[^>]*>[\s\S]*?<\/div>/i;
          const headerRegex = /<header[\s\S]*?<\/header>/i;
          const h1Regex = /(<h1[^>]*>.*?<\/h1>)/i;
          
          if (contactRegex.test(processedResume)) {
            // Replace existing contact section to include email
            processedResume = processedResume.replace(contactRegex, (match) => {
              if (!match.includes(user.email)) {
                return match.replace(/(<p[^>]*>)/, `$1${user.email} • `);
              }
              return match;
            });
          } else if (headerRegex.test(processedResume)) {
            // Add email to header section
            processedResume = processedResume.replace(headerRegex, (match) => {
              if (!match.includes(user.email)) {
                return match.replace(/(<\/h1>)/, `$1\n<p>${user.email}</p>`);
              }
              return match;
            });
          } else if (h1Regex.test(processedResume)) {
            // Add email after the first h1 (name)
            processedResume = processedResume.replace(h1Regex, `$1\n<p style="margin-top: 5px; font-size: 14px;">${user.email}</p>`);
          }
          
          console.log('Email injection completed');
        }
        
      } catch (cleanupError) {
        console.warn('Frontend cleanup failed, using original content:', cleanupError);
        processedResume = data.resume;
      }
      
      setTimeout(() => {
        onGenerationComplete(processedResume);
        console.log(`Resume generation completed successfully with ${selectedTemplate} template and user profile data`);
        
        toast({
          title: 'Success',
          description: `Resume generated with ${selectedTemplate} template using your profile data! You can edit the content or try a different template.`,
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
