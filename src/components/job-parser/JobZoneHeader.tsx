
import React from 'react';

const JobZoneHeader = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-display-medium text-foreground">AI Resume Generator</h1>
      <p className="text-body-large text-muted-foreground max-w-2xl">
        Transform any job description into an ATS-optimized resume tailored specifically for that role. 
        Our AI analyzes requirements and creates compelling, keyword-rich content that gets noticed.
      </p>
    </div>
  );
};

export default JobZoneHeader;
