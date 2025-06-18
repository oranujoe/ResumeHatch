
import React from 'react';
import { Instagram, Linkedin, X } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-100 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900/30 pt-20 pb-8 px-4 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200/20 to-blue-200/20 dark:from-gray-700/20 dark:to-blue-800/20 animate-gradient-x"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/10 dark:bg-blue-700/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/10 dark:bg-purple-700/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up">
          <div className="animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-lg mb-6 text-gray-800 dark:text-gray-200">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">About</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Press</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Blog</a></li>
            </ul>
          </div>
          <div className="animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-lg mb-6 text-gray-800 dark:text-gray-200">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Features</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Templates</a></li>
              <li><a href="#pricing" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Pricing</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Integration</a></li>
            </ul>
          </div>
          <div className="animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold text-lg mb-6 text-gray-800 dark:text-gray-200">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Documentation</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Guides</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">API Reference</a></li>
              <li><a href="#faq" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">FAQ</a></li>
            </ul>
          </div>
          <div className="animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-bold text-lg mb-6 text-gray-800 dark:text-gray-200">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Privacy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Terms</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:translate-x-1 inline-block">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="mb-4 md:mb-0 group">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-dark to-brand-blue bg-clip-text text-transparent group-hover:from-brand-blue group-hover:to-purple-600 transition-all duration-300">
              Resume<span className="text-brand-blue">Hatch</span>
            </h1>
          </div>
          <div className="flex space-x-6 animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
            <a 
              href="#" 
              className="text-gray-400 dark:text-gray-500 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-brand-blue/10"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://x.com/ResumeHatch" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 dark:text-gray-500 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-brand-blue/10"
            >
              <X className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-400 dark:text-gray-500 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 hover:scale-125 hover:-translate-y-1 p-2 rounded-full hover:bg-brand-blue/10"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg px-4 py-2 inline-block border border-white/20 dark:border-gray-700/20 shadow-sm">
            &copy; {year} ResumeHatch. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
