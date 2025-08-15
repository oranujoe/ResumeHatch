import React, { useState } from 'react';
import { JobPosting, ExtensionMessage } from '../messages';

interface Props {
  job: JobPosting;
  tabId: number;
}

const DetectedJobCard: React.FC<Props> = ({ job, tabId }) => {
  const handleSend = () => {
    const msg: ExtensionMessage = { type: 'OPEN_RESUME_HATCH', tabId };
    chrome.runtime.sendMessage(msg);
    window.close();
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(job.description || '').then(() => {
      // Try native notification first
      const msg: ExtensionMessage = {
        type: 'SHOW_NOTIFICATION',
        title: 'Copied',
        message: 'Job description copied to clipboard.',
      };
      chrome.runtime.sendMessage(msg);

      // Always show inline feedback as a fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-2">
      <div className="border-l-4 border-blue-600 rounded-md p-3 bg-white shadow-md dark:bg-zinc-800">
        <p className="font-medium leading-snug line-clamp-2" title={job.title}>{job.title}</p>
        {job.company && (
          <p className="text-sm text-muted-foreground truncate" title={job.company}>{job.company}</p>
        )}
        {job.location && (
          <p className="text-xs text-muted-foreground truncate" title={job.location}>{job.location}</p>
        )}
      </div>
      <button onClick={handleSend} className="w-full rounded bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 transition-colors">Send to Resume Hatch</button>
      <button onClick={handleCopy} className="w-full rounded border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 transition">Copy description</button>
      {copied && (
        <p className="text-xs text-green-600 dark:text-green-400">Copied to clipboard</p>
      )}
    </div>
  );
};

export default DetectedJobCard; 