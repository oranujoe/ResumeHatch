
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
    <div className="glass-card glass-card-hover p-4 md:p-6 rounded-xl group cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-4">
        <div className={cn("p-3 rounded-xl shadow-lg relative", iconColor)}>
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
          {isNew && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning-primary rounded-full animate-pulse-glow">
              <Sparkles className="h-2 w-2 text-white absolute top-0.5 left-0.5" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-title-medium font-semibold text-foreground">
              {title}
            </h3>
            {isNew && (
              <span className="px-2 py-1 bg-warning-light text-warning-primary rounded-full text-label-small font-medium">
                New
              </span>
            )}
          </div>
          <p className="text-body-small text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>
          <button className="btn-primary px-4 py-2 text-label-medium group-hover:shadow-lg transition-all duration-200 flex items-center space-x-2">
            <span>{action}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;
