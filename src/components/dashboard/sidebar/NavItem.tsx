
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
  const isDisabled = item.disabled || item.comingSoon;

  const handleClick = (e: React.MouseEvent) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (hasSubItems) {
      onToggleExpanded(item.title);
    }
  };

  const itemClasses = cn(
    "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs font-medium",
    !isDisabled && "hover:bg-muted hover:text-foreground",
    active && !isDisabled && "sidebar-active",
    isCollapsed && "justify-center px-1.5",
    isDisabled && "opacity-50 cursor-not-allowed"
  );

  return (
    <div className="w-full">
      {hasSubItems && !isDisabled ? (
        <button
          onClick={handleClick}
          className={itemClasses}
          title={isDisabled ? "Coming soon" : undefined}
        >
          <item.icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isCollapsed ? "mx-auto" : "mr-2"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.comingSoon && (
                <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700">
                  Soon
                </Badge>
              )}
              <ChevronRight className={cn(
                "h-3 w-3 transition-transform duration-200 ml-1",
                expanded && "rotate-90"
              )} />
            </>
          )}
        </button>
      ) : isDisabled ? (
        <div
          className={itemClasses}
          title="Coming soon"
        >
          <item.icon className={cn(
            "h-4 w-4 flex-shrink-0",
            isCollapsed ? "mx-auto" : "mr-2"
          )} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700">
                Soon
              </Badge>
            </>
          )}
        </div>
      ) : (
        <Link
          to={item.url}
          className={itemClasses}
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
          {item.subItems!.map(subItem => {
            const subItemDisabled = subItem.comingSoon || item.disabled;
            return subItemDisabled ? (
              <div
                key={subItem.url}
                className={cn(
                  "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs",
                  "opacity-50 cursor-not-allowed"
                )}
                title="Coming soon"
              >
                <span className="flex-1 text-left">{subItem.title}</span>
                <Badge variant="secondary" className="ml-2 text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700">
                  Soon
                </Badge>
              </div>
            ) : (
              <Link
                key={subItem.url}
                to={subItem.url}
                className={cn(
                  "w-full flex items-center px-2 py-1.5 rounded-lg transition-all duration-200 text-xs",
                  "hover:bg-muted hover:text-foreground",
                  isActive(subItem.url) && "bg-muted text-foreground font-medium"
                )}
              >
                <span className="flex-1 text-left">{subItem.title}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NavItem;
