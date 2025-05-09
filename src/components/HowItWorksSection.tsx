
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Paste Job URL",
    description: "Just copy and paste the job listing URL into our platform, and our AI gets to work analyzing the key requirements."
  },
  {
    number: "02", 
    title: "AI Tailors Your CV",
    description: "Our intelligent system matches your skills and experience to the job requirements to create a perfectly tailored resume."
  },
  {
    number: "03",
    title: "Apply with One Click",
    description: "Submit your application directly through our platform and track its progress in your personal dashboard."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How Resume Hatch Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered platform takes the guesswork out of job applications, so you can focus on what matters most – preparing for your interviews.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 animate-fade-in">
              <div className="text-4xl text-brand-blue font-bold mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-auto max-w-4xl">
            <div className="bg-gray-800 p-2 flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6 flex justify-center">
              <div className="h-48 w-full bg-gray-50 rounded-md flex items-center justify-center">
                <div className="text-gray-400">Interactive Demo Placeholder</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
