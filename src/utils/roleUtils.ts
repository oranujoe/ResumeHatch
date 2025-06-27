
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
      .single();

    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }

    return data?.role as UserRole || 'user';
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
};

export const isAdmin = async (userId?: string): Promise<boolean> => {
  const role = await getUserRole(userId);
  return role === 'admin';
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
