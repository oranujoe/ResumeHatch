
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Briefcase, Plus, Edit, Trash2 } from 'lucide-react';
import { useWorkExperiences, useCreateWorkExperience, useUpdateWorkExperience, useDeleteWorkExperience } from '@/hooks/useKnowledgeBase';
import WorkExperienceForm from '../forms/WorkExperienceForm';

const WorkExperienceSection: React.FC = () => {
  const { data: workExperiences, isLoading } = useWorkExperiences();
  const createWorkExperience = useCreateWorkExperience();
  const updateWorkExperience = useUpdateWorkExperience();
  const deleteWorkExperience = useDeleteWorkExperience();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  const handleCreate = async (data: any) => {
    await createWorkExperience.mutateAsync(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = async (data: any) => {
    await updateWorkExperience.mutateAsync({ id: editingExperience.id, ...data });
    setEditingExperience(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this work experience?')) {
      await deleteWorkExperience.mutateAsync(id);
    }
  };

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
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
              isLoading={createWorkExperience.isPending}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {workExperiences && workExperiences.length > 0 ? (
          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{exp.job_title}</h4>
                    <p className="text-muted-foreground">{exp.company_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exp.start_date).toLocaleDateString()} - 
                      {exp.is_current ? ' Present' : ` ${new Date(exp.end_date!).toLocaleDateString()}`}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog open={editingExperience?.id === exp.id} onOpenChange={(open) => setEditingExperience(open ? exp : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Work Experience</DialogTitle>
                        </DialogHeader>
                        <WorkExperienceForm
                          initialData={editingExperience}
                          onSubmit={handleUpdate}
                          onCancel={() => setEditingExperience(null)}
                          isLoading={updateWorkExperience.isPending}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(exp.id)}
                      disabled={deleteWorkExperience.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {exp.achievements && Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {exp.technologies_used && exp.technologies_used.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Technologies Used:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies_used.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No work experience added yet</h3>
            <p className="text-muted-foreground mb-4">Add your work experience to showcase your professional background</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceSection;
