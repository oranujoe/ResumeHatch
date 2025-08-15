
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Copy } from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';

interface ResumeActionsProps {
  onDownloadPDF: () => void;
  onCopyToClipboard: () => void;
}

const ResumeActions: React.FC<ResumeActionsProps> = ({ onDownloadPDF, onCopyToClipboard }) => {
  return (
    <GlassCard className="p-6">
      <div className="space-y-4">
        <h3 className="text-title-large font-medium">Export Options</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            id="downloadBtn"
            onClick={onDownloadPDF}
            variant="default"
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          
          <Button
            onClick={onCopyToClipboard}
            variant="outline"
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy Text
          </Button>
        </div>
        <p className="text-label-small text-muted-foreground">
          PDF exports preserve formatting and are ATS-friendly. Text copy is perfect for online applications.
        </p>
      </div>
    </GlassCard>
  );
};

export default ResumeActions;
