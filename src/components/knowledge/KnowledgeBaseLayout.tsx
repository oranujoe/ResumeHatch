
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface KnowledgeBaseLayoutProps {
  children: React.ReactNode;
}

const KnowledgeBaseLayout: React.FC<KnowledgeBaseLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { value: 'profile', label: 'Profile Data', path: '/dashboard/knowledge/profile' },
    { value: 'skills', label: 'Skills Gap', path: '/dashboard/knowledge/skills' }
  ];

  const getCurrentTab = () => {
    if (currentPath.includes('/skills')) return 'skills';
    return 'profile';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Knowledge Base</h2>
        <p className="text-muted-foreground">
          Manage your professional profile data to generate personalized, accurate resumes without placeholder content.
        </p>
      </div>

      <Tabs value={getCurrentTab()} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              asChild
              className={cn(
                "cursor-pointer",
                currentPath === tab.path && "data-[state=active]:bg-background data-[state=active]:text-foreground"
              )}
            >
              <Link to={tab.path}>
                {tab.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default KnowledgeBaseLayout;
