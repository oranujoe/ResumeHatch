
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, MessageCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HelpLayoutProps {
  children: React.ReactNode;
}

const HelpLayout: React.FC<HelpLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const helpTabs = [
    {
      id: 'docs',
      label: 'Docs/FAQ',
      path: '/dashboard/help/docs',
      icon: FileText
    },
    {
      id: 'chat',
      label: 'Live Chat',
      path: '/dashboard/help/chat',
      icon: MessageCircle
    },
    {
      id: 'changelog',
      label: 'Changelog',
      path: '/dashboard/help/changelog',
      icon: Clock
    }
  ];

  const getActiveTab = () => {
    if (currentPath.includes('/chat')) return 'chat';
    if (currentPath.includes('/changelog')) return 'changelog';
    return 'docs';
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border">
        <Tabs value={getActiveTab()} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20">
            {helpTabs.map((tab) => (
              <Link key={tab.id} to={tab.path} className="w-full">
                <TabsTrigger 
                  value={tab.id} 
                  className={cn(
                    "w-full flex items-center space-x-2 data-[state=active]:bg-background",
                    "hover:bg-accent/50 transition-colors duration-200"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split('/')[0]}</span>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="min-h-[500px]">
        {children}
      </div>
    </div>
  );
};

export default HelpLayout;
