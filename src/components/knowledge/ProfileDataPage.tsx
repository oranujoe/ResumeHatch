
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  Edit
} from 'lucide-react';
import { 
  useUserProfile, 
  useSkillsInventory, 
  useCertifications, 
  useWorkExperiences,
  useEducationRecords 
} from '@/hooks/useKnowledgeBase';

const ProfileDataPage: React.FC = () => {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const { data: skills, isLoading: skillsLoading } = useSkillsInventory();
  const { data: certifications, isLoading: certsLoading } = useCertifications();
  const { data: workExperiences, isLoading: workLoading } = useWorkExperiences();
  const { data: education, isLoading: eduLoading } = useEducationRecords();

  // Debug logging to see what profile data we actually have
  React.useEffect(() => {
    if (profile) {
      console.log('ProfileDataPage - Current profile data:', {
        email: (profile as any).email, // Cast to any since TypeScript doesn't know about email yet
        full_name: profile.full_name,
        linkedin_url: profile.linkedin_url,
        portfolio_url: profile.portfolio_url,
        phone: profile.phone,
        allFields: Object.keys(profile)
      });
    }
  }, [profile]);

  if (profileLoading) {
    return <div>Loading profile data...</div>;
  }

  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  const activeCertifications = certifications?.filter(cert => cert.is_active) || [];
  const currentJob = workExperiences?.find(exp => exp.is_current);

  return (
    <div className="space-y-6">
      {/* Profile Summary */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Summary</span>
          </CardTitle>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">{profile?.full_name || 'No name provided'}</h3>
              <p className="text-muted-foreground">{profile?.professional_title || 'Professional'}</p>
              
              <div className="mt-3 space-y-2">
                {(profile as any)?.email && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4" />
                    <a 
                      href={`mailto:${(profile as any).email}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {(profile as any).email}
                    </a>
                  </div>
                )}
                {profile?.location && (
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile?.phone && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile?.linkedin_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={profile.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {profile?.portfolio_url && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={profile.portfolio_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Portfolio Website
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              {profile?.professional_summary && (
                <div>
                  <h4 className="font-medium mb-2">Professional Summary</h4>
                  <p className="text-sm text-muted-foreground">{profile.professional_summary}</p>
                </div>
              )}
              
              {currentJob && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Current Position</h4>
                  <p className="text-sm">{currentJob.job_title} at {currentJob.company_name}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code2 className="h-5 w-5" />
            <span>Skills Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {skillsLoading ? (
            <div>Loading skills...</div>
          ) : Object.keys(skillsByCategory).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category}>
                  <h4 className="font-medium mb-2 capitalize">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="text-xs">
                        {skill.skill_name} 
                        <span className="ml-1 text-muted-foreground">
                          ({skill.proficiency_level})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Active Certifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {certsLoading ? (
            <div>Loading certifications...</div>
          ) : activeCertifications.length > 0 ? (
            <div className="space-y-3">
              {activeCertifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-start">
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
            <p className="text-sm text-muted-foreground">No active certifications.</p>
          )}
        </CardContent>
      </Card>

      {/* Work Experience Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <span>Work Experience Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {workLoading ? (
            <div>Loading work experience...</div>
          ) : workExperiences && workExperiences.length > 0 ? (
            <div className="space-y-3">
              {workExperiences.slice(0, 3).map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary/20 pl-4">
                  <h4 className="font-medium">{exp.job_title}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(exp.start_date).toLocaleDateString()} - 
                    {exp.is_current ? ' Present' : ` ${new Date(exp.end_date!).toLocaleDateString()}`}
                  </p>
                </div>
              ))}
              {workExperiences.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  +{workExperiences.length - 3} more positions
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No work experience added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Education Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eduLoading ? (
            <div>Loading education...</div>
          ) : education && education.length > 0 ? (
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
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
            <p className="text-sm text-muted-foreground">No education records added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDataPage;
