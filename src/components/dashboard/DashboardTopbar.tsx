
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
import { useAuth } from '@/contexts/AuthContext';

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
  const { user, signOut } = useAuth();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Get user display name and email
  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="flex h-full items-center px-3 md:px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          {/* Sidebar Toggle - Desktop Only */}
          {!isMobile && (
            <button
              onClick={onToggleSidebar}
              className="btn-icon"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
          
          {/* Page Title */}
          <h1 className="text-headline-small text-foreground">
            {pageTitle}
          </h1>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-3 md:mx-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search applications, jobs, documents..."
              className="w-full pl-8 pr-3 py-1.5 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:bg-background transition-all duration-200 text-xs"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-1.5">
          {/* Search Icon - Mobile Only */}
          {isMobile && (
            <button className="btn-icon">
              <Search className="h-4 w-4" />
            </button>
          )}

          {/* Notifications */}
          <button className="btn-icon relative">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-destructive-foreground text-xs font-medium">3</span>
            </div>
          </button>

          {/* Credits Display - Desktop Only */}
          {!isMobile && (
            <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-accent/20 rounded-lg">
              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
              <span className="text-xs font-medium text-accent-foreground">
                100 credits
              </span>
            </div>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn-icon"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-1.5 p-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
            >
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              {!isMobile && (
                <>
                  <span className="text-xs font-medium">{userDisplayName}</span>
                  <ChevronDown className="h-3 w-3" />
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
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border rounded-lg shadow-lg z-50 animate-scale-in">
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">{userDisplayName}</p>
                        <p className="text-xs text-muted-foreground">{userEmail}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-1.5">
                    <button 
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        // Navigate to profile page when implemented
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-xs"
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>Profile</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        // Navigate to settings page when implemented
                      }}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-xs"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      <span>Settings</span>
                    </button>
                    
                    <div className="border-t border-border my-1.5" />
                    
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 text-xs"
                    >
                      <LogOut className="h-3.5 w-3.5" />
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
