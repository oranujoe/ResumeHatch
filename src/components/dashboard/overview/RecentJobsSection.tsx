
import React from 'react';
import JobCard from '../JobCard';

const RecentJobsSection = () => {
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

  return (
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
      
      <button className="btn-outline w-full py-3 text-label-medium sm:hidden">
        View All Applications
      </button>
    </div>
  );
};

export default RecentJobsSection;
