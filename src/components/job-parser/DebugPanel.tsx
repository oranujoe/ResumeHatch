
import React from 'react';

interface DebugPanelProps {
  showResume: boolean;
  generatedResume: string;
  selectedTemplate: string;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ 
  showResume, 
  generatedResume, 
  selectedTemplate 
}) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-2 rounded text-xs">
      <div>Show Resume: {showResume ? 'Yes' : 'No'}</div>
      <div>Has Content: {generatedResume ? 'Yes' : 'No'}</div>
      <div>Template: {selectedTemplate}</div>
    </div>
  );
};

export default DebugPanel;
