
import React from 'react';
import { Button } from "@/components/ui/button";

const TemplatesSection = () => {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Resume multi-template library</h2>
            <p className="text-gray-600 mb-8">
              Our extensive template library ensures you always have the perfect format for any job application. Each template is:
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="mr-3 text-brand-blue mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="font-medium">ATS-optimized</strong> - Easily pass through Applicant Tracking Systems without being filtered out
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-brand-blue mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="font-medium">Industry-specific designs</strong> - Templates tailored for different roles and sectors
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-brand-blue mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <strong className="font-medium">Export to PDF, Word, or HTML</strong> - Use your résumé anywhere you need it
                </div>
              </li>
            </ul>
            <Button className="bg-brand-blue hover:bg-blue-700 text-white">
              Browse Templates
            </Button>
          </div>
          <div className="w-full lg:w-1/2 relative">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="h-20 w-20 bg-gray-100 rounded-md"></div>
                <div className="space-y-2">
                  <div className="h-5 w-40 bg-gray-100 rounded-md"></div>
                  <div className="h-4 w-20 bg-gray-100 rounded-md"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                <div className="h-4 w-3/4 bg-gray-100 rounded-md"></div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex justify-between">
                  <div>
                    <div className="h-5 w-20 bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-4 w-32 bg-gray-100 rounded-md"></div>
                  </div>
                  <div>
                    <div className="h-5 w-20 bg-gray-100 rounded-md mb-2"></div>
                    <div className="h-4 w-32 bg-gray-100 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="h-10 w-32 bg-brand-blue rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
