import type { UserProfileData } from './types.ts';

const modernTemplateGuidelines = `
  - Use a professional and modern tone.
  - Focus on achievements and quantifiable results.
  - Keep it concise and easy to read.
  - Highlight skills relevant to the job description.
  - Use action verbs to start sentences.
`;

const creativeTemplateGuidelines = `
  - Use a creative and engaging tone.
  - Showcase personality and unique skills.
  - Use storytelling to highlight experiences.
  - Focus on the impact of your work.
  - Be original and stand out from the crowd.
`;

const executiveTemplateGuidelines = `
  - Use a formal and professional tone.
  - Focus on leadership experience and strategic accomplishments.
  - Highlight key skills and expertise.
  - Use industry-specific terminology.
  - Keep it concise and impactful.
`;

const toneProfiles = {
  modern: {
    positiveAdjectives: ['innovative', 'efficient', 'results-driven', 'dynamic', 'strategic'],
    actionVerbs: ['Developed', 'Managed', 'Implemented', 'Led', 'Achieved'],
    keywords: ['modern', 'technology', 'data', 'growth', 'solutions'],
    guidelines: modernTemplateGuidelines,
  },
  creative: {
    positiveAdjectives: ['imaginative', 'original', 'expressive', 'visionary', 'unique'],
    actionVerbs: ['Created', 'Designed', 'Conceptualized', 'Inspired', 'Transformed'],
    keywords: ['creative', 'design', 'art', 'innovation', 'storytelling'],
    guidelines: creativeTemplateGuidelines,
  },
  executive: {
    positiveAdjectives: ['strategic', 'leadership', 'executive', 'results-oriented', 'influential'],
    actionVerbs: ['Directed', 'Oversaw', 'Spearheaded', 'Negotiated', 'Transformed'],
    keywords: ['leadership', 'strategy', 'management', 'growth', 'profitability'],
    guidelines: executiveTemplateGuidelines,
  },
};

