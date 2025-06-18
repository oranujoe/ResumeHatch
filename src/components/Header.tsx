
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import WaitlistDialog from './WaitlistDialog';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    // Check if dark mode is already enabled
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 w-full border-b border-white/20 dark:border-gray-700/50 sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center group">
          <img 
            src="/lovable-uploads/c1fa3a5b-2ee1-47c2-a887-35cc50f1f63f.png" 
            alt="ResumeHatch Logo" 
            className="h-8 mr-2 transition-transform duration-300 group-hover:scale-110" 
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#features" 
            className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 relative group font-medium"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#how-it-works" 
            className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 relative group font-medium"
          >
            How it Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#pricing" 
            className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 relative group font-medium"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a 
            href="#faq" 
            className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 relative group font-medium"
          >
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-purple-500 transition-all duration-300 group-hover:w-full"></span>
          </a>
          {user && (
            <a 
              href="/dashboard" 
              className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue transition-all duration-300 relative group font-medium"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-blue to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-blue"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {user ? (
            <>
              <span className="text-gray-600 dark:text-gray-300 hidden sm:inline">
                Welcome, {user.email}
              </span>
              <Button 
                onClick={handleSignOut}
                variant="outline"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                onClick={() => window.location.href = '/auth'}
                variant="outline"
                className="hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-brand-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold px-6" 
                onClick={() => setIsWaitlistOpen(true)}
              >
                Join the Waitlist
              </Button>
            </>
          )}
        </div>
      </div>

      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </header>
  );
};

export default Header;
