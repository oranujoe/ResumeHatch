
import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import DashboardSkeleton from './DashboardSkeleton';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  pageTitle = "Dashboard" 
}) => {
  const { loading } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

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

  // Set hydrated after auth loading is complete
  useEffect(() => {
    if (!loading) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Show skeleton during loading or before hydration
  if (loading || !isHydrated) {
    return <DashboardSkeleton />;
  }

  return (
    <div className={cn(
      "min-h-screen flex bg-background transition-opacity duration-300",
      isHydrated ? "opacity-100" : "opacity-0"
    )}>
      {/* Sidebar */}
      <DashboardSidebar 
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        onToggle={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-200",
        isCollapsed ? "pl-16" : "pl-56",
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
        <main className="flex-1 p-3 md:p-4 overflow-auto">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
