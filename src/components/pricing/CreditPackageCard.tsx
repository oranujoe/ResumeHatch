
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export interface CreditPackage {
  name: string;
  credits: number | string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
}

interface CreditPackageCardProps {
  package: CreditPackage;
  onButtonClick: () => void;
}

const CreditPackageCard = ({ package: pack, onButtonClick }: CreditPackageCardProps) => {
  return (
    <div className={`
      bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:border-brand-blue
      ${pack.popular ? 'border-brand-blue' : 'border-gray-100'}
    `}>
      {pack.popular && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
        <div className="text-3xl font-bold">{pack.price}</div>
        <div className="inline-block bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm mt-2">
          {typeof pack.credits === 'number' ? `${pack.credits} Credits` : pack.credits}
        </div>
        <div className="mt-3 text-gray-600 min-h-[50px]">{pack.description}</div>
      </div>
      
      <div className="border-t border-b border-gray-100 py-6 mb-6">
        <ul className="space-y-3">
          {pack.features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-start">
              <div className="mr-3 text-brand-blue mt-1">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-center">
        <Button 
          className={`w-full transition-colors duration-300 ${
            pack.popular 
              ? 'bg-brand-blue hover:bg-blue-700 text-white' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 hover:bg-brand-blue hover:text-white'
          }`} 
          onClick={pack.buttonText === "Contact Sales" ? undefined : onButtonClick}
        >
          {pack.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default CreditPackageCard;
