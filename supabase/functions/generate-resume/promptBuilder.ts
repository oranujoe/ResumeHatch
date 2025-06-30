
import { toneProfiles, ToneProfile } from './toneProfiles.ts';
import { getStructureInstructions } from './structureBuilder.ts';
import { getTemplateGuidelines } from './templateGuidelines.ts';

export function buildToneSpecificPrompt(jobDescription: string, templateId: string): string {
  const toneProfile: ToneProfile = toneProfiles[templateId] || toneProfiles.modern;
  
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

  return basePrompt + getTemplateGuidelines(templateId) + `

Job Description:
${jobDescription}

Generate a complete, professional resume that would score highly with ATS systems and impress hiring managers. Focus on relevance, impact, and professional presentation while maintaining the ${toneProfile.writingStyle} tone and ${templateId} structure throughout.`;
}
