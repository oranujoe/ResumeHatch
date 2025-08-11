import React from 'react';

const EmptyState: React.FC = () => (
  <div className="text-center text-sm text-muted-foreground space-y-2 py-8">
    <svg width="48" height="48" viewBox="0 0 24 24" className="mx-auto fill-blue-600/20 dark:fill-blue-400/20"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93v-1.93h-2v1.93A8.001 8.001 0 014 12h2a6 6 0 106 6.93zM11 11V6h2v5h-2z"/></svg>
    <p>No job detected on this page.</p>
  </div>
);

export default EmptyState; 