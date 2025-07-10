
import React from 'react';
import NavItem from './NavItem';
import { mainNavItems, bottomNavItems, adminNavItems } from './navigationData';
import { useAdminRole } from '@/hooks/useAdminRole';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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
  const { data: isAdmin, isLoading } = useAdminRole();

  // Filter bottom nav items based on admin status
  const filteredBottomNavItems = bottomNavItems.filter(item => {
    if (item.adminOnly) {
      return !isLoading && isAdmin;
    }
    return true;
  });

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
        
        {/* Admin Navigation */}
        {!isLoading && isAdmin && (
          <>
            <Separator className="my-3" />
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="flex items-center gap-2 px-2 py-1 mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Admin
                  </span>
                  <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                    Admin
                  </Badge>
                </div>
              )}
              {adminNavItems.map(item => (
                <NavItem
                  key={item.title}
                  item={item}
                  isCollapsed={isCollapsed}
                  expandedItems={expandedItems}
                  onToggleExpanded={onToggleExpanded}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Bottom Navigation - filtered based on admin status */}
        <div className="pt-3 mt-3 border-t border-sidebar-border space-y-1">
          {filteredBottomNavItems.map(item => (
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
