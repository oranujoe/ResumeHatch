
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50 dark:bg-slate-900">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardTopbar />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
