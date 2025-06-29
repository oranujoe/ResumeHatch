import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Briefcase, 
  FolderOpen, 
  BookOpen, 
  Rss, 
  MessageSquare, 
  Users, 
  Settings, 
  User, 
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { title: string; url: string }[];
}

const mainNavItems: NavItem[] = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home
  },
  {
    title: "Job Parser",
    url: "/dashboard/job-parser",
    icon: FileText,
    subItems: [
      { title: "Parse & Apply", url: "/dashboard/job-parser/parse" },
      { title: "Drop-zone Chrome", url: "/dashboard/job-parser/chrome" },
      { title: "Bulk Queue", url: "/dashboard/job-parser/bulk" },
      { title: "Job Zone", url: "/dashboard/job-parser/zone" }
    ]
  },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Briefcase,
    subItems: [
      { title: "My Applications", url: "/dashboard/applications/list" },
      { title: "Analytics", url: "/dashboard/applications/analytics" },
      { title: "Funnel View", url: "/dashboard/applications/funnel" }
    ]
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FolderOpen,
    subItems: [
      { title: "Résumés", url: "/dashboard/documents/resumes" },
      { title: "Cover Letters", url: "/dashboard/documents/cover-letters" },
      { title: "Templates Gallery", url: "/dashboard/documents/templates" },
      { title: "Document Locker", url: "/dashboard/documents/locker" }
    ]
  },
  {
    title: "Knowledge Base",
    url: "/dashboard/knowledge",
    icon: BookOpen,
    subItems: [
      { title: "Profile Data", url: "/dashboard/knowledge/profile" },
      { title: "Skills Gap", url: "/dashboard/knowledge/skills" }
    ]
  },
  {
    title: "Job Feed",
    url: "/dashboard/job-feed",
    icon: Rss
  },
  {
    title: "Interview Prep",
    url: "/dashboard/interview-prep",
    icon: MessageSquare,
    subItems: [
      { title: "AI Coach", url: "/dashboard/interview-prep/ai-coach" },
      { title: "Scheduler", url: "/dashboard/interview-prep/scheduler" },
      { title: "Follow-Ups", url: "/dashboard/interview-prep/follow-ups" }
    ]
  },
  {
    title: "Referrals",
    url: "/dashboard/referrals",
    icon: Users
  }
];

const bottomNavItems: NavItem[] = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    subItems: [
      { title: "Account Security", url: "/dashboard/settings/security" },
      { title: "Wallet & Billing", url: "/dashboard/settings/billing" },
      { title: "Notifications", url: "/dashboard/settings/notifications" },
      { title: "Integrations", url: "/dashboard/settings/integrations" }
    ]
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User
  },
  {
    title: "Help",
    url: "/dashboard/help",
    icon: HelpCircle,
    subItems: [
      { title: "Docs/FAQ", url: "/dashboard/help/docs" },
      { title: "Live Chat", url: "/dashboard/help/chat" }
    ]
  }
];

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
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isExpanded = (title: string) => expandedItems.includes(title);
  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(url);
  };

  const renderNavItem = (item: NavItem, isBottom = false) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const expanded = isExpanded(item.title);
    const active = isActive(item.url);

    return (
      <div key={item.title} className="w-full">
        {hasSubItems ? (
          <button
            onClick={() => toggleExpanded(item.title)}
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
                  isActive(subItem.url) && "bg-accent/30 text-accent-foreground"
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
        {/* Header */}
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

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-1.5 space-y-1">
            {/* Main Navigation */}
            <div className="space-y-1">
              {mainNavItems.map(item => renderNavItem(item))}
            </div>
            
            {/* Bottom Navigation */}
            <div className="pt-3 mt-3 border-t border-sidebar-border space-y-1">
              {bottomNavItems.map(item => renderNavItem(item, true))}
            </div>
          </div>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-3 border-t border-sidebar-border">
            <div className="text-xs text-muted-foreground text-center">
              Version 1.0.0
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default DashboardSidebar;
