
import React from 'react';
import AdminRoute from '@/components/admin/AdminRoute';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminDashboardPage: React.FC = () => {
  return (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  );
};

export default AdminDashboardPage;
