
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    project_name: '',
    description: '',
    role: '',
    start_date: '',
    end_date: '',
    project_url: '',
    github_url: '',
    team_size: 1,
    technologies_used: [] as string[],
    achievements: [] as string[],
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        project_name: initialData.project_name || '',
        description: initialData.description || '',
        role: initialData.role || '',
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        project_url: initialData.project_url || '',
        github_url: initialData.github_url || '',
        team_size: initialData.team_size || 1,
        technologies_used: initialData.technologies_used || [],
        achievements: Array.isArray(initialData.achievements) ? initialData.achievements : [],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addItem = (field: 'technologies_used' | 'achievements', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      if (field === 'technologies_used') setNewTechnology('');
      if (field === 'achievements') setNewAchievement('');
    }
  };

  const removeItem = (field: 'technologies_used' | 'achievements', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="project_name">Project Name *</Label>
        <Input
          id="project_name"
          value={formData.project_name}
          onChange={(e) => handleInputChange('project_name', e.target.value)}
          placeholder="e.g., E-commerce Platform"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Brief description of the project..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">Your Role</Label>
          <Input
            id="role"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            placeholder="e.g., Lead Developer, UI/UX Designer"
          />
        </div>
        <div>
          <Label htmlFor="team_size">Team Size</Label>
          <Input
            id="team_size"
            type="number"
            min="1"
            value={formData.team_size}
            onChange={(e) => handleInputChange('team_size', parseInt(e.target.value) || 1)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="project_url">Project URL</Label>
          <Input
            id="project_url"
            value={formData.project_url}
            onChange={(e) => handleInputChange('project_url', e.target.value)}
            placeholder="https://yourproject.com"
          />
        </div>
        <div>
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            value={formData.github_url}
            onChange={(e) => handleInputChange('github_url', e.target.value)}
            placeholder="https://github.com/username/repo"
          />
        </div>
      </div>

      {/* Technologies */}
      <div>
        <Label>Technologies Used</Label>
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {formData.technologies_used.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0"
                  onClick={() => removeItem('technologies_used', index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="Add technology..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addItem('technologies_used', newTechnology);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addItem('technologies_used', newTechnology)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <Label>Key Achievements</Label>
        <div className="space-y-2">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex-1 justify-start">
                {achievement}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0"
                  onClick={() => removeItem('achievements', index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            </div>
          ))}
          <div className="flex space-x-2">
            <Input
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add achievement..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addItem('achievements', newAchievement);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addItem('achievements', newAchievement)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update' : 'Add'} Project
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
