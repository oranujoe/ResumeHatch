import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  User,
  ChevronDown,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardTopbarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onToggleSidebar: () => void;
  pageTitle?: string;
}

const DashboardTopbar: React.FC<DashboardTopbarProps> = ({ 
  isCollapsed, 
  isMobile, 
  onToggleSidebar,
  pageTitle = "Dashboard"
}) => {
  const [isDark, setIsDark] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex h-full items-center px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle - Desktop Only */}
          {!isMobile && (
            <button
              onClick={onToggleSidebar}
              className="btn-icon"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          
          {/* Page Title */}
          <h1 className="text-page-title text-foreground">
            {pageTitle}
          </h1>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4 md:mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search applications, jobs, documents..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all duration-200"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search Icon - Mobile Only */}
          {isMobile && (
            <button className="btn-icon">
              <Search className="h-5 w-5" />
            </button>
          )}

          {/* Notifications */}
          <button className="btn-icon relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-destructive-foreground text-xs font-medium">3</span>
            </div>
          </button>

          {/* Credits Display - Desktop Only */}
          {!isMobile && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-accent/20 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm font-medium text-accent-foreground">
                100 credits
              </span>
            </div>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn-icon"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              {!isMobile && (
                <>
                  <span className="text-sm font-medium">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-50"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                
                {/* Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 animate-scale-in">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">john@example.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    
                    <div className="border-t border-border my-2" />
                    
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 text-sm">
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
