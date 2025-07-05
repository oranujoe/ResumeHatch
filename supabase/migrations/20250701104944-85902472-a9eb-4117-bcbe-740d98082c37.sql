
-- First, let's migrate existing data from profiles to user_profiles table
-- This will populate user_profiles with name data from the profiles table
INSERT INTO public.user_profiles (user_id, professional_title, professional_summary)
SELECT 
  p.id as user_id,
  COALESCE(p.full_name, 'Professional') as professional_title,
  'Experienced professional with a strong background in various industries.' as professional_summary
FROM public.profiles p
LEFT JOIN public.user_profiles up ON p.id = up.user_id
WHERE up.user_id IS NULL;

-- Update the handle_new_user function to populate both tables
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_catalog'
AS $$
BEGIN
  -- Insert into profiles table (existing functionality)
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  
  -- Also insert basic info into user_profiles table
  INSERT INTO public.user_profiles (user_id, professional_title, professional_summary)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Professional'),
    'Welcome! Please complete your profile to generate personalized resumes.'
  );
  
  -- Assign default user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Add a column to user_profiles to store the user's full name
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS full_name text;

-- Update existing user_profiles records with names from profiles table
UPDATE public.user_profiles 
SET full_name = p.full_name
FROM public.profiles p
WHERE public.user_profiles.user_id = p.id 
AND public.user_profiles.full_name IS NULL;
