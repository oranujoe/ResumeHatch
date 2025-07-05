
import React from 'react';
import { toast } from '@/hooks/use-toast';
import { parseHTMLToPDFSections, generatePDFFromSections } from '@/utils/pdfGenerator';

export const useResumeExport = (selectedTemplate?: string) => {
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

      // Pass the selected template to PDF generator
      generatePDFFromSections(sections, 'resume.pdf', selectedTemplate || 'modern');
      
      toast({
        title: 'Success',
        description: 'PDF downloaded successfully!',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Enhanced error logging for debugging
      if (error instanceof Error) {
        console.error('PDF Generation Error Details:', {
          message: error.message,
          stack: error.stack,
          templateId: selectedTemplate,
          resumeContent: resumeElement.innerHTML.substring(0, 500) + '...'
        });
      }
      
      // Try to provide more specific error information
      let errorMessage = 'Failed to generate PDF. Please try the copy option instead.';
      if (error instanceof Error) {
        if (error.message.includes('template')) {
          errorMessage = `Template "${selectedTemplate}" has formatting issues. Try selecting a different template.`;
        } else if (error.message.includes('parsing') || error.message.includes('section')) {
          errorMessage = 'Resume content could not be processed. Try editing your resume content and try again.';
        }
      }
      
      toast({
        title: 'PDF Generation Failed',
        description: errorMessage,
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

  return { downloadPDF, copyToClipboard };
};
