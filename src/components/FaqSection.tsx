
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
    <section id="faq" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform and how it can help you land your dream job.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full p-6 text-left"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="text-brand-blue">
                  {activeIndex === index ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
