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

      // Enhanced HTML processing to ensure LinkedIn URLs are preserved
      const enhancedHTML = preprocessHTMLForPDF(resumeElement.innerHTML);
      
      const sections = parseHTMLToPDFSections(enhancedHTML);
      
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
      let plainText = resumeElement.innerText || resumeElement.textContent || '';
      
      if (!plainText.trim()) {
        throw new Error('No text content found');
      }

      // Enhanced text processing to preserve LinkedIn URLs
      plainText = processTextForClipboard(plainText, resumeElement.innerHTML);

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

  // Helper function to preprocess HTML for PDF generation
  const preprocessHTMLForPDF = (html: string): string => {
    // Ensure LinkedIn URLs are properly formatted for PDF
    const linkedinRegex = /<a[^>]*href=["']([^"']*linkedin\.com[^"']*)["'][^>]*>([^<]*)<\/a>/gi;
    
    return html.replace(linkedinRegex, (match, url, text) => {
      // Ensure the URL is absolute
      const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
      
      // For PDF, we want to show the URL as clickable text
      return `<a href="${absoluteUrl}" target="_blank" rel="noopener noreferrer">${text || absoluteUrl}</a>`;
    });
  };

  // Helper function to process text for clipboard with LinkedIn URLs
  const processTextForClipboard = (plainText: string, html: string): string => {
    // Extract LinkedIn URLs from HTML and add them to plain text if missing
    const linkedinRegex = /<a[^>]*href=["']([^"']*linkedin\.com[^"']*)["'][^>]*>([^<]*)<\/a>/gi;
    const linkedinUrls: string[] = [];
    
    let match;
    while ((match = linkedinRegex.exec(html)) !== null) {
      const url = match[1];
      const absoluteUrl = url.startsWith('http') ? url : `https://${url}`;
      
      if (!linkedinUrls.includes(absoluteUrl)) {
        linkedinUrls.push(absoluteUrl);
      }
    }

    // If we found LinkedIn URLs in HTML but they're not in plain text, add them
    linkedinUrls.forEach(url => {
      if (!plainText.includes(url)) {
        // Find a good place to insert the LinkedIn URL
        const lines = plainText.split('\n');
        let insertIndex = -1;
        
        // Try to find contact section or after name/email
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].toLowerCase();
          if (line.includes('@') || line.includes('phone') || line.includes('email')) {
            insertIndex = i;
            break;
          }
        }
        
        if (insertIndex === -1) {
          // If no contact section found, add after first few lines (likely name/title)
          insertIndex = Math.min(2, lines.length - 1);
        }
        
        // Insert the LinkedIn URL
        lines.splice(insertIndex + 1, 0, url);
        plainText = lines.join('\n');
      }
    });

    return plainText;
  };

  return { downloadPDF, copyToClipboard };
};