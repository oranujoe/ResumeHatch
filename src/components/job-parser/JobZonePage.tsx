import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileDown, Loader2, Copy } from 'lucide-react';
import { parseHTMLToPDFSections, generatePDFFromSections } from '@/utils/pdfGenerator';

const JobZonePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(false);

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

      setGeneratedResume(data.resume);
      setShowResume(true);
      
      toast({
        title: 'Success',
        description: 'Resume generated successfully! You can now edit it and download as PDF.',
      });

    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate resume. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
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

    // Check if there's actual content
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

      // Parse HTML content to structured sections
      const sections = parseHTMLToPDFSections(resumeElement.innerHTML);
      
      if (sections.length === 0) {
        throw new Error('No content could be extracted from the resume');
      }

      // Generate PDF using jsPDF
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
      // Extract plain text from HTML
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Job Zone</h1>
        <p className="text-muted-foreground">
          Generate ATS-optimized resumes tailored to specific job descriptions using AI.
        </p>
      </div>

      {/* Job Description Input Section */}
      <div className="space-y-2">
        <Label htmlFor="jdInput" className="text-base font-medium">
          Job Description
        </Label>
        <Textarea
          id="jdInput"
          placeholder="Paste the job description here…"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={12}
          className="w-full resize-none"
        />
      </div>

      {/* Generate Button */}
      <Button
        id="generateBtn"
        onClick={generateResume}
        disabled={isGenerating || !jobDescription.trim()}
        className="w-full sm:w-auto"
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating…
          </>
        ) : (
          'Generate Résumé'
        )}
      </Button>

      {/* Editable Resume Display */}
      {showResume && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Generated Resume</h2>
            <p className="text-sm text-muted-foreground">
              Click to edit the content below
            </p>
          </div>
          
          <div
            id="resumeOutput"
            className="resume-block w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg p-8 min-h-[600px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent print:border-0 print:shadow-none"
            contentEditable
            dangerouslySetInnerHTML={{ __html: generatedResume }}
            onInput={handleResumeEdit}
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              lineHeight: '1.5',
              color: '#000',
              fontSize: '14px',
            }}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              id="downloadBtn"
              onClick={downloadPDF}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Text
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobZonePage;
