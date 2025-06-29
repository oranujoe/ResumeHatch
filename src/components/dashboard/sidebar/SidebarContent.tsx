
import React from 'react';
import NavItem from './NavItem';
import { mainNavItems, bottomNavItems } from './navigationData';

interface SidebarContentProps {
  isCollapsed: boolean;
  expandedItems: string[];
  onToggleExpanded: (title: string) => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  isCollapsed, 
  expandedItems, 
  onToggleExpanded 
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-1.5 space-y-1">
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map(item => (
            <NavItem
              key={item.title}
              item={item}
              isCollapsed={isCollapsed}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
        
        {/* Bottom Navigation */}
        <div className="pt-3 mt-3 border-t border-sidebar-border space-y-1">
          {bottomNavItems.map(item => (
            <NavItem
              key={item.title}
              item={item}
              isCollapsed={isCollapsed}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
