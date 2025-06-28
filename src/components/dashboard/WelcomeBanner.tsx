
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
      "relative glass-card p-4 md:p-6 rounded-2xl border-l-4 border-l-warning-primary",
      "bg-gradient-to-r from-warning-light to-warning-light/50",
      className
    )}>
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-warning-primary to-warning-secondary rounded-xl flex items-center justify-center">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-headline-small font-bold text-foreground flex items-center space-x-2">
              <span>Welcome to ResumeHatch!</span>
              <span className="text-2xl">👋</span>
            </h2>
            <button
              onClick={onClose}
              className="touch-friendly p-1 hover:bg-warning-primary/10 rounded-lg transition-colors"
              aria-label="Close banner"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <p className="text-body-medium text-foreground/80 mb-4 leading-relaxed">
            Get started by parsing your first job listing or uploading your resume. 
            Our AI will help you create compelling applications that stand out.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-primary px-4 py-2 text-label-medium flex items-center justify-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>Quick Start Guide</span>
            </button>
            <button className="btn-outline px-4 py-2 text-label-medium">
              Take a Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
