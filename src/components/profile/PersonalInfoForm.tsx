import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import { Loader2 } from 'lucide-react';

interface PersonalInfoFormProps {
  initialData?: any;
  onComplete: () => void;
  onCancel: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ initialData, onComplete, onCancel }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    full_name: initialData?.personal_info?.full_name || '',
    phone: initialData?.personal_info?.phone || '',
    location: initialData?.personal_info?.location || '',
    linkedin_url: initialData?.personal_info?.linkedin_url || '',
    portfolio_url: initialData?.personal_info?.portfolio_url || '',
    professional_title: initialData?.personal_info?.professional_title || '',
    professional_summary: initialData?.professional_summary || '',
    career_objective: '',
    years_experience: '',
    industry: '',
    preferred_job_types: []
  });

  const handlePersonalInfoChange = (field: string, value: any) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const savePersonalInfo = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...personalInfo,
          years_experience: personalInfo.years_experience ? parseInt(personalInfo.years_experience) : null,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Also update the profiles table to keep them synchronized
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: personalInfo.full_name,
          updated_at: new Date().toISOString()
        });

      toast({
        title: "Personal information saved",
        description: "Your profile has been updated successfully.",
      });

    } catch (error) {
      console.error('Error saving personal info:', error);
      toast({
        title: "Error saving information",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await savePersonalInfo();
      onComplete();
    } catch (error) {
      console.error('Error completing profile setup:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    const tabs = ['personal', 'experience', 'education', 'skills'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (activeTab === 'personal') {
      await savePersonalInfo();
    }
    
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const tabs = ['personal', 'experience', 'education', 'skills'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Basic contact information and professional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={personalInfo.full_name}
                  onChange={(e) => handlePersonalInfoChange('full_name', e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={personalInfo.linkedin_url}
                    onChange={(e) => handlePersonalInfoChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio">Portfolio URL</Label>
                  <Input
                    id="portfolio"
                    value={personalInfo.portfolio_url}
                    onChange={(e) => handlePersonalInfoChange('portfolio_url', e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={personalInfo.professional_title}
                  onChange={(e) => handlePersonalInfoChange('professional_title', e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                />
              </div>

              <div>
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  value={personalInfo.professional_summary}
                  onChange={(e) => handlePersonalInfoChange('professional_summary', e.target.value)}
                  placeholder="Brief summary of your professional background and expertise"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={personalInfo.years_experience}
                    onChange={(e) => handlePersonalInfoChange('years_experience', e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={personalInfo.industry}
                    onChange={(e) => handlePersonalInfoChange('industry', e.target.value)}
                    placeholder="e.g., Technology, Healthcare, Finance"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <WorkExperienceSection initialData={initialData?.work_experiences} />
        </TabsContent>

        <TabsContent value="education">
          <EducationSection initialData={initialData?.education} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsSection initialData={initialData?.skills} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={activeTab === 'personal' ? onCancel : handlePrevious}
        >
          {activeTab === 'personal' ? 'Cancel' : 'Previous'}
        </Button>
        
        <div className="flex gap-2">
          {activeTab !== 'skills' ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete Setup'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
