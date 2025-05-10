
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
    <section id="pricing" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-4">
          <PricingBadge text="Pay Only For What You Use" />
        
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Credit-Based Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            No more wasted subscription fees! Load your wallet with credits and spend them only when you actually need documents generated or applications submitted.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-3xl mx-auto">
            <PricingFeature icon="zap" text="No monthly commitments" />
            <PricingFeature icon="creditCard" text="Credits never expire" />
            <PricingFeature icon="sparkles" text="Top up anytime" />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {creditPackages.map((pack, index) => (
            <CreditPackageCard
              key={index}
              package={pack}
              onButtonClick={() => setIsWaitlistOpen(true)}
            />
          ))}
        </div>
        
        {/* Custom Credit Package Card - Moved below the pricing tiers */}
        <div className="max-w-3xl mx-auto mt-16 mb-16">
          <CustomCreditCard
            creditCount={creditCount}
            setCreditCount={setCreditCount}
            documentCounts={documentCounts}
            calculatePrice={calculatePrice}
            onButtonClick={() => setIsWaitlistOpen(true)}
          />
        </div>
        
        {/* Changed from badge to regular text with appropriate styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gray-600 text-sm">Payment processors: Paystack, Stripe</p>
        </div>
        
      </div>

      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>
  );
};

export default PricingSection;
