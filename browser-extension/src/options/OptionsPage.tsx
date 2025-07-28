/// <reference types="chrome" />
import React, { useEffect, useState } from 'react';
import { Options, DEFAULT_OPTIONS, getOptions, saveOptions } from './storage';

const Toggle: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
  <label className="flex items-center justify-between py-2">
    <span>{label}</span>
    <input type="checkbox" className="h-4 w-4" checked={checked} onChange={onChange} />
  </label>
);

const OptionsPage: React.FC = () => {
  const [opts, setOpts] = useState<Options>(DEFAULT_OPTIONS);
  const [edited, setEdited] = useState<Options | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getOptions().then((o) => {
      setOpts(o);
      setLoaded(true);
    });
  }, []);

  const current = edited || opts;

  const handleToggle = (key: keyof Options) => {
    const updated = { ...current, [key]: !current[key] };
    setEdited(updated);
  };

  const handleSave = () => {
    if (!edited) return;
    saveOptions(edited).then(() => {
      setOpts(edited);
      setEdited(null);
    });
  };

  if (!loaded) return <p className="p-4 text-sm">Loading…</p>;

  const dirty = !!edited;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold mb-2">Behaviour</h1>
      <div className="space-y-2">
        <Toggle label="Show badge when job detected" checked={current.showBadge} onChange={() => handleToggle('showBadge')} />
        <Toggle label="Use desktop notifications" checked={current.desktopNotifications} onChange={() => handleToggle('desktopNotifications')} />
        <Toggle label="Auto-copy job description" checked={current.autoCopy} onChange={() => handleToggle('autoCopy')} />
        <Toggle label="Close tab after sending to Resume Hatch" checked={current.closeTabOnSend} onChange={() => handleToggle('closeTabOnSend')} />
      </div>
      <details className="mt-4 group border-t pt-4 border-zinc-200 dark:border-zinc-700">
        <summary className="font-medium cursor-pointer select-none flex items-center justify-between">
          Advanced <span className="text-xs">(job board support)</span>
        </summary>
        <div className="mt-3 space-y-2 pl-2">
          <Toggle label="LinkedIn" checked={current.enableLinkedIn} onChange={() => handleToggle('enableLinkedIn')} />
          <Toggle label="Indeed" checked={current.enableIndeed} onChange={() => handleToggle('enableIndeed')} />
          <Toggle label="Glassdoor" checked={current.enableGlassdoor} onChange={() => handleToggle('enableGlassdoor')} />
          <Toggle label="We Work Remotely" checked={current.enableWWR} onChange={() => handleToggle('enableWWR')} />
          <Toggle label="Show in-page overlay button" checked={current.showOverlay} onChange={() => handleToggle('showOverlay')} />
        </div>
      </details>

      <button
        onClick={handleSave}
        disabled={!dirty}
        className={`w-full rounded bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 transition-colors ${dirty ? '' : 'opacity-50 cursor-not-allowed'}`}
      >
        Save
      </button>
    </div>
  );
};

export default OptionsPage; 