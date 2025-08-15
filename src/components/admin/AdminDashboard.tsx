
import React from 'react';
import AdminLayout from './AdminLayout';
import AdminOverview from './AdminOverview';
import AdminUserManagement from './AdminUserManagement';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        <AdminOverview />
        <AdminUserManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
