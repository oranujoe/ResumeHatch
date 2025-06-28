import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  MapPin,
  DollarSign,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType, icon: Icon, iconColor }) => {
  return (
    <div className="glass-card glass-card-hover p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-lg", iconColor)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-center space-x-1">
          {changeType === 'positive' && <ArrowUpRight className="h-4 w-4 text-status-offer" />}
          {changeType === 'negative' && <ArrowDownRight className="h-4 w-4 text-status-rejected" />}
          <span className={cn(
            "text-xs font-medium",
            changeType === 'positive' && "text-status-offer",
            changeType === 'negative' && "text-status-rejected",
            changeType === 'neutral' && "text-muted-foreground"
          )}>
            {change}
          </span>
        </div>
      </div>
      <div>
        <p className="text-caption text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

// Job Card Component
interface JobCardProps {
  company: string;
  position: string;
  location: string;
  salary: string;
  skills: string[];
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'pending';
  postedDate: string;
}

const JobCard: React.FC<JobCardProps> = ({ company, position, location, salary, skills, status, postedDate }) => {
  const statusConfig = {
    applied: { color: 'status-applied', label: 'Applied' },
    interview: { color: 'status-interview', label: 'Interview' },
    offer: { color: 'status-offer', label: 'Offer' },
    rejected: { color: 'status-rejected', label: 'Rejected' },
    pending: { color: 'status-pending', label: 'Pending' }
  };

  const statusInfo = statusConfig[status];

  return (
    <div className="glass-card glass-card-hover p-6 rounded-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-card-title font-semibold text-foreground">{position}</h3>
            <p className="text-body text-muted-foreground">{company}</p>
          </div>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-medium", statusInfo.color)}>
          {statusInfo.label}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-caption text-muted-foreground">
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-1">
          <DollarSign className="h-3 w-3" />
          <span>{salary}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
              +{skills.length - 3}
            </span>
          )}
        </div>
        <button className="btn-outline px-4 py-2 text-sm">
          View Job
        </button>
      </div>
    </div>
  );
};

// Quick Action Card Component
interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  action: string;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, description, icon: Icon, iconColor, action }) => {
  return (
    <div className="glass-card glass-card-hover p-6 rounded-lg">
      <div className="flex items-start space-x-4">
        <div className={cn("p-3 rounded-lg", iconColor)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-card-title font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-caption text-muted-foreground mb-3">{description}</p>
          <button className="btn-primary px-4 py-2 text-sm">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const kpiData = [
    {
      title: "Total Applications",
      value: "47",
      change: "+12%",
      changeType: "positive" as const,
      icon: Briefcase,
      iconColor: "bg-status-applied"
    },
    {
      title: "Active Applications",
      value: "23",
      change: "Awaiting",
      changeType: "neutral" as const,
      icon: Clock,
      iconColor: "bg-status-pending"
    },
    {
      title: "Interviews Scheduled",
      value: "3",
      change: "This week",
      changeType: "positive" as const,
      icon: Calendar,
      iconColor: "bg-status-interview"
    },
    {
      title: "Success Rate",
      value: "18%",
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconColor: "bg-status-offer"
    }
  ];

  const recentJobs = [
    {
      company: "Google",
      position: "Senior Frontend Developer",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      skills: ["React", "TypeScript", "Node.js"],
      status: "interview" as const,
      postedDate: "2 days ago"
    },
    {
      company: "Meta",
      position: "React Developer",
      location: "Menlo Park, CA",
      salary: "$130k - $180k",
      skills: ["React", "JavaScript", "GraphQL"],
      status: "applied" as const,
      postedDate: "1 week ago"
    },
    {
      company: "Apple",
      position: "UI/UX Developer",
      location: "Cupertino, CA",
      salary: "$140k - $190k",
      skills: ["Figma", "React", "Swift"],
      status: "pending" as const,
      postedDate: "2 weeks ago"
    }
  ];

  const quickActions = [
    {
      title: "Parse New Job",
      description: "Extract job details and create application",
      icon: FileText,
      iconColor: "bg-primary",
      action: "Start Parsing"
    },
    {
      title: "Find Referrals",
      description: "Connect with people at target companies",
      icon: Users,
      iconColor: "bg-status-interview",
      action: "Browse Network"
    },
    {
      title: "Interview Prep",
      description: "Practice with AI coach and schedule prep",
      icon: Star,
      iconColor: "bg-status-offer",
      action: "Start Prep"
    }
  ];

  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      {showBanner && (
        <div className="relative flex items-center bg-yellow-50 border border-yellow-300 text-black rounded-2xl px-6 py-5" style={{ minHeight: 80 }}>
          <div className="flex-1">
            <div className="font-semibold text-xl mb-1 flex items-center">
              Welcome to ResumeHatch! <span className="ml-2 text-xl">👋</span>
            </div>
            <div className="text-base text-black/90">
              Get started by parsing your first job listing or uploading your resume. Need help? Check out our{' '}
              <a href="#" className="text-blue-600 underline hover:text-blue-800">quick start guide</a>.
            </div>
          </div>
          <button
            className="absolute top-4 right-5 text-2xl text-black/70 hover:text-black focus:outline-none"
            aria-label="Close banner"
            onClick={() => setShowBanner(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Job Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-section-header text-foreground">Recent Job Applications</h2>
            <button className="btn-outline px-4 py-2 text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-section-header text-foreground">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action, index) => (
              <QuickActionCard key={index} {...action} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 