
import { useState, useEffect, useMemo } from 'react';
import { debounce } from '@/utils/cursorUtils';
import { extractPlainTextFromHTML, calculateKeywordMatch } from '@/utils/textExtraction';

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
  debounceDelay = 300 
}: UseATSOptimizationProps): ATSAnalysis => {
  const [analysis, setAnalysis] = useState<ATSAnalysis>({
    score: { overall: 0, keyword: 0, formatting: 0, content: 0, compatibility: 0 },
    suggestions: [],
    keywordMatches: 0,
    totalKeywords: 0,
    issues: []
  });

  // Analyze keyword matching using plain text extraction
  const analyzeKeywords = (resumeHTML: string, jobDesc: string) => {
    const resumePlainText = extractPlainTextFromHTML(resumeHTML);
    const jobPlainText = extractPlainTextFromHTML(jobDesc);
    
    console.log('ATS Analysis - Resume text length:', resumePlainText.length);
    console.log('ATS Analysis - Job text length:', jobPlainText.length);
    
    return calculateKeywordMatch(resumePlainText, jobPlainText);
  };

  // Analyze formatting quality
  const analyzeFormatting = (resumeHTML: string) => {
    const plainText = extractPlainTextFromHTML(resumeHTML);
    let score = 100;
    const issues: string[] = [];
    
    // Check for contact information
    if (!plainText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
      score -= 20;
      issues.push('Missing email address');
    }
    
    // Check for phone number
    if (!plainText.match(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/)) {
      score -= 15;
      issues.push('Missing or improperly formatted phone number');
    }
    
    // Check for section headers
    const sections = ['experience', 'education', 'skills'];
    sections.forEach(section => {
      if (!plainText.toLowerCase().includes(section)) {
        score -= 10;
        issues.push(`Missing ${section} section`);
      }
    });
    
    return { score: Math.max(0, score), issues };
  };

  // Analyze content quality
  const analyzeContent = (resumeHTML: string) => {
    const plainText = extractPlainTextFromHTML(resumeHTML);
    let score = 100;
    const issues: string[] = [];
    
    // Check resume length
    if (plainText.length < 300) {
      score -= 30;
      issues.push('Resume content too brief');
    } else if (plainText.length > 3000) {
      score -= 20;
      issues.push('Resume content too lengthy');
    }
    
    // Check for action verbs
    const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'improved', 'achieved', 'designed', 'built', 'launched'];
    const hasActionVerbs = actionVerbs.some(verb => plainText.toLowerCase().includes(verb));
    if (!hasActionVerbs) {
      score -= 25;
      issues.push('Use more action verbs to describe achievements');
    }
    
    // Check for quantifiable results
    const hasNumbers = /\d+/.test(plainText);
    if (!hasNumbers) {
      score -= 20;
      issues.push('Include quantifiable results and metrics');
    }
    
    return { score: Math.max(0, score), issues };
  };

  // Analyze ATS compatibility
  const analyzeCompatibility = (resumeHTML: string) => {
    let score = 100;
    const issues: string[] = [];
    
    // Check for problematic characters in HTML
    if (resumeHTML.includes('│') || resumeHTML.includes('┌') || resumeHTML.includes('└')) {
      score -= 30;
      issues.push('Avoid special characters that may not parse correctly');
    }
    
    // Check for proper structure
    const plainText = extractPlainTextFromHTML(resumeHTML);
    if (plainText.length < 50) {
      score -= 40;
      issues.push('Resume structure appears incomplete');
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
    
    if (suggestions.length === 0) {
      suggestions.push('Your resume looks good! Consider fine-tuning keywords for this specific role.');
    }
    
    return suggestions;
  };

  const debouncedAnalysis = useMemo(
    () => debounce((resumeHTML: string, jobDesc: string) => {
      console.log('Starting ATS analysis...');
      
      if (!resumeHTML.trim()) {
        setAnalysis({
          score: { overall: 0, keyword: 0, formatting: 0, content: 0, compatibility: 0 },
          suggestions: ['Generate a resume to see ATS optimization score'],
          keywordMatches: 0,
          totalKeywords: 0,
          issues: []
        });
        return;
      }

      const keywordAnalysis = analyzeKeywords(resumeHTML, jobDesc);
      const formatAnalysis = analyzeFormatting(resumeHTML);
      const contentAnalysis = analyzeContent(resumeHTML);
      const compatibilityAnalysis = analyzeCompatibility(resumeHTML);

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

      console.log('ATS Analysis completed:', {
        overall: Math.round(overall),
        keywordMatches: keywordAnalysis.matches,
        totalKeywords: keywordAnalysis.total
      });

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
