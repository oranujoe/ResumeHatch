
import React from 'react';
import { Zap, CreditCard, Sparkles } from 'lucide-react';

interface PricingFeatureProps {
  icon: 'zap' | 'creditCard' | 'sparkles';
  text: string;
}

const PricingFeature = ({ icon, text }: PricingFeatureProps) => {
  const icons = {
    zap: <Zap className="h-5 w-5 text-green-600" />,
    creditCard: <CreditCard className="h-5 w-5 text-green-600" />,
    sparkles: <Sparkles className="h-5 w-5 text-green-600" />
  };

  return (
    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg w-full md:w-auto">
      <div className="bg-green-100 p-2 rounded-full">
        {icons[icon]}
      </div>
      <span className="text-sm text-green-800">{text}</span>
    </div>
  );
};

export default PricingFeature;
