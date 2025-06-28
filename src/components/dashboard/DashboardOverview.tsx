
import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar,
  Clock,
  Star,
  Zap,
  Target
} from 'lucide-react';
import KPICard from './KPICard';
import JobCard from './JobCard';
import QuickActionCard from './QuickActionCard';
import WelcomeBanner from './WelcomeBanner';

const DashboardOverview = () => {
  const [showBanner, setShowBanner] = useState(true);

  // Enhanced KPI data with trends and subtitles
  const kpiData = [
    {
      title: "Total Applications",
      value: "47",
      change: "+12%",
      changeType: "positive" as const,
      icon: Briefcase,
      iconColor: "bg-gradient-to-br from-info-primary to-info-secondary",
      trend: [0.3, 0.7, 0.4, 0.9, 0.6, 1.0, 0.8],
      subtitle: "This month"
    },
    {
      title: "Active Pipeline",
      value: "23",
      change: "6 this week",
      changeType: "neutral" as const,
      icon: Clock,
      iconColor: "bg-gradient-to-br from-warning-primary to-warning-secondary",
      trend: [0.5, 0.3, 0.8, 0.6, 0.9, 0.7, 0.4],
      subtitle: "Awaiting response"
    },
    {
      title: "Interviews",
      value: "3",
      change: "Next 7 days",
      changeType: "positive" as const,
      icon: Calendar,
      iconColor: "bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA]",
      trend: [0.2, 0.5, 0.3, 0.8, 0.6, 0.9, 1.0],
      subtitle: "Scheduled"
    },
    {
      title: "Success Rate",
      value: "18%",
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconColor: "bg-gradient-to-br from-success-primary to-success-secondary",
      trend: [0.1, 0.3, 0.2, 0.6, 0.4, 0.7, 0.9],
      subtitle: "Above average"
    }
  ];

  // Enhanced job data
  const recentJobs = [
    {
      company: "Google",
      position: "Senior Frontend Developer",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      status: "interview" as const,
      postedDate: "2 days ago",
      applicationDate: "1 week ago",
      priority: "high" as const,
      isBookmarked: true
    },
    {
      company: "Meta",
      position: "React Developer",
      location: "Menlo Park, CA",
      salary: "$130k - $180k",
      skills: ["React", "JavaScript", "GraphQL", "Redux", "Jest"],
      status: "applied" as const,
      postedDate: "1 week ago",
      applicationDate: "3 days ago",
      priority: "high" as const,
      isBookmarked: false
    },
    {
      company: "Apple",
      position: "UI/UX Developer",
      location: "Cupertino, CA",
      salary: "$140k - $190k",
      skills: ["Figma", "React", "Swift", "Design Systems"],
      status: "pending" as const,
      postedDate: "2 weeks ago",
      applicationDate: "1 week ago",
      priority: "medium" as const,
      isBookmarked: true
    },
    {
      company: "Netflix",
      position: "Full Stack Engineer",
      location: "Los Gatos, CA",
      salary: "$160k - $220k",
      skills: ["React", "Python", "AWS", "Microservices", "Docker"],
      status: "offer" as const,
      postedDate: "3 weeks ago",
      applicationDate: "2 weeks ago",
      priority: "high" as const,
      isBookmarked: true
    }
  ];

  // Enhanced quick actions
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
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      {showBanner && (
        <WelcomeBanner 
          onClose={() => setShowBanner(false)}
          className="animate-fade-in-up"
        />
      )}

      {/* KPI Cards */}
      <div className="responsive-grid-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {kpiData.map((kpi, index) => (
          <div key={index} style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        {/* Recent Job Applications */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-headline-medium font-bold text-foreground">
                Recent Applications
              </h2>
              <p className="text-body-small text-muted-foreground mt-1">
                Track your latest job applications and their progress
              </p>
            </div>
            <button className="btn-outline px-4 py-2 text-label-medium hidden sm:flex">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <div 
                key={index} 
                className="animate-fade-in-left"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <JobCard {...job} />
              </div>
            ))}
          </div>
          
          {/* Mobile View All Button */}
          <button className="btn-outline w-full py-3 text-label-medium sm:hidden">
            View All Applications
          </button>
        </div>

        {/* Quick Actions */}
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
              <div 
                key={index}
                className="animate-fade-in-right"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <QuickActionCard {...action} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
