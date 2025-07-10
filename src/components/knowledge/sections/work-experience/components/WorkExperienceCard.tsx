
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { WorkExperienceCardProps } from '../types/WorkExperienceTypes';
import { useWorkExperienceData } from '../hooks/useWorkExperienceData';

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  experience,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const { jsonToStringArray, formatDateRange } = useWorkExperienceData();
  const achievements = jsonToStringArray(experience.achievements);

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-lg">{experience.job_title}</h4>
          <p className="text-muted-foreground">{experience.company_name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDateRange(experience.start_date, experience.end_date, experience.is_current)}
            {experience.location && ` • ${experience.location}`}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(experience)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDelete(experience.id)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {achievements.length > 0 && (
        <div>
          <h5 className="font-medium text-sm mb-2">Key Achievements:</h5>
          <ul className="list-disc list-inside space-y-1">
            {achievements.map((achievement, index) => (
              <li key={index} className="text-sm text-muted-foreground">{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      {experience.technologies_used && experience.technologies_used.length > 0 && (
        <div>
          <h5 className="font-medium text-sm mb-2">Technologies Used:</h5>
          <div className="flex flex-wrap gap-2">
            {experience.technologies_used.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkExperienceCard;
