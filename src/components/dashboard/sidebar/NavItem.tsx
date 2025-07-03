
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem as NavItemType } from './navigationData';

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

  return (
    <div className="w-full">
      {hasSubItems ? (
        <button
          onClick={() => onToggleExpanded(item.title)}
          className={cn(
            "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            active && "sidebar-active",
            isCollapsed && "justify-center px-1.5"
          )}
        >
          <item.icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isCollapsed ? "mx-auto" : "mr-2"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              <ChevronRight className={cn(
                "h-3 w-3 transition-transform duration-200",
                expanded && "rotate-90"
              )} />
            </>
          )}
        </button>
      ) : (
        <Link
          to={item.url}
          className={cn(
            "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium",
            "hover:bg-accent hover:text-accent-foreground",
            active && "sidebar-active",
            isCollapsed && "justify-center px-1.5"
          )}
        >
          <item.icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isCollapsed ? "mx-auto" : "mr-2"
          )} />
          {!isCollapsed && (
            <span className="flex-1 text-left">{item.title}</span>
          )}
        </Link>
      )}
      
      {hasSubItems && !isCollapsed && expanded && (
        <div className="ml-5 mt-1 space-y-1">
          {item.subItems!.map(subItem => (
            <Link
              key={subItem.url}
              to={subItem.url}
              className={cn(
                "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs",
                "hover:bg-accent/50 hover:text-accent-foreground",
                isActive(subItem.url) && "bg-muted text-foreground font-medium"
              )}
            >
              <span className="flex-1 text-left">{subItem.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
