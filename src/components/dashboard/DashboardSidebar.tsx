
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  User,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const mainNavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Job Parser",
    url: "/dashboard/job-parser",
    icon: FileText,
    subItems: [
      { title: "Parse Job", url: "/dashboard/job-parser/parse" },
      { title: "Saved Jobs", url: "/dashboard/job-parser/saved" },
    ]
  },
  {
    title: "Applications",
    url: "/dashboard/applications",
    icon: Briefcase,
  },
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Knowledge Base",
    url: "/dashboard/knowledge",
    icon: BookOpen,
  },
  {
    title: "Job Feed",
    url: "/dashboard/job-feed",
    icon: Briefcase,
  },
  {
    title: "Interview Prep",
    url: "/dashboard/interview-prep",
    icon: MessageSquare,
  },
  {
    title: "Referrals",
    url: "/dashboard/referrals",
    icon: Users,
  },
];

const bottomNavItems = [
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Help & Support",
    url: "/dashboard/help",
    icon: HelpCircle,
  },
];

const DashboardSidebar = () => {
  return (
    <Sidebar className="border-r border-slate-200 dark:border-slate-700">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/c1fa3a5b-2ee1-47c2-a887-35cc50f1f63f.png" 
            alt="ResumeHatch Logo" 
            className="h-8 w-8" 
          />
          <span className="font-semibold text-lg text-slate-900 dark:text-white">
            ResumeHatch
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                      {item.subItems && <ChevronRight className="ml-auto h-4 w-4" />}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                className="text-slate-700 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                <a href={item.url} className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <div className="mt-4 px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
          Version 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
