
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/utils/roleUtils';

export const useAdminRole = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['admin-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return false;
      return await isAdmin(user.id);
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Define the admin stats interface
interface AdminStats {
  total_users: number;
  total_admins: number;
  actions_last_24h: number;
  actions_last_7d: number;
}

export const useAdminStats = () => {
  const { user } = useAuth();
  const { data: isAdminUser } = useAdminRole();

  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      // Use raw SQL query to get stats since the view might not be in TypeScript types yet
      const { data, error } = await supabase.rpc('get_admin_stats');
      
      if (error) {
        console.log('Admin stats RPC not available, using fallback queries');
        // Fallback to individual queries if RPC doesn't exist
        const [usersResult, adminsResult, actions24hResult, actions7dResult] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact', head: true }),
          supabase.from('user_roles').select('id', { count: 'exact', head: true }).eq('role', 'admin'),
          supabase.from('admin_actions').select('id', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()),
          supabase.from('admin_actions').select('id', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        ]);

        return {
          total_users: usersResult.count || 0,
          total_admins: adminsResult.count || 0,
          actions_last_24h: actions24hResult.count || 0,
          actions_last_7d: actions7dResult.count || 0,
        };
      }
      
      return data as AdminStats;
    },
    enabled: !!user && isAdminUser,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};
