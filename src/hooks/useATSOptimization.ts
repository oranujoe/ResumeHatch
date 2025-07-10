
import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/utils/cursorUtils';

interface ATSScore {
  overall: number;
  keyword: number;
  formatting: number;
  content: number;
  compatibility: number;
}

interface ATSAnalysis {
  score: ATSScore;
  suggestions: string[];
  keywordMatches: number;
  totalKeywords: number;
  issues: string[];
}

interface UseATSOptimizationProps {
  resumeContent: string;
  jobDescription: string;
  debounceDelay?: number;
}

export const useATSOptimization = ({ 
  resumeContent, 
  jobDescription, 
  debounceDelay = 500 
}: UseATSOptimizationProps): ATSAnalysis => {
  const [analysis, setAnalysis] = useState<ATSAnalysis>({
    score: { overall: 0, keyword: 0, formatting: 0, content: 0, compatibility: 0 },
    suggestions: [],
    keywordMatches: 0,
    totalKeywords: 0,
    issues: []
  });

  // Extract keywords from job description
  const extractKeywords = (text: string): string[] => {
    const commonWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);
    
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !commonWords.has(word))
      .filter((word, index, arr) => arr.indexOf(word) === index)
      .slice(0, 20); // Focus on top 20 keywords
  };

  // Analyze keyword matching
  const analyzeKeywords = (resume: string, jobDesc: string) => {
    const jobKeywords = extractKeywords(jobDesc);
    const resumeText = resume.toLowerCase();
    
    const matches = jobKeywords.filter(keyword => 
      resumeText.includes(keyword.toLowerCase())
    );
    
    return {
      matches: matches.length,
      total: jobKeywords.length,
      score: jobKeywords.length > 0 ? (matches.length / jobKeywords.length) * 100 : 0
    };
  };

  // Analyze formatting quality
  const analyzeFormatting = (resume: string) => {
    let score = 100;
    const issues: string[] = [];
    
    // Check for contact information
    if (!resume.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
      score -= 20;
      issues.push('Missing email address');
    }
    
    // Check for phone number
    if (!resume.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)) {
      score -= 15;
      issues.push('Missing or improperly formatted phone number');
    }
    
    // Check for section headers
    const sections = ['experience', 'education', 'skills'];
    sections.forEach(section => {
      if (!resume.toLowerCase().includes(section)) {
        score -= 10;
        issues.push(`Missing ${section} section`);
      }
    });
    
    return { score: Math.max(0, score), issues };
  };

  // Analyze content quality
  const analyzeContent = (resume: string) => {
    let score = 100;
    const issues: string[] = [];
    
    // Check resume length
    if (resume.length < 500) {
      score -= 30;
      issues.push('Resume content too brief');
    } else if (resume.length > 4000) {
      score -= 20;
      issues.push('Resume content too lengthy');
    }
    
    // Check for action verbs
    const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'improved', 'achieved'];
    const hasActionVerbs = actionVerbs.some(verb => resume.toLowerCase().includes(verb));
    if (!hasActionVerbs) {
      score -= 25;
      issues.push('Use more action verbs to describe achievements');
    }
    
    // Check for quantifiable results
    const hasNumbers = /\d+/.test(resume);
    if (!hasNumbers) {
      score -= 20;
      issues.push('Include quantifiable results and metrics');
    }
    
    return { score: Math.max(0, score), issues };
  };

  // Analyze ATS compatibility
  const analyzeCompatibility = (resume: string) => {
    let score = 100;
    const issues: string[] = [];
    
    // Simple text-based analysis (in real implementation, this would be more sophisticated)
    if (resume.includes('│') || resume.includes('┌') || resume.includes('└')) {
      score -= 30;
      issues.push('Avoid special characters that may not parse correctly');
    }
    
    // Check for proper structure
    if (!resume.includes('\n')) {
      score -= 20;
      issues.push('Improve resume structure with proper line breaks');
    }
    
    return { score: Math.max(0, score), issues };
  };

  // Generate suggestions based on analysis
  const generateSuggestions = (
    keywordAnalysis: any,
    formatIssues: string[],
    contentIssues: string[],
    compatibilityIssues: string[]
  ): string[] => {
    const suggestions: string[] = [];
    
    if (keywordAnalysis.score < 50) {
      suggestions.push('Include more relevant keywords from the job description');
    }
    
    if (formatIssues.length > 0) {
      suggestions.push('Add missing contact information and standard sections');
    }
    
    if (contentIssues.length > 0) {
      suggestions.push('Use action verbs and include quantifiable achievements');
    }
    
    if (compatibilityIssues.length > 0) {
      suggestions.push('Simplify formatting for better ATS compatibility');
    }
    
    return suggestions;
  };

  const debouncedAnalysis = useMemo(
    () => debounce((resume: string, jobDesc: string) => {
      if (!resume.trim()) {
        setAnalysis({
          score: { overall: 0, keyword: 0, formatting: 0, content: 0, compatibility: 0 },
          suggestions: ['Generate a resume to see ATS optimization score'],
          keywordMatches: 0,
          totalKeywords: 0,
          issues: []
        });
        return;
      }

      const keywordAnalysis = analyzeKeywords(resume, jobDesc);
      const formatAnalysis = analyzeFormatting(resume);
      const contentAnalysis = analyzeContent(resume);
      const compatibilityAnalysis = analyzeCompatibility(resume);

      const scores = {
        keyword: keywordAnalysis.score,
        formatting: formatAnalysis.score,
        content: contentAnalysis.score,
        compatibility: compatibilityAnalysis.score
      };

      const overall = (scores.keyword + scores.formatting + scores.content + scores.compatibility) / 4;

      const allIssues = [
        ...formatAnalysis.issues,
        ...contentAnalysis.issues,
        ...compatibilityAnalysis.issues
      ];

      setAnalysis({
        score: {
          overall,
          ...scores
        },
        suggestions: generateSuggestions(keywordAnalysis, formatAnalysis.issues, contentAnalysis.issues, compatibilityAnalysis.issues),
        keywordMatches: keywordAnalysis.matches,
        totalKeywords: keywordAnalysis.total,
        issues: allIssues
      });
    }, debounceDelay),
    [debounceDelay]
  );

  useEffect(() => {
    debouncedAnalysis(resumeContent, jobDescription);
  }, [resumeContent, jobDescription, debouncedAnalysis]);

  return analysis;
};
