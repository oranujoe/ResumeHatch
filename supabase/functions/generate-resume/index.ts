
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { buildToneSpecificPrompt } from './promptBuilder.ts';
import { sanitizeResumeContent } from './contentSanitizer.ts';
import type { UserProfileData } from './types.ts';

console.log('Starting generate-resume function...');

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

console.log('Environment variables check:', {
  hasGeminiKey: !!geminiApiKey,
  hasSupabaseUrl: !!supabaseUrl,
  hasServiceKey: !!supabaseServiceKey
});

if (!geminiApiKey) {
  console.error('GEMINI_API_KEY is not set');
}
if (!supabaseUrl) {
  console.error('SUPABASE_URL is not set');
}
if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

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

    console.log('Database query results:', {
      profileResult: { data: !!profileResult.data, error: profileResult.error?.message },
      profilesResult: { data: !!profilesResult.data, error: profilesResult.error?.message },
      workResult: { count: workResult.data?.length || 0, error: workResult.error?.message },
      educationResult: { count: educationResult.data?.length || 0, error: educationResult.error?.message },
      skillsResult: { count: skillsResult.data?.length || 0, error: skillsResult.error?.message },
      certificationsResult: { count: certificationsResult.data?.length || 0, error: certificationsResult.error?.message },
      projectsResult: { count: projectsResult.data?.length || 0, error: projectsResult.error?.message }
    });

    // Check for database errors
    const errors = [profileResult.error, profilesResult.error, workResult.error, educationResult.error, skillsResult.error, certificationsResult.error, projectsResult.error].filter(Boolean);
    if (errors.length > 0) {
      console.error('Database query errors:', errors);
      throw new Error(`Database query failed: ${errors.map(e => e?.message).join(', ')}`);
    }

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
      profiles: profilesResult.data,
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
      location: finalProfileData.profile?.location,
      workCount: finalProfileData.workExperiences.length,
      educationCount: finalProfileData.education.length,
      skillsCount: finalProfileData.skills.length
    });

    return finalProfileData;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

serve(async (req) => {
  console.log(`Received ${req.method} request`);

  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Parsing request body...');
    const requestBody = await req.json();
    console.log('Request body parsed:', { 
      hasJobDescription: !!requestBody.jobDescription,
      templateId: requestBody.templateId,
      hasUserId: !!requestBody.userId
    });

    const { jobDescription, templateId = 'modern', userId } = requestBody;

    if (!jobDescription || jobDescription.trim() === '') {
      console.error('Job description is missing or empty');
      return new Response(JSON.stringify({ error: 'Job description is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!userId) {
      console.error('User ID is missing');
      return new Response(JSON.stringify({ error: 'User ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check environment variables again before proceeding
    if (!geminiApiKey || !supabaseUrl || !supabaseServiceKey) {
      console.error('Missing required environment variables');
      return new Response(JSON.stringify({ error: 'Server configuration error: missing environment variables' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch user profile data
    console.log(`Fetching profile data for user: ${userId}`);
    const userProfileData = await fetchUserProfile(userId);

    if (!userProfileData) {
      console.error('Failed to fetch user profile data');
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Building prompt...');
    const prompt = buildToneSpecificPrompt(jobDescription, templateId, userProfileData);
    console.log('Prompt built successfully, length:', prompt.length);

    console.log(`Calling Gemini API with ${templateId} template...`);
    
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

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(JSON.stringify({ error: `Gemini API error: ${response.status} - ${errorText}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Gemini API response received');
    
    if (!data.candidates || data.candidates.length === 0) {
      console.error('No candidates in Gemini response');
      return new Response(JSON.stringify({ error: 'No response generated from Gemini API' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawResume = data.candidates[0].content.parts[0].text;
    console.log('Raw resume generated, length:', rawResume.length);
    
    console.log('Sanitizing resume content...');
    const cleanedResume = sanitizeResumeContent(rawResume);
    console.log('Resume sanitized, final length:', cleanedResume.length);
    
    console.log(`Resume generation completed successfully with ${templateId} template`);

    return new Response(JSON.stringify({ resume: cleanedResume }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-resume function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: 'Check edge function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
