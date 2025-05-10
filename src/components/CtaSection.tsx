
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import WaitlistDialog from './WaitlistDialog';

const CtaSection = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <section className="py-20 bg-brand-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to pay only for what you actually use?</h2>
        <p className="max-w-xl mx-auto mb-10 text-lg opacity-90">
          Join thousands of job seekers who are saving money with Resume Hatch's pay-as-you-go credit system.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-brand-blue hover:bg-blue-700 text-white h-12 px-8 rounded-md text-lg flex items-center gap-2"
            onClick={() => setIsWaitlistOpen(true)}
          >
            Join Our Waitlist
          </Button>
          <Button 
            variant="outline" 
            className="h-12 px-8 rounded-md text-lg border-white text-black hover:text-black hover:bg-white hover:opacity-100"
            disableHoverEffect={true}
          >
            Schedule a Demo
          </Button>
        </div>
      </div>
      
      <WaitlistDialog 
        open={isWaitlistOpen}
        onOpenChange={setIsWaitlistOpen}
      />
    </section>
  );
};

export default CtaSection;
