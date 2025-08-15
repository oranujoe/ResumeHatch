import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'user';

export const getUserRole = async (userId?: string): Promise<UserRole | null> => {
  try {
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      userId = user.id;
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .order('role', { ascending: false }); // Order by role to get 'user' before 'admin', then we'll reverse logic

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    if (!data || data.length === 0) {
      return 'user'; // Default to user if no roles found
    }

    // If user has admin role, prioritize it
    const hasAdmin = data.some(row => row.role === 'admin');
    if (hasAdmin) {
      return 'admin';
    }

    // Otherwise return the first role (or default to user)
    return data[0]?.role as UserRole || 'user';
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
};

export const isAdmin = async (userId?: string): Promise<boolean> => {
  try {
    if (!userId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      userId = user.id;
    }

    // Direct query for admin role - more efficient and avoids multiple rows issue
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .limit(1);

    if (error) {
      console.error('Error checking admin role:', error);
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Error in isAdmin:', error);
    return false;
  }
};

export const makeUserAdmin = async (userEmail: string): Promise<boolean> => {
  try {
    const { error } = await supabase.rpc('make_user_admin', {
      _user_email: userEmail
    });

    if (error) {
      console.error('Error making user admin:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in makeUserAdmin:', error);
    return false;
  }
};
