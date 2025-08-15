
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ParseAndApplyPage from '../components/job-parser/ParseAndApplyPage';
import DropZonePage from '../components/job-parser/DropZonePage';
import BulkQueuePage from '../components/job-parser/BulkQueuePage';
import JobZonePage from '../components/job-parser/JobZonePage';
import JobParserTabs from '../components/job-parser/JobParserTabs';
import HelpLayout from '../components/help/HelpLayout';
import DocsPage from '../components/help/DocsPage';
import ChatPage from '../components/help/ChatPage';
import ChangelogPage from '../components/help/ChangelogPage';
import KnowledgeBaseLayout from '../components/knowledge/KnowledgeBaseLayout';
import ProfileDataPage from '../components/knowledge/ProfileDataPage';
import SkillsGapPage from '../components/knowledge/SkillsGapPage';
import ComingSoonPage from '../components/dashboard/ComingSoonPage';
import AdminRoute from '../components/admin/AdminRoute';
import AdminLayout from '../components/admin/AdminLayout';
import AdminOverview from '../components/admin/AdminOverview';
import AdminUserManagement from '../components/admin/AdminUserManagement';

const Dashboard = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/*" element={
        <DashboardLayout pageTitle="Dashboard">
          <Routes>
            <Route index element={<DashboardOverview />} />
            
            {/* Admin Setup Route - Accessible to all authenticated users */}
            <Route path="setup-admin" element={
              <AdminLayout title="Admin Setup">
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      Use this section to grant admin privileges to users. Once you become an admin, 
                      you can access the full admin dashboard at <code>/admin</code>.
                    </p>
                  </div>
                  <AdminUserManagement />
                </div>
              </AdminLayout>
            } />
            
            {/* Admin Routes - Protected */}
            <Route path="admin" element={
              <AdminRoute>
                <AdminLayout>
                  <AdminOverview />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="admin/users" element={
              <AdminRoute>
                <AdminLayout title="User Management">
                  <AdminUserManagement />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="admin/audit" element={
              <AdminRoute>
                <AdminLayout title="Audit Logs">
                  <ComingSoonPage />
                </AdminLayout>
              </AdminRoute>
            } />
            <Route path="admin/system" element={
              <AdminRoute>
                <AdminLayout title="System Data">
                  <ComingSoonPage />
                </AdminLayout>
              </AdminRoute>
            } />
            
            {/* Coming Soon Routes */}
            <Route path="applications/*" element={<ComingSoonPage />} />
            <Route path="documents/*" element={<ComingSoonPage />} />
            <Route path="job-feed" element={<ComingSoonPage />} />
            <Route path="interview-prep/*" element={<ComingSoonPage />} />
            <Route path="referrals" element={<ComingSoonPage />} />
            <Route path="settings/*" element={<ComingSoonPage />} />
            <Route path="profile" element={<ComingSoonPage />} />
            
            {/* Knowledge Base Routes - with shared layout and tabs */}
            <Route path="knowledge" element={
              <KnowledgeBaseLayout>
                <ProfileDataPage />
              </KnowledgeBaseLayout>
            } />
            <Route path="knowledge/profile" element={
              <KnowledgeBaseLayout>
                <ProfileDataPage />
              </KnowledgeBaseLayout>
            } />
            <Route path="knowledge/skills" element={
              <KnowledgeBaseLayout>
                <SkillsGapPage />
              </KnowledgeBaseLayout>
            } />
            
            {/* Help Routes - with shared layout and tabs */}
            <Route path="help" element={
              <HelpLayout>
                <DocsPage />
              </HelpLayout>
            } />
            <Route path="help/docs" element={
              <HelpLayout>
                <DocsPage />
              </HelpLayout>
            } />
            <Route path="help/chat" element={
              <HelpLayout>
                <ChatPage />
              </HelpLayout>
            } />
            <Route path="help/changelog" element={
              <HelpLayout>
                <ChangelogPage />
              </HelpLayout>
            } />
            
            {/* Job Parser Routes - with shared tabs */}
            <Route path="job-parser" element={
              <div className="space-y-6">
                <JobParserTabs />
                <ParseAndApplyPage />
              </div>
            } />
            <Route path="job-parser/parse" element={
              <div className="space-y-6">
                <JobParserTabs />
                <ParseAndApplyPage />
              </div>
            } />
            <Route path="job-parser/chrome" element={
              <div className="space-y-6">
                <JobParserTabs />
                <DropZonePage />
              </div>
            } />
            <Route path="job-parser/bulk" element={
              <div className="space-y-6">
                <JobParserTabs />
                <BulkQueuePage />
              </div>
            } />
            <Route path="job-parser/zone" element={
              <div className="space-y-6">
                <JobParserTabs />
                <JobZonePage />
              </div>
            } />
          </Routes>
        </DashboardLayout>
      } />
    </Routes>
  );
};

export default Dashboard;
