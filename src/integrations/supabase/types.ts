export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      certifications: {
        Row: {
          created_at: string
          credential_id: string | null
          expiry_date: string | null
          id: string
          is_active: boolean | null
          issue_date: string
          issuing_organization: string
          name: string
          updated_at: string
          user_id: string
          verification_url: string | null
        }
        Insert: {
          created_at?: string
          credential_id?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          issue_date: string
          issuing_organization: string
          name: string
          updated_at?: string
          user_id: string
          verification_url?: string | null
        }
        Update: {
          created_at?: string
          credential_id?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          issue_date?: string
          issuing_organization?: string
          name?: string
          updated_at?: string
          user_id?: string
          verification_url?: string | null
        }
        Relationships: []
      }
      education_records: {
        Row: {
          created_at: string
          degree_type: string
          field_of_study: string
          gpa: number | null
          graduation_date: string | null
          honors: string | null
          id: string
          institution_name: string
          is_current: boolean | null
          location: string | null
          relevant_coursework: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          degree_type: string
          field_of_study: string
          gpa?: number | null
          graduation_date?: string | null
          honors?: string | null
          id?: string
          institution_name: string
          is_current?: boolean | null
          location?: string | null
          relevant_coursework?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          degree_type?: string
          field_of_study?: string
          gpa?: number | null
          graduation_date?: string | null
          honors?: string | null
          id?: string
          institution_name?: string
          is_current?: boolean | null
          location?: string | null
          relevant_coursework?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      extraction_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_details: string | null
          id: string
          progress: number | null
          result: Json | null
          resume_upload_id: string
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_details?: string | null
          id?: string
          progress?: number | null
          result?: Json | null
          resume_upload_id: string
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_details?: string | null
          id?: string
          progress?: number | null
          result?: Json | null
          resume_upload_id?: string
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "extraction_jobs_resume_upload_id_fkey"
            columns: ["resume_upload_id"]
            isOneToOne: false
            referencedRelation: "resume_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects_portfolio: {
        Row: {
          achievements: Json | null
          created_at: string
          description: string | null
          end_date: string | null
          github_url: string | null
          id: string
          project_name: string
          project_url: string | null
          role: string | null
          start_date: string | null
          team_size: number | null
          technologies_used: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          github_url?: string | null
          id?: string
          project_name: string
          project_url?: string | null
          role?: string | null
          start_date?: string | null
          team_size?: number | null
          technologies_used?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          github_url?: string | null
          id?: string
          project_name?: string
          project_url?: string | null
          role?: string | null
          start_date?: string | null
          team_size?: number | null
          technologies_used?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      resume_uploads: {
        Row: {
          created_at: string
          error_message: string | null
          extracted_data: Json | null
          extraction_confidence: number | null
          extraction_status: string | null
          file_size: number | null
          file_type: string
          filename: string
          id: string
          storage_path: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          extracted_data?: Json | null
          extraction_confidence?: number | null
          extraction_status?: string | null
          file_size?: number | null
          file_type: string
          filename: string
          id?: string
          storage_path: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          extracted_data?: Json | null
          extraction_confidence?: number | null
          extraction_status?: string | null
          file_size?: number | null
          file_type?: string
          filename?: string
          id?: string
          storage_path?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      skills_inventory: {
        Row: {
          category: string
          created_at: string
          id: string
          is_featured: boolean | null
          last_used_date: string | null
          proficiency_level: string
          skill_name: string
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          last_used_date?: string | null
          proficiency_level: string
          skill_name: string
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          last_used_date?: string | null
          proficiency_level?: string
          skill_name?: string
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          career_objective: string | null
          created_at: string
          id: string
          industry: string | null
          linkedin_url: string | null
          location: string | null
          phone: string | null
          portfolio_url: string | null
          preferred_job_types: string[] | null
          professional_summary: string | null
          professional_title: string | null
          updated_at: string
          user_id: string
          years_experience: number | null
        }
        Insert: {
          career_objective?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          preferred_job_types?: string[] | null
          professional_summary?: string | null
          professional_title?: string | null
          updated_at?: string
          user_id: string
          years_experience?: number | null
        }
        Update: {
          career_objective?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          linkedin_url?: string | null
          location?: string | null
          phone?: string | null
          portfolio_url?: string | null
          preferred_job_types?: string[] | null
          professional_summary?: string | null
          professional_title?: string | null
          updated_at?: string
          user_id?: string
          years_experience?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          status: string | null
          wants_updates: boolean | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          status?: string | null
          wants_updates?: boolean | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          status?: string | null
          wants_updates?: boolean | null
        }
        Relationships: []
      }
      work_experiences: {
        Row: {
          achievements: Json | null
          company_name: string
          created_at: string
          employment_type: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          job_title: string
          location: string | null
          skills_demonstrated: string[] | null
          start_date: string
          technologies_used: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          achievements?: Json | null
          company_name: string
          created_at?: string
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          job_title: string
          location?: string | null
          skills_demonstrated?: string[] | null
          start_date: string
          technologies_used?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          achievements?: Json | null
          company_name?: string
          created_at?: string
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          job_title?: string
          location?: string | null
          skills_demonstrated?: string[] | null
          start_date?: string
          technologies_used?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      make_user_admin: {
        Args: { _user_email: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
