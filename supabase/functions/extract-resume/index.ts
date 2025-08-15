
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { data: { user } } = await supabase.auth.getUser(
      req.headers.get('Authorization')?.replace('Bearer ', '') ?? ''
    )

    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    const { resumeUploadId } = await req.json()

    if (!resumeUploadId) {
      return new Response('Missing resumeUploadId', { status: 400, headers: corsHeaders })
    }

    console.log(`Starting resume extraction for upload ID: ${resumeUploadId}`)

    // Get the resume upload record
    const { data: upload, error: uploadError } = await supabase
      .from('resume_uploads')
      .select('*')
      .eq('id', resumeUploadId)
      .eq('user_id', user.id)
      .single()

    if (uploadError || !upload) {
      console.error('Failed to fetch upload:', uploadError)
      return new Response('Upload not found', { status: 404, headers: corsHeaders })
    }

    // Update status to processing
    await supabase
      .from('resume_uploads')
      .update({ extraction_status: 'processing' })
      .eq('id', resumeUploadId)

    // Create extraction job
    const { data: job } = await supabase
      .from('extraction_jobs')
      .insert({
        user_id: user.id,
        resume_upload_id: resumeUploadId,
        status: 'processing',
        progress: 0,
        started_at: new Date().toISOString()
      })
      .select()
      .single()

    // Download the file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('resumes')
      .download(upload.storage_path)

    if (downloadError || !fileData) {
      console.error('Failed to download file:', downloadError)
      await supabase
        .from('extraction_jobs')
        .update({ 
          status: 'failed',
          error_details: 'Failed to download file',
          completed_at: new Date().toISOString()
        })
        .eq('id', job.id)
      
      return new Response('Failed to download file', { status: 500, headers: corsHeaders })
    }

    // Convert file to text for AI processing
    const fileText = await fileData.text()
    
    // Update progress
    await supabase
      .from('extraction_jobs')
      .update({ progress: 25 })
      .eq('id', job.id)

    // Prepare prompt for Gemini AI
    const prompt = `
    Extract structured information from this resume text and return it as a JSON object with the following structure:
    
    {
      "personal_info": {
        "name": "Full Name",
        "email": "email@example.com",
        "phone": "phone number",
        "location": "City, State/Country",
        "linkedin_url": "LinkedIn URL",
        "portfolio_url": "Portfolio URL",
        "professional_title": "Current/Desired Job Title"
      },
      "professional_summary": "Brief professional summary",
      "work_experiences": [
        {
          "company_name": "Company Name",
          "job_title": "Job Title",
          "start_date": "YYYY-MM-DD",
          "end_date": "YYYY-MM-DD or null if current",
          "is_current": false,
          "location": "City, State",
          "employment_type": "Full-time/Part-time/Contract",
          "achievements": ["Achievement 1", "Achievement 2"],
          "technologies_used": ["Tech 1", "Tech 2"],
          "skills_demonstrated": ["Skill 1", "Skill 2"]
        }
      ],
      "education": [
        {
          "institution_name": "University Name",
          "degree_type": "Bachelor's/Master's/PhD",
          "field_of_study": "Field of Study",
          "graduation_date": "YYYY-MM-DD",
          "gpa": 3.5,
          "honors": "Honors if any",
          "location": "City, State"
        }
      ],
      "skills": [
        {
          "skill_name": "Skill Name",
          "category": "Technical/Soft/Language",
          "proficiency_level": "beginner/intermediate/advanced/expert"
        }
      ],
      "certifications": [
        {
          "name": "Certification Name",
          "issuing_organization": "Organization",
          "issue_date": "YYYY-MM-DD",
          "expiry_date": "YYYY-MM-DD or null"
        }
      ],
      "projects": [
        {
          "project_name": "Project Name",
          "description": "Project description",
          "technologies_used": ["Tech 1", "Tech 2"],
          "project_url": "URL if available",
          "github_url": "GitHub URL if available"
        }
      ]
    }
    
    Resume text:
    ${fileText}
    
    Return only the JSON object, no additional text.
    `;

    // Update progress
    await supabase
      .from('extraction_jobs')
      .update({ progress: 50 })
      .eq('id', job.id)

    // Call Gemini API
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + Deno.env.get('GEMINI_API_KEY'), {
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
          temperature: 0.1,
          maxOutputTokens: 8192,
        }
      })
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`)
    }

    const geminiData = await geminiResponse.json()
    
    // Update progress
    await supabase
      .from('extraction_jobs')
      .update({ progress: 75 })
      .eq('id', job.id)

    // Parse the AI response
    let extractedData
    try {
      const aiResponse = geminiData.candidates[0].content.parts[0].text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        extractedData = JSON.parse(jsonMatch[0])
      } else {
        extractedData = JSON.parse(aiResponse)
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      throw new Error('Failed to parse AI response')
    }

    // Update progress
    await supabase
      .from('extraction_jobs')
      .update({ progress: 90 })
      .eq('id', job.id)

    // Update the resume upload with extracted data
    await supabase
      .from('resume_uploads')
      .update({
        extraction_status: 'completed',
        extracted_data: extractedData,
        extraction_confidence: 0.85 // Default confidence score
      })
      .eq('id', resumeUploadId)

    // Complete the extraction job
    await supabase
      .from('extraction_jobs')
      .update({
        status: 'completed',
        progress: 100,
        result: extractedData,
        completed_at: new Date().toISOString()
      })
      .eq('id', job.id)

    console.log('Resume extraction completed successfully')

    return new Response(
      JSON.stringify({
        success: true,
        extractedData,
        jobId: job.id
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in extract-resume function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during extraction' 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
