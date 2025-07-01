
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, GraduationCap, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Education {
  id?: string;
  institution_name: string;
  degree_type: string;
  field_of_study: string;
  graduation_date: string;
  gpa: number | null;
  honors: string;
  relevant_coursework: string[];
  location: string;
  is_current: boolean;
}

interface EducationSectionProps {
  initialData?: any[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ initialData }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (initialData) {
      const formattedEducations = initialData.map(edu => ({
        institution_name: edu.institution_name || '',
        degree_type: edu.degree_type || '',
        field_of_study: edu.field_of_study || '',
        graduation_date: edu.graduation_date || '',
        gpa: edu.gpa || null,
        honors: edu.honors || '',
        relevant_coursework: edu.relevant_coursework || [],
        location: edu.location || '',
        is_current: edu.is_current || false
      }));
      setEducations(formattedEducations);
    } else {
      loadEducations();
    }
  }, [initialData]);

  const loadEducations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('education_records')
        .select('*')
        .eq('user_id', user.id)
        .order('graduation_date', { ascending: false });

      if (error) throw error;

      const formattedEducations = (data || []).map(edu => ({
        institution_name: edu.institution_name || '',
        degree_type: edu.degree_type || '',
        field_of_study: edu.field_of_study || '',
        graduation_date: edu.graduation_date || '',
        gpa: edu.gpa || null,
        honors: edu.honors || '',
        relevant_coursework: edu.relevant_coursework || [],
        location: edu.location || '',
        is_current: edu.is_current || false
      }));

      setEducations(formattedEducations);
    } catch (error) {
      console.error('Error loading education:', error);
    }
  };

  const addEducation = () => {
    setEducations([...educations, {
      institution_name: '',
      degree_type: '',
      field_of_study: '',
      graduation_date: '',
      gpa: null,
      honors: '',
      relevant_coursework: [],
      location: '',
      is_current: false
    }]);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...educations];
    updated[index] = { ...updated[index], [field]: value };
    setEducations(updated);
  };

  const addCourse = (eduIndex: number, course: string) => {
    if (!course.trim()) return;
    
    const updated = [...educations];
    updated[eduIndex] = {
      ...updated[eduIndex],
      relevant_coursework: [...updated[eduIndex].relevant_coursework, course.trim()]
    };
    setEducations(updated);
  };

  const removeCourse = (eduIndex: number, courseIndex: number) => {
    const updated = [...educations];
    updated[eduIndex] = {
      ...updated[eduIndex],
      relevant_coursework: updated[eduIndex].relevant_coursework.filter((_, i) => i !== courseIndex)
    };
    setEducations(updated);
  };

  const saveEducations = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Delete existing education records
      await supabase
        .from('education_records')
        .delete()
        .eq('user_id', user.id);

      // Insert new education records
      if (educations.length > 0) {
        const { error } = await supabase
          .from('education_records')
          .insert(educations.map(edu => ({
            ...edu,
            user_id: user.id
          })));

        if (error) throw error;
      }

      toast({
        title: "Education saved",
        description: "Your education records have been updated successfully.",
      });

    } catch (error) {
      console.error('Error saving education:', error);
      toast({
        title: "Error saving education",
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
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-muted-foreground">
            Add your educational background
          </p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {educations.map((edu, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <CardTitle className="text-base">
                  {edu.institution_name || 'New Education'}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Institution Name</Label>
                <Input
                  value={edu.institution_name}
                  onChange={(e) => updateEducation(index, 'institution_name', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label>Degree Type</Label>
                <Input
                  value={edu.degree_type}
                  onChange={(e) => updateEducation(index, 'degree_type', e.target.value)}
                  placeholder="Bachelor's, Master's, PhD"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Field of Study</Label>
                <Input
                  value={edu.field_of_study}
                  onChange={(e) => updateEducation(index, 'field_of_study', e.target.value)}
                  placeholder="Computer Science, Business, etc."
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Graduation Date</Label>
                <Input
                  type="date"
                  value={edu.graduation_date}
                  onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)}
                  disabled={edu.is_current}
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(index, 'gpa', e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="3.8"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id={`current-edu-${index}`}
                  checked={edu.is_current}
                  onCheckedChange={(checked) => updateEducation(index, 'is_current', checked)}
                />
                <Label htmlFor={`current-edu-${index}`}>Currently Studying</Label>
              </div>
            </div>

            <div>
              <Label>Honors/Awards (Optional)</Label>
              <Input
                value={edu.honors}
                onChange={(e) => updateEducation(index, 'honors', e.target.value)}
                placeholder="Magna Cum Laude, Dean's List, etc."
              />
            </div>

            <div>
              <Label>Relevant Coursework</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {edu.relevant_coursework.map((course, cIndex) => (
                  <Badge key={cIndex} variant="outline" className="cursor-pointer">
                    {course}
                    <X 
                      className="h-3 w-3 ml-1" 
                      onClick={() => removeCourse(index, cIndex)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Add course and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addCourse(index, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {educations.length === 0 && (
        <Card className="text-center py-8">
          <CardContent>
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No education records added yet. Click "Add Education" to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <Button onClick={saveEducations} disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Education'}
      </Button>
    </div>
  );
};

export default EducationSection;
