
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Template tone profiles for dynamic prompt generation
const toneProfiles = {
  modern: {
    writingStyle: 'professional',
    toneKeywords: ['optimized', 'streamlined', 'enhanced', 'delivered', 'achieved'],
    personalityTraits: ['results-driven', 'analytical', 'tech-savvy', 'efficient'],
    actionVerbStyle: 'quantitative',
    summaryStyle: 'confident and results-focused',
    industryFocus: 'technology, consulting, finance, marketing'
  },
  classic: {
    writingStyle: 'executive',
    toneKeywords: ['spearheaded', 'orchestrated', 'championed', 'executed', 'directed'],
    personalityTraits: ['strategic', 'authoritative', 'experienced', 'decisive'],
    actionVerbStyle: 'strategic',
    summaryStyle: 'authoritative and strategic',
    industryFocus: 'executive, management, corporate, operations'
  },
  creative: {
    writingStyle: 'creative',
    toneKeywords: ['innovated', 'collaborated', 'conceptualized', 'designed', 'transformed'],
    personalityTraits: ['innovative', 'collaborative', 'dynamic', 'creative'],
    actionVerbStyle: 'innovative',
    summaryStyle: 'dynamic and collaborative',
    industryFocus: 'design, marketing, media, startups, agencies'
  },
  minimal: {
    writingStyle: 'technical',
    toneKeywords: ['implemented', 'developed', 'maintained', 'configured', 'automated'],
    personalityTraits: ['precise', 'methodical', 'skilled', 'reliable'],
    actionVerbStyle: 'quantitative',
    summaryStyle: 'straightforward and skill-focused',
    industryFocus: 'engineering, IT, technical, healthcare, research'
  }
};

function sanitizeResumeContent(htmlContent: string): string {
  let cleanContent = htmlContent.trim();
  
  cleanContent = cleanContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<\/?html[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
  cleanContent = cleanContent.replace(/<\/?body[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<meta[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<\/?title[^>]*>/gi, '');
  cleanContent = cleanContent.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  cleanContent = cleanContent.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  cleanContent = cleanContent.replace(/\n\s*\n/g, '\n');
  cleanContent = cleanContent.replace(/^\s+|\s+$/g, '');
  cleanContent = cleanContent.replace(/^```html\s*/i, '');
  cleanContent = cleanContent.replace(/\s*```$/i, '');
  
  return cleanContent;
}

function buildToneSpecificPrompt(jobDescription: string, templateId: string): string {
  const toneProfile = toneProfiles[templateId] || toneProfiles.modern;
  
  const basePrompt = `You are an expert resume writer creating an ATS-optimized resume with a ${toneProfile.writingStyle} tone. Based on the job description below, generate a professional resume in clean HTML format.

TONE AND WRITING STYLE REQUIREMENTS:
- Writing Style: ${toneProfile.writingStyle.toUpperCase()}
- Personality: ${toneProfile.personalityTraits.join(', ')}
- Professional Summary: Use a ${toneProfile.summaryStyle} approach
- Action Verbs: Emphasize ${toneProfile.actionVerbStyle} achievements using words like: ${toneProfile.toneKeywords.join(', ')}
- Industry Focus: Tailor language for ${toneProfile.industryFocus}

CRITICAL FORMATTING REQUIREMENTS:
- Generate ONLY clean HTML content (NO DOCTYPE, html, head, body tags)
- Start directly with the candidate's name as <h1>
- Use semantic HTML: <h1> for name, <h2> for sections, <p> for paragraphs, <ul>/<li> for lists
- Structure sections in this exact order: Contact Info, Professional Summary, Core Skills, Professional Experience, Education, Additional Sections

CONTENT STRUCTURE TEMPLATE:
<h1>[Full Name]</h1>
<p>[Email] | [Phone] | [City, State] | [LinkedIn URL]</p>

<h2>Professional Summary</h2>
<p>[3-4 sentences with ${toneProfile.summaryStyle} tone, highlighting relevant experience and value proposition tailored to the job]</p>

<h2>Core Skills</h2>
<ul>
<li>[Skill relevant to job description]</li>
<li>[Technical skill matching requirements]</li>
<li>[Industry-specific competency]</li>
</ul>

<h2>Professional Experience</h2>
<h3>[Job Title] | [Company Name] | [Date Range]</h3>
<ul>
<li>[Achievement using ${toneProfile.actionVerbStyle} ${toneProfile.writingStyle} language with quantifiable result]</li>
<li>[Accomplishment demonstrating relevant skill with ${toneProfile.personalityTraits[0]} approach]</li>
<li>[Impact statement showing business value using ${toneProfile.toneKeywords[0]} or similar verbs]</li>
</ul>

<h2>Education</h2>
<p>[Degree] in [Field] | [Institution] | [Year]</p>

TONE-SPECIFIC CONTENT GUIDELINES:`;

  // Add tone-specific guidelines
  switch (templateId) {
    case 'modern':
      return basePrompt + `
- Use confident, results-driven language that appeals to tech-savvy employers
- Emphasize metrics, efficiency gains, and optimization achievements
- Include modern industry terminology and digital competencies
- Frame accomplishments with quantifiable business impact`;

    case 'classic':
      return basePrompt + `
- Use formal, authoritative language that demonstrates executive presence
- Emphasize leadership, strategic planning, and high-level decision making
- Include corporate terminology and management accomplishments
- Frame achievements as strategic initiatives with organizational impact`;

    case 'creative':
      return basePrompt + `
- Use dynamic, collaborative language that shows innovation and creativity
- Emphasize teamwork, creative problem-solving, and breakthrough solutions
- Include industry-specific creative terminology and collaborative achievements
- Frame accomplishments as innovative projects with creative impact`;

    case 'minimal':
      return basePrompt + `
- Use precise, straightforward language that focuses on technical competencies
- Emphasize skills, methodical approaches, and technical implementations
- Include technical terminology and specific tool/technology mentions
- Frame achievements as technical solutions with measurable outcomes`;

    default:
      return basePrompt + `
- Maintain professional tone while incorporating job-specific keywords naturally
- Use strong action verbs and quantifiable achievements
- Ensure content flows logically and professionally`;
  }

  return basePrompt + `

Job Description:
${jobDescription}

Generate a complete, professional resume that would score highly with ATS systems and impress hiring managers. Focus on relevance, impact, and professional presentation while maintaining the ${toneProfile.writingStyle} tone throughout.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobDescription, templateId = 'modern' } = await req.json();

    if (!jobDescription || jobDescription.trim() === '') {
      return new Response(JSON.stringify({ error: 'Job description is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const prompt = buildToneSpecificPrompt(jobDescription, templateId);

    console.log(`Calling Gemini API with ${templateId} template tone...`);
    
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
    const cleanedResume = sanitizeResumeContent(rawResume);
    
    console.log(`Resume generated successfully with ${templateId} tone`);

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
