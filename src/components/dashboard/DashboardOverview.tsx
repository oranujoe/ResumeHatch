
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, John!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Here's what's happening with your job applications today.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          New Application
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Total Applications
            </CardTitle>
            <Briefcase className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">47</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Active Applications
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">23</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Interviews Scheduled
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              This week
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Success Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">18%</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              Above average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Applications */}
        <Card className="lg:col-span-2 border-slate-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-white">Recent Applications</CardTitle>
            <CardDescription>Your latest job application activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  company: "Google",
                  position: "Senior Frontend Developer",
                  status: "Interview",
                  statusColor: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                  date: "2 days ago"
                },
                {
                  company: "Meta",
                  position: "React Developer",
                  status: "Applied",
                  statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                  date: "1 week ago"
                },
                {
                  company: "Apple",
                  position: "UI/UX Developer",
                  status: "Pending",
                  statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                  date: "2 weeks ago"
                },
                {
                  company: "Netflix",
                  position: "Full Stack Engineer",
                  status: "Rejected",
                  statusColor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                  date: "3 weeks ago"
                }
              ].map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{app.position}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{app.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={app.statusColor}>
                      {app.status}
                    </Badge>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{app.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Progress */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Parse New Job
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Find Referrals
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            </CardContent>
          </Card>

          {/* Application Progress */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Monthly Goal</CardTitle>
              <CardDescription>Applications submitted this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">12/20</span>
              </div>
              <Progress value={60} className="h-2" />
              <p className="text-sm text-slate-600 dark:text-slate-400">
                8 more applications to reach your monthly goal
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">Upcoming Interviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Google - Technical</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Tomorrow at 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Meta - HR Round</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Friday at 10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
