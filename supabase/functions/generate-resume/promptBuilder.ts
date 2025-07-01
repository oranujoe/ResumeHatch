
import { toneProfiles, ToneProfile } from './toneProfiles.ts';
import { getStructureInstructions } from './structureBuilder.ts';
import { getTemplateGuidelines } from './templateGuidelines.ts';

interface UserProfile {
  profile: any;
  workExperiences: any[];
  education: any[];
  skills: any[];
  certifications: any[];
  projects: any[];
}

function formatUserProfileData(userProfileData: UserProfile): string {
  const { profile, workExperiences, education, skills, certifications, projects } = userProfileData;
  
  let profileSection = '';
  
  // Personal Information
  if (profile) {
    profileSection += `PERSONAL INFORMATION:
- Professional Title: ${profile.professional_title || 'Professional'}
- Location: ${profile.location || 'Not specified'}
- Phone: ${profile.phone || 'Not provided'}
- LinkedIn: ${profile.linkedin_url || 'Not provided'}
- Portfolio: ${profile.portfolio_url || 'Not provided'}
- Professional Summary: ${profile.professional_summary || 'Experienced professional seeking new opportunities'}
- Years of Experience: ${profile.years_experience || 'Not specified'}
- Industry: ${profile.industry || 'Not specified'}

`;
  }

  // Work Experience
  if (workExperiences.length > 0) {
    profileSection += `WORK EXPERIENCE:
`;
    workExperiences.forEach((exp, index) => {
      profileSection += `${index + 1}. ${exp.job_title} at ${exp.company_name}
   - Duration: ${exp.start_date} to ${exp.is_current ? 'Present' : exp.end_date || 'Not specified'}
   - Location: ${exp.location || 'Not specified'}
   - Employment Type: ${exp.employment_type || 'Full-time'}
   - Key Achievements: ${exp.achievements.length > 0 ? exp.achievements.join(', ') : 'Not specified'}
   - Technologies Used: ${exp.technologies_used?.join(', ') || 'Not specified'}
   - Skills Demonstrated: ${exp.skills_demonstrated?.join(', ') || 'Not specified'}

`;
    });
  }

  // Education
  if (education.length > 0) {
    profileSection += `EDUCATION:
`;
    education.forEach((edu, index) => {
      profileSection += `${index + 1}. ${edu.degree_type} in ${edu.field_of_study}
   - Institution: ${edu.institution_name}
   - Graduation: ${edu.is_current ? 'Currently Studying' : edu.graduation_date || 'Not specified'}
   - Location: ${edu.location || 'Not specified'}
   - GPA: ${edu.gpa || 'Not specified'}
   - Honors: ${edu.honors || 'None'}
   - Relevant Coursework: ${edu.relevant_coursework?.join(', ') || 'Not specified'}

`;
    });
  }

  // Skills
  if (skills.length > 0) {
    profileSection += `SKILLS:
`;
    const skillsByCategory = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(`${skill.skill_name} (${skill.proficiency_level}${skill.years_experience ? `, ${skill.years_experience} years` : ''})`);
      return acc;
    }, {} as Record<string, string[]>);

    Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
      profileSection += `- ${category}: ${categorySkills.join(', ')}
`;
    });
    profileSection += '\n';
  }

  // Certifications
  if (certifications.length > 0) {
    profileSection += `CERTIFICATIONS:
`;
    certifications.forEach((cert, index) => {
      profileSection += `${index + 1}. ${cert.name}
   - Issuing Organization: ${cert.issuing_organization}
   - Issue Date: ${cert.issue_date}
   - Expiry Date: ${cert.expiry_date || 'No expiration'}
   - Status: ${cert.is_active ? 'Active' : 'Inactive'}
   - Credential ID: ${cert.credential_id || 'Not provided'}

`;
    });
  }

  // Projects
  if (projects.length > 0) {
    profileSection += `PROJECTS:
`;
    projects.forEach((project, index) => {
      profileSection += `${index + 1}. ${project.project_name}
   - Description: ${project.description || 'Not provided'}
   - Duration: ${project.start_date || 'Not specified'} to ${project.end_date || 'Not specified'}
   - Role: ${project.role || 'Not specified'}
   - Technologies Used: ${project.technologies_used?.join(', ') || 'Not specified'}
   - Team Size: ${project.team_size || 'Not specified'}
   - Project URL: ${project.project_url || 'Not provided'}
   - GitHub URL: ${project.github_url || 'Not provided'}
   - Key Achievements: ${project.achievements.length > 0 ? project.achievements.join(', ') : 'Not specified'}

`;
    });
  }

  return profileSection;
}

export function buildToneSpecificPrompt(jobDescription: string, templateId: string, userProfileData: UserProfile): string {
  const toneProfile: ToneProfile = toneProfiles[templateId] || toneProfiles.modern;
  
  const userDataSection = formatUserProfileData(userProfileData);
  
  const basePrompt = `You are an expert resume writer creating an ATS-optimized resume with a ${toneProfile.writingStyle} tone. Based on the job description and the user's actual profile data below, generate a professional resume in clean HTML format.

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

  const templateGuidelines = getTemplateGuidelines(templateId);

  const finalPrompt = basePrompt + templateGuidelines + `

USER'S ACTUAL PROFILE DATA:
${userDataSection}

Job Description:
${jobDescription}

IMPORTANT INSTRUCTIONS:
- Use the user's ACTUAL information provided above - do not create fictional data
- If any information is missing or "Not specified", either omit that section or use appropriate placeholders
- Tailor the user's real experience and skills to match the job requirements
- Maintain the ${toneProfile.writingStyle} tone throughout
- Focus on the most relevant experiences and skills for this specific job
- Generate a complete, professional resume that would score highly with ATS systems and impress hiring managers

Generate the resume now using the user's actual profile data and the job requirements.`;

  return finalPrompt;
}
