
import React from 'react';

interface SidebarFooterProps {
  isCollapsed: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCollapsed }) => {
  if (isCollapsed) return null;

  return (
    <div className="p-3 border-t border-sidebar-border">
      <div className="text-xs text-muted-foreground text-center">
        Version 1.0.0
      </div>
    </div>
  );
};

export default SidebarFooter;
