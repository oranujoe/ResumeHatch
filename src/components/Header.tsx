
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import WaitlistDialog from './WaitlistDialog';

const Header = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 w-full border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-brand-dark">Resume<span className="text-brand-blue">Hatch</span></h1>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-600 hover:text-brand-blue transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-brand-blue transition-colors">How it Works</a>
          <a href="#pricing" className="text-gray-600 hover:text-brand-blue transition-colors">Pricing</a>
          <a href="#faq" className="text-gray-600 hover:text-brand-blue transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden sm:inline-flex" onClick={() => setIsWaitlistOpen(true)}>Log in</Button>
          <Button 
            className="bg-brand-blue hover:bg-blue-700 text-white"
            onClick={() => setIsWaitlistOpen(true)}
          >
            Join the Waitlist
          </Button>
        </div>
      </div>

      <WaitlistDialog 
        open={isWaitlistOpen}
        onOpenChange={setIsWaitlistOpen}
      />
    </header>
  );
};

export default Header;
