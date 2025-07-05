
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, User, Upload, Sparkles } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import ProfileSetupWizard from '@/components/profile/ProfileSetupWizard';
import ResumeUploadDialog from '@/components/profile/ResumeUploadDialog';

const ProfileCompletionBanner: React.FC = () => {
  const { profile, completeness, needsSetup } = useProfile();
  const [showWizard, setShowWizard] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !needsSetup) {
    return null;
  }

  const handleUploadComplete = (extractedData: any) => {
    console.log('Resume uploaded and extracted:', extractedData);
    setDismissed(true);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Complete Your Profile for Better Resumes</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Add your work experience, education, and skills to generate personalized resumes that match job requirements.
                </p>
                <div className="flex items-center space-x-2 mb-3">
                  <Progress value={completeness} className="flex-1 max-w-xs" />
                  <span className="text-sm font-medium">{completeness}% complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ResumeUploadDialog onUploadComplete={handleUploadComplete}>
                    <Button size="sm" variant="outline" className="flex items-center space-x-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload Resume</span>
                    </Button>
                  </ResumeUploadDialog>
                  <Button size="sm" onClick={() => setShowWizard(true)} className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Complete Profile</span>
                  </Button>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDismissed(true)}
              className="ml-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProfileSetupWizard 
        isOpen={showWizard}
        onClose={() => setShowWizard(false)}
      />
    </>
  );
};

export default ProfileCompletionBanner;
