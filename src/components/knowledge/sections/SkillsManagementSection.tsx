
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Code2, Plus, Edit, Trash2, Star } from 'lucide-react';
import { useSkillsInventory, useCreateSkill, useUpdateSkill, useDeleteSkill } from '@/hooks/useKnowledgeBase';

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Cloud Platforms',
  'DevOps & Tools',
  'Soft Skills',
  'Other',
];

const proficiencyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

const SkillsManagementSection: React.FC = () => {
  const { data: skills, isLoading } = useSkillsInventory();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [formData, setFormData] = useState({
    skill_name: '',
    category: '',
    proficiency_level: 'intermediate' as const,
    years_experience: 0,
    is_featured: false,
  });

  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  const resetForm = () => {
    setFormData({
      skill_name: '',
      category: '',
      proficiency_level: 'intermediate',
      years_experience: 0,
      is_featured: false,
    });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSkill.mutateAsync(formData);
    resetForm();
    setIsCreateDialogOpen(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSkill.mutateAsync({ id: editingSkill.id, ...formData });
    resetForm();
    setEditingSkill(null);
  };

  const handleEdit = (skill: any) => {
    setFormData({
      skill_name: skill.skill_name,
      category: skill.category,
      proficiency_level: skill.proficiency_level,
      years_experience: skill.years_experience || 0,
      is_featured: skill.is_featured,
    });
    setEditingSkill(skill);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill.mutateAsync(id);
    }
  };

  const toggleFeatured = async (skill: any) => {
    await updateSkill.mutateAsync({
      id: skill.id,
      is_featured: !skill.is_featured,
    });
  };

  if (isLoading) {
    return <div>Loading skills...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Code2 className="h-5 w-5" />
          <span>Skills Management</span>
        </CardTitle>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="skill_name">Skill Name *</Label>
                <Input
                  id="skill_name"
                  value={formData.skill_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, skill_name: e.target.value }))}
                  placeholder="e.g., React, Python, Communication"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="proficiency_level">Proficiency Level *</Label>
                <Select
                  value={formData.proficiency_level}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, proficiency_level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="years_experience">Years of Experience</Label>
                <Input
                  id="years_experience"
                  type="number"
                  min="0"
                  value={formData.years_experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, years_experience: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => {
                  resetForm();
                  setIsCreateDialogOpen(false);
                }}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createSkill.isPending}>
                  {createSkill.isPending ? 'Adding...' : 'Add Skill'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {Object.keys(skillsByCategory).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="font-medium mb-3 text-lg">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{skill.skill_name}</span>
                          {skill.is_featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFeatured(skill)}
                            className={skill.is_featured ? 'text-yellow-500' : 'text-muted-foreground'}
                          >
                            <Star className="h-3 w-3" />
                          </Button>
                          <Dialog open={editingSkill?.id === skill.id} onOpenChange={(open) => {
                            if (open) {
                              handleEdit(skill);
                            } else {
                              setEditingSkill(null);
                              resetForm();
                            }
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Skill</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleUpdate} className="space-y-4">
                                {/* Same form fields as create */}
                                <div>
                                  <Label htmlFor="edit_skill_name">Skill Name *</Label>
                                  <Input
                                    id="edit_skill_name"
                                    value={formData.skill_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, skill_name: e.target.value }))}
                                    required
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="edit_category">Category *</Label>
                                  <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {skillCategories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label htmlFor="edit_proficiency_level">Proficiency Level *</Label>
                                  <Select
                                    value={formData.proficiency_level}
                                    onValueChange={(value: any) => setFormData(prev => ({ ...prev, proficiency_level: value }))}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {proficiencyLevels.map((level) => (
                                        <SelectItem key={level.value} value={level.value}>
                                          {level.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label htmlFor="edit_years_experience">Years of Experience</Label>
                                  <Input
                                    id="edit_years_experience"
                                    type="number"
                                    min="0"
                                    value={formData.years_experience}
                                    onChange={(e) => setFormData(prev => ({ ...prev, years_experience: parseInt(e.target.value) || 0 }))}
                                  />
                                </div>

                                <div className="flex justify-end space-x-2">
                                  <Button type="button" variant="outline" onClick={() => {
                                    setEditingSkill(null);
                                    resetForm();
                                  }}>
                                    Cancel
                                  </Button>
                                  <Button type="submit" disabled={updateSkill.isPending}>
                                    {updateSkill.isPending ? 'Updating...' : 'Update Skill'}
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(skill.id)}
                            disabled={deleteSkill.isPending}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {skill.proficiency_level}
                      </Badge>
                      {skill.years_experience && (
                        <p className="text-xs text-muted-foreground">
                          {skill.years_experience} year{skill.years_experience !== 1 ? 's' : ''} experience
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Code2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No skills added yet</h3>
            <p className="text-muted-foreground mb-4">Add your skills to showcase your expertise</p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Skill
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsManagementSection;
