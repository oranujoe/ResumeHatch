
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { buildToneSpecificPrompt } from './promptBuilder.ts';
import { sanitizeResumeContent } from './contentSanitizer.ts';
import type { UserProfileData } from './types.ts';

console.log('=== EDGE FUNCTION STARTUP ===');
console.log('Function initialized successfully');

// Environment variables check with detailed logging
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

console.log('=== ENVIRONMENT VARIABLES CHECK ===');
console.log('GEMINI_API_KEY exists:', !!geminiApiKey);
console.log('SUPABASE_URL exists:', !!supabaseUrl);
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!supabaseServiceKey);

if (geminiApiKey) {
  console.log('GEMINI_API_KEY length:', geminiApiKey.length);
  console.log('GEMINI_API_KEY starts with:', geminiApiKey.substring(0, 10) + '...');
}

if (supabaseUrl) {
  console.log('SUPABASE_URL:', supabaseUrl);
}

if (supabaseServiceKey) {
  console.log('SUPABASE_SERVICE_ROLE_KEY length:', supabaseServiceKey.length);
  console.log('SUPABASE_SERVICE_ROLE_KEY starts with:', supabaseServiceKey.substring(0, 10) + '...');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client with extensive error handling
let supabase;
try {
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(`Missing Supabase configuration: URL=${!!supabaseUrl}, ServiceKey=${!!supabaseServiceKey}`);
  }
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('FATAL: Failed to create Supabase client:', error);
}

// Helper function to convert Json to string array
const jsonToStringArray = (jsonValue: any): string[] => {
  try {
    if (!jsonValue) return [];
    if (Array.isArray(jsonValue)) {
      return jsonValue.filter((item): item is string => typeof item === 'string');
    }
    return [];
  } catch (error) {
    console.error('Error converting JSON to string array:', error);
    return [];
  }
};

// Helper function to validate proficiency level
const validateProficiencyLevel = (level: string): 'beginner' | 'intermediate' | 'advanced' | 'expert' => {
  const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
  return validLevels.includes(level as any) ? level as any : 'intermediate';
};

