
import React from 'react';
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
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-block bg-gray-50 rounded-full px-4 py-1.5 text-sm font-medium text-gray-700 mb-5">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How Resume Hatch Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined process takes the hassle out of job applications, letting you focus on what matters.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100 ${index === 1 ? 'mt-8 md:mt-12' : ''}`}
            >
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${index === 0 ? "bg-blue-100" : index === 1 ? "bg-orange-100" : "bg-blue-100"}`}>
                  <step.icon className={`w-6 h-6 ${index === 0 ? "text-blue-500" : index === 1 ? "text-orange-500" : "text-blue-500"}`} />
                </div>
                <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? "bg-blue-500" : index === 1 ? "bg-orange-500" : "bg-blue-500"} text-white font-bold text-sm`}>
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
