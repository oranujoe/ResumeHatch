
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Users, 
  TrendingUp,
  Filter,
  Search
} from 'lucide-react';

const JobZonePage = () => {
  // Mock data for job zones
  const jobZones = [
    {
      id: 1,
      title: "Software Engineering Hub",
      location: "San Francisco Bay Area",
      jobCount: 1247,
      averageSalary: "$145,000",
      companies: ["Google", "Meta", "Apple", "Salesforce"],
      trending: "AI/ML",
      growth: "+12%"
    },
    {
      id: 2,
      title: "Finance & Banking District",
      location: "New York City",
      jobCount: 892,
      averageSalary: "$125,000",
      companies: ["Goldman Sachs", "JPMorgan", "Citi", "BlackRock"],
      trending: "FinTech",
      growth: "+8%"
    },
    {
      id: 3,
      title: "Healthcare Innovation Zone",
      location: "Boston",
      jobCount: 634,
      averageSalary: "$98,000",
      companies: ["Pfizer", "Moderna", "Biogen", "Vertex"],
      trending: "Biotech",
      growth: "+15%"
    },
    {
      id: 4,
      title: "Energy & Sustainability Hub",
      location: "Austin",
      jobCount: 456,
      averageSalary: "$87,000",
      companies: ["Tesla", "ExxonMobil", "Shell", "BP"],
      trending: "Green Tech",
      growth: "+22%"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Job Zone</h1>
          <p className="text-muted-foreground">
            Discover job opportunities by geographic regions and industry clusters
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Zones</p>
                <p className="text-xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
                <p className="text-xl font-bold">3,229</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Companies</p>
                <p className="text-xl font-bold">1,847</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Growth</p>
                <p className="text-xl font-bold">+14%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Zones Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobZones.map((zone) => (
          <Card key={zone.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{zone.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {zone.location}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {zone.growth}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Jobs</p>
                    <p className="font-semibold">{zone.jobCount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Salary</p>
                    <p className="font-semibold">{zone.averageSalary}</p>
                  </div>
                </div>
              </div>
              
              {/* Trending Skill */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Trending</p>
                <Badge variant="outline">{zone.trending}</Badge>
              </div>
              
              {/* Top Companies */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Top Companies</p>
                <div className="flex flex-wrap gap-1">
                  {zone.companies.slice(0, 3).map((company, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {company}
                    </Badge>
                  ))}
                  {zone.companies.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{zone.companies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <Button className="w-full" variant="outline">
                Explore Zone
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <Button variant="outline">
          Load More Zones
        </Button>
      </div>
    </div>
  );
};

export default JobZonePage;
