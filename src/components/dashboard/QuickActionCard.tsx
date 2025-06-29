
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  action: string;
  isNew?: boolean;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor, 
  action,
  isNew = false,
  onClick
}) => {
  return (
    <div className="glass-card glass-card-hover p-3 md:p-4 rounded-xl group cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-3">
        <div className={cn("p-2.5 rounded-xl relative", iconColor)}>
          <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
          {isNew && (
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-warning-primary rounded-full animate-pulse-glow">
              <Sparkles className="h-1.5 w-1.5 text-white absolute top-0.5 left-0.5" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="text-title-medium font-semibold text-foreground">
              {title}
            </h3>
            {isNew && (
              <span className="px-1.5 py-0.5 bg-warning-light text-warning-primary rounded-full text-label-small font-medium">
                New
              </span>
            )}
          </div>
          <p className="text-body-small text-muted-foreground mb-3 leading-relaxed">
            {description}
          </p>
          <button className="btn-primary px-3 py-1.5 text-label-medium group-hover:bg-primary/80 transition-all duration-200 flex items-center space-x-1.5">
            <span>{action}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
