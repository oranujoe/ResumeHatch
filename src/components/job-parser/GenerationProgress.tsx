
import React from 'react';
import { Progress } from '@/components/ui/progress';
import GlassCard from '@/components/ui/glass-card';

interface GenerationProgressProps {
  isVisible: boolean;
  progress: number;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ isVisible, progress }) => {
  if (!isVisible) return null;

  return (
    <GlassCard className="p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-label-medium">
          <span className="text-muted-foreground">Processing job requirements...</span>
          <span className="text-primary font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </GlassCard>
  );
};

export default GenerationProgress;
