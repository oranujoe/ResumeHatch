/// <reference types="chrome" />
import React, { useEffect, useState } from 'react';
import { JobPosting, ExtensionMessage, DetectedJobResponse } from '../messages';

const Popup: React.FC = () => {
  const [job, setJob] = useState<JobPosting | null>(null);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  // Query active tab and ask background for detected job
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.id) return;
      const tabId = activeTab.id;
      setActiveTabId(tabId);

      const msg: ExtensionMessage = { type: 'GET_DETECTED_JOB', tabId };
      chrome.runtime.sendMessage(msg, (response: DetectedJobResponse) => {
        if (response?.job) {
          setJob(response.job);
        } else {
          setJob(null);
        }
      });
    });
  }, []);

  const handleGenerateClick = () => {
    if (activeTabId == null) return;
    const msg: ExtensionMessage = { type: 'OPEN_RESUME_HATCH', tabId: activeTabId };
    chrome.runtime.sendMessage(msg);
    window.close();
  };

  return (
    <div className="p-4 w-80 font-sans">
      <h1 className="font-bold text-lg mb-2">Resume Hatch Assistant</h1>
      {job ? (
        <>
          <p className="text-sm mb-4">
            Detected job:<br />
            <span className="font-semibold">{job.title}</span>
            {job.company && ` @ ${job.company}`}
          </p>
          <button
            onClick={handleGenerateClick}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 w-full"
          >
            Generate Resume
          </button>
        </>
      ) : (
        <>
          <p className="text-sm mb-4">No job detected on this page.</p>
          <button
            disabled
            className="bg-gray-400 text-white px-3 py-2 rounded w-full cursor-not-allowed"
          >
            Generate Resume
          </button>
        </>
      )}
    </div>
  );
};

export default Popup; 