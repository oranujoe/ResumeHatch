
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CreditCard, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import WaitlistDialog from './WaitlistDialog';
import { Card, CardContent } from "@/components/ui/card";

const PricingSection = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [creditCount, setCreditCount] = useState(45);

  // Calculate price based on credits (200 Naira per credit)
  const calculatePrice = (credits: number) => {
    return (credits * 200).toLocaleString();
  };

  // Calculate document counts based on credits
  const getDocumentCounts = (credits: number) => {
    return {
      resumes: Math.floor(credits * 0.2),
      // 20% of credits for resumes
      coverLetters: Math.floor(credits * 0.33),
      // 33% of credits for cover letters
      applications: credits // 100% of credits could be used for applications
    };
  };
  const documentCounts = getDocumentCounts(creditCount);
  const creditPackages = [
    {
      name: "Starter",
      credits: 25,
      price: "₦15,000",
      description: "Perfect for job seekers applying to a few positions",
      features: ["Generate 5 tailored résumés", "Generate 3 cover letters", "Basic résumé templates", "Email support"],
      buttonText: "Join the Waitlist",
      popular: false
    }, {
      name: "Pro Value",
      credits: 100,
      price: "₦45,000",
      description: "Best value for serious job seekers in active search mode",
      features: ["Generate 25 tailored résumés", "Generate 15 cover letters", "All premium templates", "Application tracking dashboard", "Priority email support", "Interview preparation tips"],
      buttonText: "Join the Waitlist",
      popular: true
    }, {
      name: "Custom",
      credits: "Flexible",
      price: "You decide",
      description: "Load any amount and pay only for what you use",
      features: ["Flexible credit system", "No expiration on credits", "All premium features", "API access for teams", "Dedicated account manager", "Bulk processing available"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];
  return <section id="pricing" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Updated badge to match the styling of the "Simple 3-Step Process" badge */}
        <div className="text-center mb-4">
          <div className="inline-block bg-gray-50 rounded-full px-4 py-1 text-sm font-medium text-gray-700 mb-4">
            Pay Only For What You Use
          </div>
        
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Credit-Based Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            No more wasted subscription fees! Load your wallet with credits and spend them only when you actually need documents generated or applications submitted.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg w-full md:w-auto">
              <div className="bg-green-100 p-2 rounded-full">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-green-800">No monthly commitments</span>
            </div>
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg w-full md:w-auto">
              <div className="bg-green-100 p-2 rounded-full">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-green-800">Credits never expire</span>
            </div>
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg w-full md:w-auto">
              <div className="bg-green-100 p-2 rounded-full">
                <Sparkles className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-green-800">Top up anytime</span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {creditPackages.map((pack, index) => <div key={index} className={`
                bg-white rounded-xl p-6 shadow-sm border transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:border-brand-blue
                ${pack.popular ? 'border-brand-blue' : 'border-gray-100'}
              `}>
              {pack.popular && <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  
                </div>}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{pack.name}</h3>
                <div className="text-3xl font-bold">{pack.price}</div>
                <div className="inline-block bg-blue-50 text-blue-700 font-semibold px-3 py-1 rounded-full text-sm mt-2">
                  {typeof pack.credits === 'number' ? `${pack.credits} Credits` : pack.credits}
                </div>
                <div className="mt-3 text-gray-600 min-h-[50px]">{pack.description}</div>
              </div>
              
              <div className="border-t border-b border-gray-100 py-6 mb-6">
                <ul className="space-y-3">
                  {pack.features.map((feature, fIndex) => <li key={fIndex} className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <span>{feature}</span>
                    </li>)}
                </ul>
              </div>
              
              <div className="text-center">
                <Button className={`w-full transition-colors duration-300 ${pack.popular ? 'bg-brand-blue hover:bg-blue-700 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200 hover:bg-brand-blue hover:text-white'}`} onClick={pack.buttonText === "Contact Sales" ? undefined : () => setIsWaitlistOpen(true)}>
                  {pack.buttonText}
                </Button>
              </div>
            </div>)}
        </div>
        
        {/* Custom Credit Package Card - Moved below the pricing tiers */}
        <div className="max-w-3xl mx-auto mt-16 mb-16">
          <Card className="shadow-[0_4px_12px_-2px_rgba(0,0,0,0.15)] border-0">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-2 text-center">Custom Credit Package</h3>
              <p className="text-gray-600 text-center mb-8">Choose exactly how many credits you need</p>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-medium">Credits: {creditCount}</span>
                <span className="text-xl font-bold text-brand-blue">₦{calculatePrice(creditCount)}</span>
              </div>
              
              <div className="mb-8">
                <Slider value={[creditCount]} min={10} max={200} step={5} className="my-4" onValueChange={value => setCreditCount(value[0])} />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {documentCounts.resumes}
                  </div>
                  <div className="text-sm text-gray-600">
                    Résumés
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    {documentCounts.coverLetters}
                  </div>
                  <div className="text-sm text-gray-600">
                    Cover Letters
                  </div>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-sky-600">
                    {documentCounts.applications}
                  </div>
                  <div className="text-sm text-gray-600">
                    Applications
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-brand-blue hover:bg-blue-700 text-white flex items-center justify-center text-lg py-6" onClick={() => setIsWaitlistOpen(true)}>
                <CreditCard className="mr-2" /> Join waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Changed from badge to regular text with appropriate styling */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-gray-600 text-sm">Payment processors: Paystack, Stripe</p>
        </div>
        
      </div>

      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </section>;
};
export default PricingSection;
