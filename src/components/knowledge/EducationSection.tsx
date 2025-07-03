
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Education } from '@/hooks/useProfile';
import { format } from 'date-fns';

interface EducationSectionProps {
  education: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-muted-foreground">
            {education.length} education record{education.length !== 1 ? 's' : ''} on file
          </p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="text-center py-8">
          <CardContent>
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No education records added yet. Click "Add Education" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={edu.id || index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{edu.degree_type} in {edu.field_of_study}</CardTitle>
                    <p className="text-muted-foreground font-medium">{edu.institution_name}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {edu.is_current ? 'Current' : edu.graduation_date ? formatDate(edu.graduation_date) : 'N/A'}
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {edu.location}
                        </div>
                      )}
                      {edu.gpa && (
                        <Badge variant="outline" className="text-xs">
                          GPA: {edu.gpa}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {edu.honors && (
                  <div className="mb-3">
                    <Badge variant="secondary">{edu.honors}</Badge>
                  </div>
                )}
                
                {edu.relevant_coursework && edu.relevant_coursework.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Relevant Coursework:</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevant_coursework.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationSection;
