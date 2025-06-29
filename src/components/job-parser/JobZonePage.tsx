
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileDown, Loader2, Copy, Sparkles, Edit3, CheckCircle } from 'lucide-react';
import { parseHTMLToPDFSections, generatePDFFromSections } from '@/utils/pdfGenerator';
import GlassCard from '@/components/ui/glass-card';

const JobZonePage = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState('');
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
        setGeneratedResume(data.resume);
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

  const wordCount = jobDescription.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Enhanced Header Section */}
      <div className="space-y-2">
        <h1 className="text-display-medium text-foreground">AI Resume Generator</h1>
        <p className="text-body-large text-muted-foreground max-w-2xl">
          Transform any job description into an ATS-optimized resume tailored specifically for that role. 
          Our AI analyzes requirements and creates compelling, keyword-rich content that gets noticed.
        </p>
      </div>

      {/* Job Description Input Section */}
      <GlassCard className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="jdInput" className="text-headline-small font-semibold">
              Job Description
            </Label>
            <div className="flex items-center space-x-4 text-label-medium text-muted-foreground">
              <span>{wordCount} words</span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                Recommended: 100+ words
              </span>
            </div>
          </div>
          
          <Textarea
            id="jdInput"
            placeholder="Paste the complete job description here including requirements, responsibilities, and qualifications..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={12}
            className="w-full resize-none border-muted-foreground/20 focus:border-primary/50 transition-colors"
          />
          
          <div className="flex items-center space-x-2 text-label-small text-muted-foreground">
            <Sparkles className="h-3 w-3 text-primary" />
            <span>Tip: Include the full job posting for best results</span>
          </div>
        </div>
      </GlassCard>

      {/* Generate Button Section */}
      <div className="flex flex-col space-y-4">
        <Button
          id="generateBtn"
          onClick={generateResume}
          disabled={isGenerating || !jobDescription.trim() || wordCount < 10}
          size="lg"
          className="w-full sm:w-auto btn-primary"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing & Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Resume
            </>
          )}
        </Button>
        
        {isGenerating && (
          <GlassCard className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-label-medium">
                <span className="text-muted-foreground">Processing job requirements...</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </GlassCard>
        )}
      </div>

      {/* Enhanced Resume Display */}
      {showResume && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Resume Header Card */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success-primary" />
                  <h2 className="text-headline-medium font-semibold">Generated Resume</h2>
                </div>
                <p className="text-body-medium text-muted-foreground">
                  Click anywhere in the resume below to edit content directly
                </p>
              </div>
              <div className="flex items-center space-x-2 text-label-small text-muted-foreground">
                <Edit3 className="h-3 w-3" />
                <span>Live editing enabled</span>
              </div>
            </div>
          </GlassCard>
          
          {/* Resume Content */}
          <GlassCard className="p-8">
            <div
              id="resumeOutput"
              className="w-full max-w-4xl mx-auto min-h-[600px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 rounded-lg transition-all duration-200"
              contentEditable
              dangerouslySetInnerHTML={{ __html: generatedResume }}
              onInput={handleResumeEdit}
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                lineHeight: '1.6',
                color: 'hsl(var(--foreground))',
                fontSize: '14px',
              }}
            />
          </GlassCard>

          {/* Action Buttons */}
          <GlassCard className="p-6">
            <div className="space-y-4">
              <h3 className="text-title-large font-medium">Export Options</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  id="downloadBtn"
                  onClick={downloadPDF}
                  variant="default"
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="lg"
                  className="flex-1 sm:flex-none"
                >
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </Button>
              </div>
              <p className="text-label-small text-muted-foreground">
                PDF exports preserve formatting and are ATS-friendly. Text copy is perfect for online applications.
              </p>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default JobZonePage;
