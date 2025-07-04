import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { buildToneSpecificPrompt } from './promptBuilder.ts';
import { sanitizeResumeContent } from './contentSanitizer.ts';

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client with service role key for data access
const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

// Helper function to convert Json to string array
const jsonToStringArray = (jsonValue: any): string[] => {
  if (!jsonValue) return [];
  if (Array.isArray(jsonValue)) {
    return jsonValue.filter((item): item is string => typeof item === 'string');
  }
  return [];
};

// Helper function to validate proficiency level
const validateProficiencyLevel = (level: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
  return validLevels.includes(level as any) ? level as any : 'intermediate';
};

export interface UserProfileData {
  profile: any;
  profiles: any; // Add profiles table data for email access
  workExperiences: any[];
  education: any[];
  skills: any[];
  certifications: any[];
  projects: any[];
}

async function fetchUserProfile(userId: string): Promise<UserProfileData | null> {
  try {
    console.log(`Loading profile data for user: ${userId}`);
    
    // Load all profile data in parallel
    const [
      profileResult,
      profilesResult,
      workResult,
      educationResult,
      skillsResult,
      certificationsResult,
      projectsResult
    ] = await Promise.all([
      supabase.from('user_profiles').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('work_experiences').select('*').eq('user_id', userId).order('start_date', { ascending: false }),
      supabase.from('education_records').select('*').eq('user_id', userId).order('graduation_date', { ascending: false }),
      supabase.from('skills_inventory').select('*').eq('user_id', userId).order('is_featured', { ascending: false }),
      supabase.from('certifications').select('*').eq('user_id', userId).order('issue_date', { ascending: false }),
      supabase.from('projects_portfolio').select('*').eq('user_id', userId).order('start_date', { ascending: false })
    ]);

    console.log('Profile query result:', { 
      hasUserProfile: !!profileResult.data, 
      hasProfilesRecord: !!profilesResult.data,
      userProfileData: profileResult.data 
    });

    // Merge profile data with fallback logic
    let mergedProfile = profileResult.data;
    if (!mergedProfile && profilesResult.data) {
      // Fallback to profiles table if user_profiles is empty
      mergedProfile = {
        full_name: profilesResult.data.full_name,
        professional_title: profilesResult.data.full_name,
        professional_summary: 'Experienced professional seeking new opportunities.',
        phone: null,
        location: null,
        linkedin_url: null,
        portfolio_url: null
      };
    } else if (mergedProfile && !mergedProfile.full_name && profilesResult.data?.full_name) {
      // Enhance user_profiles with name from profiles table
      mergedProfile.full_name = profilesResult.data.full_name;
    }

    // Log the LinkedIn URL specifically to debug
    console.log('LinkedIn URL from profile:', mergedProfile?.linkedin_url);

    // Transform data to match our interfaces
    const transformedWorkExperiences = (workResult.data || []).map(work => ({
      ...work,
      achievements: jsonToStringArray(work.achievements)
    }));

    const transformedSkills = (skillsResult.data || []).map(skill => ({
      ...skill,
      proficiency_level: validateProficiencyLevel(skill.proficiency_level)
    }));

    const transformedProjects = (projectsResult.data || []).map(project => ({
      ...project,
      achievements: jsonToStringArray(project.achievements)
    }));

    const finalProfileData = {
      profile: mergedProfile,
      profiles: profilesResult.data, // Add profiles data for email access
      workExperiences: transformedWorkExperiences,
      education: educationResult.data || [],
      skills: transformedSkills,
      certifications: certificationsResult.data || [],
      projects: transformedProjects
    };

    console.log('Final profile data structure:', {
      name: finalProfileData.profile?.full_name,
      email: finalProfileData.profiles?.email,
      linkedin: finalProfileData.profile?.linkedin_url,
      phone: finalProfileData.profile?.phone,
      location: finalProfileData.profile?.location
    });

    return finalProfileData;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobDescription, templateId = 'modern', userId } = await req.json();

    if (!jobDescription || jobDescription.trim() === '') {
      return new Response(JSON.stringify({ error: 'Job description is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch user profile data
    console.log(`Fetching profile data for user: ${userId}`);
    const userProfileData = await fetchUserProfile(userId);

    if (!userProfileData) {
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Profile data loaded for user ${userId}:`, {
      name: userProfileData.profile?.full_name || 'No name',
      linkedin: userProfileData.profile?.linkedin_url || 'No LinkedIn',
      workExperiences: userProfileData.workExperiences.length,
      education: userProfileData.education.length,
      skills: userProfileData.skills.length
    });

    const prompt = buildToneSpecificPrompt(jobDescription, templateId, userProfileData);

    console.log(`Calling Gemini API with ${templateId} template tone and user profile data...`);
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from Gemini API');
    }

    const rawResume = data.candidates[0].content.parts[0].text;
    console.log('=== AI GENERATED RESUME DEBUG ===');
    console.log('Raw AI response:', rawResume.substring(0, 500) + '...');
    console.log('Looking for links in AI response:', rawResume.match(/<a[^>]*>.*?<\/a>/gi));
    
    const cleanedResume = sanitizeResumeContent(rawResume);
    console.log('After sanitization:', cleanedResume.substring(0, 500) + '...');
    console.log('Links after sanitization:', cleanedResume.match(/<a[^>]*>.*?<\/a>/gi));
    
    console.log(`Resume generated successfully with ${templateId} tone and user profile data for ${userProfileData.profile?.full_name || 'user'} with LinkedIn: ${userProfileData.profile?.linkedin_url || 'none'}`);

    return new Response(JSON.stringify({ resume: cleanedResume }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-resume function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
