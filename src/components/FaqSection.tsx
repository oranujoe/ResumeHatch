
import React, { useState } from 'react';

const faqs = [
  {
    question: "How does Resume Hatch tailor résumés automatically?",
    answer: "Our AI analyzes the job description to identify key skills, requirements, and qualifications. It then restructures your base résumé to highlight the most relevant experience and achievements for that specific position, ensuring your application passes ATS filters and catches the recruiter's eye."
  },
  {
    question: "How many different versions of my résumé can I create?",
    answer: "This depends on your subscription plan. Our Starter plan allows for 5 tailored résumés per month, while our Pro plan offers unlimited résumé customizations, so you can apply to as many positions as you want."
  },
  {
    question: "Can I use Resume Hatch with job sites like LinkedIn and Indeed?",
    answer: "Yes! Resume Hatch works with all major job boards and company career sites. Simply copy the job listing URL from any site and paste it into our platform to generate your tailored application materials."
  },
  {
    question: "Are the résumés ATS-friendly?",
    answer: "Absolutely. All our templates and the tailoring process are specifically designed to ensure compatibility with Applicant Tracking Systems. Our formats use proper headings, avoid complex tables or graphics that can confuse ATS, and strategically place keywords from the job description."
  },
  {
    question: "Can I import an existing résumé?",
    answer: "Yes, you can upload your existing résumé in various formats (PDF, DOCX, etc.) and our system will extract the information to create your base profile. From there, you can refine your information before generating tailored versions for specific job applications."
  }
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 dark:from-gray-900 dark:via-gray-800/20 dark:to-gray-900/20 md:py-[80px] relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100/20 to-blue-100/20 dark:from-gray-800/20 dark:to-blue-900/20 animate-gradient-x"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/10 dark:bg-blue-700/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200/10 dark:bg-purple-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-gray-100 to-blue-100 dark:from-gray-800 dark:to-blue-900 rounded-full px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-5 border border-gray-200/50 dark:border-gray-700/50 shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
            ❓ Got Questions?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Find answers to common questions about our platform and how it can help you land your dream job.
          </p>
        </div>
        
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <button 
                onClick={() => toggleAccordion(index)} 
                className="flex justify-between items-center w-full p-6 text-left hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-50/30 group-hover:to-purple-50/30 dark:group-hover:from-blue-900/30 dark:group-hover:to-purple-900/30"
              >
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200 pr-4 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white transition-all duration-300 ${activeIndex === index ? 'rotate-180 scale-110' : 'hover:scale-110'}`}>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gradient-to-r from-blue-200/50 to-purple-200/50 dark:from-blue-700/50 dark:to-purple-700/50 pt-4">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base animate-fade-in">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
