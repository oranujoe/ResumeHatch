
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Chrome, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface JobParserLayoutProps {
  children: React.ReactNode;
}

const JobParserLayout: React.FC<JobParserLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    {
      id: 'parse',
      label: 'Parse & Apply',
      path: '/dashboard/job-parser/parse',
      icon: FileText
    },
    {
      id: 'chrome',
      label: 'Drop-zone Chrome',
      path: '/dashboard/job-parser/chrome',
      icon: Chrome
    },
    {
      id: 'bulk',
      label: 'Bulk Queue',
      path: '/dashboard/job-parser/bulk',
      icon: List
    }
  ];

  const getActiveTab = () => {
    if (currentPath.includes('/chrome')) return 'chrome';
    if (currentPath.includes('/bulk')) return 'bulk';
    return 'parse';
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <Tabs value={getActiveTab()} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20">
            {tabs.map((tab) => (
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
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Page Content */}
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
};

export default JobParserLayout;
