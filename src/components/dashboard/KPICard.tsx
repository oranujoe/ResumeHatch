
import React from 'react';
import { 
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  trend?: number[];
  subtitle?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon, 
  iconColor,
  trend,
  subtitle
}) => {
  const getTrendIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-2.5 w-2.5" />;
      case 'negative':
        return <TrendingDown className="h-2.5 w-2.5" />;
      default:
        return <Minus className="h-2.5 w-2.5" />;
    }
  };

  const getTrendClasses = () => {
    switch (changeType) {
      case 'positive':
        return 'kpi-trend-positive';
      case 'negative':
        return 'kpi-trend-negative';
      default:
        return 'kpi-trend-neutral';
    }
  };

  return (
    <div className="kpi-card group">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-xl", iconColor)}>
          <Icon className="h-4 w-4 md:h-5 md:w-5 text-white" />
        </div>
        <div className={cn("text-label-small font-medium", getTrendClasses())}>
          {getTrendIcon()}
          <span className="ml-0.5">{change}</span>
        </div>
      </div>
      
      <div className="space-y-1.5">
        <div>
          <p className="text-label-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          {subtitle && (
            <p className="text-body-small text-muted-foreground/80 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="flex items-baseline space-x-1.5">
          <p className="kpi-value">{value}</p>
          {trend && (
            <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-px">
                {trend.map((height, index) => (
                  <div
                    key={index}
                    className="w-0.5 bg-primary/60 rounded-full"
                    style={{ height: `${height * 12}px` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
