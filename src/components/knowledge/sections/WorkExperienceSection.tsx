
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { useWorkExperienceActions } from './work-experience/hooks/useWorkExperienceActions';
import WorkExperienceCard from './work-experience/components/WorkExperienceCard';
import WorkExperienceActions from './work-experience/components/WorkExperienceActions';
import EmptyWorkExperience from './work-experience/components/EmptyWorkExperience';

const WorkExperienceSection: React.FC = () => {
  const {
    workExperiences,
    isLoading,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    editingExperience,
    setEditingExperience,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleEdit,
    isCreating,
    isUpdating,
    isDeleting,
  } = useWorkExperienceActions();

  if (isLoading) {
    return <div>Loading work experience...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Work Experience</span>
        </CardTitle>
        <WorkExperienceActions
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
          editingExperience={editingExperience}
          setEditingExperience={setEditingExperience}
          onCreateSubmit={handleCreate}
          onUpdateSubmit={handleUpdate}
          isCreating={isCreating}
          isUpdating={isUpdating}
        />
      </CardHeader>
      <CardContent>
        {workExperiences && workExperiences.length > 0 ? (
          <div className="space-y-4">
            {workExperiences.map((experience) => (
              <WorkExperienceCard
                key={experience.id}
                experience={experience}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={isDeleting}
              />
            ))}
          </div>
        ) : (
          <EmptyWorkExperience onAddFirst={() => setIsCreateDialogOpen(true)} />
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceSection;
