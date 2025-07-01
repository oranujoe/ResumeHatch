
import React, { useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import KPISection from './overview/KPISection';
import RecentJobsSection from './overview/RecentJobsSection';
import QuickActionsSection from './overview/QuickActionsSection';

const DashboardOverview = () => {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Banner */}
      {showBanner && (
        <WelcomeBanner 
          onClose={() => setShowBanner(false)}
        />
      )}

      {/* KPI Cards */}
      <KPISection />

      {/* Main Content Grid */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
        {/* Recent Job Applications */}
        <RecentJobsSection />

        {/* Quick Actions */}
        <QuickActionsSection />
      </div>
    </div>
  );
};

export default DashboardOverview;
