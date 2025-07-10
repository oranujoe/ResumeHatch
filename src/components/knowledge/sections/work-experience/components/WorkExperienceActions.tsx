
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import WorkExperienceForm from '../../forms/WorkExperienceForm';
import { WorkExperienceActionsProps } from '../types/WorkExperienceTypes';

const WorkExperienceActions: React.FC<WorkExperienceActionsProps> = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  editingExperience,
  setEditingExperience,
  onCreateSubmit,
  onUpdateSubmit,
  isCreating,
  isUpdating,
}) => {
  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Work Experience</DialogTitle>
          </DialogHeader>
          <WorkExperienceForm
            onSubmit={onCreateSubmit}
            onCancel={() => setIsCreateDialogOpen(false)}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingExperience} onOpenChange={(open) => setEditingExperience(open ? editingExperience : null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Work Experience</DialogTitle>
          </DialogHeader>
          <WorkExperienceForm
            initialData={editingExperience}
            onSubmit={onUpdateSubmit}
            onCancel={() => setEditingExperience(null)}
            isLoading={isUpdating}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkExperienceActions;
