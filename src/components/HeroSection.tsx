
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import WaitlistDialog from './WaitlistDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import PricingBadge from './pricing/PricingBadge';

const HeroSection = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isYellowShapeActive, setIsYellowShapeActive] = useState(false);
  const isMobile = useIsMobile();

  const handleYellowShapeClick = () => {
    setIsYellowShapeActive(!isYellowShapeActive);
  };

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
            <div className="mb-2">
              <PricingBadge text="Launching Soon • Join the Waitlist" className="bg-blue-100/90 text-blue-800 font-medium" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Get Your Dream Job with <span className="text-brand-blue">AI-Powered</span> Applications
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Paste any job link, let our AI craft a perfectly tailored résumé and cover letter, 
              then apply with a single click — all while tracking every application in your personal dashboard.
            </p>
            <div className="pt-6 space-x-4 flex flex-wrap gap-4">
              <Button 
                className="bg-brand-blue hover:bg-blue-700 text-white h-12 px-8 rounded-md text-lg"
                onClick={() => setIsWaitlistOpen(true)}
              >
                Join the Waitlist
              </Button>
              <Button variant="outline" className="h-12 px-8 rounded-md text-lg">
                See How it Works
              </Button>
            </div>
            <div className="flex space-x-12 pt-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue">93%</div>
                <div className="text-sm text-gray-500 mt-1">Success rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue">2.5x</div>
                <div className="text-sm text-gray-500 mt-1">More interviews</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue">5min</div>
                <div className="text-sm text-gray-500 mt-1">Average setup</div>
              </div>
            </div>
          </div>
          
          {/* Apply negative margin top only on desktop screens */}
          <div className={`w-full lg:w-1/2 relative ${!isMobile ? 'lg:-mt-24' : ''}`}>
            <div className="bg-white rounded-lg shadow-xl p-4 transform rotate-1 relative z-10">
              <div className="bg-blue-50 rounded-lg p-2">
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="h-3 w-40 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                    <div className="flex justify-around p-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="h-10 w-10 bg-gray-100 rounded"></div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="h-10 w-10 bg-gray-100 rounded"></div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="h-10 w-10 bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Made the yellow shape interactive with hover and click effects */}
            <div 
              onClick={handleYellowShapeClick}
              className={`absolute -bottom-6 -right-6 w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center 
                cursor-pointer transition-all duration-300 hover:scale-110 
                ${isYellowShapeActive ? 'animate-pulse bg-yellow-400 shadow-lg scale-110' : ''}`}
            >
              <div className={`text-white text-xl font-bold transition-all ${isYellowShapeActive ? 'scale-110' : ''}`}>
                AI
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <WaitlistDialog 
        open={isWaitlistOpen}
        onOpenChange={setIsWaitlistOpen}
      />
    </section>
  );
};

export default HeroSection;
