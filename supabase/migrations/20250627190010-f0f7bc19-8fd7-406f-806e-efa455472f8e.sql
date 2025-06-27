
-- Fix the security vulnerability in the has_role function by setting an explicit search path
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Also fix the get_current_user_role function to be consistent
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  SELECT role 
  FROM public.user_roles 
  WHERE user_id = auth.uid() 
  LIMIT 1;
$$;

-- Fix the make_user_admin function as well
CREATE OR REPLACE FUNCTION public.make_user_admin(_user_email TEXT)
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
  INSERT INTO public.user_roles (user_id, role)
  SELECT id, 'admin'
  FROM auth.users 
  WHERE email = _user_email
  ON CONFLICT (user_id, role) DO NOTHING;
$$;

-- Fix the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public, pg_catalog
AS $$
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
$$;
