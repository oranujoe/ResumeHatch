
import React from 'react';
import { CheckCircle, Edit3 } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';

interface ResumeDisplayProps {
  generatedResume: string;
  onResumeEdit: (event: React.FormEvent<HTMLDivElement>) => void;
}

const ResumeDisplay: React.FC<ResumeDisplayProps> = ({ generatedResume, onResumeEdit }) => {
  return (
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
          onInput={onResumeEdit}
          style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            lineHeight: '1.6',
            color: 'hsl(var(--foreground))',
            fontSize: '14px',
          }}
        />
      </GlassCard>
    </div>
  );
};

export default ResumeDisplay;
