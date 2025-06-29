import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to clean up HTML content and remove wrapper tags
function sanitizeResumeContent(htmlContent: string): string {
  let cleanContent = htmlContent.trim();
  
  // Remove DOCTYPE declarations
  cleanContent = cleanContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  
  // Remove html opening and closing tags
  cleanContent = cleanContent.replace(/<\/?html[^>]*>/gi, '');
  
  // Remove head sections completely
  cleanContent = cleanContent.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  
  // Remove body opening and closing tags, but keep the content
  cleanContent = cleanContent.replace(/<\/?body[^>]*>/gi, '');
  
  // Remove any remaining meta tags
  cleanContent = cleanContent.replace(/<meta[^>]*>/gi, '');
  
  // Remove title tags
  cleanContent = cleanContent.replace(/<\/?title[^>]*>/gi, '');
  
  // Remove any remaining script or style tags
  cleanContent = cleanContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  cleanContent = cleanContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  
  // Clean up multiple whitespace and newlines
  cleanContent = cleanContent.replace(/\n\s*\n/g, '\n');
  cleanContent = cleanContent.replace(/^\s+|\s+$/g, '');
  
  // If content starts with ```html or ends with ```, remove it
  cleanContent = cleanContent.replace(/^```html\s*/i, '');
  cleanContent = cleanContent.replace(/\s*```$/i, '');
  
  return cleanContent;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobDescription } = await req.json();

    if (!jobDescription || jobDescription.trim() === '') {
      return new Response(JSON.stringify({ error: 'Job description is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = `Based on the following job description, generate an ATS-optimized resume in HTML format. The resume should be professional, well-structured, and tailored to match the job requirements. Include relevant sections like Professional Summary, Skills, Experience, Education, etc. Use proper HTML formatting with appropriate tags and bullet points.

IMPORTANT INSTRUCTIONS:
- Generate ONLY the HTML content that goes inside a div container
- DO NOT include DOCTYPE, html, head, body, or any wrapper tags
- DO NOT include any meta tags, title tags, or script tags
- Start directly with resume content using semantic HTML tags like <h1>, <h2>, <p>, <ul>, etc.
- Use clean, semantic HTML structure
- Focus on content that would be inside a resume container

Job Description:
${jobDescription}

Please provide a complete HTML resume that would be optimized for Applicant Tracking Systems (ATS). Focus on:
1. Using relevant keywords from the job description
2. Clear, professional formatting with proper HTML tags
3. Quantifiable achievements where appropriate
4. Skills that match the job requirements
5. Professional structure starting with candidate name as <h1>

Generate only clean HTML content without any wrapper tags or metadata.`;

    console.log('Calling Gemini API...');
    
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
    
    // Clean up the generated content
    const cleanedResume = sanitizeResumeContent(rawResume);
    
    console.log('Resume generated and cleaned successfully');

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
