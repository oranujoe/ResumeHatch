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
  return <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white md:py-[60px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
            <div className="mb-2">
              <PricingBadge text="Launching Soon • Join the Waitlist" className="!bg-blue-100 !text-blue-800 font-medium" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Get Your Dream Job with <span className="text-brand-blue">AI-Powered</span> Applications
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">Paste any job link, and let our AI craft an ATS-optimised résumé and cover letter, then apply with a single click — all while tracking every application in your personal dashboard.</p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button className="bg-brand-blue hover:bg-blue-700 text-white h-12 px-8 rounded-md text-lg" onClick={() => setIsWaitlistOpen(true)}>
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
                <img src="/lovable-uploads/b0f9a358-8da1-41c2-97a4-89a06e01942c.png" alt="ResumeHatch Dashboard Preview" className="w-full h-auto rounded-lg shadow-sm" />
              </div>
            </div>
            
            {/* Made the yellow shape interactive with hover and click effects */}
            <div onClick={handleYellowShapeClick} className={`absolute -bottom-6 -right-6 w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center 
                cursor-pointer transition-all duration-300 hover:scale-110 
                ${isYellowShapeActive ? 'animate-pulse bg-yellow-400 shadow-lg scale-110' : ''}`}>
              <div className={`text-white text-xl font-bold transition-all ${isYellowShapeActive ? 'scale-110' : ''}`}>
                AI
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>;
};
export default HeroSection;