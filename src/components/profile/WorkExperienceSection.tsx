
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Building, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface WorkExperience {
  id?: string;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  location: string;
  employment_type: string;
  achievements: string[];
  technologies_used: string[];
  skills_demonstrated: string[];
}

interface WorkExperienceSectionProps {
  initialData?: any[];
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({ initialData }) => {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (initialData) {
      const formattedExperiences = initialData.map(exp => ({
        company_name: exp.company_name || '',
        job_title: exp.job_title || '',
        start_date: exp.start_date || '',
        end_date: exp.end_date || '',
        is_current: exp.is_current || false,
        location: exp.location || '',
        employment_type: exp.employment_type || 'Full-time',
        achievements: exp.achievements || [],
        technologies_used: exp.technologies_used || [],
        skills_demonstrated: exp.skills_demonstrated || []
      }));
      setExperiences(formattedExperiences);
    } else {
      loadExperiences();
    }
  }, [initialData]);

  const loadExperiences = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) throw error;

      setExperiences(data || []);
    } catch (error) {
      console.error('Error loading experiences:', error);
    }
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      company_name: '',
      job_title: '',
      start_date: '',
      end_date: '',
      is_current: false,
      location: '',
      employment_type: 'Full-time',
      achievements: [],
      technologies_used: [],
      skills_demonstrated: []
    }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const addArrayItem = (expIndex: number, field: string, value: string) => {
    if (!value.trim()) return;
    
    const updated = [...experiences];
    updated[expIndex] = {
      ...updated[expIndex],
      [field]: [...updated[expIndex][field as keyof WorkExperience] as string[], value.trim()]
    };
    setExperiences(updated);
  };

  const removeArrayItem = (expIndex: number, field: string, itemIndex: number) => {
    const updated = [...experiences];
    const currentArray = updated[expIndex][field as keyof WorkExperience] as string[];
    updated[expIndex] = {
      ...updated[expIndex],
      [field]: currentArray.filter((_, i) => i !== itemIndex)
    };
    setExperiences(updated);
  };

  const saveExperiences = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Delete existing experiences
      await supabase
        .from('work_experiences')
        .delete()
        .eq('user_id', user.id);

      // Insert new experiences
      if (experiences.length > 0) {
        const { error } = await supabase
          .from('work_experiences')
          .insert(experiences.map(exp => ({
            ...exp,
            user_id: user.id
          })));

        if (error) throw error;
      }

      toast({
        title: "Work experience saved",
        description: "Your work experience has been updated successfully.",
      });

    } catch (error) {
      console.error('Error saving experiences:', error);
      toast({
        title: "Error saving experience",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <p className="text-sm text-muted-foreground">
            Add your professional work history
          </p>
        </div>
        <Button onClick={addExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.map((exp, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">
                  {exp.company_name || 'New Experience'}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={exp.company_name}
                  onChange={(e) => updateExperience(index, 'company_name', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <Label>Job Title</Label>
                <Input
                  value={exp.job_title}
                  onChange={(e) => updateExperience(index, 'job_title', e.target.value)}
                  placeholder="Job Title"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={exp.start_date}
                  onChange={(e) => updateExperience(index, 'start_date', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={exp.end_date}
                  onChange={(e) => updateExperience(index, 'end_date', e.target.value)}
                  disabled={exp.is_current}
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id={`current-${index}`}
                  checked={exp.is_current}
                  onCheckedChange={(checked) => updateExperience(index, 'is_current', checked)}
                />
                <Label htmlFor={`current-${index}`}>Current Position</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => updateExperience(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label>Employment Type</Label>
                <Input
                  value={exp.employment_type}
                  onChange={(e) => updateExperience(index, 'employment_type', e.target.value)}
                  placeholder="Full-time, Part-time, Contract"
                />
              </div>
            </div>

            {/* Achievements */}
            <div>
              <Label>Key Achievements</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {exp.achievements.map((achievement, aIndex) => (
                  <Badge key={aIndex} variant="secondary" className="cursor-pointer">
                    {achievement}
                    <X 
                      className="h-3 w-3 ml-1" 
                      onClick={() => removeArrayItem(index, 'achievements', aIndex)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add achievement and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addArrayItem(index, 'achievements', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            {/* Technologies */}
            <div>
              <Label>Technologies Used</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {exp.technologies_used.map((tech, tIndex) => (
                  <Badge key={tIndex} variant="outline" className="cursor-pointer">
                    {tech}
                    <X 
                      className="h-3 w-3 ml-1" 
                      onClick={() => removeArrayItem(index, 'technologies_used', tIndex)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add technology and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addArrayItem(index, 'technologies_used', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {experiences.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No work experience added yet. Click "Add Experience" to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <Button onClick={saveExperiences} disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Work Experience'}
      </Button>
    </div>
  );
};

export default WorkExperienceSection;
