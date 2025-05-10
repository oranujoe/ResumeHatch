
import React from 'react';

interface PricingBadgeProps {
  text: string;
}

const PricingBadge = ({ text }: PricingBadgeProps) => {
  return (
    <div className="inline-block bg-gray-50 rounded-full px-4 py-1 text-sm font-medium text-gray-700 mb-4">
      {text}
    </div>
  );
};

export default PricingBadge;
