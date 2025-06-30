
export function getStructureInstructions(structure: string[]): string {
  const structureMap: Record<string, string> = {
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
}
