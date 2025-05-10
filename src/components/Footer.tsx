
import React from 'react';
import { Instagram, Linkedin, X } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-20 pb-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Templates</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-brand-blue transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Integration</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">API Reference</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-brand-blue transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-blue transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-brand-dark">Resume<span className="text-brand-blue">Hatch</span></h1>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-brand-blue">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-blue">
              <X className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-brand-blue">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          &copy; {year} ResumehHatch. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
