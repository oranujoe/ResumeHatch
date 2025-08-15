
import React, { useState } from 'react';
import { Play, Pause, Trash2, Edit, MoreHorizontal, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const BulkQueuePage = () => {
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const queuedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Stripe',
      location: 'San Francisco, CA',
      status: 'ready',
      priority: 'high',
      estimatedTime: '5 min',
      matchScore: 95
    },
    {
      id: 2,
      title: 'Frontend Engineer',
      company: 'Airbnb',
      location: 'Remote',
      status: 'processing',
      priority: 'medium',
      estimatedTime: '3 min',
      matchScore: 88
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      status: 'paused',
      priority: 'low',
      estimatedTime: '7 min',
      matchScore: 82
    },
    {
      id: 4,
      title: 'Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      status: 'ready',
      priority: 'high',
      estimatedTime: '4 min',
      matchScore: 92
    }
  ];

  const handleSelectJob = (jobId: number, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(queuedJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-500';
      case 'processing': return 'bg-blue-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Bulk Queue</h2>
          <p className="text-muted-foreground mt-1">
            Manage and process multiple job applications in batch
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div>
              <p className="text-2xl font-bold">19 min</p>
              <p className="text-sm text-muted-foreground">Est. Total Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedJobs.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="flex items-center space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Start Selected</span>
                </Button>
                <Button size="sm" variant="outline" className="flex items-center space-x-2">
                  <Pause className="h-4 w-4" />
                  <span>Pause Selected</span>
                </Button>
                <Button size="sm" variant="destructive" className="flex items-center space-x-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Remove Selected</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Job Queue</CardTitle>
          <CardDescription>
            Applications waiting to be processed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="flex items-center space-x-4 p-4 bg-muted/20 rounded-lg">
              <Checkbox
                checked={selectedJobs.length === queuedJobs.length}
                onCheckedChange={handleSelectAll}
              />
              <div className="flex-1 grid grid-cols-6 gap-4 items-center text-sm font-medium">
                <span>Job Title</span>
                <span>Company</span>
                <span>Status</span>
                <span>Priority</span>
                <span>Match</span>
                <span>Actions</span>
              </div>
            </div>

            {/* Table Rows */}
            {queuedJobs.map((job) => (
              <div key={job.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Checkbox
                  checked={selectedJobs.includes(job.id)}
                  onCheckedChange={(checked) => handleSelectJob(job.id, checked as boolean)}
                />
                <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.location}</p>
                  </div>
                  <div>
                    <p className="font-medium">{job.company}</p>
                    <p className="text-sm text-muted-foreground">{job.estimatedTime}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`}></div>
                    <span className="text-sm capitalize">{job.status}</span>
                  </div>
                  <div>
                    <Badge variant={getPriorityVariant(job.priority)}>
                      {job.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{job.matchScore}%</span>
                    <div className="w-12 h-2 bg-muted rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${job.matchScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Move to Top</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BulkQueuePage;
