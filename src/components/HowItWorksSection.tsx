
import React, { useState, useEffect, useRef } from 'react';
import { Chrome, Zap, ChartBar } from 'lucide-react';

const steps = [{
  number: "1",
  title: "One-Click Job Capture",
  description: "Install our Chrome extension and capture any job from LinkedIn instantly. No more copying URLs - just click and capture.",
  icon: Chrome,
  highlight: "Browser Extension"
}, {
  number: "2",
  title: "AI Reverse-Engineers Job",
  description: "Our AI analyzes job requirements, company culture, and industry standards to craft a perfectly tailored résumé and cover letter.",
  icon: Zap,
  highlight: "Smart Analysis"
}, {
  number: "3",
  title: "ATS-Optimized & Apply",
  description: "Get your optimized résumé instantly, apply with confidence, and track everything in your personal dashboard.",
  icon: ChartBar,
  highlight: "Instant Results"
}];

const HowItWorksSection = () => {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([false, false, false]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the animation of steps
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps(prev => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 md:py-[80px]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-orange-50 to-blue-50 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 mb-5 border border-orange-200">
            🚀 Lightning-Fast Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            From Job Posting to Perfect Application in 30 Seconds
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our revolutionary browser extension and AI technology transforms how you apply for jobs. 
            No more manual work - just instant, professional applications.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines between steps */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-orange-200 to-blue-200 transform -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`relative z-10 bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 group cursor-pointer
                ${index === 1 ? 'mt-8 md:mt-12' : ''} 
                ${visibleSteps[index] ? 'animate-fade-in-up' : 'opacity-0'}
                hover:scale-105 hover:-translate-y-2`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Highlight badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white shadow-md
                  ${index === 0 
                    ? "bg-gradient-to-r from-orange-500 to-red-500" 
                    : index === 1 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500" 
                    : "bg-gradient-to-r from-green-500 to-teal-500"
                  }`}>
                  {step.highlight}
                </span>
              </div>

              <div className="relative mb-6 mt-4">
                {/* Icon background with enhanced gradient */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300
                  ${index === 0 
                    ? "bg-gradient-to-br from-orange-100 to-red-200" 
                    : index === 1 
                    ? "bg-gradient-to-br from-blue-100 to-purple-200" 
                    : "bg-gradient-to-br from-green-100 to-teal-200"
                  }`}>
                  <step.icon className={`w-6 h-6 transition-all duration-300 group-hover:scale-110
                    ${index === 0 
                      ? "text-orange-600" 
                      : index === 1 
                      ? "text-blue-600" 
                      : "text-green-600"
                    }`} />
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Step number badge with enhanced styling */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-300 group-hover:scale-110
                  ${index === 0 
                    ? "bg-gradient-to-br from-orange-500 to-red-600" 
                    : index === 1 
                    ? "bg-gradient-to-br from-blue-500 to-purple-600" 
                    : "bg-gradient-to-br from-green-500 to-teal-600"
                  }`}>
                  {step.number}
                </div>
              </div>

              <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300
                ${index === 0 
                  ? "group-hover:text-orange-600" 
                  : index === 1 
                  ? "group-hover:text-blue-600" 
                  : "group-hover:text-green-600"
                }`}>
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 rounded-xl transition-all duration-500 pointer-events-none
                ${index === 0 
                  ? "bg-gradient-to-br from-orange-50/0 to-red-50/0 group-hover:from-orange-50/30 group-hover:to-red-50/30" 
                  : index === 1 
                  ? "bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30" 
                  : "bg-gradient-to-br from-green-50/0 to-teal-50/0 group-hover:from-green-50/30 group-hover:to-teal-50/30"
                }`}>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl p-8 border border-orange-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Why Our Browser Extension Changes Everything
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Instant Job Intelligence:</strong>
                  <span className="text-gray-600 ml-1">Automatically extracts company info, job requirements, and keywords</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Zero Manual Work:</strong>
                  <span className="text-gray-600 ml-1">No copying, pasting, or manual data entry required</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Works Everywhere:</strong>
                  <span className="text-gray-600 ml-1">LinkedIn, Indeed, company career pages - capture from any site</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Privacy First:</strong>
                  <span className="text-gray-600 ml-1">Your data stays secure, we only access job postings you choose</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
