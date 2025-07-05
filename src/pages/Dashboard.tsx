
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
import ComingSoonPage from '../components/dashboard/ComingSoonPage';

const Dashboard = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/*" element={
        <DashboardLayout pageTitle="Dashboard">
          <Routes>
            <Route index element={<DashboardOverview />} />
            
            {/* Coming Soon Routes */}
            <Route path="applications/*" element={<ComingSoonPage />} />
            <Route path="documents/*" element={<ComingSoonPage />} />
            <Route path="knowledge/*" element={<ComingSoonPage />} />
            <Route path="job-feed" element={<ComingSoonPage />} />
            <Route path="interview-prep/*" element={<ComingSoonPage />} />
            <Route path="referrals" element={<ComingSoonPage />} />
            <Route path="settings/*" element={<ComingSoonPage />} />
            <Route path="profile" element={<ComingSoonPage />} />
            
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
