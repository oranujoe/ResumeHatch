import { useEffect, useState } from 'react';
import { ExtensionMessage, JobPosting, DetectedJobResponse } from '../messages';

export const useDetectedJob = () => {
  const [job, setJob] = useState<JobPosting | null>(null);
  const [tabId, setTabId] = useState<number | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (!activeTab?.id) return;
      const tId = activeTab.id;
      setTabId(tId);

      const msg: ExtensionMessage = { type: 'GET_DETECTED_JOB', tabId: tId };
      chrome.runtime.sendMessage(msg, (response: DetectedJobResponse) => {
        setJob(response?.job || null);
      });
    });
  }, []);

  return { job, tabId } as const;
}; 