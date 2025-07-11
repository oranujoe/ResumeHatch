
import { UserProfileData } from './index.ts';

export function buildToneSpecificPrompt(
  jobDescription: string, 
  templateId: string, 
  userProfileData: UserProfileData
): string {
  // Extract user's name with fallback logic
  const userName = userProfileData.profile?.full_name || 
                   userProfileData.profile?.professional_title || 
                   'Your Name';

  // Build professional summary with user's actual information
  const professionalSummary = userProfileData.profile?.professional_summary || 
    'Experienced professional seeking new opportunities to contribute skills and expertise.';

  // Format work experiences
  const workExperienceText = userProfileData.workExperiences.length > 0 
    ? userProfileData.workExperiences.map(exp => 
        `${exp.job_title} at ${exp.company_name} (${exp.start_date} - ${exp.end_date || 'Present'})${exp.location ? ` - ${exp.location}` : ''}
        ${exp.achievements && exp.achievements.length > 0 ? exp.achievements.map(achievement => `• ${achievement}`).join('\n        ') : ''}
        ${exp.technologies_used && exp.technologies_used.length > 0 ? `Technologies: ${exp.technologies_used.join(', ')}` : ''}
        `).join('\n\n')
    : 'No work experience provided - please add relevant experience or use placeholder content.';

  // Format education
  const educationText = userProfileData.education.length > 0
    ? userProfileData.education.map(edu => 
        `${edu.degree_type} in ${edu.field_of_study} - ${edu.institution_name}${edu.graduation_date ? ` (${edu.graduation_date})` : ''}`
      ).join('\n')
    : 'Education details not provided - please add education information.';

  // Format skills
  const skillsText = userProfileData.skills.length > 0
    ? userProfileData.skills.map(skill => 
        `${skill.skill_name} (${skill.proficiency_level})`
      ).join(', ')
    : 'Skills not specified - please add your technical and professional skills.';

  // Contact information
  const contactInfo = {
    email: userProfileData.profile?.email || '[Email Address]',
    phone: userProfileData.profile?.phone || '[Phone Number]',
    location: userProfileData.profile?.location || '[Location]',
    linkedin: userProfileData.profile?.linkedin_url || '[LinkedIn URL]',
    portfolio: userProfileData.profile?.portfolio_url || '[Portfolio URL]'
  };

  // Template-specific formatting and tone
  const templateTones = {
    modern: {
      tone: 'contemporary, professional, and achievement-focused',
      structure: 'clean and visually appealing with clear sections',
      language: 'action-oriented with quantifiable results'
    },
    classic: {
      tone: 'traditional, formal, and comprehensive',
      structure: 'conventional chronological format with detailed descriptions',
      language: 'formal business language with complete sentences'
    },
    creative: {
      tone: 'innovative, dynamic, and personality-driven',
      structure: 'unique layout that showcases creativity and personal brand',
      language: 'engaging and expressive while maintaining professionalism'
    },
    executive: {
      tone: 'authoritative, strategic, and leadership-focused',
      structure: 'executive summary prominent with strategic achievements',
      language: 'senior-level terminology emphasizing leadership and business impact'
    },
    technical: {
      tone: 'detail-oriented, expertise-focused, and technically precise',  
      structure: 'skills and technical projects prominently featured',
      language: 'technical terminology with specific tools and methodologies'
    }
  };

  const selectedTone = templateTones[templateId as keyof typeof templateTones] || templateTones.modern;

  // Build contact line with proper links
  let contactLine = `${contactInfo.email} • ${contactInfo.phone} • ${contactInfo.location}`;
  
  if (contactInfo.linkedin !== '[LinkedIn URL]') {
    contactLine += ` • <a href="${contactInfo.linkedin}" target="_blank">LinkedIn</a>`;
  }
  
  if (contactInfo.portfolio !== '[Portfolio URL]') {
    contactLine += ` • <a href="${contactInfo.portfolio}" target="_blank">Portfolio</a>`;
  }

  const basePrompt = `
Create a professional resume that matches this job description using the ${selectedTone.tone} tone and ${selectedTone.structure}. Use ${selectedTone.language}.

JOB DESCRIPTION TO MATCH:
${jobDescription}

USER'S ACTUAL INFORMATION TO USE:
Name: ${userName}
Professional Summary: ${professionalSummary}

Work Experience:
${workExperienceText}

Education:
${educationText}

Skills: ${skillsText}

${userProfileData.certifications.length > 0 ? `
Certifications:
${userProfileData.certifications.map(cert => 
  `${cert.name} - ${cert.issuing_organization} (${cert.issue_date})`
).join('\n')}
` : ''}

${userProfileData.projects.length > 0 ? `
Projects:
${userProfileData.projects.map(project => 
  `${project.project_name}: ${project.description || 'Project description'}${project.technologies_used ? ` - Technologies: ${project.technologies_used.join(', ')}` : ''}`
).join('\n')}
` : ''}

IMPORTANT INSTRUCTIONS:
1. Use the user's ACTUAL NAME "${userName}" - never use placeholder names like "John Doe"
2. Use all provided user information exactly as given
3. Tailor the content to match the job requirements while highlighting relevant user experience
4. If user information is incomplete, use professional placeholders in [brackets] that the user can easily find and replace
5. Structure the resume with the ${templateId} template style
6. Focus on achievements and quantifiable results where possible
7. Ensure the resume is ATS-friendly with clear section headers
8. Keep the resume to 1-2 pages maximum
9. Use consistent formatting throughout

**REQUIRED CONTACT SECTION STRUCTURE:**
Generate the contact section using EXACTLY this HTML structure (this is the ONLY place contact information should appear):

<header>
<h1>${userName}</h1>
<div class="contact-info">
<p>${contactLine}</p>
</div>
</header>

Generate a complete, professional resume in HTML format that the user can immediately use for job applications.`;

  return basePrompt;
}
