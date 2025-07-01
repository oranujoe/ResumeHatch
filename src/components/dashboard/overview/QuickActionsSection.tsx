
import React from 'react';
import { FileText, Upload, User, Settings, Briefcase, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuickActionCard from '../QuickActionCard';

const QuickActionsSection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "AI Resume Builder",
      description: "Create a tailored resume using AI that matches job requirements perfectly.",
      icon: Bot,
      iconColor: "bg-gradient-to-br from-info-primary to-info-secondary",
      action: "Start Building",
      isNew: true,
      onClick: () => navigate('/dashboard/job-parser')
    },
    {
      title: "Upload Resume",
      description: "Upload your existing resume to automatically populate your profile data.",
      icon: Upload,
      iconColor: "bg-gradient-to-br from-success-primary to-success-secondary",
      action: "Upload Now",
      onClick: () => {
        // This will be handled by the ProfileCompletionBanner component
      }
    },
    {
      title: "Complete Profile",
      description: "Add your work experience, education, and skills for better resume generation.",
      icon: User,
      iconColor: "bg-gradient-to-br from-warning-primary to-warning-secondary",
      action: "Complete Profile",
      onClick: () => {
        // This will be handled by the ProfileCompletionBanner component
      }
    },
    {
      title: "View Applications",
      description: "Track your job applications and their current status.",
      icon: Briefcase,
      iconColor: "bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]",
      action: "View Applications",
      onClick: () => navigate('/dashboard/applications')
    }
  ];

  return (
    <div className="lg:col-span-1">
      <div className="glass-card p-4 md:p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-title-large font-bold text-foreground">Quick Actions</h2>
          <Settings className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <QuickActionCard
              key={index}
              {...action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActionsSection;
