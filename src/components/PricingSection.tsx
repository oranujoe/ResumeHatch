
import React from 'react';
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "RM 100",
    period: "per month",
    description: "Perfect for job seekers applying to a few positions",
    features: [
      "5 tailored résumés per month",
      "3 cover letters per month",
      "Basic résumé templates",
      "Email support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "RM 300",
    period: "per month",
    description: "For serious job seekers in active search mode",
    features: [
      "Unlimited tailored résumés",
      "Unlimited cover letters",
      "All premium templates",
      "Application tracking dashboard",
      "Priority email support",
      "Interview preparation tips",
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams and organizations with special requirements",
    features: [
      "Everything in Pro plan",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Bulk processing",
      "Custom integrations",
      "Advanced analytics",
    ],
    buttonText: "Contact Sales",
    popular: false,
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your job search needs. All plans include our AI-powered résumé tailoring technology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`
                bg-white rounded-xl p-6 shadow-sm border transition-all hover:shadow-md
                ${plan.popular ? 'border-brand-blue relative' : 'border-gray-100'}
              `}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold">{plan.price}</div>
                {plan.period && (
                  <div className="text-gray-500 text-sm">{plan.period}</div>
                )}
                <div className="mt-3 text-gray-600 min-h-[50px]">{plan.description}</div>
              </div>
              
              <div className="border-t border-b border-gray-100 py-6 mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <div className="mr-3 text-brand-blue mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="text-center">
                <Button 
                  className={`w-full ${plan.popular ? 'bg-brand-blue hover:bg-blue-700 text-white' : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-200'}`}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
