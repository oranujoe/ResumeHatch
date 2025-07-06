
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
