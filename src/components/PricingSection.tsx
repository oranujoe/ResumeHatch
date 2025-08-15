
import React, { useState } from 'react';
import WaitlistDialog from './WaitlistDialog';
import PricingBadge from './pricing/PricingBadge';
import PricingFeature from './pricing/PricingFeature';
import CreditPackageCard from './pricing/CreditPackageCard';
import CustomCreditCard from './pricing/CustomCreditCard';
import { calculatePrice, getDocumentCounts, creditPackages } from '@/utils/creditCalculations';

const PricingSection = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [creditCount, setCreditCount] = useState(45);
  const documentCounts = getDocumentCounts(creditCount);
  
  return (
    <section id="pricing" className="py-20 px-4 md:py-[80px] bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 to-purple-100/10 animate-gradient-x"></div>
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 text-sm font-medium text-gray-700 mb-5 border border-blue-200/50 shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
            💳 Pay Only For What You Use
          </div>
        
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Credit-Based Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            No more wasted subscription fees! Load your wallet with credits and spend them only when you actually need documents generated or applications submitted.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">No monthly commitments</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Credits never expire</span>
            </div>
            <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-medium text-gray-700">Top up anytime</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {creditPackages.map((pack, index) => (
            <div key={index} className="group hover:scale-105 transition-all duration-500 hover:-translate-y-2" style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
              <CreditPackageCard package={pack} onButtonClick={() => setIsWaitlistOpen(true)} />
            </div>
          ))}
        </div>
        
        {/* Enhanced Custom Credit Package Card */}
        <div className="max-w-3xl mx-auto mt-20 mb-20 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-br from-white/80 to-blue-50/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] p-8">
            <CustomCreditCard 
              creditCount={creditCount} 
              setCreditCount={setCreditCount} 
              documentCounts={documentCounts} 
              calculatePrice={calculatePrice} 
              onButtonClick={() => setIsWaitlistOpen(true)} 
            />
          </div>
        </div>
        
        {/* Enhanced payment info */}
        <div className="text-center max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <div className="flex justify-center items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-md flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">Secure payments via</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">Paystack</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-700">Stripe</span>
            </div>
          </div>
        </div>
        
      </div>

      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  );
};

export default PricingSection;
