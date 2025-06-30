
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import JobParserLayout from '../components/job-parser/JobParserLayout';
import ParseAndApplyPage from '../components/job-parser/ParseAndApplyPage';
import DropZonePage from '../components/job-parser/DropZonePage';
import BulkQueuePage from '../components/job-parser/BulkQueuePage';
import JobZonePage from '../components/job-parser/JobZonePage';

const JobParser = () => {
  return (
    <DashboardLayout pageTitle="Job Parser">
      <JobParserLayout>
        <Routes>
          <Route index element={<ParseAndApplyPage />} />
          <Route path="parse" element={<ParseAndApplyPage />} />
          <Route path="chrome" element={<DropZonePage />} />
          <Route path="bulk" element={<BulkQueuePage />} />
          <Route path="zone" element={<JobZonePage />} />
        </Routes>
      </JobParserLayout>
    </DashboardLayout>
  );
};

export default JobParser;
