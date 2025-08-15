
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  title = "Admin Dashboard" 
}) => {
  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-600" />
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          </div>
          <Badge variant="destructive" className="text-xs">
            Admin Access
          </Badge>
        </div>
      </div>

      {/* Admin Content */}
      <Card className="p-6 border-red-200 bg-red-50/30">
        {children}
      </Card>
    </div>
  );
};

export default AdminLayout;
