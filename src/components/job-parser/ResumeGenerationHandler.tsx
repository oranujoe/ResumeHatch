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
        
        // Enhanced CLIENT-SIDE WORKAROUND: Add missing contact information
        if (user.email && !processedResume.includes(user.email)) {
          console.log('Adding missing email to resume:', user.email);
          processedResume = addEmailToResume(processedResume, user.email);
        }

        // NEW: Add LinkedIn URL if missing
        const linkedinUrl = await getLinkedInUrlFromProfile(user.id);
        if (linkedinUrl && !processedResume.includes(linkedinUrl)) {
          console.log('Adding missing LinkedIn URL to resume:', linkedinUrl);
          processedResume = addLinkedInToResume(processedResume, linkedinUrl);
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

  // Helper function to get LinkedIn URL from user profile
  const getLinkedInUrlFromProfile = async (userId: string): Promise<string | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('linkedin_url')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching LinkedIn URL:', error);
        return null;
      }

      return data?.linkedin_url || null;
    } catch (error) {
      console.error('Error in getLinkedInUrlFromProfile:', error);
      return null;
    }
  };

  // Helper function to add email to resume
  const addEmailToResume = (resume: string, email: string): string => {
    const contactRegex = /<div[^>]*class[^>]*contact[^>]*>[\s\S]*?<\/div>/i;
    const headerRegex = /<header[\s\S]*?<\/header>/i;
    const h1Regex = /(<h1[^>]*>.*?<\/h1>)/i;
    
    if (contactRegex.test(resume)) {
      // Replace existing contact section to include email
      return resume.replace(contactRegex, (match) => {
        if (!match.includes(email)) {
          return match.replace(/(<p[^>]*>)/, `$1${email} • `);
        }
        return match;
      });
    } else if (headerRegex.test(resume)) {
      // Add email to header section
      return resume.replace(headerRegex, (match) => {
        if (!match.includes(email)) {
          return match.replace(/(<\/h1>)/, `$1\n<p>${email}</p>`);
        }
        return match;
      });
    } else if (h1Regex.test(resume)) {
      // Add email after the first h1 (name)
      return resume.replace(h1Regex, `$1\n<p style="margin-top: 5px; font-size: 14px;">${email}</p>`);
    }
    
    return resume;
  };

  // Helper function to add LinkedIn URL to resume
  const addLinkedInToResume = (resume: string, linkedinUrl: string): string => {
    // Clean the LinkedIn URL (remove trailing slashes, ensure proper format)
    const cleanLinkedInUrl = linkedinUrl.replace(/\/$/, '');
    
    // Different strategies to add LinkedIn URL
    const contactRegex = /<div[^>]*class[^>]*contact[^>]*>[\s\S]*?<\/div>/i;
    const headerRegex = /<header[\s\S]*?<\/header>/i;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
    
    // Strategy 1: Add to existing contact section
    if (contactRegex.test(resume)) {
      return resume.replace(contactRegex, (match) => {
        // Add LinkedIn URL to the contact section
        if (match.includes('</div>')) {
          return match.replace('</div>', `<p><a href="${cleanLinkedInUrl}" target="_blank" rel="noopener noreferrer">${cleanLinkedInUrl}</a></p></div>`);
        }
        return match;
      });
    }
    
    // Strategy 2: Add to header section
    if (headerRegex.test(resume)) {
      return resume.replace(headerRegex, (match) => {
        if (match.includes('</header>')) {
          return match.replace('</header>', `<p><a href="${cleanLinkedInUrl}" target="_blank" rel="noopener noreferrer">${cleanLinkedInUrl}</a></p></header>`);
        }
        return match;
      });
    }
    
    // Strategy 3: Add after email if found
    if (emailRegex.test(resume)) {
      return resume.replace(emailRegex, (match) => {
        return `${match} • <a href="${cleanLinkedInUrl}" target="_blank" rel="noopener noreferrer">${cleanLinkedInUrl}</a>`;
      });
    }
    
    // Strategy 4: Add at the beginning of the resume content
    const nameRegex = /(<h1[^>]*>.*?<\/h1>)/i;
    if (nameRegex.test(resume)) {
      return resume.replace(nameRegex, `$1\n<p style="margin-top: 5px; font-size: 14px;"><a href="${cleanLinkedInUrl}" target="_blank" rel="noopener noreferrer">${cleanLinkedInUrl}</a></p>`);
    }
    
    return resume;
  };

  return { generateResume };
};