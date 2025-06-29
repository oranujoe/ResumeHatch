
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  setJobDescription,
  isGenerating,
  onGenerate
}) => {
  const wordCount = jobDescription.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-6">
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
          onClick={onGenerate}
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
      </div>
    </div>
  );
};

export default JobDescriptionInput;
