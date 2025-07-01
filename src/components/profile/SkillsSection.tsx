
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Skill {
  id?: string;
  skill_name: string;
  category: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years_experience: number | null;
  is_featured: boolean;
}

interface SkillsSectionProps {
  initialData?: any[];
}

// Helper function to validate proficiency level
const validateProficiencyLevel = (level: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
  return validLevels.includes(level as any) ? level as any : 'intermediate';
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ initialData }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({
    skill_name: '',
    category: 'Technical',
    proficiency_level: 'intermediate' as const,
    years_experience: null as number | null,
    is_featured: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const skillCategories = [
    'Technical',
    'Programming Languages',
    'Frameworks',
    'Databases',
    'Cloud & DevOps',
    'Design',
    'Soft Skills',
    'Languages',
    'Certifications',
    'Other'
  ];

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-red-500' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-yellow-500' },
    { value: 'advanced', label: 'Advanced', color: 'bg-blue-500' },
    { value: 'expert', label: 'Expert', color: 'bg-green-500' }
  ];

  useEffect(() => {
    if (initialData) {
      const formattedSkills = initialData.map(skill => ({
        skill_name: skill.skill_name || '',
        category: skill.category || 'Technical',
        proficiency_level: validateProficiencyLevel(skill.proficiency_level),
        years_experience: skill.years_experience || null,
        is_featured: skill.is_featured || false
      }));
      setSkills(formattedSkills);
    } else {
      loadSkills();
    }
  }, [initialData]);

  const loadSkills = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('skills_inventory')
        .select('*')
        .eq('user_id', user.id)
        .order('is_featured', { ascending: false })
        .order('skill_name', { ascending: true });

      if (error) throw error;

      const formattedSkills = (data || []).map(skill => ({
        skill_name: skill.skill_name || '',
        category: skill.category || 'Technical',
        proficiency_level: validateProficiencyLevel(skill.proficiency_level),
        years_experience: skill.years_experience || null,
        is_featured: skill.is_featured || false
      }));

      setSkills(formattedSkills);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const addSkill = () => {
    if (!newSkill.skill_name.trim()) return;

    const skillExists = skills.some(skill => 
      skill.skill_name.toLowerCase() === newSkill.skill_name.toLowerCase()
    );

    if (skillExists) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your list.",
        variant: "destructive"
      });
      return;
    }

    setSkills([...skills, { ...newSkill }]);
    setNewSkill({
      skill_name: '',
      category: 'Technical',
      proficiency_level: 'intermediate',
      years_experience: null,
      is_featured: false
    });
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: string, value: any) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    setSkills(updated);
  };

  const toggleFeatured = (index: number) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], is_featured: !updated[index].is_featured };
    setSkills(updated);
  };

  const saveSkills = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Delete existing skills
      await supabase
        .from('skills_inventory')
        .delete()
        .eq('user_id', user.id);

      // Insert new skills
      if (skills.length > 0) {
        const { error } = await supabase
          .from('skills_inventory')
          .insert(skills.map(skill => ({
            ...skill,
            user_id: user.id
          })));

        if (error) throw error;
      }

      toast({
        title: "Skills saved",
        description: "Your skills inventory has been updated successfully.",
      });

    } catch (error) {
      console.error('Error saving skills:', error);
      toast({
        title: "Error saving skills",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProficiencyColor = (level: string) => {
    const levelObj = proficiencyLevels.find(l => l.value === level);
    return levelObj?.color || 'bg-gray-500';
  };

  const groupedSkills = skills.reduce((acc, skill, index) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push({ ...skill, originalIndex: index });
    return acc;
  }, {} as Record<string, (Skill & { originalIndex: number })[]>);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Skills & Expertise</h3>
        <p className="text-sm text-muted-foreground">
          Add your technical and soft skills with proficiency levels
        </p>
      </div>

      {/* Add New Skill */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add New Skill</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <Label>Skill Name</Label>
              <Input
                value={newSkill.skill_name}
                onChange={(e) => setNewSkill({...newSkill, skill_name: e.target.value})}
                placeholder="e.g., React, Python, Leadership"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newSkill.category} onValueChange={(value) => setNewSkill({...newSkill, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Proficiency</Label>
              <Select value={newSkill.proficiency_level} onValueChange={(value: any) => setNewSkill({...newSkill, proficiency_level: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map(level => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${level.color}`} />
                        <span>{level.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Years (Optional)</Label>
              <Input
                type="number"
                min="0"
                value={newSkill.years_experience || ''}
                onChange={(e) => setNewSkill({...newSkill, years_experience: e.target.value ? parseInt(e.target.value) : null})}
                placeholder="Years"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="featured-new"
              checked={newSkill.is_featured}
              onCheckedChange={(checked) => setNewSkill({...newSkill, is_featured: !!checked})}
            />
            <Label htmlFor="featured-new" className="flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Featured skill (highlight on resume)</span>
            </Label>
          </div>
          <Button onClick={addSkill} disabled={!newSkill.skill_name.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </CardContent>
      </Card>

      {/* Skills List */}
      {Object.keys(groupedSkills).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-base flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>{category}</span>
                  <Badge variant="outline">{categorySkills.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categorySkills.map(skill => (
                    <div key={skill.originalIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getProficiencyColor(skill.proficiency_level)}`} />
                          <span className="font-medium">{skill.skill_name}</span>
                          {skill.is_featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {skill.proficiency_level}
                        </Badge>
                        {skill.years_experience && (
                          <Badge variant="secondary" className="text-xs">
                            {skill.years_experience}y
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(skill.originalIndex)}
                        >
                          <Star className={`h-4 w-4 ${skill.is_featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(skill.originalIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-8">
          <CardContent>
            <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No skills added yet. Add your first skill above to get started.
            </p>
          </CardContent>
        </Card>
      )}

      <Button onClick={saveSkills} disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : 'Save Skills'}
      </Button>
    </div>
  );
};

export default SkillsSection;
