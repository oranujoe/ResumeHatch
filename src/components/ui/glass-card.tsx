import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, hover = true }) => {
  return (
    <div className={cn(
      'glass-card',
      hover && 'glass-card-hover',
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard; 