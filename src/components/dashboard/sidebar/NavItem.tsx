
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem as NavItemType } from './navigationData';
import { SoonBadge } from '@/components/ui/soon-badge';

interface NavItemProps {
  item: NavItemType;
  isCollapsed: boolean;
  expandedItems: string[];
  onToggleExpanded: (title: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ 
  item, 
  isCollapsed, 
  expandedItems, 
  onToggleExpanded 
}) => {
  const location = useLocation();
  
  const isExpanded = expandedItems.includes(item.title);
  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(url);
  };

  const hasSubItems = item.subItems && item.subItems.length > 0;
  const expanded = isExpanded;
  const active = isActive(item.url);

  const handleClick = (e: React.MouseEvent) => {
    if (item.isDisabled) {
      e.preventDefault();
      return;
    }
    
    if (hasSubItems) {
      onToggleExpanded(item.title);
    }
  };

  const baseClasses = cn(
    "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium",
    item.isDisabled 
      ? "opacity-60 cursor-not-allowed" 
      : "hover:bg-muted hover:text-foreground",
    active && "sidebar-active",
    isCollapsed && "justify-center px-1.5"
  );

  return (
    <div className="w-full">
      {hasSubItems ? (
        <button
          onClick={handleClick}
          className={baseClasses}
          disabled={item.isDisabled}
        >
          <item.icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isCollapsed ? "mx-auto" : "mr-2"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              <div className="flex items-center space-x-1">
                {item.isComingSoon && <SoonBadge />}
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  expanded && "rotate-90"
                )} />
              </div>
            </>
          )}
        </button>
      ) : (
        <div className={baseClasses}>
          <item.icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isCollapsed ? "mx-auto" : "mr-2"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.isComingSoon && <SoonBadge />}
            </>
          )}
          {!item.isDisabled && (
            <Link to={item.url} className="absolute inset-0" />
          )}
        </div>
      )}
      
      {hasSubItems && !isCollapsed && expanded && (
        <div className="ml-5 mt-1 space-y-1">
          {item.subItems!.map(subItem => (
            <div
              key={subItem.url}
              className={cn(
                "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs relative",
                subItem.isDisabled 
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:bg-muted hover:text-foreground",
                isActive(subItem.url) && "bg-muted text-foreground font-medium"
              )}
            >
              <span className="flex-1 text-left">{subItem.title}</span>
              {subItem.isComingSoon && <SoonBadge />}
              {!subItem.isDisabled && (
                <Link to={subItem.url} className="absolute inset-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
