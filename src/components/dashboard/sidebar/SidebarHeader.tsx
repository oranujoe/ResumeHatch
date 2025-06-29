
import React from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCollapsed, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
      {!isCollapsed && (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs">RH</span>
          </div>
          <span className="font-bold text-base text-sidebar-foreground">
            ResumeHatch
          </span>
        </div>
      )}
      
      <button
        onClick={onToggle}
        className={cn(
          "p-1.5 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200",
          isCollapsed && "mx-auto"
        )}
      >
        {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default SidebarHeader;
