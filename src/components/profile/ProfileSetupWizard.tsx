
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, UserCheck, FileText } from 'lucide-react';
import ResumeUploadDialog from './ResumeUploadDialog';
import PersonalInfoForm from './PersonalInfoForm';

interface ProfileSetupWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileSetupWizard: React.FC<ProfileSetupWizardProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'choose' | 'upload' | 'manual'>('choose');
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleUploadComplete = (data: any) => {
    setExtractedData(data);
    setStep('manual'); // Show form with pre-filled data
  };

  const handleManualEntry = () => {
    setStep('manual');
  };

  const handleProfileComplete = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Set Up Your Profile</DialogTitle>
        </DialogHeader>

        {step === 'choose' && (
          <div className="space-y-6">
            <p className="text-muted-foreground">
              To generate personalized resumes, we need to know more about your background. 
              Choose how you'd like to get started:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <ResumeUploadDialog onUploadComplete={handleUploadComplete}>
                <Card className="cursor-pointer hover:bg-accent transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Upload className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Upload Resume</CardTitle>
                        <CardDescription>Quick setup using your existing resume</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Upload your current resume and we'll automatically extract your information 
                      using AI. Takes about 2 minutes.
                    </p>
                  </CardContent>
                </Card>
              </ResumeUploadDialog>

              <Card 
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={handleManualEntry}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <UserCheck className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Manual Entry</CardTitle>
                      <CardDescription>Enter your information step by step</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Fill out forms to add your work experience, education, and skills. 
                    More detailed but takes longer.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={onClose}>
                Skip for now
              </Button>
            </div>
          </div>
        )}

        {step === 'manual' && (
          <PersonalInfoForm 
            initialData={extractedData}
            onComplete={handleProfileComplete}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetupWizard;
