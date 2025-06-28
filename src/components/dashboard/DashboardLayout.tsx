import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  pageTitle = "Dashboard" 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // Auto-collapse sidebar on mid-sized screens (768px-1024px)
      if (width >= 768 && width < 1024) {
        setIsCollapsed(true);
      } else if (width >= 1024) {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onToggle={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-200",
        isCollapsed ? "pl-18" : "pl-64",
        isMobile && "pl-0"
      )}>
        {/* Topbar */}
        <DashboardTopbar 
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onToggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
