
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, GraduationCap, Zap, Award, FolderOpen } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import PersonalInfoSection from './PersonalInfoSection';
import WorkExperienceSection from './WorkExperienceSection';
import EducationSection from './EducationSection';
import SkillsSection from './SkillsSection';
import CertificationsSection from './CertificationsSection';
import ProjectsSection from './ProjectsSection';

const ProfileDataPage = () => {
  const { profile, isLoading, completeness, reload } = useProfile();
  const [activeTab, setActiveTab] = useState('personal');

  const handleProfileUpdated = () => {
    console.log('Profile updated, reloading data...');
    reload();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  const sections = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      count: profile.profile ? 1 : 0
    },
    {
      id: 'work',
      label: 'Work Experience',
      icon: Briefcase,
      count: profile.workExperiences.length
    },
    {
      id: 'education',
      label: 'Education',
      icon: GraduationCap,
      count: profile.education.length
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Zap,
      count: profile.skills.length
    },
    {
      id: 'certifications',
      label: 'Certifications',
      icon: Award,
      count: profile.certifications.length
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: FolderOpen,
      count: profile.projects.length
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile Data</h1>
        <p className="text-muted-foreground">
          Manage your professional information used for resume generation
        </p>
      </div>

      {/* Profile Completeness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Profile Completeness
            <Badge variant={completeness >= 80 ? 'default' : completeness >= 50 ? 'secondary' : 'destructive'}>
              {completeness}%
            </Badge>
          </CardTitle>
          <CardDescription>
            Complete your profile to generate better, more personalized resumes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={completeness} className="w-full" />
        </CardContent>
      </Card>

      {/* Profile Data Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{section.label}</span>
                {section.count > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {section.count}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoSection 
            profile={profile.profile} 
            onProfileUpdated={handleProfileUpdated}
          />
        </TabsContent>

        <TabsContent value="work" className="mt-6">
          <WorkExperienceSection experiences={profile.workExperiences} />
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <EducationSection education={profile.education} />
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <SkillsSection skills={profile.skills} />
        </TabsContent>

        <TabsContent value="certifications" className="mt-6">
          <CertificationsSection certifications={profile.certifications} />
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <ProjectsSection projects={profile.projects} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDataPage;
