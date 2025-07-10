
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderOpen, Plus, Edit, Trash2, ExternalLink, Github } from 'lucide-react';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks/useKnowledgeBase';
import ProjectForm from '../forms/ProjectForm';

const ProjectsSection: React.FC = () => {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleCreate = async (data: any) => {
    await createProject.mutateAsync(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = async (data: any) => {
    await updateProject.mutateAsync({ id: editingProject.id, ...data });
    setEditingProject(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject.mutateAsync(id);
    }
  };

  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <FolderOpen className="h-5 w-5" />
          <span>Projects Portfolio</span>
        </CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Project</DialogTitle>
            </DialogHeader>
            <ProjectForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
              isLoading={createProject.isPending}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{project.project_name}</h4>
                    {project.role && (
                      <p className="text-sm text-muted-foreground">Role: {project.role}</p>
                    )}
                    {project.start_date && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.start_date).toLocaleDateString()} - 
                        {project.end_date ? ` ${new Date(project.end_date).toLocaleDateString()}` : ' Ongoing'}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Dialog open={editingProject?.id === project.id} onOpenChange={(open) => setEditingProject(open ? project : null)}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Project</DialogTitle>
                        </DialogHeader>
                        <ProjectForm
                          initialData={editingProject}
                          onSubmit={handleUpdate}
                          onCancel={() => setEditingProject(null)}
                          isLoading={updateProject.isPending}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteProject.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {project.description && (
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                )}

                {project.technologies_used && project.technologies_used.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies_used.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {project.achievements && Array.isArray(project.achievements) && project.achievements.length > 0 && (
                  <div>
                    <h5 className="font-medium text-sm mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex space-x-2">
                  {project.project_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>

                {project.team_size && (
                  <p className="text-xs text-muted-foreground">
                    Team Size: {project.team_size} member{project.team_size !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No projects added yet</h3>
            <p className="text-muted-foreground mb-4">Showcase your projects to demonstrate your skills and experience</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
