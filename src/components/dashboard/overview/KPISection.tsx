
import React from 'react';
import { 
  Briefcase, 
  Clock,
  Calendar,
  TrendingUp
} from 'lucide-react';
import KPICard from '../KPICard';

const KPISection = () => {
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

  return (
    <div className="responsive-grid-4">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KPISection;
