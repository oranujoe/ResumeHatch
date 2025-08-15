
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface ResumeUploadDialogProps {
  children: React.ReactNode;
  onUploadComplete?: (extractedData: any) => void;
}

const ResumeUploadDialog: React.FC<ResumeUploadDialogProps> = ({ children, onUploadComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Word document, or text file.",
          variant: "destructive"
        });
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    try {
      setUploadStatus('uploading');
      setProgress(20);

      // Upload file to Supabase Storage
      const fileName = `${user.id}/${Date.now()}-${selectedFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      setProgress(40);

      // Create resume upload record
      const { data: resumeRecord, error: recordError } = await supabase
        .from('resume_uploads')
        .insert({
          user_id: user.id,
          filename: selectedFile.name,
          file_size: selectedFile.size,
          file_type: selectedFile.type,
          storage_path: uploadData.path,
          extraction_status: 'pending'
        })
        .select()
        .single();

      if (recordError) throw recordError;

      setProgress(60);
      setUploadStatus('processing');

      // Start extraction process
      const { data: extractionData, error: extractionError } = await supabase.functions.invoke('extract-resume', {
        body: { resumeUploadId: resumeRecord.id }
      });

      if (extractionError) throw extractionError;

      setProgress(100);
      setUploadStatus('completed');
      setExtractedData(extractionData.extractedData);

      toast({
        title: "Resume uploaded successfully!",
        description: "Your resume has been processed and data extracted.",
      });

      if (onUploadComplete) {
        onUploadComplete(extractionData.extractedData);
      }

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload and process resume.",
        variant: "destructive"
      });
    }
  };

  const resetDialog = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setProgress(0);
    setExtractedData(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(resetDialog, 300); // Reset after dialog closes
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {uploadStatus === 'idle' && (
            <>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your existing resume to automatically populate your profile
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to select a file'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, Word, or Text files up to 5MB
                  </p>
                </label>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleUpload} 
                  disabled={!selectedFile} 
                  className="flex-1"
                >
                  Upload & Process
                </Button>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </>
          )}

          {(uploadStatus === 'uploading' || uploadStatus === 'processing') && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {uploadStatus === 'uploading' ? 'Uploading resume...' : 'Processing with AI...'}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
              </div>
            </div>
          )}

          {uploadStatus === 'completed' && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-800">Resume processed successfully!</p>
                <p className="text-xs text-muted-foreground">
                  Your profile has been populated with the extracted information.
                </p>
              </div>
              <Button onClick={handleClose} className="w-full">
                Continue to Profile
              </Button>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">Processing failed</p>
                <p className="text-xs text-muted-foreground">
                  Please try again or contact support if the issue persists.
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={resetDialog} variant="outline" className="flex-1">
                  Try Again
                </Button>
                <Button onClick={handleClose} variant="outline">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
