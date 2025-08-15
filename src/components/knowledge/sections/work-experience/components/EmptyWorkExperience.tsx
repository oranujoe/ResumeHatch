
import React from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus } from 'lucide-react';

interface EmptyWorkExperienceProps {
  onAddFirst: () => void;
}

const EmptyWorkExperience: React.FC<EmptyWorkExperienceProps> = ({ onAddFirst }) => {
  return (
    <div className="text-center py-8">
      <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">No work experience added yet</h3>
      <p className="text-muted-foreground mb-4">Add your work experience to showcase your professional background</p>
      <Button onClick={onAddFirst}>
        <Plus className="h-4 w-4 mr-2" />
        Add Your First Experience
      </Button>
    </div>
  );
};

export default EmptyWorkExperience;