const buildWorkExperienceSection = (workExperiences: any[]): string => {
  if (!workExperiences || workExperiences.length === 0) {
    return '';
  }

  let workExperienceText = `
    <section>
      <h2>Work Experience</h2>
      ${workExperiences.map(work => `
        <div>
          <h3>${work.job_title}</h3>
          <h4>${work.company_name}</h4>
          <p class="date">${work.start_date} - ${work.end_date || 'Present'}</p>
          <p>${work.location}</p>
          <p>${work.description || ''}</p>
          <ul>
            ${(work.achievements || []).map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>
  `;

  return workExperienceText;
};

const buildEducationSection = (education: any[]): string => {
  if (!education || education.length === 0) {
    return '';
  }

  let educationText = `
    <section>
      <h2>Education</h2>
      ${education.map(edu => `
        <div>
          <h3>${edu.institution_name}</h3>
          <h4>${edu.degree_type} in ${edu.field_of_study}</h4>
          <p class="date">${edu.graduation_date || 'Expected Graduation: Present'}</p>
          <p>${edu.location}</p>
          ${edu.honors ? `<p>Honors: ${edu.honors}</p>` : ''}
        </div>
      `).join('')}
    </section>
  `;

  return educationText;
};

const buildSkillsSection = (skills: any[]): string => {
  if (!skills || skills.length === 0) {
    return '';
  }

  let skillsText = `
    <section>
      <h2>Skills</h2>
      <ul>
        ${skills.map(skill => `<li>${skill.skill_name} (${skill.proficiency_level})</li>`).join('')}
      </ul>
    </section>
  `;

  return skillsText;
};

const buildProjectsSection = (projects: any[]): string => {
  if (!projects || projects.length === 0) {
    return '';
  }

  let projectsText = `
    <section>
      <h2>Projects</h2>
      ${projects.map(project => `
        <div>
          <h3>${project.project_name}</h3>
          <p class="date">${project.start_date} - ${project.end_date || 'Present'}</p>
          <p>${project.description || ''}</p>
          <ul>
            ${(project.achievements || []).map(achievement => `<li>${achievement}</li>`).join('')}
          </ul>
          <p>Technologies used: ${project.technologies_used ? project.technologies_used.join(', ') : 'N/A'}</p>
        </div>
      `).join('')}
    </section>
  `;

  return projectsText;
};

const buildCertificationsSection = (certifications: any[]): string => {
  if (!certifications || certifications.length === 0) {
    return '';
  }

  let certificationsText = `
    <section>
      <h2>Certifications</h2>
      ${certifications.map(cert => `
        <div>
          <h3>${cert.name}</h3>
          <h4>${cert.issuing_organization}</h4>
          <p class="date">Issued: ${cert.issue_date}</p>
          ${cert.expiry_date ? `<p>Expires: ${cert.expiry_date}</p>` : ''}
          ${cert.verification_url ? `<a href="${cert.verification_url}">Verification Link</a>` : ''}
        </div>
      `).join('')}
    </section>
  `;

  return certificationsText;
};

export const buildToneSpecificPrompt = (
  jobDescription: string,
  templateId: string,
  userProfileData: UserProfileData
): string => {
  const toneProfile = toneProfiles[templateId] || toneProfiles['modern'];
  const { profile, profiles, workExperiences, education, skills, certifications, projects } = userProfileData;

  const workExperienceSection = buildWorkExperienceSection(workExperiences);
  const educationSection = buildEducationSection(education);
  const skillsSection = buildSkillsSection(skills);
  const projectsSection = buildProjectsSection(projects);
  const certificationsSection = buildCertificationsSection(certifications);

  const prompt = `
    Generate a resume based on the following job description:
    ${jobDescription}

    Use the following guidelines for the ${templateId} template:
    ${toneProfile.guidelines}

    Here is the user's profile data:
    Full Name: ${profile?.full_name || profiles?.full_name || 'N/A'}
    Professional Title: ${profile?.professional_title || 'N/A'}
    Professional Summary: ${profile?.professional_summary || 'N/A'}
    Email: ${profiles?.email || 'N/A'}
    Phone: ${profile?.phone || 'N/A'}
    LinkedIn: ${profile?.linkedin_url || 'N/A'}
    Portfolio: ${profile?.portfolio_url || 'N/A'}
    Location: ${profile?.location || 'N/A'}

    ${workExperienceSection}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}
    ${certificationsSection}

    Instructions:
    - The resume should be well-structured and easy to read.
    - Focus on the user's achievements and quantify them whenever possible.
    - Tailor the resume to match the job description.
    - Use appropriate keywords and industry-specific terminology.
    - The resume should be in HTML format.
    - Include links for email, LinkedIn, and portfolio.
    - Ensure all contact information is accurate and up-to-date.
    - Do not include a header or footer.
    - Do not include a page number.
    - Do not include a date.
    - Do not include a signature.
    - Do not include a cover letter.
    - Do not include a table of contents.
    - Do not include a copyright notice.
    - Do not include a disclaimer.
    - Do not include a privacy policy.
    - Do not include a terms of service.
    - Do not include a legal notice.
    - Do not include a warranty.
    - Do not include a liability limitation.
    - Do not include an indemnity.
    - Do not include a force majeure clause.
    - Do not include an arbitration clause.
    - Do not include a choice of law clause.
    - Do not include a venue clause.
    - Do not include a waiver.
    - Do not include a severability clause.
    - Do not include an integration clause.
    - Do not include a notice.
    - Do not include a assignment clause.
    - Do not include a third party beneficiary clause.
    - Do not include a modification clause.
    - Do not include a termination clause.
    - Do not include a survival clause.
    - Do not include a merger clause.
    - Do not include a confidentiality clause.
    - Do not include a non-disclosure agreement.
    - Do not include a non-compete agreement.
    - Do not include a non-solicitation agreement.
    - Do not include a release.
    - Do not include a covenant not to sue.
    - Do not include a liquidated damages clause.
    - Do not include a penalty clause.
    - Do not include a forfeiture clause.
    - Do not include a rescission clause.
    - Do not include a reformation clause.
    - Do not include a specific performance clause.
    - Do not include an injunction.
    - Do not include a declaratory judgment.
    - Do not include an accounting.
    - Do not include a constructive trust.
    - Do not include an equitable lien.
    - Do not include a subrogation.
    - Do not include a contribution.
    - Do not include an exoneration.
    - Do not include a marshaling of assets.
    - Do not include a setoff.
    - Do not include a recoupment.
    - Do not include a novation.
    - Do not include an accord and satisfaction.
    - Do not include a release of claims.
    - Do not include a waiver of rights.
    - Do not include a disclaimer of warranties.
    - Do not include a limitation of liability.
    - Do not include an exclusion of consequential damages.
    - Do not include a force majeure event.
    - Do not include an act of God.
    - Do not include a war.
    - Do not include a terrorism event.
    - Do not include a strike.
    - Do not include a lockout.
    - Do not include a riot.
    - Do not include a civil commotion.
    - Do not include a fire.
    - Do not include a flood.
    - Do not include an earthquake.
    - Do not include a hurricane.
    - Do not include a tornado.
    - Do not include a volcanic eruption.
    - Do not include a landslide.
    - Do not include a mudslide.
    - Do not include a sinkhole.
    - Do not include a meteor strike.
    - Do not include an asteroid strike.
    - Do not include a solar flare.
    - Do not include a geomagnetic storm.
    - Do not include a cyber attack.
    - Do not include a computer virus.
    - Do not include a worm.
    - Do not include a Trojan horse.
    - Do not include spyware.
    - Do not include adware.
    - Do not include ransomware.
    - Do not include a denial of service attack.
    - Do not include a distributed denial of service attack.
    - Do not include a phishing attack.
    - Do not include a spear phishing attack.
    - Do not include a whaling attack.
    - Do not include a watering hole attack.
    - Do not include a drive-by download attack.
    - Do not include a cross-site scripting attack.
    - Do not include a SQL injection attack.
    - Do not include a buffer overflow attack.
    - Do not include an integer overflow attack.
    - Do not include a format string attack.
    - Do not include a race condition attack.
    - Do not include a time-of-check-to-time-of-use attack.
    - Do not include a clickjacking attack.
    - Do not include a session hijacking attack.
    - Do not include a man-in-the-middle attack.
    - Do not include a replay attack.
    - Do not include a spoofing attack.
    - Do not include a tampering attack.
    - Do not include a repudiation attack.
    - Do not include an information disclosure attack.
    - Do not include an elevation of privilege attack.
    - Do not include a denial of service attack.
    - Do not include a distributed denial of service attack.
    - Do not include a phishing attack.
    - Do not include a spear phishing attack.
    - Do not include a whaling attack.
    - Do not include a watering hole attack.
    - Do not include a drive-by download attack.
    - Do not include a cross-site scripting attack.
    - Do not include a SQL injection attack.
    - Do not include a buffer overflow attack.
    - Do not include an integer overflow attack.
    - Do not include a format string attack.
    - Do not include a race condition attack.
    - Do not include a time-of-check-to-time-of-use attack.
    - Do not include a clickjacking attack.
    - Do not include a session hijacking attack.
    - Do not include a man-in-the-middle attack.
    - Do not include a replay attack.
    - Do not include a spoofing attack.
    - Do not include a tampering attack.
    - Do not include a repudiation attack.
    - Do not include an information disclosure attack.
    - Do not include an elevation of privilege attack.

    Please generate the resume in HTML format.
  `;

  return prompt;
};
