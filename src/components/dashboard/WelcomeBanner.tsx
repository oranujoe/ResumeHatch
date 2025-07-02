
import React from 'react';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WelcomeBannerProps {
  onClose: () => void;
  className?: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onClose, className }) => {
  return (
    <div className={cn(
      "relative p-3 md:p-4 rounded-xl border-l-4 border-l-warning-primary",
      "bg-gradient-to-r from-warning-light to-warning-light/50 border border-warning-primary/20",
      className
    )}>
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-warning-primary to-warning-secondary rounded-xl flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-headline-small font-bold text-foreground flex items-center space-x-2">
              <span>Welcome to ResumeHatch!</span>
              <span className="text-xl">👋</span>
            </h2>
            <button
              onClick={onClose}
              className="touch-friendly p-0.5 hover:bg-warning-primary/10 rounded-lg transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
          
          <p className="text-body-medium text-foreground/80 mb-3 leading-relaxed">
            Get started by parsing your first job listing or uploading your resume. 
            Our AI will help you create compelling applications that stand out.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button className="btn-primary px-3 py-1.5 text-label-medium flex items-center justify-center space-x-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Quick Start Guide</span>
            </button>
            <button className="btn-outline px-3 py-1.5 text-label-medium">
              Take a Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
