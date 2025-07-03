
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SoonBadgeProps {
  className?: string;
}

export const SoonBadge: React.FC<SoonBadgeProps> = ({ className }) => {
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "text-[10px] px-1.5 py-0 h-4 rounded-full",
        "border-muted-foreground/30 text-muted-foreground/70",
        "bg-muted/30",
        className
      )}
    >
      Soon
    </Badge>
  );
};
