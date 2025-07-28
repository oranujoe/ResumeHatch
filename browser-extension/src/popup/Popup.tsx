/// <reference types="chrome" />
import React from 'react';
import Header from './Header';
import { useDetectedJob } from './useDetectedJob';
import OptionsPage from '../options/OptionsPage';
import DetectedJobCard from './DetectedJobCard';
import EmptyState from './EmptyState';

const Popup: React.FC = () => {
  const { job, tabId } = useDetectedJob();

  const [view, setView] = React.useState<'home' | 'settings'>('home');

  return (
    <div className="p-4 w-80 font-sans bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 animate-fade-in">
      <Header view={view} onOpenSettings={() => setView('settings')} onBack={() => setView('home')} />
      {view === 'home' ? (
        job && tabId != null ? <DetectedJobCard job={job} tabId={tabId} /> : <EmptyState />
      ) : (
        <OptionsPage />
      )}
    </div>
  );
};

export default Popup; 