
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileDown, Loader2 } from 'lucide-react';

// Import html2pdf for client-side PDF generation
declare global {
  interface Window {
    html2pdf: any;
  }
}

const JobZonePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(false);

  // Load html2pdf script dynamically
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

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
    
    if (!resumeElement || !window.html2pdf) {
      toast({
        title: 'Error',
        description: 'PDF library not loaded. Please refresh the page and try again.',
        variant: 'destructive',
      });
      return;
    }

    try {
      toast({
        title: 'Generating PDF',
        description: 'Please wait while we create your PDF...',
      });

      const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await window.html2pdf().set(opt).from(resumeElement).save();
      
      toast({
        title: 'Success',
        description: 'PDF downloaded successfully!',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
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
            className="resume-block w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-lg p-6 min-h-[600px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            contentEditable
            dangerouslySetInnerHTML={{ __html: generatedResume }}
            onInput={handleResumeEdit}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.6',
              color: '#000',
            }}
          />

          {/* Download Button */}
          <Button
            id="downloadBtn"
            onClick={downloadPDF}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobZonePage;
