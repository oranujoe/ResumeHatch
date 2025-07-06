
-- Create admin_actions table for audit logging
CREATE TABLE public.admin_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id UUID REFERENCES auth.users NOT NULL,
  action_type TEXT NOT NULL,
  target_user_id UUID REFERENCES auth.users,
  target_resource TEXT,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.admin_actions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows admins to view all admin actions
CREATE POLICY "Admins can view all admin actions" 
  ON public.admin_actions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create policy that allows admins to insert admin actions
CREATE POLICY "Admins can create admin actions" 
  ON public.admin_actions 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Create indexes for performance
CREATE INDEX idx_admin_actions_admin_user_id ON public.admin_actions(admin_user_id);
CREATE INDEX idx_admin_actions_target_user_id ON public.admin_actions(target_user_id);
CREATE INDEX idx_admin_actions_created_at ON public.admin_actions(created_at DESC);
CREATE INDEX idx_admin_actions_action_type ON public.admin_actions(action_type);

-- Add some helpful views for admin dashboard
CREATE VIEW public.admin_dashboard_stats AS
SELECT 
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM public.user_roles WHERE role = 'admin') as total_admins,
  (SELECT COUNT(*) FROM public.admin_actions WHERE created_at >= NOW() - INTERVAL '24 hours') as actions_last_24h,
  (SELECT COUNT(*) FROM public.admin_actions WHERE created_at >= NOW() - INTERVAL '7 days') as actions_last_7d;

-- Allow admins to view dashboard stats
CREATE POLICY "Admins can view dashboard stats" 
  ON public.admin_dashboard_stats 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role = 'admin'
    )
  );
