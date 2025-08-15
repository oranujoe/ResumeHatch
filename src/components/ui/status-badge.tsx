import React from 'react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'pending' | 'draft';
  children: React.ReactNode;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, children, className }) => {
  const statusClasses = {
    applied: 'status-applied',
    interview: 'status-interview',
    offer: 'status-offer',
    rejected: 'status-rejected',
    pending: 'status-pending',
    draft: 'status-draft'
  };

  return (
    <span className={cn(
      'px-3 py-1 rounded-full text-xs font-medium',
      statusClasses[status],
      className
    )}>
      {children}
    </span>
  );
};

export default StatusBadge; 