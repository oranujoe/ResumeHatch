
import React, { useState } from 'react';
import { 
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Star,
  ExternalLink,
  Bookmark,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface JobCardProps {
  company: string;
  position: string;
  location: string;
  salary: string;
  skills: string[];
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'pending';
  postedDate: string;
  applicationDate?: string;
  priority?: 'high' | 'medium' | 'low';
  isBookmarked?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ 
  company, 
  position, 
  location, 
  salary, 
  skills, 
  status, 
  postedDate,
  applicationDate,
  priority = 'medium',
  isBookmarked = false
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const statusConfig = {
    applied: { 
      color: 'status-applied', 
      label: 'Applied',
      bgClass: 'job-card-applied'
    },
    interview: { 
      color: 'status-interview', 
      label: 'Interview',
      bgClass: 'job-card-interview'
    },
    offer: { 
      color: 'status-offer', 
      label: 'Offer',
      bgClass: 'job-card-offer'
    },
    rejected: { 
      color: 'status-rejected', 
      label: 'Rejected',
      bgClass: 'job-card-rejected'
    },
    pending: { 
      color: 'status-pending', 
      label: 'Pending',
      bgClass: 'job-card-pending'
    }
  };

  const priorityConfig = {
    high: { color: 'text-error-primary', icon: '🔥' },
    medium: { color: 'text-warning-primary', icon: '⭐' },
    low: { color: 'text-muted-foreground', icon: '📝' }
  };

  const statusInfo = statusConfig[status];
  const priorityInfo = priorityConfig[priority];

  return (
    <div className={cn("job-card", statusInfo.bgClass)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-title-medium font-semibold text-foreground truncate">
                  {position}
                </h3>
                <p className="text-body-medium text-muted-foreground">
                  {company}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                <span className={cn("text-xs", priorityInfo.color)}>
                  {priorityInfo.icon}
                </span>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className="touch-friendly p-1"
                >
                  <Bookmark 
                    className={cn(
                      "h-4 w-4 transition-colors",
                      bookmarked ? "text-warning-primary fill-current" : "text-muted-foreground"
                    )} 
                  />
                </button>
                <button className="touch-friendly p-1">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className={cn("px-3 py-1.5 rounded-full text-label-small font-medium", statusInfo.color)}>
          {statusInfo.label}
        </div>
        <div className="flex items-center space-x-4 text-label-small text-muted-foreground">
          <div className="flex items-center space-x-1">
            <MapPin className="h-3 w-3" />
            <span className="hidden sm:inline">{location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3" />
            <span className="hidden sm:inline">{salary}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.slice(0, 4).map((skill, index) => (
          <span 
            key={index} 
            className="px-2 py-1 bg-muted/50 hover:bg-muted rounded-md text-label-small text-muted-foreground transition-colors"
          >
            {skill}
          </span>
        ))}
        {skills.length > 4 && (
          <span className="px-2 py-1 bg-muted/50 rounded-md text-label-small text-muted-foreground">
            +{skills.length - 4} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-label-small text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>
            {applicationDate ? `Applied ${applicationDate}` : `Posted ${postedDate}`}
          </span>
        </div>
        <button className="btn-outline px-3 py-1.5 text-label-medium touch-target flex items-center space-x-1">
          <span>View</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
