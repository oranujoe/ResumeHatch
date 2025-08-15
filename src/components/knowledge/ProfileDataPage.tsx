
import React from 'react';
import ProfileSummarySection from './sections/ProfileSummarySection';
import WorkExperienceSection from './sections/WorkExperienceSection';
import SkillsManagementSection from './sections/SkillsManagementSection';
import ProjectsSection from './sections/ProjectsSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Plus, Edit } from 'lucide-react';
import { 
  useCertifications, 
  useEducationRecords,
  useCreateEducation,
  useCreateCertification 
} from '@/hooks/useKnowledgeBase';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ProfileDataPage: React.FC = () => {
  const { data: certifications, isLoading: certsLoading } = useCertifications();
  const { data: education, isLoading: eduLoading } = useEducationRecords();
  const createEducation = useCreateEducation();
  const createCertification = useCreateCertification();

  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);

  const activeCertifications = certifications?.filter(cert => cert.is_active) || [];

  return (
    <div className="space-y-6">
      {/* Profile Summary - now interactive */}
      <ProfileSummarySection />

      {/* Work Experience - now with full CRUD */}
      <WorkExperienceSection />

      {/* Skills Management - completely redesigned */}
      <SkillsManagementSection />

      {/* Projects Portfolio - new section */}
      <ProjectsSection />

      {/* Education - simplified for now, can be enhanced later */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education</span>
          </CardTitle>
          <Button size="sm" onClick={() => setIsEducationDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent>
          {eduLoading ? (
            <div>Loading education...</div>
          ) : education && education.length > 0 ? (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border rounded-lg p-3">
                  <h4 className="font-medium">{edu.degree_type} in {edu.field_of_study}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.graduation_date ? new Date(edu.graduation_date).getFullYear() : 'In Progress'}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No education records yet</h3>
              <p className="text-muted-foreground mb-4">Add your educational background</p>
              <Button onClick={() => setIsEducationDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certifications - simplified for now, can be enhanced later */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Certifications</span>
          </CardTitle>
          <Button size="sm" onClick={() => setIsCertDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </CardHeader>
        <CardContent>
          {certsLoading ? (
            <div>Loading certifications...</div>
          ) : activeCertifications.length > 0 ? (
            <div className="space-y-3">
              {activeCertifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start border rounded-lg p-3">
                  <div>
                    <h4 className="font-medium">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuing_organization}</p>
                    <p className="text-xs text-muted-foreground">
                      Issued: {new Date(cert.issue_date).toLocaleDateString()}
                      {cert.expiry_date && ` • Expires: ${new Date(cert.expiry_date).toLocaleDateString()}`}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <Award className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No certifications yet</h3>
              <p className="text-muted-foreground mb-4">Add your professional certifications</p>
              <Button onClick={() => setIsCertDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDataPage;
