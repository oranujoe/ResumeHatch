
import React from 'react';
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-16 bg-brand-dark text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to hatch your next career move?</h2>
        <p className="max-w-xl mx-auto mb-8 text-lg opacity-90">
          Join thousands of job seekers who are landing more interviews and securing better job offers with Resume Hatch.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-brand-blue hover:bg-blue-700 text-white h-12 px-8 rounded-md text-lg">
            Join Our Waitlist
          </Button>
          <Button variant="outline" className="h-12 px-8 rounded-md text-lg border-white text-white hover:bg-white hover:text-brand-dark">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