async function fetchUserProfile(userId: string): Promise<UserProfileData | null> {
  console.log('=== FETCHING USER PROFILE ===');
  console.log(`Starting profile fetch for user: ${userId}`);
  
  try {
    if (!supabase) {
      throw new Error('Supabase client not initialized');
    }

    console.log('Executing parallel database queries...');
    
    // Load all profile data in parallel with individual error handling
    const [
      profileResult,
      profilesResult,
      workResult,
      educationResult,
      skillsResult,
      certificationsResult,
      projectsResult
    ] = await Promise.allSettled([
      supabase.from('user_profiles').select('*').eq('user_id', userId).maybeSingle(),
      supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
      supabase.from('work_experiences').select('*').eq('user_id', userId).order('start_date', { ascending: false }),
      supabase.from('education_records').select('*').eq('user_id', userId).order('graduation_date', { ascending: false }),
      supabase.from('skills_inventory').select('*').eq('user_id', userId).order('is_featured', { ascending: false }),
      supabase.from('certifications').select('*').eq('user_id', userId).order('issue_date', { ascending: false }),
      supabase.from('projects_portfolio').select('*').eq('user_id', userId).order('start_date', { ascending: false })
    ]);

    console.log('=== DATABASE QUERY RESULTS ===');
    
    // Process each result with detailed logging
    const getResultData = (result: any, tableName: string) => {
      if (result.status === 'fulfilled') {
        const { data, error } = result.value;
        console.log(`${tableName}:`, { hasData: !!data, error: error?.message });
        if (error) {
          console.error(`${tableName} error details:`, error);
          return { data: null, error };
        }
        return { data, error: null };
      } else {
        console.error(`${tableName} promise rejected:`, result.reason);
        return { data: null, error: result.reason };
      }
    };

    const profile = getResultData(profileResult, 'user_profiles');
    const profiles = getResultData(profilesResult, 'profiles');
    const work = getResultData(workResult, 'work_experiences');
    const education = getResultData(educationResult, 'education_records');
    const skills = getResultData(skillsResult, 'skills_inventory');
    const certifications = getResultData(certificationsResult, 'certifications');
    const projects = getResultData(projectsResult, 'projects_portfolio');

    // Check for critical errors
    const criticalErrors = [profile.error, profiles.error].filter(Boolean);
    if (criticalErrors.length > 0) {
      console.error('Critical database errors:', criticalErrors);
      throw new Error(`Critical database query failed: ${criticalErrors.map(e => e?.message).join(', ')}`);
    }

    console.log('=== PROCESSING PROFILE DATA ===');
    
    // Merge profile data with fallback logic
    let mergedProfile = profile.data;
    if (!mergedProfile && profiles.data) {
      console.log('Using fallback profile from profiles table');
      mergedProfile = {
        full_name: profiles.data.full_name,
        professional_title: profiles.data.full_name,
        professional_summary: 'Experienced professional seeking new opportunities.',
        phone: null,
        location: null,
        linkedin_url: null,
        portfolio_url: null
      };
    } else if (mergedProfile && !mergedProfile.full_name && profiles.data?.full_name) {
      console.log('Enhancing profile with name from profiles table');
      mergedProfile.full_name = profiles.data.full_name;
    }

    // Transform data with error handling
    const transformedWorkExperiences = (work.data || []).map(workItem => {
      try {
        return {
          ...workItem,
          achievements: jsonToStringArray(workItem.achievements)
        };
      } catch (error) {
        console.error('Error transforming work experience:', error);
        return workItem;
      }
    });

    const transformedSkills = (skills.data || []).map(skill => {
      try {
        return {
          ...skill,
          proficiency_level: validateProficiencyLevel(skill.proficiency_level)
        };
      } catch (error) {
        console.error('Error transforming skill:', error);
        return skill;
      }
    });

    const transformedProjects = (projects.data || []).map(project => {
      try {
        return {
          ...project,
          achievements: jsonToStringArray(project.achievements)
        };
      } catch (error) {
        console.error('Error transforming project:', error);
        return project;
      }
    });

    const finalProfileData = {
      profile: mergedProfile,
      profiles: profiles.data,
      workExperiences: transformedWorkExperiences,
      education: education.data || [],
      skills: transformedSkills,
      certifications: certifications.data || [],
      projects: transformedProjects
    };

    console.log('=== FINAL PROFILE DATA SUMMARY ===');
    console.log({
      hasProfile: !!finalProfileData.profile,
      name: finalProfileData.profile?.full_name,
      email: finalProfileData.profiles?.email,
      workCount: finalProfileData.workExperiences.length,
      educationCount: finalProfileData.education.length,
      skillsCount: finalProfileData.skills.length,
      certificationsCount: finalProfileData.certifications.length,
      projectsCount: finalProfileData.projects.length
    });

    return finalProfileData;
  } catch (error) {
    console.error('=== PROFILE FETCH ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    throw error;
  }
}

serve(async (req) => {
  console.log('=== REQUEST RECEIVED ===');
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, Object.fromEntries(req.headers.entries()));

  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate environment variables before processing
    console.log('=== ENVIRONMENT VALIDATION ===');
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY is missing');
      return new Response(JSON.stringify({ error: 'Server configuration error: GEMINI_API_KEY not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration is missing');
      return new Response(JSON.stringify({ error: 'Server configuration error: Supabase not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!supabase) {
      console.error('Supabase client not initialized');
      return new Response(JSON.stringify({ error: 'Server configuration error: Database not available' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('=== PARSING REQUEST BODY ===');
    let requestBody;
    try {
      const bodyText = await req.text();
      console.log('Raw request body length:', bodyText.length);
      console.log('Raw request body preview:', bodyText.substring(0, 200));
      requestBody = JSON.parse(bodyText);
      console.log('Request body parsed successfully');
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid request body format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('=== REQUEST VALIDATION ===');
    const { jobDescription, templateId = 'modern', userId } = requestBody;
    
    console.log('Request parameters:', {
      hasJobDescription: !!jobDescription,
      jobDescriptionLength: jobDescription?.length || 0,
      templateId,
      hasUserId: !!userId
    });

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

    // Fetch user profile data
    console.log('=== FETCHING USER PROFILE DATA ===');
    const userProfileData = await fetchUserProfile(userId);

    if (!userProfileData) {
      console.error('Failed to fetch user profile data');
      return new Response(JSON.stringify({ error: 'Failed to fetch user profile data' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('=== BUILDING PROMPT ===');
    let prompt;
    try {
      prompt = buildToneSpecificPrompt(jobDescription, templateId, userProfileData);
      console.log('Prompt built successfully, length:', prompt.length);
    } catch (promptError) {
      console.error('Failed to build prompt:', promptError);
      return new Response(JSON.stringify({ error: 'Failed to build prompt for AI generation' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('=== CALLING GEMINI API ===');
    console.log(`Using template: ${templateId}`);
    console.log(`Gemini API Key validation: length=${geminiApiKey.length}, starts with=${geminiApiKey.substring(0, 10)}...`);
    
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
    console.log('Gemini API URL (without key):', geminiUrl.replace(/key=.*/, 'key=***'));
    
    const requestPayload = {
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
    };
    
    console.log('Request payload structure:', {
      hasContents: !!requestPayload.contents,
      contentsLength: requestPayload.contents.length,
      hasGenerationConfig: !!requestPayload.generationConfig,
      promptLength: requestPayload.contents[0].parts[0].text.length
    });
    
    let geminiResponse;
    try {
      console.log('Making fetch request to Gemini API...');
      geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
      
      console.log('Gemini API response status:', geminiResponse.status);
      console.log('Gemini API response statusText:', geminiResponse.statusText);
      console.log('Gemini API response headers:', Object.fromEntries(geminiResponse.headers.entries()));
    } catch (fetchError) {
      console.error('Failed to call Gemini API:', fetchError);
      console.error('Fetch error details:', {
        name: fetchError.name,
        message: fetchError.message,
        stack: fetchError.stack
      });
      return new Response(JSON.stringify({ error: 'Failed to connect to AI service' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!geminiResponse.ok) {
      let errorText;
      try {
        errorText = await geminiResponse.text();
        console.error('Gemini API error response:', errorText);
      } catch (readError) {
        console.error('Failed to read Gemini error response:', readError);
        errorText = 'Could not read error response';
      }
      
      console.error('Gemini API request failed:', {
        status: geminiResponse.status,
        statusText: geminiResponse.statusText,
        errorText: errorText
      });
      
      return new Response(JSON.stringify({ 
        error: `AI service error: ${geminiResponse.status} - ${geminiResponse.statusText}`,
        details: errorText 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('=== PROCESSING GEMINI RESPONSE ===');
    let geminiData;
    try {
      geminiData = await geminiResponse.json();
      console.log('Gemini response parsed successfully');
      console.log('Response structure:', {
        hasCandidates: !!geminiData.candidates,
        candidatesLength: geminiData.candidates?.length || 0,
        hasError: !!geminiData.error
      });
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid response from AI service' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (geminiData.error) {
      console.error('Gemini API returned error:', geminiData.error);
      return new Response(JSON.stringify({ 
        error: 'AI service error', 
        details: geminiData.error 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      console.error('No candidates in Gemini response:', geminiData);
      return new Response(JSON.stringify({ error: 'AI service did not generate content' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawResume = geminiData.candidates[0].content.parts[0].text;
    console.log('Raw resume generated, length:', rawResume.length);
    
    console.log('=== SANITIZING CONTENT ===');
    let cleanedResume;
    try {
      cleanedResume = sanitizeResumeContent(rawResume);
      console.log('Resume sanitized successfully, final length:', cleanedResume.length);
    } catch (sanitizeError) {
      console.error('Failed to sanitize resume content:', sanitizeError);
      // Use raw resume if sanitization fails
      cleanedResume = rawResume;
      console.log('Using raw resume due to sanitization error');
    }
    
    console.log('=== SUCCESS ===');
    console.log(`Resume generation completed successfully with ${templateId} template`);

    return new Response(JSON.stringify({ resume: cleanedResume }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('=== UNHANDLED ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: 'Check edge function logs for detailed error information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
