
import React, { useState } from 'react';
import { Upload, Chrome, CheckCircle, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const DropZonePage = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setIsProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      setUploadedFiles([
        {
          id: 1,
          name: 'software-engineer-google.json',
          status: 'processed',
          jobTitle: 'Software Engineer',
          company: 'Google',
          location: 'Mountain View, CA',
          requirements: ['Python', 'Machine Learning', 'PhD preferred']
        },
        {
          id: 2,
          name: 'frontend-developer-meta.json',
          status: 'processing',
          jobTitle: 'Frontend Developer',
          company: 'Meta',
          location: 'Menlo Park, CA',
          requirements: ['React', 'JavaScript', 'GraphQL']
        }
      ]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Drop-zone Chrome</h2>
        <p className="text-muted-foreground mt-1">
          Drag and drop job data from your Chrome extension or upload files directly
        </p>
      </div>

      {/* Chrome Extension Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Chrome className="h-5 w-5" />
            <span>Chrome Extension</span>
          </CardTitle>
          <CardDescription>
            Install our Chrome extension to easily capture job postings while browsing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-destructive rounded-full"></div>
              <div>
                <p className="font-medium">Extension Not Detected</p>
                <p className="text-sm text-muted-foreground">
                  Install the ResumeHatch Chrome extension to get started
                </p>
              </div>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Install Extension</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Drop Zone */}
      <Card>
        <CardHeader>
          <CardTitle>File Drop Zone</CardTitle>
          <CardDescription>
            Drop job data files here or click to upload manually
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200",
              isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              {isProcessing ? 'Processing Files...' : 'Drop job files here'}
            </h3>
            <p className="text-muted-foreground mb-4">
              Supports JSON, CSV, and TXT files from the Chrome extension
            </p>
            <Button variant="outline" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Choose Files'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
            <CardDescription>
              Job data files ready for processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {file.status === 'processed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {file.jobTitle} at {file.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {file.requirements?.slice(0, 3).map((req: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={file.status === 'processed' ? 'default' : 'secondary'}>
                      {file.status}
                    </Badge>
                    {file.status === 'processed' && (
                      <Button size="sm" variant="outline">
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DropZonePage;
