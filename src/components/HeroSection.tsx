
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import PricingBadge from './pricing/PricingBadge';
import { Download, Chrome } from 'lucide-react';

const HeroSection = () => {
  const [isYellowShapeActive, setIsYellowShapeActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleYellowShapeClick = () => {
    setIsYellowShapeActive(!isYellowShapeActive);
  };

  const handleSeeHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleJoinBeta = () => {
    window.location.href = '/auth';
  };

  const handleInstallExtension = () => {
    // TODO: Replace with actual Chrome Web Store URL when published
    window.open('https://chrome.google.com/webstore/', '_blank');
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 md:py-[60px]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-yellow-100 to-orange-100 rounded-full opacity-40 animate-bounce-gentle"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-6 mb-12 lg:mb-0 pr-0 lg:pr-12">
            {/* Badge with animation */}
            <div className={`mb-2 transition-all duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="flex flex-wrap gap-2">
                <PricingBadge text="Live Beta • Start Today" className="!bg-gradient-to-r !from-green-100 !to-blue-100 !text-green-800 font-medium border border-green-200 hover:shadow-lg transition-all duration-300" />
                <PricingBadge text="🔥 Chrome Extension Available" className="!bg-gradient-to-r !from-orange-100 !to-red-100 !text-orange-800 font-medium border border-orange-200 hover:shadow-lg transition-all duration-300" />
              </div>
            </div>

            {/* Main Headline with gradient text and staggered animation */}
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-200 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              Instantly Capture Any Job & Get{' '}
              <span className="bg-gradient-to-r from-brand-blue via-purple-600 to-brand-blue bg-clip-text text-transparent animate-gradient-x">
                ATS-Optimized
              </span>{' '}
              Résumés in Seconds
            </h1>

            {/* Description with animation */}
            <p className={`text-xl text-gray-600 leading-relaxed max-w-xl transition-all duration-700 delay-400 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              One-click capture any job from LinkedIn with our browser extension. Our AI reverse-engineers job requirements to craft perfectly tailored résumés and cover letters that beat ATS systems.
            </p>

            {/* CTA Buttons with enhanced styling and animation */}
            <div className={`pt-6 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-600 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Button 
                className="relative overflow-hidden bg-gradient-to-r from-brand-blue to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 px-8 rounded-md text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group" 
                onClick={handleJoinBeta}
              >
                <span className="relative z-10">Join Beta Now</span>
                <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 px-6 rounded-md text-lg border-2 border-orange-300 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2" 
                onClick={handleInstallExtension}
              >
                <Chrome className="w-5 h-5" />
                Install Extension
              </Button>
            </div>

            {/* Alternative CTA */}
            <div className={`pt-2 transition-all duration-700 delay-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <Button 
                variant="ghost" 
                className="text-gray-600 hover:text-brand-blue underline decoration-dotted underline-offset-4 font-medium" 
                onClick={handleSeeHowItWorks}
              >
                See How it Works →
              </Button>
            </div>

            {/* Stats with enhanced animation */}
            <div className={`flex space-x-12 pt-8 transition-all duration-700 delay-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-blue to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">93%</div>
                <div className="text-sm text-gray-500 mt-1">ATS Pass Rate</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-blue to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">3x</div>
                <div className="text-sm text-gray-500 mt-1">Faster Applications</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-brand-blue to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">30s</div>
                <div className="text-sm text-gray-500 mt-1">Job to Resume</div>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview with enhanced animations */}
          <div className={`w-full lg:w-1/2 relative transition-all duration-700 delay-1000 ${!isMobile ? 'lg:-mt-24' : ''} ${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Main dashboard card with floating animation */}
              <div className="bg-white rounded-xl shadow-2xl p-4 transform rotate-1 relative z-10 hover:shadow-3xl transition-all duration-500 animate-float">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-2 relative overflow-hidden">
                  <img src="/lovable-uploads/b0f9a358-8da1-41c2-97a4-89a06e01942c.png" alt="ResumeHatch Dashboard Preview" className="w-full h-auto rounded-lg shadow-sm hover:scale-105 transition-transform duration-700" />
                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 rounded-lg"></div>
                </div>
              </div>
              
              {/* Enhanced AI shape with advanced interactions */}
              <div 
                onClick={handleYellowShapeClick} 
                className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full flex items-center justify-center 
                  cursor-pointer transition-all duration-500 hover:scale-125 group
                  ${isYellowShapeActive ? 'bg-gradient-to-br from-yellow-400 to-orange-400 animate-pulse-glow shadow-2xl scale-125' : 'bg-gradient-to-br from-brand-yellow to-orange-500 hover:shadow-xl'}`}
              >
                <div className={`text-white text-xl font-bold transition-all duration-300 ${isYellowShapeActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  AI
                </div>
                {/* Ripple effect */}
                {isYellowShapeActive && <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping"></div>}
              </div>

              {/* Browser Extension Badge */}
              <div className="absolute -top-4 -left-4 bg-white rounded-full p-3 shadow-lg border border-gray-200 animate-bounce-gentle">
                <Chrome className="w-6 h-6 text-blue-600" />
              </div>

              {/* Floating elements around the dashboard */}
              <div className="absolute -top-4 right-1/4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce-gentle opacity-60"></div>
              <div className="absolute top-1/4 -right-8 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float opacity-50"></div>
              <div className="absolute bottom-1/4 -left-6 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce-gentle opacity-40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
