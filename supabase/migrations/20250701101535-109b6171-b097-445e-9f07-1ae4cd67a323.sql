
-- Enhanced user profiles table
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  phone TEXT,
  location TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  professional_title TEXT,
  professional_summary TEXT,
  career_objective TEXT,
  years_experience INTEGER,
  industry TEXT,
  preferred_job_types TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Work experiences table
CREATE TABLE public.work_experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  location TEXT,
  employment_type TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,
  technologies_used TEXT[],
  skills_demonstrated TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Education records table
CREATE TABLE public.education_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  institution_name TEXT NOT NULL,
  degree_type TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  graduation_date DATE,
  gpa DECIMAL(3,2),
  honors TEXT,
  relevant_coursework TEXT[],
  location TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Skills inventory table
CREATE TABLE public.skills_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_level TEXT NOT NULL CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  years_experience INTEGER,
  last_used_date DATE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, skill_name)
);

-- Certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id TEXT,
  verification_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Projects portfolio table
CREATE TABLE public.projects_portfolio (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  technologies_used TEXT[],
  role TEXT,
  project_url TEXT,
  github_url TEXT,
  achievements JSONB DEFAULT '[]'::jsonb,
  team_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Resume uploads table for tracking uploaded files
CREATE TABLE public.resume_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  filename TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  extraction_status TEXT DEFAULT 'pending' CHECK (extraction_status IN ('pending', 'processing', 'completed', 'failed')),
  extraction_confidence DECIMAL(3,2),
  extracted_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Extraction jobs table for tracking processing status
CREATE TABLE public.extraction_jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  resume_upload_id UUID REFERENCES public.resume_uploads NOT NULL,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  progress INTEGER DEFAULT 0,
  result JSONB,
  error_details TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.extraction_jobs ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own profile" ON public.user_profiles FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for work_experiences
CREATE POLICY "Users can view their own work experiences" ON public.work_experiences FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own work experiences" ON public.work_experiences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own work experiences" ON public.work_experiences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own work experiences" ON public.work_experiences FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for education_records
CREATE POLICY "Users can view their own education records" ON public.education_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own education records" ON public.education_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own education records" ON public.education_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own education records" ON public.education_records FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for skills_inventory
CREATE POLICY "Users can view their own skills" ON public.skills_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own skills" ON public.skills_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own skills" ON public.skills_inventory FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own skills" ON public.skills_inventory FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for certifications
CREATE POLICY "Users can view their own certifications" ON public.certifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own certifications" ON public.certifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own certifications" ON public.certifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own certifications" ON public.certifications FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for projects_portfolio
CREATE POLICY "Users can view their own projects" ON public.projects_portfolio FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own projects" ON public.projects_portfolio FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects" ON public.projects_portfolio FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects" ON public.projects_portfolio FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for resume_uploads
CREATE POLICY "Users can view their own resume uploads" ON public.resume_uploads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own resume uploads" ON public.resume_uploads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own resume uploads" ON public.resume_uploads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own resume uploads" ON public.resume_uploads FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for extraction_jobs
CREATE POLICY "Users can view their own extraction jobs" ON public.extraction_jobs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own extraction jobs" ON public.extraction_jobs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own extraction jobs" ON public.extraction_jobs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own extraction jobs" ON public.extraction_jobs FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX idx_work_experiences_user_id ON public.work_experiences(user_id);
CREATE INDEX idx_education_records_user_id ON public.education_records(user_id);
CREATE INDEX idx_skills_inventory_user_id ON public.skills_inventory(user_id);
CREATE INDEX idx_certifications_user_id ON public.certifications(user_id);
CREATE INDEX idx_projects_portfolio_user_id ON public.projects_portfolio(user_id);
CREATE INDEX idx_resume_uploads_user_id ON public.resume_uploads(user_id);
CREATE INDEX idx_extraction_jobs_user_id ON public.extraction_jobs(user_id);
CREATE INDEX idx_extraction_jobs_status ON public.extraction_jobs(status);

-- Create storage bucket for resume uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Storage policies for resume uploads
CREATE POLICY "Users can upload their own resumes" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'resumes' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own resumes" ON storage.objects FOR SELECT USING (
  bucket_id = 'resumes' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own resumes" ON storage.objects FOR UPDATE USING (
  bucket_id = 'resumes' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own resumes" ON storage.objects FOR DELETE USING (
  bucket_id = 'resumes' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
