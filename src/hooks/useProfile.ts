
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserProfile {
  id?: string;
  user_id: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  professional_title?: string;
  professional_summary?: string;
  career_objective?: string;
  years_experience?: number;
  industry?: string;
  preferred_job_types?: string[];
}

export interface WorkExperience {
  id?: string;
  user_id: string;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  employment_type?: string;
  achievements?: string[];
  technologies_used?: string[];
  skills_demonstrated?: string[];
}

export interface Education {
  id?: string;
  user_id: string;
  institution_name: string;
  degree_type: string;
  field_of_study: string;
  graduation_date?: string;
  gpa?: number;
  honors?: string;
  relevant_coursework?: string[];
  location?: string;
  is_current: boolean;
}

export interface Skill {
  id?: string;
  user_id: string;
  skill_name: string;
  category: string;
  proficiency_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years_experience?: number;
  is_featured: boolean;
}

export interface Certification {
  id?: string;
  user_id: string;
  name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  verification_url?: string;
  is_active: boolean;
}

export interface Project {
  id?: string;
  user_id: string;
  project_name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  technologies_used?: string[];
  role?: string;
  project_url?: string;
  github_url?: string;
  achievements?: string[];
  team_size?: number;
}

export interface CompleteProfile {
  profile: UserProfile | null;
  workExperiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
}

export const useProfile = () => {
  const [profile, setProfile] = useState<CompleteProfile>({
    profile: null,
    workExperiences: [],
    education: [],
    skills: [],
    certifications: [],
    projects: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const loadCompleteProfile = async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Load all profile data in parallel
      const [
        profileResult,
        workResult,
        educationResult,
        skillsResult,
        certificationsResult,
        projectsResult
      ] = await Promise.all([
        supabase.from('user_profiles').select('*').eq('user_id', user.id).maybeSingle(),
        supabase.from('work_experiences').select('*').eq('user_id', user.id).order('start_date', { ascending: false }),
        supabase.from('education_records').select('*').eq('user_id', user.id).order('graduation_date', { ascending: false }),
        supabase.from('skills_inventory').select('*').eq('user_id', user.id).order('is_featured', { ascending: false }),
        supabase.from('certifications').select('*').eq('user_id', user.id).order('issue_date', { ascending: false }),
        supabase.from('projects_portfolio').select('*').eq('user_id', user.id).order('start_date', { ascending: false })
      ]);

      // Check for errors
      if (profileResult.error) throw profileResult.error;
      if (workResult.error) throw workResult.error;
      if (educationResult.error) throw educationResult.error;
      if (skillsResult.error) throw skillsResult.error;
      if (certificationsResult.error) throw certificationsResult.error;
      if (projectsResult.error) throw projectsResult.error;

      setProfile({
        profile: profileResult.data,
        workExperiences: workResult.data || [],
        education: educationResult.data || [],
        skills: skillsResult.data || [],
        certifications: certificationsResult.data || [],
        projects: projectsResult.data || []
      });

    } catch (err) {
      console.error('Error loading profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate profile completeness
  const getProfileCompleteness = () => {
    const { profile: userProfile, workExperiences, education, skills } = profile;
    
    let completedSections = 0;
    const totalSections = 5;

    // Basic profile info
    if (userProfile?.professional_title && userProfile?.professional_summary) {
      completedSections++;
    }

    // Contact info
    if (userProfile?.phone && userProfile?.location) {
      completedSections++;
    }

    // Work experience
    if (workExperiences.length > 0) {
      completedSections++;
    }

    // Education
    if (education.length > 0) {
      completedSections++;
    }

    // Skills
    if (skills.length > 0) {
      completedSections++;
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  // Check if profile setup is needed
  const needsProfileSetup = () => {
    return getProfileCompleteness() < 40; // Less than 40% complete
  };

  useEffect(() => {
    loadCompleteProfile();
  }, [user]);

  return {
    profile,
    isLoading,
    error,
    reload: loadCompleteProfile,
    completeness: getProfileCompleteness(),
    needsSetup: needsProfileSetup()
  };
};
