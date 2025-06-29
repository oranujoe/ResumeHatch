
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

    const prompt = `You are an expert resume writer creating an ATS-optimized resume. Based on the job description below, generate a professional resume in clean HTML format.

CRITICAL FORMATTING REQUIREMENTS:
- Generate ONLY clean HTML content (NO DOCTYPE, html, head, body tags)
- Start directly with the candidate's name as <h1>
- Use semantic HTML: <h1> for name, <h2> for sections, <p> for paragraphs, <ul>/<li> for lists
- Structure sections in this exact order: Contact Info, Professional Summary, Core Skills, Professional Experience, Education, Additional Sections

CONTENT STRUCTURE TEMPLATE:
<h1>[Full Name]</h1>
<p>[Email] | [Phone] | [City, State] | [LinkedIn URL]</p>

<h2>Professional Summary</h2>
<p>[3-4 sentences highlighting relevant experience and value proposition tailored to the job]</p>

<h2>Core Skills</h2>
<ul>
<li>[Skill relevant to job description]</li>
<li>[Technical skill matching requirements]</li>
<li>[Industry-specific competency]</li>
</ul>

<h2>Professional Experience</h2>
<h3>[Job Title] | [Company Name] | [Date Range]</h3>
<ul>
<li>[Achievement with quantifiable result using action verb]</li>
<li>[Accomplishment demonstrating relevant skill]</li>
<li>[Impact statement showing business value]</li>
</ul>

<h2>Education</h2>
<p>[Degree] in [Field] | [Institution] | [Year]</p>

CONTENT GUIDELINES:
- Extract and incorporate relevant keywords from the job description naturally
- Use strong action verbs (Led, Developed, Implemented, Achieved, Optimized)
- Include quantifiable achievements where possible (percentages, dollar amounts, timeframes)
- Tailor the professional summary specifically to the target role
- Match skills section to job requirements
- Create 3-4 bullet points per role focusing on achievements, not duties
- Ensure content flows logically and professionally

Job Description:
${jobDescription}

Generate a complete, professional resume that would score highly with ATS systems and impress hiring managers. Focus on relevance, impact, and professional presentation.`;

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
