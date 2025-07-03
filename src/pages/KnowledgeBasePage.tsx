
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileDataPage from '../components/knowledge/ProfileDataPage';

const KnowledgeBasePage = () => {
  return (
    <Routes>
      <Route path="profile" element={<ProfileDataPage />} />
      <Route index element={<ProfileDataPage />} />
    </Routes>
  );
};

export default KnowledgeBasePage;
