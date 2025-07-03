
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import JobParserLayout from '../components/job-parser/JobParserLayout';
import ParseAndApplyPage from '../components/job-parser/ParseAndApplyPage';
import DropZonePage from '../components/job-parser/DropZonePage';
import BulkQueuePage from '../components/job-parser/BulkQueuePage';
import JobZonePage from '../components/job-parser/JobZonePage';

// Create placeholder components for other dashboard sections
const ApplicationsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Applications</h2>
    <p className="text-muted-foreground">Manage your job applications here.</p>
  </div>
);

const DocumentsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Documents</h2>
    <p className="text-muted-foreground">Manage your documents and templates here.</p>
  </div>
);

const KnowledgePage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Knowledge Base</h2>
    <p className="text-muted-foreground">Manage your profile data and skills here.</p>
  </div>
);

const JobFeedPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Job Feed</h2>
    <p className="text-muted-foreground">Browse job opportunities here.</p>
  </div>
);

const InterviewPrepPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Interview Prep</h2>
    <p className="text-muted-foreground">Prepare for interviews with AI coaching.</p>
  </div>
);

const ReferralsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Referrals</h2>
    <p className="text-muted-foreground">Manage your referral network here.</p>
  </div>
);

const SettingsPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Settings</h2>
    <p className="text-muted-foreground">Configure your account settings here.</p>
  </div>
);

const ProfilePage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Profile</h2>
    <p className="text-muted-foreground">Manage your profile information here.</p>
  </div>
);

const HelpPage = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Help</h2>
    <p className="text-muted-foreground">Get help and support here.</p>
  </div>
);

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/*" element={
        <DashboardLayout pageTitle="Dashboard">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="applications/*" element={<ApplicationsPage />} />
            <Route path="documents/*" element={<DocumentsPage />} />
            <Route path="knowledge/*" element={<KnowledgePage />} />
            <Route path="job-feed" element={<JobFeedPage />} />
            <Route path="interview-prep/*" element={<InterviewPrepPage />} />
            <Route path="referrals" element={<ReferralsPage />} />
            <Route path="settings/*" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="help/*" element={<HelpPage />} />
            {/* Job Parser Routes - integrated directly */}
            <Route path="job-parser" element={
              <JobParserLayout>
                <ParseAndApplyPage />
              </JobParserLayout>
            } />
            <Route path="job-parser/parse" element={
              <JobParserLayout>
                <ParseAndApplyPage />
              </JobParserLayout>
            } />
            <Route path="job-parser/chrome" element={
              <JobParserLayout>
                <DropZonePage />
              </JobParserLayout>
            } />
            <Route path="job-parser/bulk" element={
              <JobParserLayout>
                <BulkQueuePage />
              </JobParserLayout>
            } />
            <Route path="job-parser/zone" element={
              <JobParserLayout>
                <JobZonePage />
              </JobParserLayout>
            } />
          </Routes>
        </DashboardLayout>
      } />
    </Routes>
  );
};

export default Dashboard;
