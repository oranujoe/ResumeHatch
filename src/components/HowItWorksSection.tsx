
import React, { useState, useEffect, useRef } from 'react';
import { Link, FileText, ChartBar } from 'lucide-react';

const steps = [{
  number: "1",
  title: "Paste job URL",
  description: "Simply paste any job listing URL from LinkedIn, Indeed, or other job boards.",
  icon: Link
}, {
  number: "2",
  title: "AI crafts résumé & letter",
  description: "Our AI analyzes the job and tailors your résumé and cover letter to match the requirements.",
  icon: FileText
}, {
  number: "3",
  title: "One-click apply & track",
  description: "Apply with a single click and track your application status in your personal dashboard.",
  icon: ChartBar
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
    <section ref={sectionRef} id="how-it-works" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 md:py-[80px]">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-5 border border-gray-200 dark:border-gray-700">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            How Resume Hatch Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our streamlined process takes the hassle out of job applications, letting you focus on what matters.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines between steps */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-200 to-orange-200 dark:from-blue-700 dark:to-orange-700 transform -translate-y-1/2 z-0"></div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-orange-200 to-blue-200 dark:from-orange-700 dark:to-blue-700 transform -translate-y-1/2 z-0"></div>

          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`relative z-10 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group cursor-pointer
                ${index === 1 ? 'mt-8 md:mt-12' : ''} 
                ${visibleSteps[index] ? 'animate-fade-in-up' : 'opacity-0'}
                hover:scale-105 hover:-translate-y-2`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mb-6">
                {/* Icon background with enhanced gradient */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300
                  ${index === 0 
                    ? "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700" 
                    : index === 1 
                    ? "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-800 dark:to-orange-700" 
                    : "bg-gradient-to-br from-blue-100 to-purple-200 dark:from-blue-800 dark:to-purple-700"
                  }`}>
                  <step.icon className={`w-6 h-6 transition-all duration-300 group-hover:scale-110
                    ${index === 0 
                      ? "text-blue-600 dark:text-blue-300" 
                      : index === 1 
                      ? "text-orange-600 dark:text-orange-300" 
                      : "text-blue-600 dark:text-blue-300"
                    }`} />
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>

                {/* Step number badge with enhanced styling */}
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transition-all duration-300 group-hover:scale-110
                  ${index === 0 
                    ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                    : index === 1 
                    ? "bg-gradient-to-br from-orange-500 to-orange-600" 
                    : "bg-gradient-to-br from-blue-500 to-purple-600"
                  }`}>
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {step.description}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 dark:from-blue-900/0 dark:to-purple-900/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30 rounded-xl transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
