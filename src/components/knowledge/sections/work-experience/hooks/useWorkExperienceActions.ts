
import { useState } from 'react';
import { useWorkExperiences, useCreateWorkExperience, useUpdateWorkExperience, useDeleteWorkExperience } from '@/hooks/useKnowledgeBase';
import { WorkExperienceData, WorkExperienceFormData } from '../types/WorkExperienceTypes';

export const useWorkExperienceActions = () => {
  const { data: workExperiences, isLoading } = useWorkExperiences();
  const createWorkExperience = useCreateWorkExperience();
  const updateWorkExperience = useUpdateWorkExperience();
  const deleteWorkExperience = useDeleteWorkExperience();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<WorkExperienceData | null>(null);

  const handleCreate = async (data: WorkExperienceFormData) => {
    await createWorkExperience.mutateAsync(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = async (data: WorkExperienceFormData) => {
    if (!editingExperience) return;
    await updateWorkExperience.mutateAsync({ id: editingExperience.id, ...data });
    setEditingExperience(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this work experience?')) {
      await deleteWorkExperience.mutateAsync(id);
    }
  };

  const handleEdit = (experience: WorkExperienceData) => {
    setEditingExperience(experience);
  };

  return {
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
    isCreating: createWorkExperience.isPending,
    isUpdating: updateWorkExperience.isPending,
    isDeleting: deleteWorkExperience.isPending,
  };
};
