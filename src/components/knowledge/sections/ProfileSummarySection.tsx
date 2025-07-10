
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, Edit, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useUserProfile, useUpdateUserProfile } from '@/hooks/useKnowledgeBase';

const ProfileSummarySection: React.FC = () => {
  const { data: profile, isLoading } = useUserProfile();
  const updateProfile = useUpdateUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    professional_title: '',
    professional_summary: '',
    phone: '',
    location: '',
    linkedin_url: '',
    portfolio_url: '',
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        professional_title: profile.professional_title || '',
        professional_summary: profile.professional_summary || '',
        phone: profile.phone || '',
        location: profile.location || '',
        linkedin_url: profile.linkedin_url || '',
        portfolio_url: profile.portfolio_url || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile.mutateAsync(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Profile Summary</span>
        </CardTitle>
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Profile Information</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="professional_title">Professional Title</Label>
                  <Input
                    id="professional_title"
                    value={formData.professional_title}
                    onChange={(e) => handleInputChange('professional_title', e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="professional_summary">Professional Summary</Label>
                <Textarea
                  id="professional_summary"
                  value={formData.professional_summary}
                  onChange={(e) => handleInputChange('professional_summary', e.target.value)}
                  placeholder="Brief summary of your professional background and expertise"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio_url">Portfolio URL</Label>
                  <Input
                    id="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={(e) => handleInputChange('portfolio_url', e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateProfile.isPending}>
                  {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-lg">{profile?.full_name || 'No name provided'}</h3>
            <p className="text-muted-foreground">{profile?.professional_title || 'Professional'}</p>
            
            <div className="mt-3 space-y-2">
              {(profile as any)?.email && (
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <a 
                    href={`mailto:${(profile as any).email}`}
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {(profile as any).email}
                  </a>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile?.location && (
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.linkedin_url && (
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="h-4 w-4" />
                  <a 
                    href={profile.linkedin_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    LinkedIn Profile
                  </a>
                </div>
              )}
              {profile?.portfolio_url && (
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="h-4 w-4" />
                  <a 
                    href={profile.portfolio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Portfolio Website
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div>
            {profile?.professional_summary && (
              <div>
                <h4 className="font-medium mb-2">Professional Summary</h4>
                <p className="text-sm text-muted-foreground">{profile.professional_summary}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummarySection;
