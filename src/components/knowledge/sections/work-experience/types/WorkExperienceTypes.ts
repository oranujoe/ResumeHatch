
import { Json } from '@/integrations/supabase/types';

export interface WorkExperienceData {
  id: string;
  job_title: string;
  company_name: string;
  location: string | null;
  employment_type: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean | null;
  achievements: Json | null;
  technologies_used: string[] | null;
  skills_demonstrated: string[] | null;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface WorkExperienceFormData {
  job_title: string;
  company_name: string;
  location: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  achievements: string[];
  technologies_used: string[];
  skills_demonstrated: string[];
}

export interface WorkExperienceCardProps {
  experience: WorkExperienceData;
  onEdit: (experience: WorkExperienceData) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export interface WorkExperienceActionsProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  editingExperience: WorkExperienceData | null;
  setEditingExperience: (experience: WorkExperienceData | null) => void;
  onCreateSubmit: (data: WorkExperienceFormData) => Promise<void>;
  onUpdateSubmit: (data: WorkExperienceFormData) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
}
