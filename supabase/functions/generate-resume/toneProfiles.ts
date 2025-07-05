
export interface ToneProfile {
  writingStyle: string;
  toneKeywords: string[];
  personalityTraits: string[];
  actionVerbStyle: string;
  summaryStyle: string;
  industryFocus: string;
  contentStructure: string[];
}

export const toneProfiles: Record<string, ToneProfile> = {
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
