
import React from 'react';
import { useAdminStats } from '@/hooks/useAdminRole';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, Activity, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AdminOverview: React.FC = () => {
  const { data: stats, isLoading } = useAdminStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.total_users || 0,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Admins", 
      value: stats?.total_admins || 0,
      icon: Shield,
      color: "text-red-600"
    },
    {
      title: "Actions (24h)",
      value: stats?.actions_last_24h || 0,
      icon: Activity,
      color: "text-green-600"
    },
    {
      title: "Actions (7d)",
      value: stats?.actions_last_7d || 0,
      icon: Clock,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Panel Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Welcome to the admin dashboard. Here you can:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>View system statistics and user metrics</li>
              <li>Manage user accounts and permissions</li>
              <li>Monitor admin activities and audit logs</li>
              <li>Access advanced system controls</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Note: This is a secure admin area. All actions are logged for security purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOverview;
