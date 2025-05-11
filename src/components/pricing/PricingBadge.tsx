
import React from 'react';

interface PricingBadgeProps {
  text: string;
  className?: string;
}

const PricingBadge = ({ text, className = '' }: PricingBadgeProps) => {
  return (
    <div className={`inline-block bg-blue-50 rounded-full px-4 py-1.5 text-sm font-medium text-blue-700 mb-5 ${className}`}>
      {text}
    </div>
  );
};

export default PricingBadge;
