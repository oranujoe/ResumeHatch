/// <reference types="chrome" />
import React from 'react';
import { Settings, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  view: 'home' | 'settings';
  onOpenSettings: () => void;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ view, onOpenSettings, onBack }) => {
  const logoUrl = chrome.runtime.getURL('icons/icon-32.png');

  return (
    <div className="flex items-center justify-between mb-4">
      {view === 'settings' ? (
        <button onClick={onBack} title="Back" className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <ArrowLeft size={16} className="text-zinc-600 dark:text-zinc-300" />
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <img src={logoUrl} alt="Resume Hatch logo" className="h-6 w-6" />
          <h1 className="font-semibold text-base">Resume Hatch Assistant</h1>
        </div>
      )}

      {view === 'home' && (
        <button onClick={onOpenSettings} title="Settings" className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <Settings size={16} className="text-zinc-600 dark:text-zinc-300" />
        </button>
      )}
    </div>
  );
};

export default Header; 