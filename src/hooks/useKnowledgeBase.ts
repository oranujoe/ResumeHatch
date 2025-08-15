import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const useUserProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      // Fetch both user_profiles and profiles to get complete data including email
      const [userProfileResult, profileResult] = await Promise.all([
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
        supabase
          .from('profiles')
          .select('email, full_name')
          .eq('id', user.id)
          .maybeSingle()
      ]);

      if (userProfileResult.error) throw userProfileResult.error;
      if (profileResult.error) throw profileResult.error;
      
      // Merge the data, including email from profiles table
      const mergedData = {
        ...userProfileResult.data,
        email: profileResult.data?.email || user.email, // Use auth email as fallback
        // Also merge full_name if it's missing from user_profiles
        full_name: userProfileResult.data?.full_name || profileResult.data?.full_name
      };
      
      console.log('Retrieved user profile with email:', {
        email: mergedData.email,
        linkedin_url: mergedData.linkedin_url,
        portfolio_url: mergedData.portfolio_url,
        phone: mergedData.phone,
        full_name: mergedData.full_name
      });
      
      return mergedData;
    },
    enabled: !!user?.id,
  });
};

export const useSkillsInventory = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['skills-inventory', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('skills_inventory')
        .select('*')
        .eq('user_id', user.id)
        .order('category', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

export const useCertifications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['certifications', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', user.id)
        .order('issue_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

export const useWorkExperiences = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['work-experiences', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('work_experiences')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

export const useEducationRecords = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['education-records', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('education_records')
        .select('*')
        .eq('user_id', user.id)
        .order('graduation_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

// Profile mutations
export const useUpdateUserProfile = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: Partial<any>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', user?.id] });
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });
};

// Work Experience mutations
export const useCreateWorkExperience = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workData: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('work_experiences')
        .insert({ ...workData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-experiences', user?.id] });
      toast({
        title: 'Success',
        description: 'Work experience added successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add work experience',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateWorkExperience = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...workData }: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('work_experiences')
        .update(workData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-experiences', user?.id] });
      toast({
        title: 'Success',
        description: 'Work experience updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update work experience',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteWorkExperience = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('work_experiences')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-experiences', user?.id] });
      toast({
        title: 'Success',
        description: 'Work experience deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete work experience',
        variant: 'destructive',
      });
    },
  });
};

// Education mutations
export const useCreateEducation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (educationData: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('education_records')
        .insert({ ...educationData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education-records', user?.id] });
      toast({
        title: 'Success',
        description: 'Education record added successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add education record',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateEducation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...educationData }: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('education_records')
        .update(educationData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education-records', user?.id] });
      toast({
        title: 'Success',
        description: 'Education record updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update education record',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteEducation = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('education_records')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['education-records', user?.id] });
      toast({
        title: 'Success',
        description: 'Education record deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete education record',
        variant: 'destructive',
      });
    },
  });
};

// Skills mutations
export const useCreateSkill = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (skillData: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('skills_inventory')
        .insert({ ...skillData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills-inventory', user?.id] });
      toast({
        title: 'Success',
        description: 'Skill added successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add skill',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateSkill = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...skillData }: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('skills_inventory')
        .update(skillData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills-inventory', user?.id] });
      toast({
        title: 'Success',
        description: 'Skill updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update skill',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteSkill = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('skills_inventory')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills-inventory', user?.id] });
      toast({
        title: 'Success',
        description: 'Skill deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete skill',
        variant: 'destructive',
      });
    },
  });
};

// Certification mutations
export const useCreateCertification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (certData: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('certifications')
        .insert({ ...certData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications', user?.id] });
      toast({
        title: 'Success',
        description: 'Certification added successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add certification',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateCertification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...certData }: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('certifications')
        .update(certData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications', user?.id] });
      toast({
        title: 'Success',
        description: 'Certification updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update certification',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteCertification = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications', user?.id] });
      toast({
        title: 'Success',
        description: 'Certification deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete certification',
        variant: 'destructive',
      });
    },
  });
};

// Projects mutations
export const useProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['projects', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects_portfolio')
        .select('*')
        .eq('user_id', user.id)
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });
};

export const useCreateProject = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects_portfolio')
        .insert({ ...projectData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      toast({
        title: 'Success',
        description: 'Project added successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add project',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateProject = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...projectData }: any) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects_portfolio')
        .update(projectData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      toast({
        title: 'Success',
        description: 'Project updated successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update project',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteProject = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('projects_portfolio')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects', user?.id] });
      toast({
        title: 'Success',
        description: 'Project deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete project',
        variant: 'destructive',
      });
    },
  });
};
