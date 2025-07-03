
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/hooks/useProfile';

interface PersonalInfoSectionProps {
  profile: UserProfile | null;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    linkedin_url: profile?.linkedin_url || '',
    portfolio_url: profile?.portfolio_url || '',
    professional_title: profile?.professional_title || '',
    professional_summary: profile?.professional_summary || '',
    career_objective: profile?.career_objective || '',
    years_experience: profile?.years_experience?.toString() || '',
    industry: profile?.industry || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...formData,
          years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      // Also update the profiles table for name sync
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          updated_at: new Date().toISOString()
        });

      toast({
        title: "Profile updated",
        description: "Your personal information has been saved successfully.",
      });

      setIsEditing(false);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      linkedin_url: profile?.linkedin_url || '',
      portfolio_url: profile?.portfolio_url || '',
      professional_title: profile?.professional_title || '',
      professional_summary: profile?.professional_summary || '',
      career_objective: profile?.career_objective || '',
      years_experience: profile?.years_experience?.toString() || '',
      industry: profile?.industry || ''
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            {isEditing ? (
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.full_name || 'Not provided'}</p>
            )}
          </div>
          <div>
            <Label>Professional Title</Label>
            {isEditing ? (
              <Input
                value={formData.professional_title}
                onChange={(e) => setFormData({ ...formData, professional_title: e.target.value })}
                placeholder="e.g., Senior Software Engineer"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.professional_title || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Phone</Label>
            {isEditing ? (
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.phone || 'Not provided'}</p>
            )}
          </div>
          <div>
            <Label>Location</Label>
            {isEditing ? (
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, State/Country"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.location || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>LinkedIn URL</Label>
            {isEditing ? (
              <Input
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.linkedin_url || 'Not provided'}</p>
            )}
          </div>
          <div>
            <Label>Portfolio URL</Label>
            {isEditing ? (
              <Input
                value={formData.portfolio_url}
                onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                placeholder="https://yourportfolio.com"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.portfolio_url || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Years of Experience</Label>
            {isEditing ? (
              <Input
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
                placeholder="5"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.years_experience || 'Not provided'}</p>
            )}
          </div>
          <div>
            <Label>Industry</Label>
            {isEditing ? (
              <Input
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="e.g., Technology, Healthcare"
              />
            ) : (
              <p className="text-sm mt-1">{profile?.industry || 'Not provided'}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Professional Summary</Label>
          {isEditing ? (
            <Textarea
              value={formData.professional_summary}
              onChange={(e) => setFormData({ ...formData, professional_summary: e.target.value })}
              placeholder="Brief summary of your professional background"
              rows={3}
            />
          ) : (
            <p className="text-sm mt-1">{profile?.professional_summary || 'Not provided'}</p>
          )}
        </div>

        <div>
          <Label>Career Objective</Label>
          {isEditing ? (
            <Textarea
              value={formData.career_objective}
              onChange={(e) => setFormData({ ...formData, career_objective: e.target.value })}
              placeholder="Your career goals and objectives"
              rows={2}
            />
          ) : (
            <p className="text-sm mt-1">{profile?.career_objective || 'Not provided'}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
