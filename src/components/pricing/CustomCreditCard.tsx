
import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";

interface CustomCreditCardProps {
  creditCount: number;
  setCreditCount: (value: number) => void;
  documentCounts: {
    resumes: number;
    coverLetters: number;
    applications: number;
  };
  calculatePrice: (credits: number) => string;
  onButtonClick: () => void;
}

const CustomCreditCard = ({ 
  creditCount, 
  setCreditCount, 
  documentCounts, 
  calculatePrice, 
  onButtonClick 
}: CustomCreditCardProps) => {
  return (
    <Card className="shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)] border-0">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-center">Custom Credit Package</h3>
        <p className="text-gray-600 text-center mb-10">Choose exactly how many credits you need</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-medium">Credits: {creditCount}</span>
          <span className="text-xl font-bold text-brand-blue">₦{calculatePrice(creditCount)}</span>
        </div>
        
        <div className="mb-10">
          <Slider 
            value={[creditCount]} 
            min={10} 
            max={200} 
            step={5} 
            className="my-5" 
            onValueChange={value => setCreditCount(value[0])} 
          />
        </div>
        
        <div className="grid grid-cols-3 gap-5 mb-10">
          <div className="bg-blue-50 p-5 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">
              {documentCounts.resumes}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Résumés
            </div>
          </div>
          <div className="bg-amber-50 p-5 rounded-lg text-center">
            <div className="text-2xl font-bold text-amber-600">
              {documentCounts.coverLetters}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Cover Letters
            </div>
          </div>
          <div className="bg-sky-50 p-5 rounded-lg text-center">
            <div className="text-2xl font-bold text-sky-600">
              {documentCounts.applications}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Applications
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-brand-blue hover:bg-blue-700 text-white flex items-center justify-center text-lg py-6" 
          onClick={onButtonClick}
        >
          Join waitlist
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomCreditCard;
