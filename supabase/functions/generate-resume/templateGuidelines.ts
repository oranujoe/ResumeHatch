
export function getTemplateGuidelines(templateId: string): string {
  const templateGuidelines: Record<string, string> = {
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

  return templateGuidelines[templateId] || templateGuidelines.modern;
}
