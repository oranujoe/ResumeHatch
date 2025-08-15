
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface WorkExperienceFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    location: '',
    employment_type: '',
    start_date: '',
    end_date: '',
    is_current: false,
    achievements: [] as string[],
    technologies_used: [] as string[],
    skills_demonstrated: [] as string[],
  });

  const [newAchievement, setNewAchievement] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        job_title: initialData.job_title || '',
        company_name: initialData.company_name || '',
        location: initialData.location || '',
        employment_type: initialData.employment_type || '',
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        is_current: initialData.is_current || false,
        achievements: Array.isArray(initialData.achievements) ? initialData.achievements : [],
        technologies_used: initialData.technologies_used || [],
        skills_demonstrated: initialData.skills_demonstrated || [],
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

  const addItem = (field: 'achievements' | 'technologies_used' | 'skills_demonstrated', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      if (field === 'achievements') setNewAchievement('');
      if (field === 'technologies_used') setNewTechnology('');
      if (field === 'skills_demonstrated') setNewSkill('');
    }
  };

  const removeItem = (field: 'achievements' | 'technologies_used' | 'skills_demonstrated', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="job_title">Job Title *</Label>
          <Input
            id="job_title"
            value={formData.job_title}
            onChange={(e) => handleInputChange('job_title', e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            required
          />
        </div>
        <div>
          <Label htmlFor="company_name">Company Name *</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => handleInputChange('company_name', e.target.value)}
            placeholder="e.g., Google"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="e.g., San Francisco, CA"
          />
        </div>
        <div>
          <Label htmlFor="employment_type">Employment Type</Label>
          <Input
            id="employment_type"
            value={formData.employment_type}
            onChange={(e) => handleInputChange('employment_type', e.target.value)}
            placeholder="e.g., Full-time, Part-time, Contract"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">Start Date *</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => handleInputChange('start_date', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => handleInputChange('end_date', e.target.value)}
            disabled={formData.is_current}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_current"
          checked={formData.is_current}
          onCheckedChange={(checked) => {
            handleInputChange('is_current', checked);
            if (checked) {
              handleInputChange('end_date', '');
            }
          }}
        />
        <Label htmlFor="is_current">I currently work here</Label>
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
              placeholder="Add a key achievement..."
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

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update' : 'Add'} Experience
        </Button>
      </div>
    </form>
  );
};

export default WorkExperienceForm;
