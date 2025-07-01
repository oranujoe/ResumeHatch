
import React from 'react';
import { 
  FileText, 
  Users, 
  Star,
  Zap,
  Target
} from 'lucide-react';
import QuickActionCard from '../QuickActionCard';

const QuickActionsSection = () => {
  const quickActions = [
    {
      title: "AI Job Parser",
      description: "Extract job details from any listing and create tailored applications with our advanced AI technology.",
      icon: FileText,
      iconColor: "bg-gradient-to-br from-primary to-primary/80",
      action: "Start Parsing",
      isNew: true
    },
    {
      title: "Smart Referrals",
      description: "Connect with industry professionals and discover warm introductions at your target companies.",
      icon: Users,
      iconColor: "bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]",
      action: "Find Connections"
    },
    {
      title: "Interview Mastery",
      description: "Practice with our AI coach, get personalized feedback, and ace your next interview.",
      icon: Star,
      iconColor: "bg-gradient-to-br from-success-primary to-success-secondary",
      action: "Start Training",
      isNew: true
    },
    {
      title: "Application Booster",
      description: "Optimize your applications with AI-powered insights and increase your response rate.",
      icon: Zap,
      iconColor: "bg-gradient-to-br from-warning-primary to-warning-secondary",
      action: "Boost Now"
    },
    {
      title: "Goal Tracker",
      description: "Set weekly application targets and track your progress towards landing your dream job.",
      icon: Target,
      iconColor: "bg-gradient-to-br from-info-primary to-info-secondary",
      action: "Set Goals"
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-headline-medium font-bold text-foreground">
          Quick Actions
        </h2>
        <p className="text-body-small text-muted-foreground mt-1">
          Powerful tools to accelerate your job search
        </p>
      </div>
      
      <div className="space-y-4">
        {quickActions.map((action, index) => (
          <QuickActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default QuickActionsSection;
