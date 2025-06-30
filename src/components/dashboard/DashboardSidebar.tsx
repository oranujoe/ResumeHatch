
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarContent from './sidebar/SidebarContent';
import SidebarFooter from './sidebar/SidebarFooter';

interface DashboardSidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  isCollapsed, 
  isMobile, 
  onToggle 
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const sidebarClasses = cn(
    "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-200",
    "backdrop-blur-sm bg-sidebar/95",
    isCollapsed ? "w-16" : "w-56",
    isMobile && "w-64",
    isMobile && !isCollapsed && "translate-x-0",
    isMobile && isCollapsed && "-translate-x-full"
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <SidebarHeader isCollapsed={isCollapsed} onToggle={onToggle} />
        <SidebarContent 
          isCollapsed={isCollapsed}
          expandedItems={expandedItems}
          onToggleExpanded={toggleExpanded}
        />
        <SidebarFooter isCollapsed={isCollapsed} />
      </aside>
    </>
  );
};

export default DashboardSidebar;
