import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Centralized template tone profiles
const toneProfiles = {
  modern: {
    writingStyle: 'professional',
    toneKeywords: ['optimized', 'streamlined', 'enhanced', 'delivered', 'achieved'],
    personalityTraits: ['results-driven', 'analytical', 'tech-savvy', 'efficient'],
    actionVerbStyle: 'quantitative',
    summaryStyle: 'confident and results-focused',
    industryFocus: 'technology, consulting, finance, marketing',
    contentStructure: ['contact', 'summary', 'skills', 'experience', 'education']
  },
  classic: {
    writingStyle: 'executive',
    toneKeywords: ['spearheaded', 'orchestrated', 'championed', 'executed', 'directed'],
    personalityTraits: ['strategic', 'authoritative', 'experienced', 'decisive'],
    actionVerbStyle: 'strategic',
    summaryStyle: 'authoritative and strategic',
    industryFocus: 'executive, management, corporate, operations',
    contentStructure: ['contact', 'summary', 'experience', 'skills', 'education']
  },
  creative: {
    writingStyle: 'creative',
    toneKeywords: ['innovated', 'collaborated', 'conceptualized', 'designed', 'transformed'],
    personalityTraits: ['innovative', 'collaborative', 'dynamic', 'creative'],
    actionVerbStyle: 'innovative',
    summaryStyle: 'dynamic and collaborative',
    industryFocus: 'design, marketing, media, startups, agencies',
    contentStructure: ['contact', 'summary', 'skills', 'experience', 'projects', 'education']
  },
  minimal: {
    writingStyle: 'technical',
    toneKeywords: ['implemented', 'developed', 'maintained', 'configured', 'automated'],
    personalityTraits: ['precise', 'methodical', 'skilled', 'reliable'],
    actionVerbStyle: 'quantitative',
    summaryStyle: 'straightforward and skill-focused',
    industryFocus: 'engineering, IT, technical, healthcare, research',
    contentStructure: ['contact', 'skills', 'experience', 'education', 'certifications']
  },
  veteran: {
    writingStyle: 'executive',
    toneKeywords: ['pioneered', 'established', 'mentored', 'transformed', 'scaled'],
    personalityTraits: ['visionary', 'mentor', 'industry expert', 'transformational'],
    actionVerbStyle: 'strategic',
    summaryStyle: 'visionary and transformational',
    industryFocus: 'senior management, C-suite, board positions, advisory roles',
    contentStructure: ['contact', 'executive-profile', 'leadership-experience', 'achievements', 'board-positions', 'education']
  },
  graduate: {
    writingStyle: 'academic',
    toneKeywords: ['achieved', 'participated', 'contributed', 'learned', 'demonstrated'],
    personalityTraits: ['eager', 'quick-learner', 'dedicated', 'ambitious'],
    actionVerbStyle: 'academic',
    summaryStyle: 'enthusiastic and goal-oriented',
    industryFocus: 'entry-level, internships, graduate programs, trainee positions',
    contentStructure: ['contact', 'objective', 'education', 'projects', 'experience', 'skills', 'activities']
  },
  consultant: {
    writingStyle: 'consultative',
    toneKeywords: ['analyzed', 'recommended', 'facilitated', 'optimized', 'strategized'],
    personalityTraits: ['analytical', 'client-focused', 'strategic', 'problem-solver'],
    actionVerbStyle: 'methodical',
    summaryStyle: 'analytical and client-focused',
    industryFocus: 'consulting, advisory, strategy, business analysis',
    contentStructure: ['contact', 'profile', 'methodologies', 'client-engagements', 'expertise', 'education']
  },
  nomad: {
    writingStyle: 'entrepreneurial',
    toneKeywords: ['adapted', 'collaborated remotely', 'managed globally', 'innovated', 'balanced'],
    personalityTraits: ['adaptable', 'self-motivated', 'culturally aware', 'independent'],
    actionVerbStyle: 'entrepreneurial',
    summaryStyle: 'adaptable and globally-minded',
    industryFocus: 'remote work, digital, freelance, startups, tech',
    contentStructure: ['contact', 'remote-profile', 'global-experience', 'remote-skills', 'cultural-experience', 'education']
  },
  healthcare: {
    writingStyle: 'healthcare',
    toneKeywords: ['diagnosed', 'treated', 'cared for', 'improved outcomes', 'collaborated'],
    personalityTraits: ['compassionate', 'detail-oriented', 'collaborative', 'patient-focused'],
    actionVerbStyle: 'empathetic',
    summaryStyle: 'compassionate and outcome-focused',
    industryFocus: 'healthcare, medical, nursing, clinical, patient care',
    contentStructure: ['contact', 'clinical-profile', 'certifications', 'clinical-experience', 'specializations', 'education']
  },
  sales: {
    writingStyle: 'sales',
    toneKeywords: ['exceeded', 'generated', 'closed', 'built relationships', 'negotiated'],
    personalityTraits: ['persuasive', 'relationship-builder', 'goal-oriented', 'competitive'],
    actionVerbStyle: 'persuasive',
    summaryStyle: 'results-driven and relationship-focused',
    industryFocus: 'sales, business development, account management, revenue generation',
    contentStructure: ['contact', 'sales-profile', 'achievements', 'sales-experience', 'methodologies', 'education']
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
  
  // Generate content structure instructions based on template
  const getStructureInstructions = (structure: string[]) => {
    const structureMap = {
      'contact': '<h1>[Full Name]</h1>\n<p>[Email] | [Phone] | [City, State] | [LinkedIn URL]</p>',
      'summary': '<h2>Professional Summary</h2>\n<p>[3-4 sentences with specific tone]</p>',
      'executive-profile': '<h2>Executive Profile</h2>\n<p>[Strategic leadership overview]</p>',
      'clinical-profile': '<h2>Clinical Profile</h2>\n<p>[Patient care and clinical expertise overview]</p>',
      'sales-profile': '<h2>Sales Profile</h2>\n<p>[Results and relationship-building focus]</p>',
      'remote-profile': '<h2>Remote Professional Profile</h2>\n<p>[Global collaboration and flexibility emphasis]</p>',
      'objective': '<h2>Career Objective</h2>\n<p>[Entry-level goals and aspirations]</p>',
      'profile': '<h2>Professional Profile</h2>\n<p>[Consulting approach and expertise]</p>',
      'skills': '<h2>Core Skills</h2>\n<ul><li>[Relevant skills]</li></ul>',
      'remote-skills': '<h2>Remote Tools & Skills</h2>\n<ul><li>[Remote collaboration tools]</li></ul>',
      'experience': '<h2>Professional Experience</h2>\n<h3>[Job Title] | [Company] | [Dates]</h3>\n<ul><li>[Achievements]</li></ul>',
      'leadership-experience': '<h2>Leadership Experience</h2>\n<h3>[Executive Role] | [Organization] | [Dates]</h3>\n<ul><li>[Strategic achievements]</li></ul>',
      'clinical-experience': '<h2>Clinical Experience</h2>\n<h3>[Clinical Role] | [Healthcare Facility] | [Dates]</h3>\n<ul><li>[Patient care outcomes]</li></ul>',
      'sales-experience': '<h2>Sales Achievement Record</h2>\n<h3>[Sales Role] | [Company] | [Dates]</h3>\n<ul><li>[Quota achievements and metrics]</li></ul>',
      'global-experience': '<h2>Global Experience</h2>\n<h3>[Remote Role] | [Company/Client] | [Location/Remote] | [Dates]</h3>\n<ul><li>[Cross-cultural achievements]</li></ul>',
      'client-engagements': '<h2>Client Engagements</h2>\n<h3>[Project/Client] | [Industry] | [Duration]</h3>\n<ul><li>[Problem solved and impact]</li></ul>',
      'education': '<h2>Education</h2>\n<p>[Degree] in [Field] | [Institution] | [Year]</p>',
      'projects': '<h2>Academic Projects</h2>\n<h3>[Project Name]</h3>\n<ul><li>[Skills demonstrated and outcomes]</li></ul>',
      'certifications': '<h2>Certifications & Licenses</h2>\n<ul><li>[Professional certifications]</li></ul>',
      'methodologies': '<h2>Methodologies</h2>\n<ul><li>[Consulting frameworks and approaches]</li></ul>',
      'achievements': '<h2>Key Achievements</h2>\n<ul><li>[Major accomplishments with metrics]</li></ul>',
      'board-positions': '<h2>Board Positions</h2>\n<ul><li>[Board roles and advisory positions]</li></ul>',
      'activities': '<h2>Extracurricular Activities</h2>\n<ul><li>[Leadership and involvement]</li></ul>',
      'specializations': '<h2>Specializations</h2>\n<ul><li>[Clinical areas of expertise]</li></ul>',
      'expertise': '<h2>Industry Expertise</h2>\n<ul><li>[Domain knowledge and experience]</li></ul>',
      'cultural-experience': '<h2>Cultural Adaptability</h2>\n<ul><li>[Cross-cultural work examples]</li></ul>'
    };
    
    return structure.map(section => structureMap[section] || '').join('\n\n');
  };

  const basePrompt = `You are an expert resume writer creating an ATS-optimized resume with a ${toneProfile.writingStyle} tone. Based on the job description below, generate a professional resume in clean HTML format.

TONE AND WRITING STYLE REQUIREMENTS:
- Writing Style: ${toneProfile.writingStyle.toUpperCase()}
- Personality: ${toneProfile.personalityTraits.join(', ')}
- Professional Summary: Use a ${toneProfile.summaryStyle} approach
- Action Verbs: Emphasize ${toneProfile.actionVerbStyle} achievements using words like: ${toneProfile.toneKeywords.join(', ')}
- Industry Focus: Tailor language for ${toneProfile.industryFocus}

CRITICAL FORMATTING REQUIREMENTS:
- Generate ONLY clean HTML content (NO DOCTYPE, html, head, body tags)
- Use semantic HTML: <h1> for name, <h2> for sections, <h3> for subsections, <p> for paragraphs, <ul>/<li> for lists
- Follow this EXACT content structure for ${templateId} template:

${getStructureInstructions(toneProfile.contentStructure)}

CONTENT GUIDELINES FOR ${templateId.toUpperCase()} TEMPLATE:`;

  // Add template-specific content guidelines
  const templateGuidelines = {
    modern: `
- Use confident, results-driven language that appeals to tech-savvy employers
- Emphasize metrics, efficiency gains, and optimization achievements
- Include modern industry terminology and digital competencies
- Frame accomplishments with quantifiable business impact`,

    classic: `
- Use formal, authoritative language that demonstrates executive presence
- Emphasize leadership, strategic planning, and high-level decision making
- Include corporate terminology and management accomplishments
- Frame achievements as strategic initiatives with organizational impact`,

    creative: `
- Use dynamic, collaborative language that shows innovation and creativity
- Emphasize teamwork, creative problem-solving, and breakthrough solutions
- Include industry-specific creative terminology and collaborative achievements
- Frame accomplishments as innovative projects with creative impact
- Include a Projects section highlighting creative work`,

    minimal: `
- Use precise, straightforward language that focuses on technical competencies
- Emphasize skills, methodical approaches, and technical implementations
- Include technical terminology and specific tool/technology mentions
- Frame achievements as technical solutions with measurable outcomes
- Lead with skills section to highlight technical competencies`,

    veteran: `
- Use visionary, transformational language that demonstrates industry leadership
- Emphasize strategic initiatives, mentorship, and organizational transformation
- Include board positions, speaking engagements, and industry recognition
- Frame achievements as legacy-building and industry-shaping initiatives
- Focus on leadership experience and executive profile over basic job duties`,

    graduate: `
- Use enthusiastic, growth-oriented language that shows potential and eagerness
- Emphasize academic achievements, projects, and transferable skills
- Include relevant coursework, academic projects, and extracurricular leadership
- Frame experiences as learning opportunities and skill development
- Lead with education and projects to compensate for limited work experience`,

    consultant: `
- Use analytical, problem-solving language that demonstrates strategic thinking
- Emphasize methodologies, client outcomes, and business impact
- Include specific consulting frameworks, industry expertise, and client testimonials
- Frame achievements as solutions delivered and value created for clients
- Structure around client engagements rather than traditional job roles`,

    nomad: `
- Use adaptable, globally-minded language that shows cultural awareness
- Emphasize remote collaboration, cross-cultural communication, and flexibility
- Include time zone management, digital nomad tools, and cultural experiences
- Frame achievements as global impact and remote team success
- Highlight location independence and cultural adaptability`,

    healthcare: `
- Use compassionate, outcome-focused language that emphasizes patient care
- Emphasize clinical outcomes, patient satisfaction, and collaborative care
- Include certifications, specializations, and continuing education
- Frame achievements as improved patient outcomes and quality care
- Structure around clinical experience and patient care impact`,

    sales: `
- Use persuasive, results-driven language that emphasizes relationship building
- Emphasize quota achievements, revenue generation, and client relationships
- Include specific metrics, sales methodologies, and client retention rates
- Frame achievements as exceeded targets and built lasting partnerships
- Structure around sales achievements and relationship-building success`
  };

  return basePrompt + (templateGuidelines[templateId] || templateGuidelines.modern) + `

Job Description:
${jobDescription}

Generate a complete, professional resume that would score highly with ATS systems and impress hiring managers. Focus on relevance, impact, and professional presentation while maintaining the ${toneProfile.writingStyle} tone and ${templateId} structure throughout.`;
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
