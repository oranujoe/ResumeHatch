
-- First, let's fix the critical RLS issues and implement proper admin role system

-- 1. Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check user roles (prevents infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 5. Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = auth.uid() 
  LIMIT 1;
$$;

-- 6. Drop the existing flawed waitlist RLS policy
DROP POLICY IF EXISTS "Allow admins to view waitlist" ON public.waitlist;
DROP POLICY IF EXISTS "Allow public inserts to waitlist" ON public.waitlist;

-- 7. Create proper RLS policies for waitlist table
-- Allow anonymous users to insert to waitlist (for public signup)
CREATE POLICY "Allow anonymous inserts to waitlist" 
ON public.waitlist 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Only allow admin users to view waitlist data
CREATE POLICY "Allow admins to view waitlist" 
ON public.waitlist 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only allow admin users to update waitlist data
CREATE POLICY "Allow admins to update waitlist" 
ON public.waitlist 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only allow admin users to delete waitlist data
CREATE POLICY "Allow admins to delete waitlist" 
ON public.waitlist 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 8. Create RLS policies for user_roles table
-- Users can view their own roles
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all roles
CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert/update/delete roles
CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 9. Update the profiles table trigger to assign default user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Create function to make a user admin (for initial setup)
CREATE OR REPLACE FUNCTION public.make_user_admin(_user_email TEXT)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  INSERT INTO public.user_roles (user_id, role)
  SELECT id, 'admin'
  FROM auth.users 
  WHERE email = _user_email
  ON CONFLICT (user_id, role) DO NOTHING;
$$;
