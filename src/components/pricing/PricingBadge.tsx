
import React from 'react';

interface PricingBadgeProps {
  text: string;
  className?: string;
}

const PricingBadge = ({ text, className = '' }: PricingBadgeProps) => {
  // Remove the default gray styling from the base classes
  // This way custom styles will be more likely to take effect
  return (
    <div className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium mb-5 ${className}`}>
      {text}
    </div>
  );
};

export default PricingBadge;
