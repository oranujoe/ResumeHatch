
export interface ChangelogEntry {
  version: string;
  date: string;
  type: 'major' | 'minor' | 'patch';
  categories: {
    features?: string[];
    improvements?: string[];
    bugFixes?: string[];
    breaking?: string[];
  };
}

export const changelogData: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2025-01-05",
    type: "minor",
    categories: {
      features: [
        "Added new Job Zone visualization with interactive map",
        "Implemented bulk queue processing for multiple job applications",
        "Enhanced Chrome extension integration with drop-zone functionality"
      ],
      improvements: [
        "Improved resume generation speed by 40%",
        "Enhanced AI parsing accuracy for complex job descriptions",
        "Streamlined user onboarding flow"
      ],
      bugFixes: [
        "Fixed PDF export formatting issues",
        "Resolved sidebar navigation state persistence",
        "Fixed responsive layout issues on mobile devices"
      ]
    }
  },
  {
    version: "2.0.5",
    date: "2024-12-20",
    type: "patch",
    categories: {
      improvements: [
        "Optimized database queries for faster page load times",
        "Enhanced error handling in resume generation"
      ],
      bugFixes: [
        "Fixed authentication redirect loop",
        "Resolved file upload size validation",
        "Fixed dashboard KPI calculations"
      ]
    }
  },
  {
    version: "2.0.0",
    date: "2024-12-01",
    type: "major",
    categories: {
      features: [
        "Complete dashboard redesign with modern UI",
        "New AI-powered resume generation engine",
        "Advanced job parsing and application tracking",
        "Real-time collaboration features"
      ],
      breaking: [
        "Legacy resume templates are no longer supported",
        "API endpoints have been updated - please check documentation"
      ],
      improvements: [
        "50% faster application performance",
        "Enhanced security with improved authentication",
        "Better mobile responsiveness across all pages"
      ]
    }
  },
  {
    version: "1.8.2",
    date: "2024-11-15",
    type: "patch",
    categories: {
      bugFixes: [
        "Fixed email notification delivery issues",
        "Resolved template preview rendering problems",
        "Fixed user profile data validation"
      ]
    }
  }
];
