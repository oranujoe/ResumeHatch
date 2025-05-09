
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Key, BarChart2, Bell, Shield } from "lucide-react";

const features = [{
  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
  title: "AI Matching",
  description: "Our AI analyzes job descriptions and matches them with your skills and experience."
}, {
  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>,
  title: "Templates",
  description: "Choose from dozens of professional templates optimized for ATS systems."
}, {
  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>,
  title: "Cover Letters",
  description: "Generate personalized cover letters that complement your résumé and highlight key qualifications."
}, {
  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>,
  title: "Analytics",
  description: "Track application status, interview rates, and optimize your job search strategy."
}, {
  icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
  title: "Quick Apply",
  description: "Apply to multiple jobs with a single click using your tailored résumés and cover letters."
}];

const FeaturesSection = () => {
  return <section id="features" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to land that job</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform handles every step of the job application process, from customizing your résumé to tracking your applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-brand-blue mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="w-full flex flex-wrap justify-between mb-10 bg-transparent p-0 space-y-2 md:space-y-0">
              <TabsTrigger value="resume" className="flex items-center gap-2 data-[state=active]:bg-brand-blue/10 data-[state=active]:text-brand-blue rounded-lg px-4 py-3 w-full md:w-auto">
                <div className="bg-green-100 p-2 rounded-md">
                  <FileText size={20} className="text-green-600" />
                </div>
                <span>Resume</span>
              </TabsTrigger>
              
              <TabsTrigger value="ats" className="flex items-center gap-2 data-[state=active]:bg-brand-blue/10 data-[state=active]:text-brand-blue rounded-lg px-4 py-3 w-full md:w-auto">
                <div className="bg-purple-100 p-2 rounded-md">
                  <Key size={20} className="text-purple-600" />
                </div>
                <span>ATS-optimization</span>
              </TabsTrigger>
              
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-brand-blue/10 data-[state=active]:text-brand-blue rounded-lg px-4 py-3 w-full md:w-auto">
                <div className="bg-blue-100 p-2 rounded-md">
                  <BarChart2 size={20} className="text-blue-600" />
                </div>
                <span>Dashboard</span>
              </TabsTrigger>
              
              <TabsTrigger value="smart" className="flex items-center gap-2 data-[state=active]:bg-brand-blue/10 data-[state=active]:text-brand-blue rounded-lg px-4 py-3 w-full md:w-auto">
                <div className="bg-amber-100 p-2 rounded-md">
                  <Bell size={20} className="text-amber-600" />
                </div>
                <span>Smart</span>
              </TabsTrigger>
              
              <TabsTrigger value="secure" className="flex items-center gap-2 data-[state=active]:bg-brand-blue/10 data-[state=active]:text-brand-blue rounded-lg px-4 py-3 w-full md:w-auto">
                <div className="bg-red-100 p-2 rounded-md">
                  <Shield size={20} className="text-red-600" />
                </div>
                <span>Secure</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resume" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Resume multi-template library</h2>
                  <p className="text-gray-600 mb-8">
                    Choose from dozens of professionally designed templates optimized for your industry.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Industry-specific templates</strong> for tech, finance, healthcare, and more
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">ATS-optimized designs</strong> that pass automated screening
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Customizable layouts</strong> with modern and traditional options
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
            </TabsContent>
            
            <TabsContent value="ats" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">ATS-optimization</h2>
                  <p className="text-gray-600 mb-8">
                    Get past automated screening systems with our ATS-optimized resume templates and tools.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Keyword optimization</strong> for job-specific matches
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">ATS scoring system</strong> to rate your resume's effectiveness
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Formatted for machine readability</strong> without losing design appeal
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-brand-blue hover:bg-blue-700 text-white">
                    Try ATS Checker
                  </Button>
                </div>
                <div className="w-full lg:w-1/2 relative">
                  <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
                    <div className="h-8 w-full bg-purple-100 rounded-t-md flex items-center px-4">
                      <div className="h-4 w-20 bg-purple-200 rounded-md"></div>
                    </div>
                    <div className="p-6 border border-purple-100 rounded-b-md">
                      <div className="flex items-center mb-6">
                        <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-lg">
                          85%
                        </div>
                        <div className="ml-4">
                          <div className="h-5 w-40 bg-gray-100 rounded-md"></div>
                          <div className="h-4 w-20 bg-gray-100 rounded-md mt-2"></div>
                        </div>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                        <div className="h-4 w-full bg-gray-100 rounded-md"></div>
                        <div className="h-4 w-3/4 bg-gray-100 rounded-md"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                          <div className="h-4 w-40 bg-gray-100 rounded-md"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 bg-yellow-500 rounded-full mr-2"></div>
                          <div className="h-4 w-48 bg-gray-100 rounded-md"></div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                          <div className="h-4 w-36 bg-gray-100 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dashboard" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Application Dashboard</h2>
                  <p className="text-gray-600 mb-8">
                    Track all your job applications in one centralized dashboard with powerful insights.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Application tracking</strong> with status updates and reminders
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Analytics and insights</strong> about your job search progress
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Interview preparation</strong> tools and scheduling
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-brand-blue hover:bg-blue-700 text-white">
                    Explore Dashboard
                  </Button>
                </div>
                <div className="w-full lg:w-1/2 relative">
                  <div className="bg-white rounded-lg shadow-xl p-4 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4 border-b pb-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-blue-100 rounded-md mr-3"></div>
                        <div className="h-6 w-24 bg-gray-100 rounded-md"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
                        <div className="h-8 w-8 bg-gray-100 rounded-md"></div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <div className="space-y-1">
                          <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
                          <div className="h-3 w-20 bg-gray-200 rounded-md"></div>
                        </div>
                        <div className="bg-green-100 text-green-800 py-1 px-2 text-xs rounded">Applied</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="space-y-1">
                          <div className="h-4 w-40 bg-gray-200 rounded-md"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded-md"></div>
                        </div>
                        <div className="bg-yellow-100 text-yellow-800 py-1 px-2 text-xs rounded">Interview</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="space-y-1">
                          <div className="h-4 w-36 bg-gray-200 rounded-md"></div>
                          <div className="h-3 w-28 bg-gray-200 rounded-md"></div>
                        </div>
                        <div className="bg-blue-100 text-blue-800 py-1 px-2 text-xs rounded">Pending</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                          <div className="flex space-x-2">
                            <div className="h-8 w-4 bg-blue-500 rounded-t-sm"></div>
                            <div className="h-12 w-4 bg-blue-500 rounded-t-sm"></div>
                            <div className="h-6 w-4 bg-blue-500 rounded-t-sm"></div>
                            <div className="h-10 w-4 bg-blue-500 rounded-t-sm"></div>
                            <div className="h-16 w-4 bg-blue-500 rounded-t-sm"></div>
                          </div>
                        </div>
                        <div className="h-16 w-16 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="smart" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Smart Features</h2>
                  <p className="text-gray-600 mb-8">
                    Our AI-powered tools take your resume and job applications to the next level.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">AI-powered resume suggestions</strong> for skill highlighting
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Automated job matching</strong> with tailored resume adjustments
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Job alert notifications</strong> for positions matching your profile
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-brand-blue hover:bg-blue-700 text-white">
                    Discover Smart Features
                  </Button>
                </div>
                <div className="w-full lg:w-1/2 relative">
                  <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
                    <div className="flex items-center mb-6">
                      <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="h-5 w-48 bg-gray-100 rounded-md"></div>
                        <div className="h-4 w-32 bg-gray-100 rounded-md mt-1"></div>
                      </div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                        <div className="h-4 w-full bg-gray-200 rounded-md mb-2"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded-md"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                          </svg>
                        </div>
                        <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="h-8 w-8 bg-gray-100 rounded-md flex items-center justify-center text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="h-4 w-3/4 bg-gray-200 rounded-md mb-3"></div>
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                          <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 bg-amber-500 rounded-md flex items-center justify-center">
                      <div className="h-4 w-32 bg-amber-400 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="secure" className="animate-fade-in">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 pr-0 lg:pr-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Secure Data Protection</h2>
                  <p className="text-gray-600 mb-8">
                    Your personal information and resume data are always protected with enterprise-grade security.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">End-to-end encryption</strong> for all your personal data
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">Privacy controls</strong> for sharing and visibility settings
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <strong className="font-medium">GDPR compliant</strong> with data protection regulations
                      </div>
                    </li>
                  </ul>
                  <Button className="bg-brand-blue hover:bg-blue-700 text-white">
                    Learn About Security
                  </Button>
                </div>
                <div className="w-full lg:w-1/2 relative">
                  <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
                    <div className="flex justify-center mb-6">
                      <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
                        <div className="h-12 w-12 bg-red-500 rounded-md flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mb-6">
                      <div className="h-6 w-48 bg-gray-200 rounded-md mx-auto mb-2"></div>
                      <div className="h-4 w-64 bg-gray-200 rounded-md mx-auto"></div>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-gray-200 rounded-md mr-3 flex items-center justify-center text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-gray-200 rounded-md mr-3 flex items-center justify-center text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-gray-50 rounded-md">
                        <div className="h-8 w-8 bg-gray-200 rounded-md mr-3 flex items-center justify-center text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 bg-red-500 rounded-md flex items-center justify-center">
                      <div className="h-4 w-32 bg-red-400 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>;
};

export default FeaturesSection;
